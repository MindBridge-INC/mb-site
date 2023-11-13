var express = require("express");
var router = express.Router();

var crudUsuarioController = require("../controllers/crudUsuarioController");

// router.get("/listarTurmas/:idInst", function (req, res) {
//     crudUsuarioController.listarTurmas(req, res);
// })

router.get("/visualizar/:idInst", function (req, res) {
    crudUsuarioController.visualizar(req, res);
})
router.get("/trazerDados/:idUsuarioInst", function(req, res) {
    crudUsuarioController.trazerDados(req, res);
})
router.post("/cadastrar/", function (req, res) {
    crudUsuarioController.cadastrar(req, res);
})
router.put("/editar", function (req, res) {
    crudUsuarioController.editar(req, res);
});

module.exports = router;