var express = require("express");
var router = express.Router();

var crudLimitesController = require("../controllers/crudLimitesController");


router.put("/editar/:IdInstituicao", function (req, res) {
    
    crudLimitesController.editar(req, res);
   console.log("entrei no routessssss")
});

router.get("/visualizar/:idInst", function(req, res) {
    crudLimitesController.visualizar(req, res);
})
module.exports = router;