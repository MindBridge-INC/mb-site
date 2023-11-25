var database = require("../database/config")

function listarSalas(idInstituicao) {
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        var instrucao = `select id, nome from Sala where fkInstituicao = ${idInstituicao} and statSist = 1; `
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        var instrucao = `select id, nome from Sala where fkInstituicao = ${idInstituicao} and statSist = 1; `
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        reject("AMBIENTE NÃO CONFIGURADO EM app.js")
    }
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


function listarMaquinas(idInstituicao) {
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        var instrucao = `select id, hostname from Maquinas where fkSala = ${idInstituicao} and statSist = 1; `
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        var instrucao = `select id, hostname from Maquinas where fkSala = ${idInstituicao} and statSist = 1; `
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        reject("AMBIENTE NÃO CONFIGURADO EM app.js")
    }

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function exibirInfoMaquina(idInstituicao) {
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        var instrucao = `select * from Maquinas where Maquinas.id = ${idInstituicao}; `
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        var instrucao = `select * from Maquinas where Maquinas.id = ${idInstituicao}; `
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        reject("AMBIENTE NÃO CONFIGURADO EM app.js")
    }

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function exibirAlertasDia(idMaquina, idInstituicao) {
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        var instrucao = `SELECT COUNT(AlertasLog.id) AS total
                FROM AlertasLog
                JOIN LogAcesso ON AlertasLog.fkLogAcesso = LogAcesso.id
                JOIN Maquinas ON LogAcesso.fkMaquina = Maquinas.id
                WHERE CONVERT(varchar, LogAcesso.dtInicializacao, 103) = CONVERT(varchar, getDate(), 103)
                AND Maquinas.fkInstituicao = ${idInstituicao} and Maquinas.id = ${idMaquina}; `
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        var instrucao = `SELECT COUNT(AlertasLog.id) AS total
                FROM AlertasLog
                JOIN LogAcesso ON AlertasLog.fkLogAcesso = LogAcesso.id
                JOIN Maquinas ON LogAcesso.fkMaquina = Maquinas.id
                WHERE  date(LogAcesso.dtInicializacao) = current_date()
                AND Maquinas.fkInstituicao = ${idInstituicao} and Maquinas.id = ${idMaquina}; `
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        reject("AMBIENTE NÃO CONFIGURADO EM app.js")
    }

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function exibirAlertasDia2(idMaquina, idInstituicao) {
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        var instrucao = `SELECT COUNT(Alertas.id) AS total
        FROM Alertas
        JOIN RegistroMaquina ON Alertas.fkRegistro = RegistroMaquina.id
        JOIN Maquinas ON RegistroMaquina.fkMaquinas = Maquinas.id
        WHERE CONVERT(varchar, RegistroMaquina.dtRegistro, 103) = CONVERT(varchar, getDate(), 103)
        AND Maquinas.fkInstituicao = ${idInstituicao} and Maquinas.id = ${idMaquina} `
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        var instrucao = `SELECT COUNT(Alertas.id) AS total
                    FROM Alertas
                    JOIN RegistroMaquina ON Alertas.fkRegistro = RegistroMaquina.id
                    JOIN Maquinas ON RegistroMaquina.fkMaquinas = Maquinas.id
                    WHERE DATE(RegistroMaquina.dtRegistro) = DATE(current_timestamp())
                    AND Maquinas.fkInstituicao = ${idInstituicao} and Maquinas.id = ${idMaquina} `
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        reject("AMBIENTE NÃO CONFIGURADO EM app.js")
    }

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function plotarGraficoArmazenamento(idMaquina) {
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        var instrucao = `SELECT TOP 1 armUsado
                        FROM LogAcesso
                        WHERE fkMaquina = ${idMaquina}
                        ORDER BY dtInicializacao DESC
                        `
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        var instrucao = `SELECT armUsado
                        FROM LogAcesso
                        WHERE fkMaquina = ${idMaquina}
                        ORDER BY dtInicializacao DESC
                        LIMIT 1 ; `    
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        reject("AMBIENTE NÃO CONFIGURADO EM app.js")
    }

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function plotarGraficoCPU(idMaquina) {
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        var instrucao = `SELECT TOP 10 usoProcessador, dtRegistro
        FROM RegistroMaquina
        WHERE fkMaquinas = ${idMaquina}
        ORDER BY dtRegistro`
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        var instrucao = `SELECT usoProcessador, dtRegistro
        FROM RegistroMaquina
        WHERE fkMaquinas = ${idMaquina}
        ORDER BY dtRegistro
        LIMIT 10;`
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        reject("AMBIENTE NÃO CONFIGURADO EM app.js")
    }

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function plotarGraficoRAM(idMaquina) {
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        var instrucao = `SELECT TOP 10 usoRam, dtRegistro
        FROM RegistroMaquina
        WHERE fkMaquinas = ${idMaquina}
        ORDER BY dtRegistro`
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        var instrucao = `SELECT usoRam, dtRegistro
        FROM RegistroMaquina
        WHERE fkMaquinas = ${idMaquina}
        ORDER BY dtRegistro
        LIMIT 10;`
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        reject("AMBIENTE NÃO CONFIGURADO EM app.js")
    }

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