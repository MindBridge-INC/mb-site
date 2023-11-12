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
                            <a onclick="guardarIdTurma(${turmaAtual.id})" style="display: none;
                            width: 90px;
                            height: 35px;
                            border-radius: 35px;
                            border: 3.5px solid #57769a;
                            background-color: transparent;
                            display: flex;
                            align-items: center;
                            justify-content: space-around;
                            font-family: Arimo;
                            font-size: 1.8vh;
                            font-weight: 700;
                            color: #2e2d2d;
                            cursor: pointer;
                            text-decoration: none;
                            " href="./editarTurma.html">
                                Editar
                            </a>
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
                // iptPeriodo.value = resposta[0].periodo;
                iptInicio.value = resposta[0].inicio;
                iptFim.value = resposta[0].fim;
                // iptStatus.value = resposta[0].status;
                document.getElementById('selPeriodo').value = resposta[0].periodo;
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
    var periodo = document.getElementById("selPeriodo").value;
    var inicio = iptInicio.value;
    var fim = iptFim.value;

    if (idInst = "" || nome == "" || ano == "" || periodo == "" || inicio == "" || fim == "") {
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
            idInstServer: sessionStorage.ID_INST,
            nomeServer: nome,
            anoServer: ano,
            periodoServer: periodo,
            inicioServer: inicio,
            fimServer: fim,
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
            // iptStatus.value = "";

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
    var ano = iptAno.value;
    var periodo = document.getElementById("selPeriodo").value;
    var inicio = iptInicio.value;
    var fim = iptFim.value;
    // var status = iptStatus.value

    if (idTurma == "" || nome == "" || ano == "" || periodo == "" || inicio == "" || fim == "") {
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
            idTurmaServer: idTurma,
            nomeServer: nome,
            anoServer: ano,
            periodoServer: periodo,
            inicioServer: inicio,
            fimServer: fim,
            // statusServer: status
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
                window.location = "./turma.html";
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

