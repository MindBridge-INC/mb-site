var express = require("express");
var router = express.Router();

var crudLimitesController = require("../controllers/crudLimitesController");

router.put("/editar", function (req, res) {
    crudLimitesController.editar(req, res);
});

router.get("/visualizar/:idInst", function(req, res) {
    crudLimitesController.visualizar(req, res);
})
module.exports = router;