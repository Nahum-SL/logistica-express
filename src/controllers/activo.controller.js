// Acceso a la BD
const db = require('../database/db');

// En este archivo solo se crean metodos JS
// No se definen las rutas ni los verbos (POST, GET ...)

const obtenerActivos = async (req, res) => {
  try{
    // Consulta
    const activos = await db('activos').select("*");
    return res.status(200).json({ success: true, data: activos})
    
  }catch (err){
    console.error("Error al leer activos: ", err);
    return res
      .status(500)
      .json({ success: false, message: "Error al leer activos" });
  }
};

const obtenerActivoPorId = async (req, res) => {
  try{
    const { id } = req.params;
    
    const Activo = await db('activos').where({ id }).first();

    if(!Activo) {
      return res.status(404).json({ success: false, message: "No existe esta Activo"})
    }
    
    return res
      .status(200)
      .json({ success: true, data: Activo });

  }catch(err){
    console.error("No se pudo ejecutar la busqueda: ", err);
    return res
      .status(500)
      .json({ success: false, message: "No se pudo ejecutar la busqueda" });
  }
};

const crearActivo = async (req, res) => {
  try{
    const {idcategoria, descripcion, fotografia, estado, precio} = req.body;

    const [idgenerado] = await db("activos").insert({ 
      idcategoria, descripcion, fotografia, estado, precio
     });
    
    return res.status(201).json({
      success: true,
      message: 'Activo creada correctamente',
      data: { id: idgenerado }
    })
  }catch(err){
    console.error("Error al crear Activo", err);
    return res
      .status(500)
      .json({ success: false, message: "Error al crear Activo"})
  }
};

const actualizarActivo = async (req, res) => {
  try{
    const { id } = req.params;

    const {idcategoria, descripcion, fotografia, estado, precio} = req.body;
      
    const filasAfectadas = await db('activos').where({id}).update({
      idcategoria, descripcion, fotografia, estado, precio
    });

    if(!filasAfectadas) {
      return res
      .status(404)
      .json({ success: false, message: "La Activo no existe" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Registro actualizado", data: filasAfectadas });

  }catch(err){
    console.error("Error al crear Activo", err);
    return res
      .status(500)
      .json({ success: false, message: "Error al actualizar Activo"})
  }
};

const eliminarActivo = async (req, res) => {
  try{
    const { id } = req.params;
    const filasAfectadas = await db("activos").where({id}).del();

    if(!filasAfectadas){
      return res
      .status(404)
      .json({ success: false, message: "Error al eliminar Activo"});
    }

    return res
      .status(200)
      .json({ success: true, message: "Activo eliminado", data: filasAfectadas });
  }catch(err){
    console.error("Error al crear Activo", err);
    return res
      .status(500)
      .json({ success: false, message: "Error al eliminar Activo"})
  }
};

// Estas acciones son necesarias para las rutas
module.exports = {
  obtenerActivos,
  obtenerActivoPorId,
  crearActivo,
  actualizarActivo,
  eliminarActivo
}