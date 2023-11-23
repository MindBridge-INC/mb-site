var idAluno = sessionStorage.ID_USUARIO;
var nomeAluno = `${sessionStorage.NOME_USUARIO} ${sessionStorage.SOBRENOME_USUARIO}`
var matricula = `${sessionStorage.MATRICULA} - ${sessionStorage.NOME_TURMA}`

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

function carregarInfoAluno() {
    spanNomeAluno.innerHTML = nomeAluno
    spanMatricula.innerHTML = matricula
}

function listarMensagens() {
    var idTurma = sessionStorage.ID_TURMA;
    divContainerChat.innerHTML = "";

    fetch(`/painelAluno/listarMensagens/${idTurma}`,).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {

                // console.log('Resposta listarMensagens ', JSON.stringify(resposta));

                if (resposta.length > 0) {

                    for (var i = 0; i < resposta.length; i++) {
                        var msgAtual = resposta[i];

                        if (Number(msgAtual.idAluno) == Number(idAluno)) {
                            // console.log("ADSBDFSGDUHSADVSKJDBASJDKSDMASKDNBASKJDASKJDNASNDSDNASKDNAKLDNASKLDNASDKLNASDKLANSDAKLD: " + idAluno);
                            divContainerChat.innerHTML += `
                            <div id="${msgAtual.idMsg}" class="containerMsg" style="justify-content: end !important">
                                <div class="abc" style="background-color: #ffeccb" >
                                    <div class="username">
                                        
                                        <div class="msgHorario">
                                            <span>${msgAtual.dtEnvio}</span>
                                        </div>
                                    </div>
                                    <div class="msg" style="">
                                        <span>${msgAtual.mensagem}</span>
                                    </div>
                                </div>
                            </div>
                            `
                        } else {
                            divContainerChat.innerHTML += `
                            <div id="${msgAtual.idMsg}" class="containerMsg">
                                <div class="abc">
                                    <div class="username">
                                        <div>
                                            <span>${msgAtual.nome} ${msgAtual.sobrenome}</span>
                                        </div>
                                        <div class="msgHorario">
                                            <span>${msgAtual.dtEnvio}</span>
                                        </div>
                                    </div>
                                    <div class="msg">
                                        <span>${msgAtual.mensagem}</span>
                                    </div>
                                </div>
                            </div>
                            `
                        }
                    }

                    var element = document.querySelector('#divContainerChat');

                    element.scrollTop = element.scrollHeight;
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

function enviarMensagem() {
    var mensagem = iptMensagem.value;

    if (mensagem == "" || mensagem == null || mensagem.endsWith(' ')) {
        Swal.fire({
            title: 'Você não pode enviar uma mensagem vazia!',
            icon: 'error',
            timer: 3000,
            toast: true,
            position: 'top-end',
            showConfirmButton: false
        })
        iptMensagem.value = "";
        return false;
    }

    fetch("/painelAluno/enviarMensagem", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            mensagemServer: mensagem,
            idAlunoServer: idAluno
        })
    }).then(function (resultado) {
        // console.log("resposta:", resultado);

        if (resultado.ok) {
            // Swal.fire({
            //     title: 'Cadastro Efetuado!',
            //     icon: 'success',
            //     timer: 10000,
            //     toast: true,
            //     position: 'top-end',
            //     showConfirmButton: false
            // })
            listarMensagens();
            iptMensagem.value = "";
        }
        else {
            Swal.fire({
                title: 'Houve um erro ao enviar a mensagem!',
                icon: 'error',
                timer: 3000,
                toast: true,
                position: 'top-end',
                showConfirmButton: false
            })
        }

    }).catch(function (erro) {
        console.log(`#ERRO ${erro}`)
    })

}

function intervaloChat() {
    setInterval(listarMensagens, 5000)
}

function mostrarPontuacaoHoje() {
    var idUsuario = sessionStorage.ID_USUARIO;

    fetch(`/painelAluno/mostrarPontuacaoHoje/${idUsuario}`,).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {

                console.log('Resposta mostrarPontuacaoHoje ', JSON.stringify(resposta));

                if (resposta.length > 0) {
                    if(resposta[0].pontos == null){
                        pontuacaoHoje.innerHTML += `0`
                    }else{
                        pontuacaoHoje.innerHTML += `${resposta[0].pontos}`
                    }
                        
                        if(resposta[0].pontos >= 0 && resposta[0].pontos <= 20){
                            circuloPontuacaoHoje.style.border = "18px solid #c24229"
                        } else if (resposta[0].pontos <= 40){
                            circuloPontuacaoHoje.style.border = "18px solid #eeb758"
                        } else {
                            circuloPontuacaoHoje.style.border = "18px solid #39692d"
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

var pontosMeta = 0

function mostrarPontuacaoSemana() {
    var idUsuario = sessionStorage.ID_USUARIO;

    fetch(`/painelAluno/mostrarPontuacaoSemana/${idUsuario}`,).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {

                console.log('Resposta mostrarPontuacaoSemana ', JSON.stringify(resposta));

                if (resposta.length > 0) {
                    
                    var pontosSemana = 0;

                    for(var i = 0 ; i < resposta.length; i++ ){
                        console.log("estou no for")
                        pontosSemana += resposta[i].pontos
                        if(resposta[i].dataSemana == 0){
                            console.log("estou no if")
                            pontosSemana += resposta[i].pontos
                            pontosMeta += resposta[i].pontos
                            break
                        }

                    }

                    pontuacaoSemana.innerHTML += `${resposta[0].pontos}`

                        if(resposta[0].pontos >= 0 && resposta[0].pontos <= 120){
                            circuloPontuacaoSemana.style.border = "18px solid #c24229"
                        } else if (resposta[0].pontos <= 240){
                            circuloPontuacaoSemana.style.border = "18px solid #eeb758"
                        } else {
                            circuloPontuacaoSemana.style.border = "18px solid #39692d"
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

var pontuacao = 0;

function mostrarEstrelinhas() {
    var idUsuario = sessionStorage.ID_USUARIO;

    fetch(`/painelAluno/mostrarEstrelinhas/${idUsuario}`,).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {

                console.log('Resposta mostrarEstrelinhas ', JSON.stringify(resposta));

                if (resposta.length > 0) {
                    pontuacao = resposta[0].pontos;

                    if(resposta[0].pontos == null){
                        estrelinhas.innerHTML += `0`
                        
                    }else{
                        estrelinhas.innerHTML += `${resposta[0].pontos}`
                        
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

function desbloquearEmblemas(){
    setTimeout(() => {
        if(pontuacao >= 5000){
            emblemaAmarelo.style.opacity = ""
        } 
        
        if (pontuacao >= 10000){
            emblemaAmarelo.style.opacity = ""
            emblemaVermelho.style.opacity = ""
        }
    
        if ( pontuacao >= 20000){
            emblemaAmarelo.style.opacity = ""
            emblemaVermelho.style.opacity = ""
            emblemaVerde.style.opacity = ""
        }
    
        if ( pontuacao >= 50000){
            emblemaAmarelo.style.opacity = ""
            emblemaVermelho.style.opacity = ""
            emblemaVerde.style.opacity = ""
            emblemaAzul.style.opacity = ""
    
        }
      }, "1000");


}

function desbloquearInventário(){
    setTimeout(() => {
        if(pontuacao >= 5000){
            inv1.style.opacity = ""
        } 
        if(pontuacao >= 10000){
            inv1.style.opacity = ""
            inv2.style.opacity = ""
        } 
        if(pontuacao >= 15000){
            inv1.style.opacity = ""
            inv2.style.opacity = ""
            inv3.style.opacity = ""
        } 
        if(pontuacao >= 20000){
            inv1.style.opacity = ""
            inv2.style.opacity = ""
            inv3.style.opacity = ""
            inv4.style.opacity = ""
        } 
        if(pontuacao >= 25000){
            inv1.style.opacity = ""
            inv2.style.opacity = ""
            inv3.style.opacity = ""
            inv4.style.opacity = ""
            inv5.style.opacity = ""
        } 
        if(pontuacao >= 30000){
            inv1.style.opacity = ""
            inv2.style.opacity = ""
            inv3.style.opacity = ""
            inv4.style.opacity = ""
            inv5.style.opacity = ""
            inv6.style.opacity = ""
        } 
        if(pontuacao >= 35000){
            inv1.style.opacity = ""
            inv2.style.opacity = ""
            inv3.style.opacity = ""
            inv4.style.opacity = ""
            inv5.style.opacity = ""
            inv6.style.opacity = ""
            inv7.style.opacity = ""
        } 
        if(pontuacao >= 40000){
            inv1.style.opacity = ""
            inv2.style.opacity = ""
            inv3.style.opacity = ""
            inv4.style.opacity = ""
            inv5.style.opacity = ""
            inv6.style.opacity = ""
            inv7.style.opacity = ""
            inv8.style.opacity = ""
        } 
        if(pontuacao >= 45000){
            inv1.style.opacity = ""
            inv2.style.opacity = ""
            inv3.style.opacity = ""
            inv4.style.opacity = ""
            inv5.style.opacity = ""
            inv6.style.opacity = ""
            inv7.style.opacity = ""
            inv8.style.opacity = ""
            inv9.style.opacity = ""
        } 
      }, "1000");


}

function plotarGrafico() {
    var idUsuario = sessionStorage.ID_USUARIO;

    fetch(`/painelAluno/plotarGrafico/${idUsuario}`).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {

                console.log('Resposta plotarGrafico ', JSON.stringify(resposta));

                for (var i = 0; i < resposta.length; i++) {
                    var dataRegistro = new Date(resposta[i].dtRegistro);
                    var formattedDate = (dataRegistro.getMonth() + 1) + '/' + dataRegistro.getDate();

                    labels.push(formattedDate);
                    dados.datasets[0].data.push(resposta[i].pontos);
                }
               
                myChart.update();
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
    .catch(function (error) {
        console.error(`Erro na obtenção dos dados: ${error.message}`);
    });
}

function alertaMetaSemana(){
    setTimeout(() => {
        if(pontosMeta >= 0 && pontosMeta <= 100){
            Swal.fire({
                title: `Faltam ${350 - pontosMeta} pontos! Ainda é bastante, mas vamos conseguir!`,
                icon: 'error',
                timer: 10000,
                toast: true,
                position: 'top-end',
                showConfirmButton: false
            }) 
        } else if( pontosMeta <= 299){
            Swal.fire({
                title: `Faltam ${350 - pontosMeta} pontos! Está quase atingindo a meta!`,
                icon: 'warning',
                timer: 10000,
                toast: true,
                position: 'top-end',
                showConfirmButton: false
            }) 
        } else {
            Swal.fire({
                title: `Parabéns! Você atingiu sua meta semanal! Vamos comemorar`,
                icon: 'success',
                timer: 10000,
                toast: true,
                position: 'top-end',
                showConfirmButton: false
            }) 
        }
    },2000)
    
    
}
