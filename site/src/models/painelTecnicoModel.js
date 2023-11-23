var database = require("../database/config")

function mostrarMaquinasCadastradas(idInstituicao){
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
   
    console.log("Executando a instrução SQL: \n" + instrucao);
        return database.executar(instrucao);
    }

    function mostrarMaquinasLigadas(idInstituicao){
        if (process.env.AMBIENTE_PROCESSO == "producao") {
            var instrucao = `
            SELECT count(LogAcesso.fkMaquina) numAtivas FROM LogAcesso
            JOIN Maquinas on Maquinas.id = LogAcesso.fkMaquina
            WHERE DATEDIFF(DAY, convert(varchar, LogAcesso.dtInicializacao, 103), convert(varchar, getDate(), 103)) > 7 
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
        
        console.log("Executando a instrução SQL: \n" + instrucao);
            return database.executar(instrucao);
    }

    function mostrarMaquinasDesligadas(idInstituicao){
        if (process.env.AMBIENTE_PROCESSO == "producao") {
            var instrucao = `SELECT count(LogAcesso.fkMaquina) numDesligadas FROM LogAcesso
            JOIN Maquinas on Maquinas.id = LogAcesso.fkMaquina
            WHERE DATEDIFF(DAY, convert(varchar, LogAcesso.dtRegistro, 103), convert(varchar, getDate(), 103)) > 7 
            AND Maquinas.fkInstituicao = 1; `
        } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
            var instrucao = `SELECT count(LogAcesso.fkMaquina) numDesligadas FROM LogAcesso 
            JOIN Maquinas on Maquinas.id = LogAcesso.fkMaquina 
            WHERE DATEDIFF(DATE(CURRENT_TIMESTAMP), DATE(LogAcesso.dtInicializacao)) > 7 AND Maquinas.fkInstituicao = ${idInstituicao}; `
        } else {
            console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
            reject("AMBIENTE NÃO CONFIGURADO EM app.js")
        }
        
        console.log("Executando a instrução SQL: \n" + instrucao);
            return database.executar(instrucao);
    }

    function mostrarAlertasDiaArm(idInstituicao){
        if (process.env.AMBIENTE_PROCESSO == "producao") {

        } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
            var instrucao = `SELECT COUNT(AlertasLog.id) AS total
            FROM AlertasLog
            JOIN LogAcesso ON AlertasLog.fkLogAcesso = LogAcesso.id
            JOIN Maquinas ON LogAcesso.fkMaquina = Maquinas.id
            WHERE  date(LogAcesso.dtInicializacao) = current_date()
            AND Maquinas.fkInstituicao = ${idInstituicao}; `
        } else {
            console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
            reject("AMBIENTE NÃO CONFIGURADO EM app.js")
        }
        console.log("Executando a instrução SQL: \n" + instrucao);
            return database.executar(instrucao);
    }

    function mostrarAlertasDiaTotal(idInstituicao){
        if (process.env.AMBIENTE_PROCESSO == "producao") {
            var instrucao = ` SELECT COUNT(A.id) total
            FROM Alertas A
            INNER JOIN RegistroMaquina R ON A.fkRegistro = R.id
            INNER JOIN Maquinas M ON M.id = R.fkMaquinas
            WHERE convert(varchar, R.dtRegistro, 103) = convert(varchar, getDate(), 103)
            AND M.fkInstituicao = ${idInstituicao}
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
        
        console.log("Executando a instrução SQL: \n" + instrucao);
            return database.executar(instrucao);
    }

    // Hoje -> Todos os tempos
    function mostrarNumMaquinasArmazenamento80(idInstituicao){
        if (process.env.AMBIENTE_PROCESSO == "producao") {
            var instrucao = `SELECT COUNT(DISTINCT Maquinas.id) AS total
            FROM AlertasLog
            JOIN LogAcesso ON AlertasLog.fkLogAcesso = LogAcesso.id
            JOIN Maquinas ON LogAcesso.fkMaquina = Maquinas.id
            WHERE CONVERT(varhcar,LogAcesso.dtInicializacao,103) = CONVERT(varchar,getDate(),103)
            AND Maquinas.fkInstituicao = ${idInstituicao}; `

        } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
            var instrucao = `SELECT COUNT(DISTINCT Maquinas.id) AS total
            FROM AlertasLog
            JOIN LogAcesso ON AlertasLog.fkLogAcesso = LogAcesso.id
            JOIN Maquinas ON LogAcesso.fkMaquina = Maquinas.id
            WHERE date(LogAcesso.dtInicializacao) = current_date()
            AND Maquinas.fkInstituicao = ${idInstituicao}; `
        } else {
            console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
            reject("AMBIENTE NÃO CONFIGURADO EM app.js")
        }
        
        console.log("Executando a instrução SQL: \n" + instrucao);
            return database.executar(instrucao);
    }

    function plotarGraficoCPU(idInstituicao){
        if (process.env.AMBIENTE_PROCESSO == "producao") {
            var instrucao = `SELECT TOP 7 convert(varchar, RegistroMaquina.dtRegistro, 103) as data,
            COUNT(DISTINCT Maquinas.id) AS total
            FROM Alertas
            INNER JOIN RegistroMaquina on Alertas.fkRegistro = RegistroMaquina.id
            INNER JOIN Maquinas ON RegistroMaquina.fkMaquinas = Maquinas.id
            WHERE DATEPART(ISO_WEEK,RegistroMaquina.dtRegistro) = DATEPART(ISO_WEEK, getDate()) - 1
            AND Alertas.componente = 'CPU'
            AND Maquinas.fkInstituicao = ${idInstituicao}
            GROUP BY RegistroMaquina.dtRegistro
            ORDER BY RegistroMaquina.dtRegistro
            `

        } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
            var instrucao = `SELECT DATE(RegistroMaquina.dtRegistro) AS data,
            COUNT(DISTINCT Maquinas.id) AS total
            FROM Alertas
            JOIN RegistroMaquina ON Alertas.fkRegistro = RegistroMaquina.id
            JOIN Maquinas ON RegistroMaquina.fkMaquinas = Maquinas.id
            WHERE WEEKOFYEAR(RegistroMaquina.dtRegistro) = WEEKOFYEAR(CURRENT_DATE - INTERVAL 1 WEEK)
            AND Alertas.componente = 'CPU'
            AND Maquinas.fkInstituicao = ${idInstituicao}
            GROUP BY data
            ORDER BY data
            LIMIT 7; `
        } else {
            console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
            reject("AMBIENTE NÃO CONFIGURADO EM app.js")
        }
        
        console.log("Executando a instrução SQL: \n" + instrucao);
            return database.executar(instrucao);
    }

    function plotarGraficoRAM(idInstituicao){
        if (process.env.AMBIENTE_PROCESSO == "producao") {
            var instrucao = `SELECT TOP 7 convert(varchar, RegistroMaquina.dtRegistro, 103) as data,
            COUNT(DISTINCT Maquinas.id) AS total
            FROM Alertas
            INNER JOIN RegistroMaquina on Alertas.fkRegistro = RegistroMaquina.id
            INNER JOIN Maquinas ON RegistroMaquina.fkMaquinas = Maquinas.id
            WHERE DATEPART(ISO_WEEK,RegistroMaquina.dtRegistro) = DATEPART(ISO_WEEK, getDate()) - 1
            AND Alertas.componente = 'RAM'
            AND Maquinas.fkInstituicao = ${idInstituicao}
            GROUP BY RegistroMaquina.dtRegistro
            ORDER BY RegistroMaquina.dtRegistro
            `
        } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
            var instrucao = `SELECT DATE(RegistroMaquina.dtRegistro) AS data,
            COUNT(DISTINCT Maquinas.id) AS total
            FROM Alertas
            JOIN RegistroMaquina ON Alertas.fkRegistro = RegistroMaquina.id
            JOIN Maquinas ON RegistroMaquina.fkMaquinas = Maquinas.id
            WHERE WEEKOFYEAR(RegistroMaquina.dtRegistro) = WEEKOFYEAR(CURRENT_DATE - INTERVAL 1 WEEK)
            AND Alertas.componente = 'RAM'
            AND Maquinas.fkInstituicao = ${idInstituicao}
            GROUP BY data
            ORDER BY data
            LIMIT 7; `
        } else {
            console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
            reject("AMBIENTE NÃO CONFIGURADO EM app.js")
        }
        
        console.log("Executando a instrução SQL: \n" + instrucao);
            return database.executar(instrucao);
    }

    module.exports = {
        mostrarMaquinasCadastradas,
        mostrarMaquinasLigadas,
        mostrarMaquinasDesligadas,
        mostrarAlertasDiaArm,
        mostrarAlertasDiaTotal,
        mostrarNumMaquinasArmazenamento80,
        plotarGraficoCPU,
        plotarGraficoRAM,

    };