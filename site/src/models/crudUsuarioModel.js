var database = require("../database/config")

function listarUsuario(idInst) {
    var instrucao = `
    SELECT * FROM UsuarioInstituicao WHERE fkInstituicao = ${idInst};
    `
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


function cadastrar(nome,sobrenome,email,senha,tipo,idInst) {
    var instrucao = `
    INSERT INTO UsuarioInstituicao  (nome,sobrenome,email,senha,tipo,fkInstituicao) VALUES
    ('${nome}','${sobrenome}', '${email}','${senha}','${tipo}'${idInst});
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


function trazerDados(id){
    var instrucao = `
    SELECT * FROM UsuarioInstituicao WHERE id = ${id}
    `
    return database.executar(instrucao);
}

function editar(nome, sobrenome, email, senha, tipo, idInst) {
    var instrucao = `
    UPDATE Sala SET nome = '${nome}', sobrenome = '${sobrenome}', email = '${email}', senha = '${senha}', tipo = '${tipo}', 
    idInst = '${idInst}' WHERE id = ${idUsuario};
    `
    return database.executar(instrucao);
}

module.exports = {
    listarUsuario,
    cadastrar,
    trazerDados,
    editar
};