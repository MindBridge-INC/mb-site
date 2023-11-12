var database = require("../database/config")

function listarTurmas(idInst) {
    var instrucao = `
    SELECT id, nome, ano, periodo, DATE_FORMAT(inicio, '%H:%i') inicio, DATE_FORMAT(fim, '%H:%i') fim, statSist, fkInstituicao FROM turma
    WHERE fkInstituicao = ${idInst} ORDER BY nome;
    `
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


function cadastrar(nome,ano,periodo,inicio,fim,idInst) {
    var instrucao = `
    INSERT INTO Turma (nome,ano,periodo,inicio,fim,statSist,fkInstituicao) VALUE
    ('${nome}','${ano}','${periodo}','${inicio}','${fim}',1, ${idInst});
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

function editar(nome, ano, periodo, inicio,fim,idTurma) {
    var instrucao = `
    UPDATE Turma SET nome = '${nome}', ano = '${ano}', periodo = '${periodo}', inicio = '${inicio}', 
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
