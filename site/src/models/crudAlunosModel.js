var database = require("../database/config")

function listarTurmas(idInst) {
    var instrucao = `
    SELECT * FROM Turma WHERE fkInstituicao = ${idInst};
    `
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function visualizar(idTurma) {
    var instrucao = `
    SELECT UsuarioAluno.*, Turma.nome nomeTurma FROM UsuarioAluno
    JOIN Turma ON UsuarioAluno.fkTurma = Turma.id
    WHERE fkTurma = ${idTurma};
    `
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function cadastrar(matricula, nome, sobrenome, email, senha, idTurma) {
    var instrucao = `
    INSERT INTO UsuarioAluno (matricula, nome, sobrenome, email, senha, fkTurma, statSist) VALUES
    ('${matricula}','${nome}','${sobrenome}','${email}','${senha}',${idTurma}, 1);
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function trazerDados(id) {
    var instrucao = `
    SELECT * FROM UsuarioAluno WHERE id = ${id}
    `
    return database.executar(instrucao);
}

function editar(idAluno, nome, sobrenome, turma, email) {
    var instrucao = `
    UPDATE UsuarioAluno SET nome = '${nome}', sobrenome = '${sobrenome}', fkTurma = ${turma}, email = '${email}' WHERE id = ${idAluno};
    `
    return database.executar(instrucao);
}

module.exports = {
    listarTurmas,
    visualizar,
    cadastrar,
    trazerDados,
    editar
};