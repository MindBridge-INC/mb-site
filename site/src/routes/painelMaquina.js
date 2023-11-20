var express = require("express");
var router = express.Router();

var painelMaquinaController = require("../controllers/painelMaquinaController");

router.get("/listarSalas/:idInstituicao", function (req, res) {
    painelMaquinaController.listarSalas(req, res);
})


router.get("/listarMaquinas/:idInstituicao", function (req, res) {
    painelMaquinaController.listarMaquinas(req, res);
})

router.get("/exibirInfoMaquina/:idInstituicao", function (req, res) {
    painelMaquinaController.exibirInfoMaquina(req, res);
})

router.get("/exibirAlertasDia/:idMaquina/:idInstituicao", function (req, res) {
    painelMaquinaController.exibirAlertasDia(req, res);
});

router.get("/exibirAlertasDia2/:idMaquina/:idInstituicao", function (req, res) {
    painelMaquinaController.exibirAlertasDia2(req, res);
});

router.get("/plotarGraficoArmazenamento/:idMaquina", function (req, res) {
    painelMaquinaController.plotarGraficoArmazenamento(req, res);
});

router.get("/plotarGraficoCPU/:idMaquina", function (req, res) {
    painelMaquinaController.plotarGraficoCPU(req, res);
});

router.get("/plotarGraficoRAM/:idMaquina", function (req, res) {
    painelMaquinaController.plotarGraficoRAM(req, res);
});

module.exports = router;