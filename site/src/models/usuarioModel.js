var database = require("../database/config")

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucao = `
    select idAdmin, nome, senha from UsuarioInstituicao WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}
function autenticar2(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucao = `
    select idALuno, nome, senha from UsuarioAluno WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

//Coloque os mesmos parâmetros aqui. Vá para a var instrucao
function cadastrar(nome, email, sobrenome) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, sobrenome);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `INSERT INTO UsuarioInstituicao (nome, sobrenome, email) VALUES ('${nome}','${sobrenome}', '${email}');`
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function cadastrarEscola(nomeEscola, telefone, modalidade, cnpj, cep, logradouro, numero, complemento, bairro, cidade, estado){
    var instrucao2 = `INSERT INTO InstituicaoEnsino (nomeEscola, CNPJ, CEP, Logradouro, numeroLogradouro, Complemento, Bairro, Cidade, Estado, Telefone, modalidadeEnsino) VALUES ('${nomeEscola}',${cnpj}, ${cep}, '${logradouro}', '${numero}', '${bairro}', '${complemento}', '${cidade}', '${estado}', '${telefone}', '${modalidade}');`
    console.log("Executando a instrução SQL: \n" + instrucao2);
    return database.executar(instrucao2);
}

module.exports = {
    autenticar,
    autenticar2,
    cadastrar,
    cadastrarEscola
};