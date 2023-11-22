var painelTecnicoModel = require("../models/painelTecnicoModel");

function mostrarMaquinasCadastradas(req, res) {
    var idInstituicao = req.params.idInstituicao;

    painelTecnicoModel.mostrarMaquinasCadastradas(idInstituicao)
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

function mostrarMaquinasLigadas(req, res) {
    var idInstituicao = req.params.idInstituicao;

    painelTecnicoModel.mostrarMaquinasLigadas(idInstituicao)
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
function mostrarMaquinasDesligadas(req, res) {
    var idInstituicao = req.params.idInstituicao;

    painelTecnicoModel.mostrarMaquinasDesligadas(idInstituicao)
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

function mostrarAlertasDiaArm(req, res) {
    var idInstituicao = req.params.idInstituicao;

    painelTecnicoModel.mostrarAlertasDiaArm(idInstituicao)
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

function mostrarAlertasDiaTotal(req, res) {
    var idInstituicao = req.params.idInstituicao;

    painelTecnicoModel.mostrarAlertasDiaTotal(idInstituicao)
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

function mostrarNumMaquinasArmazenamento80(req, res) {
    var idInstituicao = req.params.idInstituicao;

    painelTecnicoModel.mostrarNumMaquinasArmazenamento80(idInstituicao)
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
    var idInstituicao = req.params.idInstituicao;

    painelTecnicoModel.plotarGraficoCPU(idInstituicao)
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
    var idInstituicao = req.params.idInstituicao;

    painelTecnicoModel.plotarGraficoRAM(idInstituicao)
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
    mostrarMaquinasCadastradas,
    mostrarMaquinasLigadas,
    mostrarMaquinasDesligadas,
    mostrarAlertasDiaArm,
    mostrarAlertasDiaTotal,
    mostrarNumMaquinasArmazenamento80,
    plotarGraficoCPU,
    plotarGraficoRAM
}