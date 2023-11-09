var database = require("../database/config")

function listarSala(idInst) {
    var instrucao = `
    SELECT * FROM Sala WHERE fkInstituicao = ${idInst};
    `
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


function cadastrar(nome,andar,idInst) {
    var instrucao = `
    INSERT INTO Sala  (nome,andar,statSist,fkInstituicao) VALUES
    ('${nome}','${andar}', 1,${idInst});
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


function trazerDados(id){
    var instrucao = `
    SELECT * FROM Sala WHERE id = ${id}
    `
    return database.executar(instrucao);
}

function editar(nome, andar) {
    var instrucao = `
    UPDATE Sala SET nome = '${nome}', andar = '${andar}', WHERE id = ${idSala};
    `
    return database.executar(instrucao);
}

module.exports = {
    listarSala,
    cadastrar,
    trazerDados,
    editar
};