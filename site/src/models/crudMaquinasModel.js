var database = require("../database/config")

function visualizarMaquinasTotal(idInst) {
    var instrucao = `
    SELECT Maquinas.*, Sala.nome nomeSala FROM Maquinas
    JOIN Sala ON Maquinas.fkSala = Sala.id
    WHERE Maquinas.fkInstituicao = ${idInst};
    `
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function visualizarMaquinas(idSala) {
    var instrucao = `
    SELECT Maquinas.*, Sala.nome nomeSala FROM Maquinas
    JOIN Sala ON Maquinas.fkSala = Sala.id
    WHERE fkSala = ${idSala};
    `
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function trazerDados(id) {
    var instrucao = `
    SELECT * FROM Maquinas WHERE id = ${id}
    `
    return database.executar(instrucao);
}

function editar(idMaquina, idSala, status) {
    var instrucao = `
    UPDATE Maquinas SET fkSala = '${idSala}', statSist = ${status} WHERE id = ${idMaquina};
    `
    return database.executar(instrucao);
}

module.exports = {
    visualizarMaquinasTotal,
    visualizarMaquinas,
    trazerDados,
    editar
};