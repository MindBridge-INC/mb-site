var idUsuarios = [];
var listaUsuarios = [];


function listarUsuario() {
    var idInst = sessionStorage.ID_INST

    fetch(`/crudSala/listarUsuario/${idInst}`,).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {

                console.log('Resposta listarUsuario ', JSON.stringify(resposta));

                if (resposta.length > 0) {

                    for (var i = 0; i < resposta.length; i++) {
                        var usuarioAtual = resposta[i];

                        divNome.innerHTML += `
                            <div style="display: flex; align-items: center; justify-content: start; gap: 2vh; height: 8vh;">
                                <span class="dadosCadastrados">${usuarioAtual.nome}</span>
                            </div>
                            `
                        divSobrenome.innerHTML += `
                            <span style=" display: flex;align-items: center;justify-content: start; height: 8vh;" class="dadosCadastrados">
                                ${usuarioAtual.sobrenome}
                            </span>
                            `
                            divEmail.innerHTML += `
                            <span style=" display: flex;align-items: center;justify-content: start; height: 8vh;" class="dadosCadastrados">
                                ${usuarioAtual.email}
                            </span>
                            `
                            divSenha.innerHTML += `
                            <span style=" display: flex;align-items: center;justify-content: start; height: 8vh;" class="dadosCadastrados">
                                ${usuarioAtual.senha}
                            </span>
                            `
                            divTipo.innerHTML += `
                            <span style=" display: flex;align-items: center;justify-content: start; height: 8vh;" class="dadosCadastrados">
                                ${usuarioAtual.tipo}
                            </span>
                            `
                     
                        divAcaoBotoes.innerHTML += `
                            <div style="display: flex; align-items: center; justify-content: start; gap: 2vh; height: 8vh;">
                                <a href="./editarUsuario.html" onclick="guardarIdUsuario(${usuarioAtual.id})"><img src="./img/icone_editar.png" width="20%"></a>
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
                iptSobrenome = response[0].sobrenome;
                iptEmail = response[0].email;
                iptSenha = response[0].senha;
                iptTipo = response[0].tipo;
                setTimeout(() => {
                    document.getElementById('selSala').value = 1;
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
    var sobrenome = iptSobrenome;
    var email = iptEmail;
    var senha = iptSenha;
    var tipo = iptTipo;
    
    if (nome == "" || sobrenome == "" || email == "" || senha == "" || tipo == "") {
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
            tipoServer: tipo
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
            iptSobrenome.value = "";
            iptEmail .value = "";
            iptSenha.value = "";
            iptTipo.value = "";

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
    var tipo = iptTipo.value;

    if (nome == "" || sobrenome == "" || email == "" || senha == "" || tipo == "") {
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

    fetch("/crudUsuario/editar", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
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
