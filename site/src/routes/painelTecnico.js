var express = require("express");
var router = express.Router();

var painelTecnicoController = require("../controllers/painelTecnicoController");

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

module.exports = router;