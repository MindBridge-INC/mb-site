var painelAlunoModel = require("../models/painelAlunoModel");

function listarMensagens(req, res) {
    var idTurma = req.params.idTurma;

    painelAlunoModel.listarMensagens(idTurma)
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

function enviarMensagem(req, res) {
    var mensagem = req.body.mensagemServer;
    var idAluno = req.body.idAlunoServer;

    if (mensagem == undefined) {
        res.status(400).send("A mensagem está indefinida!");
    } else if (idAluno == undefined) {
        res.status(400).send("O idAluno está indefinido!");
    } else {
        painelAlunoModel.enviarMensagem(mensagem, idAluno)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            )
            .catch(
                function (erro) {
                    console.log(erro);
                    console.log("Houve um erro ao enviar a mensagem: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function mostrarPontuacaoHoje(req, res) {
    var idUsuario = req.params.idUsuario;

    painelAlunoModel.mostrarPontuacaoHoje(idUsuario)
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

function mostrarPontuacaoSemana(req, res) {
    var idUsuario = req.params.idUsuario;

    painelAlunoModel.mostrarPontuacaoSemana(idUsuario)
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

function mostrarEstrelinhas(req, res) {
    var idUsuario = req.params.idUsuario;

    painelAlunoModel.mostrarEstrelinhas(idUsuario)
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

function plotarGrafico(req, res) {
    var idUsuario = req.params.idUsuario;

    painelAlunoModel.plotarGrafico(idUsuario)
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
    listarMensagens,
    enviarMensagem,
    mostrarPontuacaoHoje,
    mostrarPontuacaoSemana,
    mostrarEstrelinhas,
    plotarGrafico
}