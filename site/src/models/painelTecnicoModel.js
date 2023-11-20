var database = require("../database/config")

function mostrarMaquinasCadastradas(idInstituicao){
    var instrucao = `SELECT COUNT(id) numMaquinas FROM Maquinas 
    WHERE fkInstituicao = ${idInstituicao}; `
    
    console.log("Executando a instrução SQL: \n" + instrucao);
        return database.executar(instrucao);
    }

    function mostrarMaquinasLigadas(idInstituicao){
        var instrucao = `SELECT count(LogAcesso.fkMaquina) numAtivas FROM LogAcesso 
        JOIN Maquinas on Maquinas.id = LogAcesso.fkMaquina 
        WHERE DATEDIFF(DATE(CURRENT_TIMESTAMP), DATE(LogAcesso.dtInicializacao)) > 7 AND Maquinas.fkInstituicao = ${idInstituicao}; `
        
        console.log("Executando a instrução SQL: \n" + instrucao);
            return database.executar(instrucao);
    }

    function mostrarMaquinasDesligadas(idInstituicao){
        var instrucao = `SELECT count(LogAcesso.fkMaquina) numDesligadas FROM LogAcesso 
        JOIN Maquinas on Maquinas.id = LogAcesso.fkMaquina 
        WHERE DATEDIFF(DATE(CURRENT_TIMESTAMP), DATE(LogAcesso.dtInicializacao)) > 7 AND Maquinas.fkInstituicao = ${idInstituicao}; `
        
        console.log("Executando a instrução SQL: \n" + instrucao);
            return database.executar(instrucao);
    }

    function mostrarAlertasDiaArm(idInstituicao){
        var instrucao = `SELECT COUNT(AlertasLog.id) AS total
        FROM AlertasLog
        JOIN LogAcesso ON AlertasLog.fkLogAcesso = LogAcesso.id
        JOIN Maquinas ON LogAcesso.fkMaquina = Maquinas.id
        WHERE  date(LogAcesso.dtInicializacao) = current_date()
        AND Maquinas.fkInstituicao = ${idInstituicao}; `
        
        console.log("Executando a instrução SQL: \n" + instrucao);
            return database.executar(instrucao);
    }

    function mostrarAlertasDiaTotal(idInstituicao){
        var instrucao = `SELECT COUNT(Alertas.id) AS total
        FROM Alertas
        JOIN RegistroMaquina ON Alertas.fkRegistro = RegistroMaquina.id
        JOIN Maquinas ON RegistroMaquina.fkMaquinas = Maquinas.id
        WHERE  date(RegistroMaquina.dtRegistro) = current_date()
        AND Maquinas.fkInstituicao = ${idInstituicao}; `
        
        console.log("Executando a instrução SQL: \n" + instrucao);
            return database.executar(instrucao);
    }

    function mostrarNumMaquinasArmazenamento80(idInstituicao){
        var instrucao = `SELECT COUNT(DISTINCT Maquinas.id) AS total
        FROM AlertasLog
        JOIN LogAcesso ON AlertasLog.fkLogAcesso = LogAcesso.id
        JOIN Maquinas ON LogAcesso.fkMaquina = Maquinas.id
        WHERE date(LogAcesso.dtInicializacao) = current_date()
        AND Maquinas.fkInstituicao = ${idInstituicao}; `
        
        console.log("Executando a instrução SQL: \n" + instrucao);
            return database.executar(instrucao);
    }

    module.exports = {
        mostrarMaquinasCadastradas,
        mostrarMaquinasLigadas,
        mostrarMaquinasDesligadas,
        mostrarAlertasDiaArm,
        mostrarAlertasDiaTotal,
        mostrarNumMaquinasArmazenamento80
    };