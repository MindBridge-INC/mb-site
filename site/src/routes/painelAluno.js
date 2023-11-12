var express = require("express");
var router = express.Router();

var painelAlunoController = require("../controllers/painelAlunoController");

router.get("/listarMensagens/:idTurma", function (req, res) {
    painelAlunoController.listarMensagens(req, res);
})

router.post("/enviarMensagem/", function (req, res) {
    painelAlunoController.enviarMensagem(req, res);
})

// router.get("/visualizar/:idTurma", function (req, res) {
//     painelAlunoController.visualizar(req, res);
// })
// router.get("/trazerDados/:idAluno", function(req, res) {
//     painelAlunoController.trazerDados(req, res);
// })
// router.post("/cadastrar/", function (req, res) {
//     painelAlunoController.cadastrar(req, res);
// })
// router.put("/editar", function (req, res) {
//     painelAlunoController.editar(req, res);
// });

module.exports = router;