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

module.exports = {
    listarMensagens,
    enviarMensagem
};