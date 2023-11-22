var database = require("../database/config")

function listarSalas(idInstituicao) {
    var instrucao = `select id, nome from Sala where fkInstituicao = ${idInstituicao} and statSist = 1; `

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


function listarMaquinas(idInstituicao) {
    var instrucao = `select id, hostname from Maquinas where fkSala = ${idInstituicao} and statSist = 1; `

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function exibirInfoMaquina(idInstituicao) {
    var instrucao = `select * from Maquinas where Maquinas.id = ${idInstituicao}; `

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function exibirAlertasDia(idMaquina, idInstituicao) {
    var instrucao = `SELECT COUNT(AlertasLog.id) AS total
            FROM AlertasLog
            JOIN LogAcesso ON AlertasLog.fkLogAcesso = LogAcesso.id
            JOIN Maquinas ON LogAcesso.fkMaquina = Maquinas.id
            WHERE  date(LogAcesso.dtInicializacao) = current_date()
            AND Maquinas.fkInstituicao = ${idInstituicao} and Maquinas.id = ${idMaquina}; `

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function exibirAlertasDia2(idMaquina, idInstituicao) {
    var instrucao = `SELECT COUNT(Alertas.id) AS total
                FROM Alertas
                JOIN RegistroMaquina ON Alertas.fkRegistro = RegistroMaquina.id
                JOIN Maquinas ON RegistroMaquina.fkMaquinas = Maquinas.id
                WHERE  date(RegistroMaquina.dtRegistro) = current_date()
                AND Maquinas.fkInstituicao = ${idInstituicao} and Maquinas.id = ${idMaquina} `

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function plotarGraficoArmazenamento(idMaquina) {
    var instrucao = `SELECT armUsado
                    FROM LogAcesso
                    WHERE fkMaquina = ${idMaquina}
                    ORDER BY dtInicializacao DESC
                    LIMIT 1 ; `

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function plotarGraficoCPU(idMaquina) {
    var instrucao = `SELECT usoProcessador, dtRegistro
    FROM RegistroMaquina
    WHERE fkMaquinas = ${idMaquina}
    ORDER BY dtRegistro DESC
    LIMIT 10;`

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function plotarGraficoRAM(idMaquina) {
    var instrucao = `SELECT usoRam, dtRegistro
    FROM RegistroMaquina
    WHERE fkMaquinas = ${idMaquina}
    ORDER BY dtRegistro DESC
    LIMIT 10;`

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
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
};