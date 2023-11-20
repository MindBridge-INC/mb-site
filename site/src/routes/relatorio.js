var express = require("express");
var router = express.Router();

var relatorioController = require("../controllers/relatorioController");


router.get("/mostrarNumMaquinasArmazenamento80/:idInstituicao", function (req, res) {
    relatorioController.mostrarNumMaquinasArmazenamento80(req, res);
})

router.get("/mostrarNomeInstituicao/:idInstituicao", function (req, res) {
    relatorioController.mostrarNomeInstituicao(req, res);
})

router.get("/mostrarMaquinasCPULimite/:idInstituicao", function (req, res) {
    relatorioController.mostrarMaquinasCPULimite(req, res);
})

router.get("/mostrarMaquinasRAMLimite/:idInstituicao", function (req, res) {
    relatorioController.mostrarMaquinasRAMLimite(req, res);
})

router.get("/visualizarAlertas/:idInstituicao", function (req, res) {
    relatorioController.visualizarAlertas(req, res);
})

router.get("/visualizarAlertasArm/:idInstituicao", function (req, res) {
    relatorioController.visualizarAlertasArm(req, res);
})

module.exports = router;