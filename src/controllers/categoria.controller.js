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

const obtenerCategoriaPorId = async (req, res) => {};

const crearCategoria = async (req, res) => {};

const actualizarCategoria = async (req, res) => {};

const eliminarCategoria = async (req, res) => {};

// Estas acciones son necesarias para las rutas
module.exports = {
  obtenerCategorias,
  obtenerCategoriaPorId,
  crearCategoria,
  actualizarCategoria,
  eliminarCategoria
}