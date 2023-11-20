var relatorioModel = require("../models/relatorioModel");
function mostrarNomeInstituicao(req, res) {
    var idInstituicao = req.params.idInstituicao;

    relatorioModel.mostrarNomeInstituicao(idInstituicao)
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

    relatorioModel.mostrarNumMaquinasArmazenamento80(idInstituicao)
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

function mostrarMaquinasCPULimite(req, res) {
    var idInstituicao = req.params.idInstituicao;

    relatorioModel.mostrarMaquinasCPULimite(idInstituicao)
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

function mostrarMaquinasRAMLimite(req, res) {
    var idInstituicao = req.params.idInstituicao;

    relatorioModel.mostrarMaquinasRAMLimite(idInstituicao)
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

function visualizarAlertas(req, res) {
    var idInstituicao = req.params.idInstituicao;

    relatorioModel.visualizarAlertas(idInstituicao)
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

function visualizarAlertasArm(req, res) {
    var idInstituicao = req.params.idInstituicao;

    relatorioModel.visualizarAlertasArm(idInstituicao)
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
    mostrarNumMaquinasArmazenamento80,
    mostrarNomeInstituicao,
    mostrarMaquinasCPULimite,
    mostrarMaquinasRAMLimite,
    visualizarAlertas,
    visualizarAlertasArm,

}