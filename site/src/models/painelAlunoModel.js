var database = require("../database/config")

function listarMensagens(idTurma) {
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        var instrucao = `
        SELECT C.mensagem, FORMAT(C.dtEnvio, 'dd/MM à"s" hh:mm') dtEnvio, A.nome, A.sobrenome, A.id idAluno, C.id idMsg FROM Chat C
        INNER JOIN UsuarioAluno A on C.fkAluno = A.id
        WHERE A.fkTurma = ${idTurma}
        ORDER BY C.dtEnvio;
        `
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        var instrucao = `
        SELECT C.mensagem, DATE_FORMAT(C.dtEnvio, '%d/%m às %H:%i') dtEnvio, A.nome, A.sobrenome, A.id idAluno, C.id idMsg FROM Chat C
        JOIN UsuarioAluno A on C.fkAluno = A.id
        WHERE A.fkTurma = ${idTurma}
        ORDER BY dtEnvio;
        `
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        reject("AMBIENTE NÃO CONFIGURADO EM app.js")
    }

    // console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function enviarMensagem(mensagem, idAluno) {
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        var instrucao = `
        INSERT INTO Chat (mensagem, dtEnvio, fkAluno) VALUES
        ('${mensagem}',getDate(),${idAluno});
        `;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        var instrucao = `
        INSERT INTO Chat (mensagem, dtEnvio, fkAluno) VALUES
        ('${mensagem}',current_timestamp(),${idAluno});
        `;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        reject("AMBIENTE NÃO CONFIGURADO EM app.js")
    }
    
    // console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function mostrarPontuacaoHoje(idAluno){
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        var instrucao = `SELECT SUM(pontos) pontos FROM Pontuacao WHERE fkAluno = ${idAluno}
        AND CONVERT(varchar,dtRegistro,103) = CONVERT(varchar,getDate(),103) ;`
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        var instrucao = `SELECT SUM(pontos) pontos FROM Pontuacao WHERE fkAluno = ${idAluno}
        AND date(dtRegistro) = date(current_timestamp()) ;`
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        reject("AMBIENTE NÃO CONFIGURADO EM app.js")
    }

// console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function mostrarPontuacaoSemana(idAluno){
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        var instrucao = `SELECT TOP 7 SUM(pontos) pontos, CONVERT(varchar,dtRegistro,103) 'data', DATEPART(WEEKDAY, convert(varchar,dtRegistro, 103)) 'dataSemana' FROM Pontuacao
        WHERE fkAluno = ${idAluno} 
        GROUP BY dtRegistro, DATEPART(WEEKDAY, convert(varchar,dtRegistro, 103)) 
        ORDER BY pontuacao.dtRegistro DESC`
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        var instrucao = `SELECT SUM(pontos) pontos, DATE (dtRegistro) 'data', WEEKDAY(DATE(dtRegistro)) 'dataSemana' FROM Pontuacao 
        WHERE fkAluno = ${idAluno} 
        group by DATE (dtRegistro), WEEKDAY(DATE(dtRegistro)) 
        ORDER BY DATE (dtRegistro) desc 
        LIMIT 7;`
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        reject("AMBIENTE NÃO CONFIGURADO EM app.js")
    }
    
    // console.log("Executando a instrução SQL: \n" + instrucao);
        return database.executar(instrucao);
}
    
function mostrarEstrelinhas(idAluno){
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        var instrucao = `SELECT SUM(pontos) pontos FROM Pontuacao WHERE fkAluno = ${idAluno};`
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        var instrucao = `SELECT SUM(pontos) pontos FROM Pontuacao WHERE fkAluno = ${idAluno};`
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        reject("AMBIENTE NÃO CONFIGURADO EM app.js")
    }
    
    // console.log("Executando a instrução SQL: \n" + instrucao);
        return database.executar(instrucao);
}

function plotarGrafico(idAluno){
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        var instrucao = `SELECT TOP 7 SUM(pontos) pontos, CONVERT(varchar,dtRegistro,103) dtRegistro FROM pontuacao
        WHERE fkAluno = ${idAluno} and DATEPART(ISO_WEEK,dtRegistro) = DATEPART(ISO_WEEK,getDate()) - 1
        GROUP BY CONVERT(varchar,dtRegistro,103) 
        `
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        var instrucao = `SELECT SUM(pontos) pontos, DATE(dtRegistro) dtRegistro FROM pontuacao
        WHERE fkAluno = ${idAluno} and WEEKOFYEAR(dtRegistro) = WEEKOFYEAR(CURRENT_DATE-1)
        GROUP BY DATE(dtRegistro), WEEKDAY(DATE(dtRegistro)) 
        LIMIT 7;`
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        reject("AMBIENTE NÃO CONFIGURADO EM app.js")
    }
    
    // console.log("Executando a instrução SQL: \n" + instrucao);
        return database.executar(instrucao);
}

module.exports = {
    listarMensagens,
    enviarMensagem,
    mostrarPontuacaoHoje,
    mostrarPontuacaoSemana,
    mostrarEstrelinhas,
    plotarGrafico
};

