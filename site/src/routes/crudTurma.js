var express = require("express");
var router = express.Router();

var crudTurmaController = require("../controllers/crudTurmaController");

router.get("/listarTurmas/:idInst", function (req, res) {
    crudTurmaController.listarTurmas(req, res);
})

router.get("/trazerDados/:idTurma", function(req, res) {
    crudTurmaController.trazerDados(req, res);
})
router.post("/cadastrar/", function (req, res) {
    crudTurmaController.cadastrar(req, res);
})
router.put("/editar", function (req, res) {
    crudTurmaController.editar(req, res);
});

module.exports = router;