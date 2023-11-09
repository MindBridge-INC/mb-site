var express = require("express");
var router = express.Router();

var crudSalaController = require("../controllers/crudSalaController");

router.get("/listarSala/:idInst", function (req, res) {
    crudSalaController.listarSala(req, res);
})

router.get("/trazerDados/:idSala", function(req, res) {
    crudSalaController.trazerDados(req, res);
})
router.post("/cadastrar/", function (req, res) {
    crudSalaController.cadastrar(req, res);
})
router.put("/editar", function (req, res) {
    crudSalaController.editar(req, res);
});

module.exports = router;