var database = require("../database/config")

function visualizar(idTurma) {
    var instrucao = `
    SELECT * FROM UsuarioInstituicao WHERE fkInstituicao = ${idTurma};
    `
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function cadastrar(nome, sobrenome, email, senha, tipo, idInst) {
    var instrucao = `
    INSERT INTO UsuarioInstituicao (nome, sobrenome, email, senha, tipo, statSist, fkInstituicao) VALUES
    ('${nome}','${sobrenome}','${email}','${senha}','${tipo}',1,${idInst});
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function trazerDados(id) {
    var instrucao = `
    SELECT * FROM UsuarioInstituicao WHERE id = ${id}
    `
    return database.executar(instrucao);
}

function editar(nome, sobrenome, email, senha, tipo, idUsuarioInst) {
    var instrucao = `
    UPDATE UsuarioInstituicao SET nome = '${nome}', sobrenome = '${sobrenome}', email = '${email}', senha = '${senha}', tipo = '${tipo}' WHERE id = ${idUsuarioInst};
    `
    return database.executar(instrucao);
}

module.exports = {
    visualizar,
    cadastrar,
    trazerDados,
    editar
};