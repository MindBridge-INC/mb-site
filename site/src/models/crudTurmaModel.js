var database = require("../database/config")

function listarTurmas(idInst) {
    var instrucao = `
    SELECT * FROM Turma WHERE fkInstituicao = ${idInst};
    `
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


function cadastrar(nome,ano,periodo,inicio,fim,idInst) {
    var instrucao = `
    INSERT INTO Turma  (nome,ano,periodo,inicio,fim,statSist,fkInstituicao) VALUES
    ('${nome}','${ano}','${periodo}','${inicio}',${fim}, 1,${idInst});
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


function trazerDados(id){
    var instrucao = `
    SELECT * FROM Turma WHERE id = ${id}
    `
    return database.executar(instrucao);
}

function editar(nome, ano, periodo, inicio,fim) {
    var instrucao = `
    UPDATE UsuarioAluno SET nome = '${nome}', ano = '${ano}', periodo = ${periodo}, inicio = '${inicio}', 
    fim = '${fim}' WHERE id = ${idTurma};
    `
    return database.executar(instrucao);
}

module.exports = {
    listarTurmas,
    cadastrar,
    trazerDados,
    editar
};
