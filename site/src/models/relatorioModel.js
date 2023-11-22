var database = require("../database/config")

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

function mostrarNomeInstituicao(idInstituicao){
    var instrucao = `select nome from instituicaoEnsino where instituicaoEnsino.id = ${idInstituicao}; `
    
    console.log("Executando a instrução SQL: \n" + instrucao);
        return database.executar(instrucao);
}

function mostrarMaquinasCPULimite(idInstituicao){
    var instrucao = `SELECT COUNT(DISTINCT Maquinas.id) AS total
    FROM Alertas
    JOIN RegistroMaquina ON Alertas.fkRegistro = RegistroMaquina.id
    JOIN Maquinas ON RegistroMaquina.fkMaquinas = Maquinas.id
    WHERE DATE(RegistroMaquina.dtRegistro) = CURRENT_DATE()
      AND Maquinas.fkInstituicao = ${idInstituicao}
      AND Alertas.componente = 'CPU'; `
    
    console.log("Executando a instrução SQL: \n" + instrucao);
        return database.executar(instrucao);
}

function mostrarMaquinasRAMLimite(idInstituicao){
    var instrucao = `SELECT COUNT(DISTINCT Maquinas.id) AS total
    FROM Alertas
    JOIN RegistroMaquina ON Alertas.fkRegistro = RegistroMaquina.id
    JOIN Maquinas ON RegistroMaquina.fkMaquinas = Maquinas.id
    WHERE DATE(RegistroMaquina.dtRegistro) = CURRENT_DATE()
      AND Maquinas.fkInstituicao = ${idInstituicao}
      AND Alertas.componente = 'RAM'; `
    
    console.log("Executando a instrução SQL: \n" + instrucao);
        return database.executar(instrucao);
}

function visualizarAlertas(idInstituicao){
    var instrucao = `SELECT
    Maquinas.hostname AS maquina,
    Alertas.componente AS ocorrencia,
    Alertas.tipo AS classificacao,
    RegistroMaquina.dtRegistro AS dtRegistro
FROM
    Maquinas
JOIN
    RegistroMaquina ON Maquinas.id = RegistroMaquina.fkMaquinas
JOIN
    Alertas ON RegistroMaquina.id = Alertas.fkRegistro
WHERE
    DATE(RegistroMaquina.dtRegistro) = CURRENT_DATE()
    AND Maquinas.fkInstituicao = ${idInstituicao}
    order by Alertas.componente, DATE(RegistroMaquina.dtRegistro);`
    
    console.log("Executando a instrução SQL: \n" + instrucao);
        return database.executar(instrucao);
}

function visualizarAlertasArm(idInstituicao){
    var instrucao = `SELECT
    Maquinas.hostname AS maquina,
    AlertasLog.componente AS ocorrencia,
    AlertasLog.tipo AS classificacao,
    LogAcesso.dtInicializacao AS dtRegistro
FROM
    Maquinas
JOIN
    LogAcesso ON Maquinas.id = LogAcesso.fkMaquina
JOIN
    AlertasLog ON LogAcesso.id = AlertasLog.fkLogAcesso
WHERE
    DATE(LogAcesso.dtInicializacao) = CURRENT_DATE()
    AND Maquinas.fkInstituicao = ${idInstituicao}
ORDER BY
    AlertasLog.componente, DATE(LogAcesso.dtInicializacao);`
    
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