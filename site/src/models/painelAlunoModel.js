var database = require("../database/config")

function listarMensagens(idTurma) {
    var instrucao = `
    SELECT C.mensagem, DATE_FORMAT(C.dtEnvio, '%d/%m às %H:%i') dtEnvio, A.nome, A.sobrenome, A.id idAluno, C.id idMsg FROM Chat C
    JOIN UsuarioAluno A on C.fkAluno = A.id
    WHERE A.fkTurma = ${idTurma}
    ORDER BY dtEnvio;
    `
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function enviarMensagem(mensagem, idAluno) {
    var instrucao = `
    INSERT INTO Chat (mensagem, dtEnvio, fkAluno) VALUES
    ('${mensagem}',current_timestamp(),'${idAluno}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function mostrarPontuacaoHoje(idAluno){
var instrucao = `SELECT SUM(pontos) pontos FROM Pontuacao WHERE fkAluno = ${idAluno}
AND date(dtRegistro) = date(current_timestamp()) ;`

console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function mostrarPontuacaoSemana(idAluno){
    var instrucao = `SELECT SUM(pontos) pontos, DATE (dtRegistro) 'data', WEEKDAY(DATE(dtRegistro)) 'dataSemana' FROM Pontuacao 
    WHERE fkAluno = ${idAluno} 
    group by DATE (dtRegistro), WEEKDAY(DATE(dtRegistro)) 
    ORDER BY DATE (dtRegistro) desc 
    LIMIT 7;`
    
    console.log("Executando a instrução SQL: \n" + instrucao);
        return database.executar(instrucao);
}
    
function mostrarEstrelinhas(idAluno){
    var instrucao = `SELECT SUM(pontos) pontos FROM Pontuacao WHERE fkAluno = ${idAluno};`
    
    console.log("Executando a instrução SQL: \n" + instrucao);
        return database.executar(instrucao);
}

function plotarGrafico(idAluno){
    var instrucao = `SELECT
    DATE(dtRegistro) AS diaSemana,
    SUM(pontos) AS pontos
  FROM
    Pontuacao
  WHERE
    dtRegistro BETWEEN DATE_SUB(CURDATE(), INTERVAL 7 DAY) AND DATE_SUB(CURDATE(), INTERVAL 1 DAY)
    AND fkAluno = ${idAluno}
  GROUP BY
    diaSemana;`
    
    console.log("Executando a instrução SQL: \n" + instrucao);
        return database.executar(instrucao);
}

module.exports = {
    listarMensagens,
    enviarMensagem,
    mostrarPontuacaoHoje,
    mostrarPontuacaoSemana,
    mostrarEstrelinhas,
    plotarGrafico
};

