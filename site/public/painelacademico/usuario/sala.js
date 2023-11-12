var idSalas = [];
var listaSalas = [];


function listarSala() {
    var idInst = sessionStorage.ID_INST

    fetch(`/crudSala/listarSala/${idInst}`,).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {

                // console.log('Resposta listarSala ', JSON.stringify(resposta));

                if (resposta.length > 0) {

                    for (var i = 0; i < resposta.length; i++) {
                        var salaAtual = resposta[i];

                        divNome.innerHTML += `
                            <div style="display: flex; align-items: center; justify-content: start; gap: 2vh; height: 8vh;">
                                <span class="dadosCadastrados">${salaAtual.nome}</span>
                            </div>
                            `
                        divAndar.innerHTML += `
                            <span style=" display: flex;align-items: center;justify-content: start; height: 8vh;" class="dadosCadastrados">
                                ${salaAtual.andar}
                            </span>
                            `

                        if (salaAtual.statSist == 1) {
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
                            <a onclick="guardarIdSala(${salaAtual.id})" style="display: none;
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
                            " href="./editarSala.html">
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

function guardarIdSala(id) {
    sessionStorage.GUARDAR_ID_SALA = id;
}

function trazerDados(id) {
    fetch(`/crudSala/trazerDados/${id}`,).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {

                // console.log('Resposta trazerDados', JSON.stringify(resposta));

                iptNome.value = resposta[0].nome;
                iptAndar.value = resposta[0].andar;
                // iptStatus.value = resposta[0].status;
                // setTimeout(() => {
                //     document.getElementById('selSala').value = 1;
                // }, "500")
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
    var andar = iptAndar.value
    var idInst = sessionStorage.ID_INST;

    if (nome == "" || andar == "" || idInst == "") {
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

    fetch("/crudSala/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nomeServer: nome,
            andarServer: andar,
            idInstServer: idInst
        })
    }).then(function (resultado) {
        // console.log("resposta:", resultado);

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
            iptAndar.value = "";
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
    var idSala = sessionStorage.GUARDAR_ID_SALA;
    var nome = iptNome.value;
    var andar = iptAndar.value
    // var status = iptStatus.value

    if (nome == "" || andar == ""  || idSala == "") {
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

    fetch("/crudSala/editar", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nomeServer: nome,
            andarServer: andar,
            idSalaServer: idSala
            // statusServer: status
        })
    }).then(function (resultado) {
        // console.log("resposta:", resultado);

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
                window.location = "./sala.html";
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

