var database = require("../database/config")

function listarTurmas(idInst) {
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        var instrucao = `
        SELECT id, nome, ano, periodo, FORMAT(inicio, 'HH:mm') inicio, FORMAT(fim, 'HH:mm') fim, statSist, fkInstituicao FROM turma
        WHERE fkInstituicao = ${idInst} ORDER BY nome;
        `
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        var instrucao = `
        SELECT id, nome, ano, periodo, DATE_FORMAT(inicio, '%H:%i') inicio, DATE_FORMAT(fim, '%H:%i') fim, statSist, fkInstituicao FROM turma
        WHERE fkInstituicao = ${idInst} ORDER BY nome;
        `
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        reject("AMBIENTE NÃO CONFIGURADO EM app.js")
    }
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
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        var instrucao = `
        SELECT id,nome,ano,periodo,FORMAT(inicio, 'HH:mm') inicio, FORMAT(fim, 'HH:mm') fim, statSist, fkInstituicao FROM Turma WHERE id = ${id}
        `
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        var instrucao = `
        SELECT * FROM Turma WHERE id = ${id}
        `
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        reject("AMBIENTE NÃO CONFIGURADO EM app.js")
    }
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
