var idTurmas = [];
var listaTurmas = [];


function listarTurmas() {
    var idInst = sessionStorage.ID_INST

    fetch(`/crudTurma/listarTurmas/${idInst}`,).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {

                console.log('Resposta listarTurmas ', JSON.stringify(resposta));

                if (resposta.length > 0) {

                    for (var i = 0; i < resposta.length; i++) {
                        var turmaAtual = resposta[i];

                        divNome.innerHTML += `
                            <div style="display: flex; align-items: center; justify-content: start; gap: 2vh; height: 8vh;">
                                <span class="dadosCadastrados">${turmaAtual.nome}</span>
                            </div>
                            `
                        divAno.innerHTML += `
                            <span style=" display: flex;align-items: center;justify-content: start; height: 8vh;" class="dadosCadastrados">
                                ${turmaAtual.ano}
                            </span>
                            `
                            divPeriodo.innerHTML += `
                            <span style=" display: flex;align-items: center;justify-content: start; height: 8vh;" class="dadosCadastrados">
                                ${turmaAtual.periodo}
                            </span>
                            `
                            divInicio.innerHTML += `
                            <span style=" display: flex;align-items: center;justify-content: start; height: 8vh;" class="dadosCadastrados">
                                ${turmaAtual.inicio}
                            </span>
                            `
                            divFim.innerHTML += `
                            <span style=" display: flex;align-items: center;justify-content: start; height: 8vh;" class="dadosCadastrados">
                                ${turmaAtual.fim}
                            </span>
                            `
                        if (turmaAtual.statSist == 1) {
                            divStatus.innerHTML += `
                                <span style=" display: flex;align-items: center;justify-content: start; height: 8vh;" class="dadosCadastrados">
                                    Ativo
                                </span>
                            `
                        } else {
                            divStatus.innerHTML += `
                                <span style=" display: flex;align-items: center;justify-content: start; height: 8vh;" class="dadosCadastrados">
                                    Inativo
                                </span>
                            `
                        }

                        divAcaoBotoes.innerHTML += `
                            <div style="display: flex; align-items: center; justify-content: start; gap: 2vh; height: 8vh;">
                                <a href="./editarTurma.html" onclick="guardarIdSala(${salaAtual.id})"><img src="./img/icone_editar.png" width="20%"></a>
                            </div>
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

function guardarIdTurma(id) {
    sessionStorage.GUARDAR_ID_TURMA = id;
}

function trazerDados(id) {
    fetch(`/crudTurma/trazerDados/${id}`,).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {

                console.log('Resposta trazerDados', JSON.stringify(resposta));

                iptNome.value = resposta[0].nome;
                iptAno.value = resposta[0].ano;
                iptPeriodo.value = resposta[0].periodo;
                iptInicio.value = resposta[0].inicio;
                iptFim.value = resposta[0].fim;
                iptStatus.value = resposta[0].status;
                setTimeout(() => {
                    document.getElementById('selTurma').value = 1;
                }, "500")
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados: ${error.message}`);
        });
}

function cadastrar() {
    var nome = iptNome.value;
    var ano = iptAno.value
    var periodo = iptPeriodo.value
    var inicio = iptInicio.value
    var fim = iptFim.value
    var status = iptStatus
    
    if (nome == "" || ano == "" || periodo == "" || inicio == "" || fim == "" || status == "") {
        Swal.fire({
            title: 'Preencha todos os campos!',
            icon: 'error',
            timer: 3000,
            toast: true,
            position: 'top-end',
            showConfirmButton: false
        })
        return false;
    }

    fetch("/crudTurma/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nomeServer: nome,
            anoServer: ano,
            periodoServer:periodo,
            inicioServer: inicio,
            fimServer:fim,
            statusServer:status
        })
    }).then(function (resultado) {
        console.log("resposta:", resultado);

        if (resultado.ok) {
            Swal.fire({
                title: 'Cadastro Efetuado!',
                icon: 'success',
                timer: 10000,
                toast: true,
                position: 'top-end',
                showConfirmButton: false
            })

            iptNome.value = "";
            iptAno.value = "";
            iptPeriodo.value = "";
            iptInicio.value = "";
            iptFim.value = "";
            iptStatus.value = "";

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

function editar() {
    var idTurma = sessionStorage.GUARDAR_ID_TURMA;
    var nome = iptNome.value;
    var ano = iptAno.value
    var periodo = iptPeriodo.value
    var inicio = iptInicio.value
    var fim = iptFim.value
    var status = iptStatus.value

    if (idTurma == "" || nome == "" || ano == "" || periodo == "" || inicio == "" || fim == "" || status == "") {
        Swal.fire({
            title: 'Preencha todos os campos!',
            icon: 'error',
            timer: 3000,
            toast: true,
            position: 'top-end',
            showConfirmButton: false
        })
        return false;
    }

    fetch("/crudTurma/editar", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nomeServer: nome,
            anoServer: ano,
            periodoServer: periodo,
            inicioServer: inicio,
            fimServer: fim,
            statusServer: status
        })
    }).then(function (resultado) {
        console.log("resposta:", resultado);

        if (resultado.ok) {
            Swal.fire({
                title: 'Edição efetuada!',
                icon: 'success',
                timer: 10000,
                toast: true,
                position: 'top-end',
                showConfirmButton: false
            })

            setTimeout(function () {
                window.location = "./aluno.html";
            }, 1500);
        }
        else {
            Swal.fire({
                title: 'Houve um erro ao realizar a edição!',
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

