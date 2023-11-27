var database = require("../database/config")
var thaisaoi = process.env.AMBIENTE_PROCESSO
function mostrarNumMaquinasArmazenamento80(idInstituicao){
    // if (process.env.AMBIENTE_PROCESSO = "producao") {   
        var instrucao = `SELECT COUNT(DISTINCT Maquinas.id) AS total
        FROM AlertasLog
        JOIN LogAcesso ON AlertasLog.fkLogAcesso = LogAcesso.id
        JOIN Maquinas ON LogAcesso.fkMaquina = Maquinas.id
        WHERE CAST(LogAcesso.dtRegistro AS DATE) = CAST(GETDATE() AS DATE)
              AND Maquinas.fkInstituicao =${idInstituicao}; `
    // } else if (process.env.AMBIENTE_PROCESSO = "desenvolvimento") {
       
    //     var instrucao = `SELECT COUNT(DISTINCT Maquinas.id) AS total
    //     FROM AlertasLog
    //     JOIN LogAcesso ON AlertasLog.fkLogAcesso = LogAcesso.id
    //     JOIN Maquinas ON LogAcesso.fkMaquina = Maquinas.id
    //     WHERE date(LogAcesso.dtRegistro) = current_date()
    //     AND Maquinas.fkInstituicao = ${idInstituicao};`
    // } else {
    //     console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
    //     reject("AMBIENTE NÃO CONFIGURADO EM app.js")
    // }
    console.log("Executando a instrução SQL: \n" + instrucao);
        return database.executar(instrucao);
}

function mostrarNomeInstituicao(idInstituicao){
    var instrucao = `select nome from instituicaoEnsino where instituicaoEnsino.id = ${idInstituicao}; `
    
    console.log("Executando a instrução SQL: \n" + instrucao);
        return database.executar(instrucao);
}

function mostrarMaquinasCPULimite(idInstituicao){
    // if (process.env.AMBIENTE_PROCESSO = "producao") {
        var instrucao = `SELECT COUNT(DISTINCT Maquinas.id) AS total
        FROM Alertas
        JOIN RegistroMaquina ON Alertas.fkRegistro = RegistroMaquina.id
        JOIN Maquinas ON RegistroMaquina.fkMaquinas = Maquinas.id
        WHERE CAST(RegistroMaquina.dtRegistro AS DATE) = CAST(GETDATE() AS DATE)
        AND Maquinas.fkInstituicao =${idInstituicao}
        AND Alertas.componente = 'CPU'; `
    // } else if (process.env.AMBIENTE_PROCESSO = "desenvolvimento") {
    //     var instrucao = `SELECT COUNT(DISTINCT Maquinas.id) AS total
    //     FROM Alertas
    //     JOIN RegistroMaquina ON Alertas.fkRegistro = RegistroMaquina.id
    //     JOIN Maquinas ON RegistroMaquina.fkMaquinas = Maquinas.id
    //     WHERE DATE(RegistroMaquina.dtRegistro) = CURRENT_DATE()
    //     AND Maquinas.fkInstituicao = ${idInstituicao}
    //     AND Alertas.componente = 'CPU'; `
    // } else {
    //     console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
    //     reject("AMBIENTE NÃO CONFIGURADO EM app.js")
    // }
    console.log("Executando a instrução SQL: \n" + instrucao);
        return database.executar(instrucao);
}

function mostrarMaquinasRAMLimite(idInstituicao){
    // if (process.env.AMBIENTE_PROCESSO = "producao") {
        var instrucao = `SELECT COUNT(DISTINCT Maquinas.id) AS total
        FROM Alertas
        JOIN RegistroMaquina ON Alertas.fkRegistro = RegistroMaquina.id
        JOIN Maquinas ON RegistroMaquina.fkMaquinas = Maquinas.id
        WHERE CAST(RegistroMaquina.dtRegistro AS DATE) = CAST(GETDATE() AS DATE)
        AND Maquinas.fkInstituicao =${idInstituicao}
        AND Alertas.componente = 'RAM';`
    // } else if (process.env.AMBIENTE_PROCESSO = "desenvolvimento") {
    //     var instrucao = `SELECT COUNT(DISTINCT Maquinas.id) AS total
    //     FROM Alertas
    //     JOIN RegistroMaquina ON Alertas.fkRegistro = RegistroMaquina.id
    //     JOIN Maquinas ON RegistroMaquina.fkMaquinas = Maquinas.id
    //     WHERE DATE(RegistroMaquina.dtRegistro) = CURRENT_DATE()
    //     AND Maquinas.fkInstituicao = ${idInstituicao}
    //     AND Alertas.componente = 'RAM'; `
    // } else {
    //     console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
    //     reject("AMBIENTE NÃO CONFIGURADO EM app.js")
    // }
    console.log("Executando a instrução SQL: \n" + instrucao);
        return database.executar(instrucao);
}

function visualizarAlertas(idInstituicao){
    // if (process.env.AMBIENTE_PROCESSO = "producao") {
        var instrucao = `SELECT
        Maquinas.hostname AS maquina,
        Alertas.componente AS ocorrencia,
        Alertas.tipo AS classificacao,
        FORMAT(RegistroMaquina.dtRegistro, 'dd/MM/yyyy hh:mm') AS dtRegistro
        FROM Maquinas
        JOIN RegistroMaquina ON Maquinas.id = RegistroMaquina.fkMaquinas
        JOIN Alertas ON RegistroMaquina.id = Alertas.fkRegistro
        WHERE CAST(RegistroMaquina.dtRegistro AS DATE) = CAST(GETDATE() AS DATE)
            AND Maquinas.fkInstituicao = ${idInstituicao}
        ORDER BY Alertas.componente, CAST(RegistroMaquina.dtRegistro AS DATE);`
    // } else if (process.env.AMBIENTE_PROCESSO = "desenvolvimento") {
    //     var instrucao = `SELECT
    //     Maquinas.hostname AS maquina,
    //     Alertas.componente AS ocorrencia,
    //     Alertas.tipo AS classificacao,
    //     RegistroMaquina.dtRegistro AS dtRegistro
    //     FROM Maquinas
    //     JOIN RegistroMaquina ON Maquinas.id = RegistroMaquina.fkMaquinas
    //     JOIN Alertas ON RegistroMaquina.id = Alertas.fkRegistro
    //     WHERE DATE(RegistroMaquina.dtRegistro) = CURRENT_DATE()
    //     AND Maquinas.fkInstituicao = ${idInstituicao}
    //     ORDER BY Alertas.componente, DATE(RegistroMaquina.dtRegistro);`
    // } else {
    //     console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
    //     reject("AMBIENTE NÃO CONFIGURADO EM app.js")
    // }
    
    console.log("Executando a instrução SQL: \n" + instrucao);
        return database.executar(instrucao);
}

function visualizarAlertasArm(idInstituicao){
    // if (process.env.AMBIENTE_PROCESSO = "producao") {
        var instrucao = `SELECT
        Maquinas.hostname AS maquina,
        AlertasLog.componente AS ocorrencia,
        AlertasLog.tipo AS classificacao,
        LogAcesso.dtRegistro AS dtRegistro
    FROM Maquinas
    JOIN LogAcesso ON Maquinas.id = LogAcesso.fkMaquina
    JOIN AlertasLog ON LogAcesso.id = AlertasLog.fkLogAcesso
    WHERE CAST(LogAcesso.dtRegistro AS DATE) = CAST(GETDATE() AS DATE)
        AND Maquinas.fkInstituicao = ${idInstituicao} 
    ORDER BY AlertasLog.componente, CAST(LogAcesso.dtRegistro AS DATE);`
    // } else if (process.env.AMBIENTE_PROCESSO = "desenvolvimento") {
    //     var instrucao = `SELECT
    //     Maquinas.hostname AS maquina,
    //     AlertasLog.componente AS ocorrencia,
    //     AlertasLog.tipo AS classificacao,
    //     LogAcesso.dtRegistro AS dtRegistro
    //     FROM Maquinas
    //     JOIN LogAcesso ON Maquinas.id = LogAcesso.fkMaquina
    //     JOIN AlertasLog ON LogAcesso.id = AlertasLog.fkLogAcesso
    //     WHERE DATE(LogAcesso.dtRegistro) = CURRENT_DATE()
    //     AND Maquinas.fkInstituicao = ${idInstituicao}
    //     ORDER BY AlertasLog.componente, DATE(LogAcesso.dtRegistro);`
    // } else {
    //     console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
    //     reject("AMBIENTE NÃO CONFIGURADO EM app.js")
    // }
    
    console.log("Executando a instrução SQL: \n" + instrucao);
        return database.executar(instrucao);
}

module.exports = {
    mostrarNumMaquinasArmazenamento80,
    mostrarNomeInstituicao,
    mostrarMaquinasCPULimite,
    mostrarMaquinasRAMLimite,
    visualizarAlertas,
    visualizarAlertasArm,
    
};