var idUsuarios = [];
var listaUsuarios = [];


function listarUsuario() {
    var idInst = sessionStorage.ID_INST

    fetch(`/crudUsuario/visualizar/${idInst}`,).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {

                // console.log('Resposta listarUsuario ', JSON.stringify(resposta));

                if (resposta.length > 0) {

                    for (var i = 0; i < resposta.length; i++) {
                        var usuarioAtual = resposta[i];

                        divNome.innerHTML += `
                            <div style="display: flex; align-items: center; justify-content: start; gap: 2vh; height: 8vh;">
                                <span class="dadosCadastrados">${usuarioAtual.nome} ${usuarioAtual.sobrenome}</span>
                            </div>
                            `
                        divEmail.innerHTML += `
                            <span style=" display: flex;align-items: center;justify-content: start; height: 8vh;" class="dadosCadastrados">
                                ${usuarioAtual.email}
                            </span>
                            `
                        divTipo.innerHTML += `
                            <span style=" display: flex;align-items: center;justify-content: start; height: 8vh;" class="dadosCadastrados">
                                ${usuarioAtual.tipo}
                            </span>
                            `

                        if (usuarioAtual.statSist == 1) {
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
                            <a onclick="guardarIdUsuario(${usuarioAtual.id})" style="display: none;
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
                            " href="./editarUsuario.html">
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

function guardarIdUsuario(id) {
    sessionStorage.GUARDAR_ID_USUARIO = id;
}

function trazerDados(id) {
    fetch(`/crudUsuario/trazerDados/${id}`,).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {


                console.log('Resposta trazerDados', JSON.stringify(resposta));
                iptNome.value = resposta[0].nome;
                iptSobrenome.value = resposta[0].sobrenome;
                iptEmail.value = resposta[0].email;
                document.getElementById("selPermissao").value = resposta[0].tipo;
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
    var sobrenome = iptSobrenome.value;
    var email = iptEmail.value;
    var senha = iptSenha.value;
    var tipo = document.getElementById("selPermissao").value;
    var idInst = sessionStorage.ID_INST

    if (nome == "" || sobrenome == "" || email == "" || senha == "" || tipo == "" || idInst == "") {
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

    fetch("/crudUsuario/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nomeServer: nome,
            sobrenomeServer: sobrenome,
            emailServer: email,
            senhaServer: senha,
            tipoServer: tipo,
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
            iptSobrenome.value = "";
            iptEmail.value = "";
            iptSenha.value = "";
            document.getElementById("selPermissao").value = "";

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
    var idUsuario = sessionStorage.GUARDAR_ID_USUARIO;
    var nome = iptNome.value;
    var sobrenome = iptSobrenome.value;
    var email = iptEmail.value;
    var senha = iptSenha.value;
    var tipo = document.getElementById("selPermissao").value;

    if (nome == "" || sobrenome == "" || email == "" || senha == "" || tipo == "" || idUsuario == "") {
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
    console.log("bhdhasjdkasd;as " + sessionStorage.GUARDAR_ID_USUARIO)
    fetch("/crudUsuario/editar", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            idUsuarioInstServer: sessionStorage.GUARDAR_ID_USUARIO,
            nomeServer: nome,
            sobrenomeServer: sobrenome,
            emailServer: email,
            senhaServer: senha,
            tipoServer: tipo
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
                window.location = "./usuario.html";
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
