var database = require("../database/config")

function editar(valorCPU, valorRAM, valorDisco, idInst) {
    var instrucao = `
    UPDATE Limites SET cpuPorcent = ${valorCPU}, ramPorcent = ${valorRAM}, discoPorcent = ${valorDisco} WHERE fkInstituicao = ${idInst};
    `
    console.log(instrucao)
    return database.executar(instrucao);
}

function visualizar(id){
    var instrucao = `
    select cpuPorcent, ramPorcent,  discoPorcent  from Limites where fkInstituicao = ${id} limit 1;
    `
    return database.executar(instrucao);
}

module.exports = {
    editar,
    visualizar
};