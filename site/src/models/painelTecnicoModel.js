var database = require("../database/config")

function gerarAlertas(idInstituicao) {
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        var instrucao = `SELECT TOP 1
        Alertas.componente,
        Alertas.tipo,
        RegistroMaquina.dtRegistro,
        Maquinas.hostname,
        Sala.nome
    FROM
        Alertas
    JOIN
        RegistroMaquina ON Alertas.fkRegistro = RegistroMaquina.id
    JOIN
        Maquinas ON RegistroMaquina.fkMaquinas = Maquinas.id
    LEFT JOIN
        Sala ON Maquinas.fkSala = Sala.id
    WHERE
        Maquinas.fkInstituicao = ${idInstituicao}
    ORDER BY
        RegistroMaquina.dtRegistro DESC; `
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        var instrucao = `SELECT
        Alertas.componente,
        Alertas.tipo,
        RegistroMaquina.dtRegistro,
        Maquinas.hostname,
        Sala.nome
    FROM
        Alertas
    JOIN
        RegistroMaquina ON Alertas.fkRegistro = RegistroMaquina.id
    JOIN
        Maquinas ON RegistroMaquina.fkMaquinas = Maquinas.id
    LEFT JOIN
        Sala ON Maquinas.fkSala = Sala.id
    WHERE
        Maquinas.fkInstituicao = ${idInstituicao}
    ORDER BY
        RegistroMaquina.dtRegistro DESC
    LIMIT 1; `
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        reject("AMBIENTE NÃO CONFIGURADO EM app.js")
    }

    // console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function gerarAlertasArm(idInstituicao) {
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        var instrucao = `SELECT TOP 1
        AlertasLog.componente,
        AlertasLog.tipo,
        LogAcesso.dtRegistro,
        Maquinas.hostname,
        Sala.nome
    FROM
        AlertasLog
    JOIN
        LogAcesso ON AlertasLog.fkLogAcesso = LogAcesso.id
    JOIN
        Maquinas ON LogAcesso.fkMaquina = Maquinas.id
    LEFT JOIN
        Sala ON Maquinas.fkSala = Sala.id
    WHERE
        Maquinas.fkInstituicao = ${idInstituicao}
    ORDER BY
        LogAcesso.dtRegistro DESC; `
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        var instrucao = `SELECT
        AlertasLog.componente,
        AlertasLog.tipo,
        LogAcesso.dtRegistro,
        Maquinas.hostname,
        Sala.nome
    FROM
        AlertasLog
    JOIN
        LogAcesso ON AlertasLog.fkLogAcesso = LogAcesso.id
    JOIN
        Maquinas ON LogAcesso.fkMaquina = Maquinas.id
    LEFT JOIN
        Sala ON Maquinas.fkSala = Sala.id
    WHERE
        Maquinas.fkInstituicao = ${idInstituicao}
    ORDER BY
        LogAcesso.dtRegistro DESC
    LIMIT 1;`
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        reject("AMBIENTE NÃO CONFIGURADO EM app.js")
    }

    // console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


function mostrarMaquinasCadastradas(idInstituicao) {
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        var instrucao = `SELECT COUNT(id) numMaquinas FROM Maquinas 
        WHERE fkInstituicao = ${idInstituicao}; `
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        var instrucao = `SELECT COUNT(id) numMaquinas FROM Maquinas 
        WHERE fkInstituicao = ${idInstituicao}; `
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        reject("AMBIENTE NÃO CONFIGURADO EM app.js")
    }

    // console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function mostrarMaquinasLigadas(idInstituicao) {
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        var instrucao = `
            SELECT count(LogAcesso.fkMaquina) numAtivas FROM LogAcesso
            JOIN Maquinas on Maquinas.id = LogAcesso.fkMaquina
            WHERE DATEDIFF(DAY, LogAcesso.dtInicializacao, getDate()) > 7 
            AND Maquinas.fkInstituicao = ${idInstituicao};
`
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        var instrucao = `SELECT count(LogAcesso.fkMaquina) numAtivas FROM LogAcesso 
            JOIN Maquinas on Maquinas.id = LogAcesso.fkMaquina 
            WHERE DATEDIFF(DATE(CURRENT_TIMESTAMP), DATE(LogAcesso.dtInicializacao)) > 7 AND Maquinas.fkInstituicao = ${idInstituicao}; `
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        reject("AMBIENTE NÃO CONFIGURADO EM app.js")
    }

    //console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function mostrarMaquinasDesligadas(idInstituicao) {
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        var instrucao = `SELECT count(LogAcesso.fkMaquina) numDesligadas FROM LogAcesso
            JOIN Maquinas on Maquinas.id = LogAcesso.fkMaquina
            WHERE DATEDIFF(DAY, LogAcesso.dtRegistro, getDate()) > 7 
            AND Maquinas.fkInstituicao = 1; `
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        var instrucao = `SELECT count(LogAcesso.fkMaquina) numDesligadas FROM LogAcesso 
            JOIN Maquinas on Maquinas.id = LogAcesso.fkMaquina 
            WHERE DATEDIFF(DATE(CURRENT_TIMESTAMP), DATE(LogAcesso.dtRegistro)) > 7 AND Maquinas.fkInstituicao = ${idInstituicao}; `
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        reject("AMBIENTE NÃO CONFIGURADO EM app.js")
    }

    // console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function mostrarAlertasDiaArm(idInstituicao) {
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        var instrucao = `SELECT COUNT(AlertasLog.id) AS total
        FROM AlertasLog
        INNER JOIN LogAcesso ON AlertasLog.fkLogAcesso = LogAcesso.id
        INNER JOIN Maquinas ON LogAcesso.fkMaquina = Maquinas.id
        WHERE CAST(LogAcesso.dtRegistro AS DATE) = CAST(GETDATE() AS DATE)
        AND Maquinas.fkInstituicao = ${idInstituicao}; `
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        var instrucao = `SELECT COUNT(AlertasLog.id) AS total
            FROM AlertasLog
            JOIN LogAcesso ON AlertasLog.fkLogAcesso = LogAcesso.id
            JOIN Maquinas ON LogAcesso.fkMaquina = Maquinas.id
            WHERE  date(LogAcesso.dtRegistro) = current_date()
            AND Maquinas.fkInstituicao = ${idInstituicao}; `
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        reject("AMBIENTE NÃO CONFIGURADO EM app.js")
    }
    // console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function mostrarAlertasDiaTotal(idInstituicao) {
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        var instrucao = ` SELECT COUNT(Alertas.id) AS total
        FROM Alertas
        JOIN RegistroMaquina ON Alertas.fkRegistro = RegistroMaquina.id
        JOIN Maquinas ON RegistroMaquina.fkMaquinas = Maquinas.id
        WHERE CAST(RegistroMaquina.dtRegistro AS DATE) = CAST(GETDATE() AS DATE)
              AND Maquinas.fkInstituicao = ${idInstituicao}
            `
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        var instrucao = `SELECT COUNT(Alertas.id) AS total
            FROM Alertas
            JOIN RegistroMaquina ON Alertas.fkRegistro = RegistroMaquina.id
            JOIN Maquinas ON RegistroMaquina.fkMaquinas = Maquinas.id
            WHERE date(RegistroMaquina.dtRegistro) = current_date()
            AND Maquinas.fkInstituicao = ${idInstituicao}; `
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        reject("AMBIENTE NÃO CONFIGURADO EM app.js")
    }

    // console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// Hoje -> Todos os tempos
function mostrarNumMaquinasArmazenamento80(idInstituicao) {
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        var instrucao = `SELECT COUNT(DISTINCT Maquinas.id) AS total
            FROM AlertasLog
            JOIN LogAcesso ON AlertasLog.fkLogAcesso = LogAcesso.id
            JOIN Maquinas ON LogAcesso.fkMaquina = Maquinas.id
            WHERE Maquinas.fkInstituicao = ${idInstituicao}; `

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        var instrucao = `SELECT COUNT(DISTINCT Maquinas.id) AS total
            FROM AlertasLog
            JOIN LogAcesso ON AlertasLog.fkLogAcesso = LogAcesso.id
            JOIN Maquinas ON LogAcesso.fkMaquina = Maquinas.id
            WHERE Maquinas.fkInstituicao = ${idInstituicao}; `
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        reject("AMBIENTE NÃO CONFIGURADO EM app.js")
    }

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}
//convert(varchar, RegistroMaquina.dtRegistro, 103)
function plotarGraficoCPU(idInstituicao) {
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        var instrucao = `SELECT CONVERT(DATE, RegistroMaquina.dtRegistro) AS dtRegistro,
        COUNT(DISTINCT Maquinas.id) AS total
        FROM Alertas
        JOIN RegistroMaquina ON Alertas.fkRegistro = RegistroMaquina.id
        JOIN Maquinas ON RegistroMaquina.fkMaquinas = Maquinas.id
        WHERE CAST(RegistroMaquina.dtRegistro AS DATE) >= CAST(GETDATE() - 7 AS DATE)
       AND Alertas.componente = 'CPU'
       AND Maquinas.fkInstituicao = ${idInstituicao} 
        GROUP BY CONVERT(DATE, RegistroMaquina.dtRegistro)
        ORDER BY CONVERT(DATE, RegistroMaquina.dtRegistro)
            `

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        var instrucao = `SELECT DATE(RegistroMaquina.dtRegistro) AS dtRegistro,
        COUNT(DISTINCT Maquinas.id) AS total
        FROM Alertas
        JOIN RegistroMaquina ON Alertas.fkRegistro = RegistroMaquina.id
        JOIN Maquinas ON RegistroMaquina.fkMaquinas = Maquinas.id
         WHERE RegistroMaquina.dtRegistro >= CURRENT_DATE - INTERVAL 7 DAY
        AND Alertas.componente = 'CPU'
        AND Maquinas.fkInstituicao = ${idInstituicao}
        GROUP BY dtRegistro
        ORDER BY dtRegistro
        LIMIT 7;  `
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        reject("AMBIENTE NÃO CONFIGURADO EM app.js")
    }

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function plotarGraficoRAM(idInstituicao) {
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        var instrucao = `SELECT CONVERT(DATE, RegistroMaquina.dtRegistro) AS dtRegistro,
        COUNT(DISTINCT Maquinas.id) AS total
        FROM Alertas
        JOIN RegistroMaquina ON Alertas.fkRegistro = RegistroMaquina.id
        JOIN Maquinas ON RegistroMaquina.fkMaquinas = Maquinas.id
        WHERE CAST(RegistroMaquina.dtRegistro AS DATE) >= CAST(GETDATE() - 7 AS DATE)
        AND Alertas.componente = 'RAM'
        AND Maquinas.fkInstituicao = ${idInstituicao}
        GROUP BY CONVERT(DATE, RegistroMaquina.dtRegistro)
        ORDER BY CONVERT(DATE, RegistroMaquina.dtRegistro)
            `
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        var instrucao = `SELECT DATE(RegistroMaquina.dtRegistro) AS dtRegistro,
        COUNT(DISTINCT Maquinas.id) AS total
        FROM Alertas
        JOIN RegistroMaquina ON Alertas.fkRegistro = RegistroMaquina.id
        JOIN Maquinas ON RegistroMaquina.fkMaquinas = Maquinas.id
        WHERE RegistroMaquina.dtRegistro >= CURRENT_DATE - INTERVAL 7 DAY
        AND Alertas.componente = 'RAM'
        AND Maquinas.fkInstituicao = ${idInstituicao}
        GROUP BY dtRegistro
        ORDER BY dtRegistro
        LIMIT 7; `
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        reject("AMBIENTE NÃO CONFIGURADO EM app.js")
    }
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    gerarAlertas,
    gerarAlertasArm,
    mostrarMaquinasCadastradas,
    mostrarMaquinasLigadas,
    mostrarMaquinasDesligadas,
    mostrarAlertasDiaArm,
    mostrarAlertasDiaTotal,
    mostrarNumMaquinasArmazenamento80,
    plotarGraficoCPU,
    plotarGraficoRAM,

};