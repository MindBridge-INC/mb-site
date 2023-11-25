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

var idSala = [];
var listaSala = [];

function listarSalas() {
    var idInst = sessionStorage.ID_INST;

    fetch(`/painelMaquina/listarSalas/${idInst}`,).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {

                console.log('Resposta listarTurmas ', JSON.stringify(resposta));

                if (resposta.length > 0) {
          
                    for (var i = 0; i < resposta.length; i++) {
                        var salaAtual = resposta[i];
                        listaSala.push(salaAtual.nome);
                        idSala.push(salaAtual.id)
                        selectSala.innerHTML += `
                                <option value="${salaAtual.id}">${salaAtual.nome}</option>
                            `
                        
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

var idMaquina = [];
var listaMaquina = [];

function listarMaquinas() {
    var idSala = selectSala.value;

    
    selectMaquina.innerHTML = `<option disabled selected>Máquina</option>`;

    fetch(`/painelMaquina/listarMaquinas/${idSala}`).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log('Resposta listarMaquinas ', JSON.stringify(resposta));

                if (resposta.length > 0) {
                    for (var i = 0; i < resposta.length; i++) {
                        var maquinaAtual = resposta[i];
                        listaMaquina.push(maquinaAtual.hostname);
                        idMaquina.push(maquinaAtual.id);
                        selectMaquina.innerHTML += `
                            <option value="${maquinaAtual.id}">${maquinaAtual.hostname}</option>
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

var armazenamentoTotal = 0;

function exibirInfoMaquina() {
    var idMaquina = selectMaquina.value

    fetch(`/painelMaquina/exibirInfoMaquina/${idMaquina}`,).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {

                console.log('Resposta exibirInfo ', JSON.stringify(resposta));

                if (resposta.length > 0) {
                    nomeMaquina.innerHTML = `${resposta[0].hostname}`
                    sistOp.innerHTML = `${resposta[0].sistemaOperacional}`
                    processador.innerHTML = `${resposta[0].processador}`
                    armazenamento.innerHTML =  `${resposta[0].armazenamento} GB`
                    ram.innerHTML = `${resposta[0].ram} GB`
                    armazenamentoTotal = resposta[0].armazenamento
                    exibirAlertasDia()
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

var alertasArm = 0;

function exibirAlertasDia() {
    var idMaquina = selectMaquina.value
    var idInst = sessionStorage.ID_INST;

    fetch(`/painelMaquina/exibirAlertasDia/${idMaquina}/${idInst}`,).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {

                console.log('Resposta exibirInfo ', JSON.stringify(resposta));

                if (resposta.length > 0) {
                    alertasArm = resposta[0].total
                    exibirAlertasDia2()
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

function exibirAlertasDia2() {
    var idMaquina = selectMaquina.value
    var idInst = sessionStorage.ID_INST;

    fetch(`/painelMaquina/exibirAlertasDia2/${idMaquina}/${idInst}`,).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {

                console.log('Resposta exibirInfo ', JSON.stringify(resposta));

                if (resposta.length > 0) {
                    var alertasTotal = resposta[0].total
                    alertasDia.innerHTML = `${alertasTotal + alertasArm}`
                    plotarGraficoArmazenamento()
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

var armazenamentoUsado = 0
var armazenamentoLivre = 0

function plotarGraficoArmazenamento() {
    var idMaquina = selectMaquina.value;

    fetch(`/painelMaquina/plotarGraficoArmazenamento/${idMaquina}`).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log('Resposta exibirInfo ', JSON.stringify(resposta));

                if (resposta.length > 0) {
                    armazenamentoUsado = resposta[0].armUsado;
                    armazenamentoLivre = armazenamentoTotal - resposta[0].armUsado;
                    console.log(`${armazenamentoLivre}`);

                 criarGraficoArmazenamento();
                 plotarGraficoCPU()
                }
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    }).catch(function (error) {
        console.error(`Erro na obtenção dos dados: ${error.message}`);
    });
}

function plotarGraficoCPU() {
    var idMaquina = selectMaquina.value;

    fetch(`/painelMaquina/plotarGraficoCPU/${idMaquina}`).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {

                console.log('Resposta plotarGrafico ', JSON.stringify(resposta));

                // Limpar dados antigos no gráfico
                myChartCPU.data.labels = [];
                myChartCPU.data.datasets[0].data = [];

                for (var i = 0; i < resposta.length; i++) {
                    var dataRegistro = new Date(resposta[i].dtRegistro);
                    var formattedTime = dataRegistro.getHours() + ':' + (dataRegistro.getMinutes() < 10 ? '0' : '') + dataRegistro.getMinutes();
                    var dataFormatada = dataRegistro.getDate() + '/' + (dataRegistro.getMonth() + 1) + '/' + dataRegistro.getFullYear();

                    myChartCPU.data.labels.push(formattedTime);
                    myChartCPU.data.datasets[0].data.push(resposta[i].usoProcessador);
                } 
               
                myChartCPU.update();
                plotarGraficoRAM()
                diaCPU.innerHTML = "Último registro: " + dataFormatada


            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    }).catch(function (error) {
        console.error(`Erro na obtenção dos dados: ${error.message}`);
    });
}

// setInterval(plotarGraficoCPU, 1000)

function plotarGraficoRAM() {
    var idMaquina = selectMaquina.value;

    fetch(`/painelMaquina/plotarGraficoRAM/${idMaquina}`).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {

                console.log('Resposta plotarGrafico ', JSON.stringify(resposta));

                // Limpar dados antigos no gráfico
                myChartRAM.data.labels = [];
                myChartRAM.data.datasets[0].data = [];

                for (var i = 0; i < resposta.length; i++) {
                    var dataRegistro = new Date(resposta[i].dtRegistro);
                    var formattedTime = dataRegistro.getHours() + ':' + (dataRegistro.getMinutes() < 10 ? '0' : '') + dataRegistro.getMinutes();
                    var dataFormatada = dataRegistro.getDate() + '/' + (dataRegistro.getMonth() + 1) + '/' + dataRegistro.getFullYear();

                    myChartRAM.data.labels.push(formattedTime);
                    myChartRAM.data.datasets[0].data.push(resposta[i].usoRam);
                } 
               
                myChartRAM.update();
                diaRAM.innerHTML = "Último registro: " + dataFormatada
                console.log(dataFormatada)


            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    }).catch(function (error) {
        console.error(`Erro na obtenção dos dados: ${error.message}`);
    });
}

// setInterval(plotarGraficoRAM, 1000)


