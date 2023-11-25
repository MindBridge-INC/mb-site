var database = require("../database/config")

function listarTurmas(idInstituicao) {
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        var instrucao = `select id, nome from Turma where fkInstituicao = ${idInstituicao} `
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        var instrucao = `select id, nome from Turma where fkInstituicao = ${idInstituicao} `
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        reject("AMBIENTE NÃO CONFIGURADO EM app.js")
    }


    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function exibirAlunosMatriculados(idTurma) {
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        var instrucao = `SELECT COUNT(*) AS total_alunos
        FROM UsuarioAluno
        WHERE statSist = 1 AND fkTurma = ${idTurma}; `
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        var instrucao = `SELECT COUNT(*) AS total_alunos
        FROM UsuarioAluno
        WHERE statSist = 1 AND fkTurma = ${idTurma}; `
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        reject("AMBIENTE NÃO CONFIGURADO EM app.js")
    }

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function exibirRanking(idInstituicao) {
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        var instrucao = `SELECT TOP 5
        dbo.substring_index(JanelasAbertas.titulo, ' ', -1) AS UltimaPalavra,
        COUNT(*) AS QuantidadeUtilizada
      FROM
        JanelasAbertas
      JOIN
        Maquinas ON JanelasAbertas.fkMaquina = Maquinas.id
      WHERE
        Maquinas.fkInstituicao = 1
      GROUP BY
        dbo.substring_index(JanelasAbertas.titulo, ' ', -1)
      ORDER BY
        QuantidadeUtilizada DESC
`

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        var instrucao = `SELECT
        SUBSTRING_INDEX(JanelasAbertas.titulo, ' ', -1) AS UltimaPalavra,
        COUNT(*) AS QuantidadeUtilizada
      FROM
        JanelasAbertas
      JOIN
        Maquinas ON JanelasAbertas.fkMaquina = Maquinas.id
      WHERE
        Maquinas.fkInstituicao IN (${idInstituicao})
      GROUP BY
        UltimaPalavra
      ORDER BY
        QuantidadeUtilizada DESC
      LIMIT 5;`
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        reject("AMBIENTE NÃO CONFIGURADO EM app.js")
    }

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function exibirPontuacaoMedia(idTurma) {
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        var instrucao = `SELECT
        AVG(pontos) AS PontuacaoMediaDaSemana
    FROM
        Pontuacao p
    JOIN
        UsuarioAluno u ON p.fkAluno = u.id
    WHERE
        u.fkTurma = ${idTurma}
        AND DATEPART(ISO_WEEK,p.dtRegistro) = DATEPART(ISO_WEEK,getDate())`
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        var instrucao = `SELECT
        AVG(pontos) AS PontuacaoMediaDaSemana
    FROM
        Pontuacao p
    JOIN
        UsuarioAluno u ON p.fkAluno = u.id
    WHERE
        u.fkTurma = ${idTurma}
        AND WEEK(p.dtRegistro) = WEEK(NOW());`
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        reject("AMBIENTE NÃO CONFIGURADO EM app.js")
    }

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function plotarPicosHoje(idTurma) {
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        var instrucao = `SELECT
        DATEPART(HOUR,p.dtRegistro) AS DataHoraRegistro,
        COUNT(p.id) AS QuantidadeRegistrosZero
      FROM
        Pontuacao p
        INNER JOIN UsuarioAluno u ON p.fkAluno = u.id
        INNER JOIN Turma ON u.fkTurma = Turma.id
        WHERE
            u.fkTurma = 1
            AND p.pontos = 0
            AND CONVERT(varchar,p.dtRegistro,108) = CONVERT(varchar,getDate(),108)
      GROUP BY
        DATEPART(HOUR,p.dtRegistro)
      ORDER BY
        DATEPART(HOUR,p.dtRegistro)`
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        var instrucao = `SELECT
        HOUR(p.dtRegistro) AS DataHoraRegistro,
        COUNT(p.id) AS QuantidadeRegistrosZero
      FROM
        Pontuacao p
        INNER JOIN UsuarioAluno u ON p.fkAluno = u.id
        JOIN Turma ON u.fkTurma = Turma.id
      WHERE
        u.fkTurma = ${idTurma}
        AND p.pontos = 0
        AND DATE(p.dtRegistro) = CURDATE()
      GROUP BY
        time(p.dtRegistro)
      ORDER BY
        time(p.dtRegistro);`
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        reject("AMBIENTE NÃO CONFIGURADO EM app.js")
    }

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function plotarPicosSemana(idTurma) {
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        var instrucao = `SELECT
        FORMAT(p.dtRegistro, 'dd/MM') AS DataFormatada,
        COUNT(*) AS qtd_pontos_0
        FROM
        Pontuacao p
        INNER JOIN UsuarioAluno u ON p.fkAluno = u.id
        WHERE
        p.pontos = 0
        AND p.dtRegistro >= DATEADD(day,-7,getDate())
        AND u.fkTurma = 1
        GROUP BY
        FORMAT(p.dtRegistro, 'dd/MM')
        ORDER BY
        FORMAT(p.dtRegistro, 'dd/MM')`
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        var instrucao = `SELECT
        DATE_FORMAT(p.dtRegistro, '%d/%m') AS DataFormatada,
        COUNT(*) AS qtd_pontos_0
      FROM
        Pontuacao p
        INNER JOIN UsuarioAluno u ON p.fkAluno = u.id
      WHERE
        p.pontos = 0
        AND p.dtRegistro >= DATE_SUB(NOW(), INTERVAL 7 DAY)
        AND u.fkTurma = ${idTurma}
      GROUP BY
        DataFormatada
      ORDER BY
        DataFormatada;`
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        reject("AMBIENTE NÃO CONFIGURADO EM app.js")
    }

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function visualizarAlunosTurma(idTurma) {
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        var instrucao = `SELECT
        CONCAT(ua.nome,' ',ua.sobrenome) AS NomeCompleto,
        SUM(p.pontos) AS PontosTotal
    FROM
        UsuarioAluno ua
        LEFT JOIN Pontuacao p ON ua.id = p.fkAluno
    WHERE
        ua.fkTurma = 1
    GROUP BY
        CONCAT(ua.nome, ' ', ua.sobrenome)
    ORDER BY
        CONCAT(ua.nome, ' ', ua.sobrenome)`
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        var instrucao = `SELECT
        CONCAT(ua.nome, ' ', ua.sobrenome) AS NomeCompleto,
        SUM(p.pontos) AS PontosTotal
    FROM
        UsuarioAluno ua
        LEFT JOIN Pontuacao p ON ua.id = p.fkAluno
    WHERE
        ua.fkTurma = ${idTurma}
    GROUP BY
        ua.id, NomeCompleto
    ORDER BY
        NomeCompleto;`
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        reject("AMBIENTE NÃO CONFIGURADO EM app.js")
    }

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}



module.exports = {
    listarTurmas,
    exibirAlunosMatriculados,
    exibirRanking,
    exibirPontuacaoMedia,
    plotarPicosHoje,
    plotarPicosSemana,
    visualizarAlunosTurma
};