var database = require("../database/config")

function listarTurmas(idInstituicao) {
    var instrucao = `select id, nome from Turma where fkInstituicao = ${idInstituicao} `

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function exibirAlunosMatriculados(idTurma) {
    var instrucao = `SELECT COUNT(*) AS total_alunos
    FROM UsuarioAluno
    WHERE statSist = 1 AND fkTurma = ${idTurma}; `

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function exibirRanking(idInstituicao) {
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

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function exibirPontuacaoMedia(idTurma) {
    var instrucao = `SELECT
    AVG(pontos) AS PontuacaoMediaDaSemana
FROM
    Pontuacao p
JOIN
    UsuarioAluno u ON p.fkAluno = u.id
WHERE
    u.fkTurma = ${idTurma}
    AND WEEK(p.dtRegistro) = WEEK(NOW());`

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function plotarPicosHoje(idTurma) {
    var instrucao = `SELECT
    time(p.dtRegistro) AS DataHoraRegistro,
    COUNT(p.id) AS QuantidadeRegistrosZero
  FROM
    Pontuacao p
    INNER JOIN UsuarioAluno u ON p.fkAluno = u.id
    JOIN Turma ON u.fkTurma = Turma.id
  WHERE
    u.fkTurma = ${idTurma}
    AND p.pontos = 0
    AND DATE(p.dtRegistro) = CURDATE()
    AND p.dtRegistro BETWEEN Turma.inicio AND Turma.fim
  GROUP BY
    time(p.dtRegistro)
  ORDER BY
    time(p.dtRegistro);`

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function plotarPicosSemana(idTurma) {
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

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function visualizarAlunosTurma(idTurma) {
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