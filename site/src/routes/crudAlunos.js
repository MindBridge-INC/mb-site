var express = require("express");
var router = express.Router();

var crudAlunosController = require("../controllers/crudAlunosController");

router.get("/listarTurmas/:idInst", function (req, res) {
    crudAlunosController.listarTurmas(req, res);
})

router.get("/visualizar/:idTurma", function (req, res) {
    crudAlunosController.visualizar(req, res);
})
router.get("/trazerDados/:idAluno", function(req, res) {
    crudAlunosController.trazerDados(req, res);
})
router.post("/cadastrar/", function (req, res) {
    crudAlunosController.cadastrar(req, res);
})
router.put("/editar", function (req, res) {
    crudAlunosController.editar(req, res);
});

module.exports = router;