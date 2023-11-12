var idAluno = sessionStorage.ID_USUARIO;
var nomeAluno = `${sessionStorage.NOME_USUARIO} ${sessionStorage.SOBRENOME_USUARIO}`
var matricula = `${sessionStorage.MATRICULA} - ${sessionStorage.NOME_TURMA}`

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

                console.log('Resposta listarTurmas ', JSON.stringify(resposta));

                if (resposta.length > 0) {

                    for (var i = 0; i < resposta.length; i++) {
                        var msgAtual = resposta[i];

                        if (Number(msgAtual.idAluno) == Number(idAluno)) {
                            console.log("ADSBDFSGDUHSADVSKJDBASJDKSDMASKDNBASKJDASKJDNASNDSDNASKDNAKLDNASKLDNASDKLNASDKLANSDAKLD: " + idAluno);
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
        console.log("resposta:", resultado);

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
                title: 'Houve um erro ao realizar o cadastro!',
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
