var painelMaquinaModel = require("../models/painelMaquinaModel");

function listarSalas(req, res) {
    var idInstituicao = req.params.idInstituicao;

    painelMaquinaModel.listarSalas(idInstituicao)
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

function listarMaquinas(req, res) {
    var idInstituicao = req.params.idInstituicao;

    painelMaquinaModel.listarMaquinas(idInstituicao)
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

function exibirInfoMaquina(req, res) {
    var idInstituicao = req.params.idInstituicao;

    painelMaquinaModel.exibirInfoMaquina(idInstituicao)
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

function exibirAlertasDia(req, res) {
    var idMaquina = req.params.idMaquina;
    var idInstituicao = req.params.idInstituicao;

    painelMaquinaModel.exibirAlertasDia(idMaquina, idInstituicao)
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

function exibirAlertasDia2(req, res) {
    var idMaquina = req.params.idMaquina;
    var idInstituicao = req.params.idInstituicao;

    painelMaquinaModel.exibirAlertasDia2(idMaquina, idInstituicao)
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

function plotarGraficoArmazenamento(req, res) {
    var idMaquina = req.params.idMaquina;

    painelMaquinaModel.plotarGraficoArmazenamento(idMaquina)
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

function plotarGraficoCPU(req, res) {
    var idMaquina = req.params.idMaquina;

    painelMaquinaModel.plotarGraficoCPU(idMaquina)
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

function plotarGraficoRAM(req, res) {
    var idMaquina = req.params.idMaquina;

    painelMaquinaModel.plotarGraficoRAM(idMaquina)
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
    listarSalas,
    listarMaquinas,
    exibirInfoMaquina,
    exibirAlertasDia,
    exibirAlertasDia2,
    plotarGraficoArmazenamento,
    plotarGraficoCPU,
    plotarGraficoRAM
}