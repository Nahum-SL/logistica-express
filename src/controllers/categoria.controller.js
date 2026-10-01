// Acceso a la BD
const db = require('../database/db');

// En este archivo solo se crean metodos JS
// No se definen las rutas ni los verbos (POST, GET ...)

const obtenerCategorias = async (req, res) => {
  try{
    // Consulta
    const categorias = await db('categorias').select("*");
    return res.status(200).json({ success: true, data: categorias})
    
  }catch (err){
    console.error("Error al leer categorias: ", err);
    return res
      .status(500)
      .json({ success: false, message: "Error al leer categorias" });
  }
};

const obtenerCategoriaPorId = async (req, res) => {
  try{
    const { id } = req.params;
    
    const categoria = await db('categorias').where({ id }).first();

    if(!categoria) {
      return res.status(404).json({ success: false, message: "No existe esta categoria"})
    }
    
    return res
      .status(200)
      .json({ success: true, data: categoria });

  }catch(err){
    console.error("No se pudo ejecutar la busqueda: ", err);
    return res
      .status(500)
      .json({ success: false, message: "No se pudo ejecutar la busqueda" });
  }
};

const crearCategoria = async (req, res) => {
  try{
    const { categoria } = req.body;

    if (!categoria) {
      return res
        .status(400)
        .json({ success: false, message: "El campo categoria es obligatorio"});
    }
    
    const [idgenerado] = await db("categorias").insert({ categoria });
    
    return res.status(201).json({
      success: true,
      message: 'Categoria creada correctamente',
      data: { id: idgenerado }
    })
  }catch(err){
    console.error("Error al crear categoria", err);
    return res
      .status(500)
      .json({ success: false, message: "Error al crear categoria"})
  }
};

const actualizarCategoria = async (req, res) => {
  try{
    const { id } = req.params;

    const {categoria} = req.body;

    if(!categoria) {
      return res
      .status(400)
      .json({ success: false, message: "El campo categoria es obligatorio"})
    }

    const filasAfectadas = await db('categorias').where({id}).update({categoria});

    if(!filasAfectadas) {
      return res
      .status(404)
      .json({ success: false, message: "La categoria no existe" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Registro actualizado", data: filasAfectadas });

  }catch(err){
    console.error("Error al crear categoria", err);
    return res
      .status(500)
      .json({ success: false, message: "Error al actualizar categoria"})
  }
};

const eliminarCategoria = async (req, res) => {
  try{
    const { id } = req.params;
    const filasAfectadas = await db("categorias").where({id}).del();

    if(!filasAfectadas){
      return res
      .status(404)
      .json({ success: false, message: "Error al eliminar categoria"});
    }

    return res
      .status(200)
      .json({ success: true, message: "Categoria eliminado", data: filasAfectadas });
  }catch(err){
    console.error("Error al crear categoria", err);
    return res
      .status(500)
      .json({ success: false, message: "Error al eliminar categoria"})
  }
};

// Estas acciones son necesarias para las rutas
module.exports = {
  obtenerCategorias,
  obtenerCategoriaPorId,
  crearCategoria,
  actualizarCategoria,
  eliminarCategoria
}