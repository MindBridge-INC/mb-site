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

var aletasTotais = 0;

function mostrarAlertasDiaTotal() {
    var idInstituicao = sessionStorage.ID_INST;

    fetch(`/painelTecnico/mostrarAlertasDiaTotal/${idInstituicao}`,).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {

                console.log('Resposta mostrarAlertasDiaArm ', JSON.stringify(resposta));

                if (resposta.length > 0) {
                    aletasTotais = alertasAmarzenamento + resposta[0].total
                    alertasDia.innerHTML = `${aletasTotais}`
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



