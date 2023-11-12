var express = require("express");
var router = express.Router();

var crudUsuarioController = require("..controllers/crudUsuarioController");

router.get("/listarUsuario/:idInst", function (req, res) {
    crudUsuarioController.listarUsuario(req, res);
})

router.get("/trazerDados/:idUsuario", function(req, res) {
    crudUsuarioController.trazerDados(req, res);
})
router.post("/cadastrar/", function (req, res) {
    crudUsuarioController.cadastrar(req, res);
})
router.put("/editar", function (req, res) {
    crudUsuarioController.editar(req, res);
});

module.exports = router;