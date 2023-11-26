var database = require("../database/config")

function editar(valorCPU, valorRAM, valorDisco, idInst) {
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        var instrucao = `UPDATE Limites SET cpuPorcent = ${valorCPU}, ramPorcent = ${valorRAM}, discoPorcent = ${valorDisco} WHERE fkInstituicao = ${idInst};`
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        var instrucao = `UPDATE Limites SET cpuPorcent = ${valorCPU}, ramPorcent = ${valorRAM}, discoPorcent = ${valorDisco} WHERE fkInstituicao = ${idInst};`
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        reject("AMBIENTE NÃO CONFIGURADO EM app.js")
    }

    return database.executar(instrucao);
}

function visualizar(id){
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        var instrucao = `select TOP 1 cpuPorcent, ramPorcent,  discoPorcent from Limites where fkInstituicao = ${id};`
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        var instrucao = `select cpuPorcent, ramPorcent,  discoPorcent  from Limites where fkInstituicao = ${id} limit 1;`
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        reject("AMBIENTE NÃO CONFIGURADO EM app.js")
    }

    return database.executar(instrucao);
}

module.exports = {
    editar,
    visualizar
};