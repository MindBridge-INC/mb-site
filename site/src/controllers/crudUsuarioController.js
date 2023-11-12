var crudUsuarioModel = require("../models/crudUsuarioModel");

function listarUsuario(req, res) {
    var idInst = req.params.idInst;

    crudUsuarioModel.listarUsuario(idInst)
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

function cadastrar(req, res) {
    var nome = req.body.nomeServer;
    var sobrenome = req.body.sobrenomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var tipo = req.body.tipoServer;
    var idInst = req.body.idInstServer;

    if (nome == undefined) {
        res.status(400).send("Nome está undefined!");
    } else if (sobrenome == undefined) {
        res.status(400).send("sobrenome está undefined!");
    } else if (email == undefined){
        res.status(400).send("email está undefined!");
    } else if(senha == undefined){
        res.status(400).send("senha está undefined!")
    } else if(tipo = undefined){
        res.status(400).send(" tipo está undefined!")
    } else if (idInst == undefined) {
        res.status(400).send("idInst está undefined!");
    }

    crudUsuarioModel.cadastrar(nome, sobrenome, email, senha, tipo, idInst)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao realizar o cadastro da sala! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}


function trazerDados(req, res) {
    var idUsuario = req.params.idUsuario;

    crudUsuarioModel.trazerDados(idUsuario)
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

function editar(req, res) {
    var nome = req.body.nomeServer;
    var sobrenome = req.body.sobrenomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var tipo = req.tipoServer;

    
    if (nome == undefined) {
        res.status(400).send("Nome está undefined!");
    } else if (sobrenome == undefined) {
        res.status(400).send("sobrenome está undefined!");
    } else if(email == undefined){
        res.status(400).send(" email está undefined!");
    } else if (senha == undefined){
        res.status(400).send("senha está undefined!");
    } else if (tipo == undefined){
        res.status(400).send("tipo está undefined!");
    }

    crudUsuarioModel.editar(nome, sobrenome,email,senha,tipo)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao realizar o cadastro da Sala! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

module.exports = {
    listarUsuario,
    cadastrar,
    trazerDados,
    editar
}