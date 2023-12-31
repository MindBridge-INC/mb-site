var express = require("express");
var router = express.Router();

var painelTecnicoController = require("../controllers/painelTecnicoController");

router.get("/gerarAlertas/:idInstituicao", function (req, res) {
    painelTecnicoController.gerarAlertas(req, res);
})

router.get("/gerarAlertasArm/:idInstituicao", function (req, res) {
    painelTecnicoController.gerarAlertasArm(req, res);
})

router.get("/mostrarMaquinasCadastradas/:idInstituicao", function (req, res) {
    painelTecnicoController.mostrarMaquinasCadastradas(req, res);
})

router.get("/mostrarMaquinasLigadas/:idInstituicao", function (req, res) {
    painelTecnicoController.mostrarMaquinasLigadas(req, res);
})

router.get("/mostrarMaquinasDesligadas/:idInstituicao", function (req, res) {
    painelTecnicoController.mostrarMaquinasDesligadas(req, res);
})

router.get("/mostrarAlertasDiaArm/:idInstituicao", function (req, res) {
    painelTecnicoController.mostrarAlertasDiaArm(req, res);
})

router.get("/mostrarAlertasDiaTotal/:idInstituicao", function (req, res) {
    painelTecnicoController.mostrarAlertasDiaTotal(req, res);
})

router.get("/mostrarNumMaquinasArmazenamento80/:idInstituicao", function (req, res) {
    painelTecnicoController.mostrarNumMaquinasArmazenamento80(req, res);
})

router.get("/plotarGraficoCPU/:idInstituicao", function (req, res) {
    painelTecnicoController.plotarGraficoCPU(req, res);
})

router.get("/plotarGraficoRAM/:idInstituicao", function (req, res) {
    painelTecnicoController.plotarGraficoRAM(req, res);
})
module.exports = router;