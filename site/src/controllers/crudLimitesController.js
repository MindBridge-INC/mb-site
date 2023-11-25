var crudLimitesModel = require("../models/crudLimitesModel");


function editar(req, res) {
    var valorCPU = req.body.CPUServer;
    var valorRAM = req.body.RAMServer;
    var valorDisco = req.body.discoServer;
    var idInst = req.body.idInst;

    if (valorCPU == undefined) {
        res.status(400).send("valorCPU está undefined!");
        console.log("CPU esta undefined")
    } else if (valorRAM == undefined) {
        res.status(400).send("valorRAM está undefined!");
        console.log("RAM esta undefined")
    }else if (valorDisco == undefined) {
        console.log("disco esta undefined")
        res.status(400).send("valorDisco está undefined!");
    } else if (idInst == undefined) {
        console.log("idinst esta undefined")
        res.status(400).send("idinst está undefined!");
    } else {
        crudLimitesModel.editar(valorCPU, valorRAM, valorDisco, idInst)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao realizar a edição dos Limtes! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
        console.log("OIIITHAISASASJKAJSKASJAKSJAKSJKAJSKAJSAJS")
    }
    
}

function visualizar(req, res) {
    var idInst = req.params.idInst;

    crudLimitesModel.visualizar(idInst)
        .then(
            function (resultado) {
                if (resultado.length > 0) {
                    res.status(200).json(resultado);
                } else {
                    res.status(204).send("Nenhum resultado encontrado!");
                }
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "Houve um erro ao buscar os avisos: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

module.exports = {
    editar,
    visualizar
}