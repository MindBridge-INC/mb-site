var idTurmas = [];
var listaTurmas = [];

function listarTurmas() {
    var idInst = sessionStorage.ID_INST;

    fetch(`/crudAlunos/listarTurmas/${idInst}`,).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {

                console.log('Resposta listarTurmas ', JSON.stringify(resposta));

                if (resposta.length > 0) {

                    for (var i = 0; i < resposta.length; i++) {
                        var turmaAtual = resposta[i];
                        listaTurmas.push(turmaAtual.nome);
                        idTurmas.push(turmaAtual.id)
                        selTurma.innerHTML += `
                                <option value="${turmaAtual.id}">${turmaAtual.nome}</option>
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

function visualizarAlunos(idTurma) {

    fetch(`/crudAlunos/visualizar/${idTurma}`,).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {

                console.log('Resposta listarTurmas ', JSON.stringify(resposta));

                if (resposta.length > 0) {

                    for (var i = 0; i < resposta.length; i++) {
                        var alunoAtual = resposta[i];

                        divNome.innerHTML += `
                            <div style="display: flex; align-items: center; justify-content: start; gap: 2vh; height: 8vh;">
                               
                                <span class="dadosCadastrados">${alunoAtual.nome} ${alunoAtual.sobrenome}</span>
                            </div>
                            `
                        divMatricula.innerHTML += `
                            <span style=" display: flex;align-items: center;justify-content: start; height: 8vh;" class="dadosCadastrados">
                                ${alunoAtual.matricula}
                            </span>
                            `
                        divTurma.innerHTML += `
                            <span style=" display: flex;align-items: center;justify-content: start; height: 8vh;" class="dadosCadastrados">
                                ${alunoAtual.nomeTurma}
                            </span>
                            `
                        divEmail.innerHTML += `
                            <span style=" display: flex;align-items: center;justify-content: start; height: 8vh;" class="dadosCadastrados">
                                ${alunoAtual.email}
                            </span>
                            `
                        if (alunoAtual.statSist == 1) {
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
                            <a onclick="guardarIdAluno(${alunoAtual.id})" style="display: none;
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
                            " href="./editarAluno.html">
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

function guardarIdAluno(id) {
    sessionStorage.GUARDAR_ID_ALUNO = id;
}

function trazerDados(id) {
    fetch(`/crudAlunos/trazerDados/${id}`,).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {

                console.log('Resposta trazerDados', JSON.stringify(resposta));

                iptNome.value = resposta[0].nome;
                iptSobrenome.value = resposta[0].sobrenome;
                iptMatricula.value = resposta[0].matricula;
                iptEmail.value = resposta[0].email;
                setTimeout(() => {
                    document.getElementById('selTurma').value = resposta[0].fkTurma;
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
    var sobrenome = iptSobrenome.value
    var matricula = iptMatricula.value
    var email = iptEmail.value
    var senha = iptSenha.value
    var idTurma = Number(document.getElementById("selTurma").value);

    if (nome == "" || sobrenome == "" || matricula == "" || email == "" || senha == "" || idTurma == null) {
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

    fetch("/crudAlunos/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nomeServer: nome,
            sobrenomeServer: sobrenome,
            matriculaServer: matricula,
            emailServer: email,
            senhaServer: senha,
            idTurmaServer: idTurma
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
            iptMatricula.value = "";
            iptEmail.value = "";
            iptSenha.value = "";

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
    var idAluno = sessionStorage.GUARDAR_ID_ALUNO;
    var nome = iptNome.value;
    var sobrenome = iptSobrenome.value
    var email = iptEmail.value
    var idTurma = Number(document.getElementById("selTurma").value);

    if (idAluno == "" || nome == "" || sobrenome == "" || email == "" || idTurma == null) {
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

    fetch("/crudAlunos/editar", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            idAlunoServer: idAluno,
            nomeServer: nome,
            sobrenomeServer: sobrenome,
            emailServer: email,
            idTurmaServer: idTurma
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

function mudarTurma() {
    var selectBox = document.getElementById("selTurma");
    var selectedValue = selectBox.options[selectBox.selectedIndex].value;
    divNome.innerHTML = "";
    divMatricula.innerHTML = "";
    divTurma.innerHTML = "";
    divEmail.innerHTML = "";
    divStatus.innerHTML = "";
    divAcaoBotoes.innerHTML = "";
    visualizarAlunos(selectedValue);
}