var usuarioModel = require("../models/usuarioModel");
// var aquarioModel = require("../models/aquarioModel");

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {
        
        usuarioModel.autenticar(email, senha)
            .then(
                function (resultado) {
                    console.log(`\nResultados encontrados: ${resultado.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

                    if (resultado.length == 1) {
                        console.log(resultado);
                        res.json(resultado[0]);
                    } else if (resultado.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}
function autenticar2(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {
        
        usuarioModel.autenticar2(email, senha)
            .then(
                function (resultado) {
                    console.log(`\nResultados encontrados: ${resultado.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

                    if (resultado.length == 1) {
                        console.log(resultado);
                        res.json(resultado[0]);
                    } else if (resultado.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nome = req.body.nomeServer;
    var sobrenome = req.body.sobrenomeServer;
    var email = req.body.emailServer;

    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (sobrenome == undefined) {
        res.status(400).send("Seu sobrenome está undefined!");
    } 
        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrar(nome, email, sobrenome)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }


    function cadastrarEscola(req, res) {
        // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
        // Atributos Instituição de Ensino
        var nomeEscola = req.body.nomeEscolaServer;
        var telefone = req.body.telefoneServer;
        var modalidade = req.body.modalidadeServer;
        var cnpj = req.body.cnpjServer;
        var cep = req.body.cepServer;
        var logradouro = req.body.logradouroServer;
        var numero = req.body.numeroServer;
        var bairro = req.body.bairroServer;
        var complemento = req.body.complementoServer;
        var cidade = req.body.cidadeServer;
        var estado = req.body.estadoServer;
        
    
        // Faça as validações dos valores
        if (nomeEscola == undefined) {
            res.status(400).send("Nome da escola está undefined!");
        }else if (telefone == undefined) {
            res.status(400).send("Telefone está undefined!");
        }else if (modalidade == undefined) {
            res.status(400).send("Modalidade de ensino está undefined!");
        }else if (cnpj == undefined) {
            res.status(400).send("CNPJ está undefined!");
        }else if (cep == undefined) {
            res.status(400).send("CEP está undefined!");
        }else if (logradouro == undefined) {
            res.status(400).send("Logradouro está undefined!");
        }else if (numero == undefined) {
            res.status(400).send("Número está undefined!");
        }else if (bairro == undefined) {
                res.status(400).send("Bairro está undefined!"); 
        }else if (complemento == undefined) {
            res.status(400).send("Complemento está undefined!");
        }else if (cidade == undefined) {
            res.status(400).send("Cidade está undefined!");
        }else if (estado == undefined) {
            res.status(400).send("Estado está undefined!");
        }
            // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
            usuarioModel.cadastrarEscola(nomeEscola, telefone, modalidade, cnpj, cep, logradouro, numero, bairro, complemento, cidade, estado)
                .then(
                    function (resultado) {
                        res.json(resultado);
                    }
                ).catch(
                    function (erro) {
                        console.log(erro);
                        console.log(
                            "\nHouve um erro ao realizar o cadastro! Erro: ",
                            erro.sqlMessage
                        );
                        res.status(500).json(erro.sqlMessage);
                    }
                );
        }
module.exports = {
    autenticar,
    autenticar2,
    cadastrar,
    cadastrarEscola
}