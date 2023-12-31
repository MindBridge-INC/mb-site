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
                    primeiroLugar.innerHTML = `${resposta[0].titulo}`
                    segundoLugar.innerHTML = `${resposta[1].titulo}`
                    terceiroLugar.innerHTML = `${resposta[2].titulo}`
                    quartoLugar.innerHTML = `${resposta[3].titulo}`
                    quintoLugar.innerHTML = `${resposta[4].titulo}`
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
                    pontuacaoMedia.innerHTML = isNaN(pontos) ? '0' : pontos.toFixed(1);
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
    // Destruir o gráfico existente
    if (myChart) {
        myChart.destroy();
    }

    // Criar um novo gráfico
    const ctx = document.getElementById("myChart");
    var labels = [];
    var dados = {
        labels: labels,
        datasets: [{
            label: 'Pop-ups não Respondidos',
            data: [],
            backgroundColor: '#17395cff',
            borderColor: '#ffffff',
            borderWidth: 0,
            borderRadius: 80,
            barThickness: 30
        }]
    };

    myChart = new Chart(ctx, {
        type: 'bar',
        data: dados,
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        display: false,
                    }
                },
                x: {
                    grid: {
                        display: false,
                    }
                }
            }
        }
    });

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
                    plotarPicosSemana();
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
                    plotarPicosSemana();
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
    // Destruir o gráfico existente
    if (myChart2) {
        myChart2.destroy();
    }

    // Criar um novo gráfico
    const ctx2 = document.getElementById("myChart2");
    var labels2 = [];
    var dados2 = {
        labels: labels2,
        datasets: [{
            label: 'Pop-ups não Respondidos',
            data: [],
            backgroundColor: '#17395c',
            borderColor: '#ffffff',
            borderWidth: 0,
            borderRadius: 80,
            barThickness: 30
        }]
    };

    myChart2 = new Chart(ctx2, {
        type: 'bar',
        data: dados2,
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        display: false,
                    }
                },
                x: {
                    grid: {
                        display: false,
                    }
                }
            }
        }
    });

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
                    visualizarAlunosTurma();
                    return;
                }

                response.json().then(function (resposta) {
                    console.log('Resposta plotarGrafico ', JSON.stringify(resposta));

                  console.log("OIIIIIIIIIIIIIIIEEEEEEEEEEEEEEEE" + resposta)
                    if (resposta == undefined) {
                        console.log("OIIIIIIIIII")
                        myChart2.data.labels.push("00:00:00");
                        myChart2.data.datasets[0].data.push(0);
                    } else {
                        for (var i = 0; i < resposta.length; i++) {
                            myChart2.data.labels.push(resposta[i].DataFormatada);
                            myChart2.data.datasets[0].data.push(resposta[i].qtd_pontos_0);
                        }
                    }

                    myChart2.update();
                    visualizarAlunosTurma();
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






