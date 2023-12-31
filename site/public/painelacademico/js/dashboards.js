var idUsuario = sessionStorage.ID_USUARIO;
// var idInstituicao = sessionStorage.ID_INST;
// var permissaoUsuario = sessionStorage.TIPO_USUARIO;
var nomeUsuario = `${sessionStorage.NOME_USUARIO} ${sessionStorage.SOBRENOME_USUARIO}`
var permissao = `${sessionStorage.TIPO_USUARIO}`

function formatarData(dataString) {
    var data = new Date(dataString);
    var options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Intl.DateTimeFormat('pt-BR', options).format(data);
}

function gerarAlertas() {
    var idInstituicao = sessionStorage.ID_INST;

    fetch(`/painelTecnico/gerarAlertas/${idInstituicao}`)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (resposta) {

                    console.log('Resposta mostrarMaquinasCadastradas ', JSON.stringify(resposta));

                    if (resposta.length > 0) {
                        var dataFormatada = formatarData(resposta[0].dtRegistro);

                        var titulo = `
                            Máquina: ${resposta[0].hostname} - ${resposta[0].nome}
                            Alerta: ${resposta[0].tipo} - ${resposta[0].componente}
                            Data: ${dataFormatada}
                        `;

                        var icone = resposta[0].tipo === "Atenção" ? 'warning' : 'error';

                        Swal.fire({
                            title: titulo,
                            icon: icone,
                            timer: 3000, // Tempo de exibição do toast em milissegundos
                            toast: true,
                            position: 'top-end',
                            showConfirmButton: false
                        });

                        setTimeout(() => {
                            gerarAlertasArm()
                          }, "4000");

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

function gerarAlertasArm() {
    var idInstituicao = sessionStorage.ID_INST;

    fetch(`/painelTecnico/gerarAlertasArm/${idInstituicao}`)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (resposta) {

                    console.log('Resposta mostrarMaquinasCadastradas ', JSON.stringify(resposta));

                    if (resposta.length > 0) {
                        var dataFormatada = formatarData(resposta[0].dtRegistro);

                        var titulo = `
                            Máquina: ${resposta[0].hostname} - ${resposta[0].nome}
                            Alerta: ${resposta[0].tipo} - ${resposta[0].componente}
                            Data: ${dataFormatada}
                        `;

                        var icone = resposta[0].tipo === "Atenção" ? 'warning' : 'error';

                        Swal.fire({
                            title: titulo,
                            icon: icone,
                            timer: 3000, // Tempo de exibição do toast em milissegundos
                            toast: true,
                            position: 'top-end',
                            showConfirmButton: false
                        });

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

setInterval(gerarAlertas, 10000)

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



var NmaquinasCadastradas =0;

function mostrarMaquinasCadastradas() {
    var idInstituicao = sessionStorage.ID_INST;

    fetch(`/painelTecnico/mostrarMaquinasCadastradas/${idInstituicao}`,).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {

                console.log('Resposta mostrarMaquinasCadastradas ', JSON.stringify(resposta));

                if (resposta.length > 0) {
                    maquinasCadastradas.innerHTML = resposta[0].numMaquinas
                    NmaquinasCadastradas = resposta[0].numMaquinas
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

function mostrarMaquinasLigadas() {
    var idInstituicao = sessionStorage.ID_INST;

    fetch(`/painelTecnico/mostrarMaquinasLigadas/${idInstituicao}`,).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {

                console.log('Resposta mostrarMaquinasLigadas ', JSON.stringify(resposta));

                if (resposta.length > 0) {
                    ligadasMaisSemana.innerHTML = resposta[0].numAtivas
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

function mostrarMaquinasDesligadas() {
    var idInstituicao = sessionStorage.ID_INST;

    fetch(`/painelTecnico/mostrarMaquinasDesligadas/${idInstituicao}`,).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {

                console.log('Resposta mostrarMaquinasLigadas ', JSON.stringify(resposta));

                if (resposta.length > 0) {
                    desligadasMaisSemana.innerHTML = resposta[0].numDesligadas
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

var alertasAmarzenamento = 0;

function mostrarAlertasDiaArm() {
    var idInstituicao = sessionStorage.ID_INST;

    fetch(`/painelTecnico/mostrarAlertasDiaArm/${idInstituicao}`,).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {

                console.log('Resposta mostrarAlertasDiaArm ', JSON.stringify(resposta));

                if (resposta.length > 0) {
                    alertasAmarzenamento += resposta[0].total
                    console.log(`${alertasAmarzenamento}`)
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

var alertasTotais = 0;

function mostrarAlertasDiaTotal() {
    var idInstituicao = sessionStorage.ID_INST;

    fetch(`/painelTecnico/mostrarAlertasDiaTotal/${idInstituicao}`,).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {

                console.log('Resposta mostrarAlertasDiaArm ', JSON.stringify(resposta));

                if (resposta.length > 0) {
                    alertasTotais = alertasAmarzenamento + resposta[0].total
                    alertasDia.innerHTML = alertasAmarzenamento + resposta[0].total
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

var numMaquinasArmazenamento80 = 0;

function mostrarNumMaquinasArmazenamento80() {
    var idInstituicao = sessionStorage.ID_INST;

    fetch(`/painelTecnico/mostrarNumMaquinasArmazenamento80/${idInstituicao}`,).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {

                console.log('Resposta mostrarNumMaquinasArmazenamento80 ', JSON.stringify(resposta));

                if (resposta.length > 0) {
                    numMaquinasArmazenamento80 = resposta[0].total
                    console.log(`${resposta[0].total}`)
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


function plotarGraficoCPU() {
    var idInstituicao = sessionStorage.ID_INST;

    fetch(`/painelTecnico/plotarGraficoCPU/${idInstituicao}`).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {

                console.log('Resposta plotarGraficoCPU ', JSON.stringify(resposta));

                for (var i = 0; i < resposta.length; i++) {
                    var data = new Date(resposta[i].dtRegistro);
                    var formattedDate = (data.getDate()) + '/' + (data.getMonth() + 1) + '/' + data.getFullYear();

                    labels2.push(formattedDate);
                    dados2.datasets[0].data.push(resposta[i].total);
                }
               
                myChartCPU.update();
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
    .catch(function (error) {
        console.error(`Erro na obtenção dos dados: ${error.message}`);
    });
}

function plotarGraficoRAM() {
    var idInstituicao = sessionStorage.ID_INST;

    fetch(`/painelTecnico/plotarGraficoRAM/${idInstituicao}`).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {

                console.log('Resposta plotarGraficoRAM ', JSON.stringify(resposta));

                for (var i = 0; i < resposta.length; i++) {
                    var data = new Date(resposta[i].dtRegistro);
                    var formattedDate = (data.getDate()) + '/' + (data.getMonth() + 1) + '/' + data.getFullYear();

                    labels.push(formattedDate);
                    dados.datasets[0].data.push(resposta[i].total);
                }
               
                myChartRAM.update();
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
    .catch(function (error) {
        console.error(`Erro na obtenção dos dados: ${error.message}`);
    });
}




