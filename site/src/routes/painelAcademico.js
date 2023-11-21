var express = require("express");
var router = express.Router();

var painelAcademicoController = require("../controllers/painelAcademicoController");

router.get("/listarTurmas/:idInstituicao", function (req, res) {
    painelAcademicoController.listarTurmas(req, res);
})

router.get("/exibirAlunosMatriculados/:idTurma", function (req, res) {
    painelAcademicoController.exibirAlunosMatriculados(req, res);
})

router.get("/exibirRanking/:idInstituicao", function (req, res) {
    painelAcademicoController.exibirRanking(req, res);
})

router.get("/exibirPontuacaoMedia/:idTurma", function (req, res) {
    painelAcademicoController.exibirPontuacaoMedia(req, res);
})

router.get("/plotarPicosHoje/:idTurma", function (req, res) {
    painelAcademicoController.plotarPicosHoje(req, res);
})

router.get("/plotarPicosSemana/:idTurma", function (req, res) {
    painelAcademicoController.plotarPicosSemana(req, res);
})

router.get("/visualizarAlunosTurma/:idTurma", function (req, res) {
    painelAcademicoController.visualizarAlunosTurma(req, res);
})


module.exports = router;