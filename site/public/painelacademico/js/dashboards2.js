var idUsuario = sessionStorage.ID_USUARIO;
// var idInstituicao = sessionStorage.ID_INST;
// var permissaoUsuario = sessionStorage.TIPO_USUARIO;
var nomeUsuario = `${sessionStorage.NOME_USUARIO} ${sessionStorage.SOBRENOME_USUARIO}`
var permissao = `${sessionStorage.TIPO_USUARIO}`

function carregarInfoUsuario() {
    spanNomeUsuario.innerHTML = nomeUsuario
    spanPermissao.innerHTML = permissao
}


function dataHora(){
    const dataAno = new Date()
    const dia = String(dataAno.getDate()).padStart(2, '0')
    const mes = String(dataAno.getMonth() + 1).padStart(2, '0')
    const ano = dataAno.getFullYear()
    const hora = String(dataAno.getHours()).padStart(2, '0')
    const minutos = String(dataAno.getMinutes()).padStart(2, '0')
    const segundos = String(dataAno.getSeconds()).padStart(2, '0')
    dataAtual.innerHTML = `${dia}/${mes}/${ano} - ${hora}:${minutos}:${segundos}`
    
}
setInterval(dataHora, 10);


var idTurma = [];
var listaTurma = [];

function listarTurmas() {
    var idInst = sessionStorage.ID_INST;

    fetch(`/painelAcademico/listarTurmas/${idInst}`,).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {

                console.log('Resposta listarTurmas ', JSON.stringify(resposta));

                if (resposta.length > 0) {
          
                    for (var i = 0; i < resposta.length; i++) {
                        var turmaAtual = resposta[i];
                        listaTurma.push(turmaAtual.nome);  // Correção aqui
                        idTurma.push(turmaAtual.id);      // Correção aqui
                        selectTurmas.innerHTML += `
                            <option value="${turmaAtual.id}">${turmaAtual.nome}</option>
                        `;
                    }
                }
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados: ${error.message}`);
        });
}

function exibirAlunosMatriculados() {
    var idTurma = selectTurmas.value;

    fetch(`/painelAcademico/exibirAlunosMatriculados/${idTurma}`,).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {

                console.log('Resposta listarTurmas ', JSON.stringify(resposta));

                if (resposta.length > 0) {
                    alunosMatriculados.innerHTML = `${resposta[0].total_alunos}`
                    exibirRanking()
                }
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados: ${error.message}`);
        });
}

function exibirRanking() {
    var idInst = sessionStorage.ID_INST;

    fetch(`/painelAcademico/exibirRanking/${idInst}`,).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {

                console.log('Resposta listarTurmas ', JSON.stringify(resposta));

                if (resposta.length > 0) {
                    primeiroLugar.innerHTML = `${resposta[0].UltimaPalavra}`
                    segundoLugar.innerHTML = `${resposta[1].UltimaPalavra}`
                    terceiroLugar.innerHTML = `${resposta[2].UltimaPalavra}`
                    quartoLugar.innerHTML = `${resposta[3].UltimaPalavra}`
                    quintoLugar.innerHTML = `${resposta[4].UltimaPalavra}`
                    exibirPontuacaoMedia()
                }
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados: ${error.message}`);
        });
}

function exibirPontuacaoMedia() {
    var idTurma = selectTurmas.value;

    fetch(`/painelAcademico/exibirPontuacaoMedia/${idTurma}`,).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {

                console.log('Resposta listarTurmas ', JSON.stringify(resposta));

                if (resposta.length > 0) {
                    pontos = parseFloat(resposta[0].PontuacaoMediaDaSemana);
                    pontuacaoMedia.innerHTML = isNaN(pontos) ? 'Valor inválido' : pontos.toFixed(1);
                    plotarPicosHoje()
                }
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados: ${error.message}`);
        });
}

function plotarPicosHoje() {
    var idTurma = selectTurmas.value;

    fetch(`/painelAcademico/plotarPicosHoje/${idTurma}`)
    .then(function (response) {
        if (response.ok) {
            if (response.status === 204) {
                // Resposta vazia (No Content), tratamento conforme necessário
                console.log('A resposta está vazia (204 No Content)');
                myChart.data.labels = ["00:00:00"];
                myChart.data.datasets[0].data = [0];
                myChart.update();
                visualizarAlunosTurma() 
                return;
            }
            
            response.json().then(function (resposta) {
                console.log('Resposta plotarGrafico ', JSON.stringify(resposta));

                myChart.data.labels = [];
                myChart.data.datasets[0].data = [];

                if (resposta.length === 0) {
                    myChart.data.labels.push("00:00:00");
                    myChart.data.datasets[0].data.push(0);
                } else {
                    for (var i = 0; i < resposta.length; i++) {
                        myChart.data.labels.push(resposta[i].DataHoraRegistro);
                        myChart.data.datasets[0].data.push(resposta[i].QuantidadeRegistrosZero);
                    }
                }

                myChart.update();
                plotarPicosSemana()
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
    .catch(function (error) {
        console.error(`Erro na obtenção dos dados: ${error.message}`);
    });
}

function plotarPicosSemana() {
    var idTurma = selectTurmas.value;

    fetch(`/painelAcademico/plotarPicosSemana/${idTurma}`)
    .then(function (response) {
        if (response.ok) {
            if (response.status === 204) {
                // Resposta vazia (No Content), tratamento conforme necessário
                console.log('A resposta está vazia (204 No Content)');
                myChart2.data.labels = ["00:00:00"];
                myChart2.data.datasets[0].data = [0];
                myChart2.update();
                visualizarAlunosTurma() 
                return;
            }
            
            response.json().then(function (resposta) {
                console.log('Resposta plotarGrafico ', JSON.stringify(resposta));

                myChart2.data.labels = [];
                myChart2.data.datasets[0].data = [];

                if (resposta.length === 0) {
                    myChart2.data.labels.push("00:00:00");
                    myChart2.data.datasets[0].data.push(0);
                } else {
                    for (var i = 0; i < resposta.length; i++) {
                        myChart2.data.labels.push(resposta[i].DataFormatada);
                        myChart2.data.datasets[0].data.push(resposta[i].qtd_pontos_0);
                    }
                }

                myChart2.update();
                visualizarAlunosTurma() 
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
    .catch(function (error) {
        console.error(`Erro na obtenção dos dados: ${error.message}`);
    });
}

function visualizarAlunosTurma() {
    var idTurma = selectTurmas.value;
    
    fetch(`/painelAcademico/visualizarAlunosTurma/${idTurma}`).then(function (response) {
            if (response.ok) {
                response.json().then(function (resposta) {
                    console.log('Resposta visualizarAlertas ', JSON.stringify(resposta));
                    spanNome.innerHTML =`<span
                    style="font-size: 2.5vh; font-weight: 600; color: #2e2d2d; margin-bottom: 1vh;">Nome</span>`
                    spanPontos.innerHTML = `<span
                    style="font-size: 2.5vh; font-weight: 600; color: #2e2d2d; margin-bottom: 1vh;">Pontos</span>`
                    if (resposta.length > 0) {
                        
                        for (var i = 0; i < resposta.length; i++) {
                            var alunoAtual = resposta[i];

                            spanNome.innerHTML += `
                            <span
                                style="font-size: 2.3vh;font-family: 'Arimo'; font-weight: 600; color: #2e2d2d; margin-bottom: 1vh;">${alunoAtual.NomeCompleto}</span>
                            `;
                            
                            spanPontos.innerHTML += `
                            <span style="font-size: 2.3vh;font-family: 'Arimo'; font-weight: 600; color: #2e2d2d; margin-bottom: 1vh;">${alunoAtual.PontosTotal}</span>
                            `;

                            
                        }
                        

                    }
                });
            } else {
                console.error('Nenhum dado encontrado ou erro na API');
            }
        })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados: ${error.message}`);
        });
}






