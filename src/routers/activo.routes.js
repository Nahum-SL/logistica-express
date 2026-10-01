const express = require('express');
const router = express.Router();
const activoController = require("../controllers/activo.controller");

// Endpoint
router.get('/', activoController.obtenerActivos);
router.get('/:id', activoController.obtenerActivoPorId);
router.post('/', activoController.crearActivo);
router.put('/:id', activoController.actualizarActivo);
router.delete('/:id', activoController.eliminarActivo);

module.exports = router;