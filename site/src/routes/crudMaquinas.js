var express = require("express");
var router = express.Router();

var crudMaquinasController = require("../controllers/crudMaquinasController");

router.get("/visualizarMaquinasTotal/:idInst", function (req, res) {
    crudMaquinasController.visualizarMaquinasTotal(req, res);
})

router.get("/visualizarMaquinas/:idSala", function (req, res) {
    crudMaquinasController.visualizarMaquinas(req, res);
})

router.get("/trazerDados/:idMaquina", function(req, res) {
    crudMaquinasController.trazerDados(req, res);
})

router.put("/editar", function (req, res) {
    crudMaquinasController.editar(req, res);
});

module.exports = router;