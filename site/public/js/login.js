function abrirLogin() {
    document.getElementById('backgroundBlur').style.display = 'block';
    aparecerLogin.innerHTML = `
    <section class="alinhamento">
        <section class="paineisLogin">
            <section style="width: 100%; margin-top: -2%; margin-bottom: 3%">
                <a style="margin-left: 85%;" href="javascript:void(0);" onclick="fecharLogin()"><img src="./assets/img/x.png" width="7%"></a>
            </section>
            <section style="display: flex; align-items: center; justify-content: center;">
                <a href="./portalacademico.html" style="margin-left: 7vh;"><img src="./assets/img/painel academico.png" width="80%"></a>
                <a href="./portalaluno.html"><img src="./assets/img/painel aluno.png"  width="80%"></a>
            </section>
        </section>
    </section>
    ` ;
}

function fecharLogin() {
    document.getElementById('backgroundBlur').style.display = 'none';
    aparecerLogin.innerHTML = "";
}



function sucessoAdmin(){
        var emailVar = email_input.value;
        var senhaVar = senha_input.value;

        if (emailVar == "" || senhaVar == "") {
            Swal.fire({
                title: 'Preecha todos os campos!',
                icon: 'error',
                timer: 3000, // Tempo de exibição do toast em milissegundos
                toast: true,
                position: 'top-end',
                showConfirmButton: false
            })
            return false;
        }
        else {
            setInterval(5000)
        }

        console.log("FORM LOGIN: ", emailVar);
        console.log("FORM SENHA: ", senhaVar);

        fetch("/usuarios/autenticar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                emailServer: emailVar,
                senhaServer: senhaVar
            })
        }).then(function (resposta) {
            console.log("ESTOU NO THEN DO entrar()!")

            if (resposta.ok) {
                console.log(resposta);

                resposta.json().then(json => {
                    console.log(json);
                    console.log(JSON.stringify(json));

                    sessionStorage.ID_USUARIO = json.idUser;
                    sessionStorage.NOME_USUARIO = json.nome;
                    sessionStorage.SOBRENOME_USUARIO = json.sobrenome;
                    sessionStorage.TIPO_USUARIO = json.tipo;
                    sessionStorage.ID_INST = json.idInst;
                    var tipoUsuario = sessionStorage.TIPO_USUARIO
                    Swal.fire({
                        title: 'Login Efetuado!',
                        icon: 'success',
                        timer: 10000, // Tempo de exibição do toast em milissegundos
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false
                      })

                    if (tipoUsuario == "Coordenação") {
                        setTimeout(function () {
                            window.location = "./painelacademico/painelacademico.html";
                        }, 1000); // apenas para exibir o loading
                    } else {
                        setTimeout(function () {
                            window.location = "./painelacademico/paineltecnico.html";
                        }, 1000); // apenas para exibir o loading
                    }
                    

                });

            } else {
                Swal.fire({
                    title: 'Houve um erro ao realizar login:<br>E-mail ou senha incorreto',
                    icon: 'error',
                    timer: 10000, // Tempo de exibição do toast em milissegundos
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false
                  })

                console.log("Houve um erro ao tentar realizar o login!");

                resposta.text().then(texto => {
                    console.error(texto);
                });
            }

        }).catch(function (erro) {
            console.log(erro);
        })

        return false;
}

function sucessoAluno(){
    var emailVar = email_input.value;
    var senhaVar = senha_input.value;

    if (emailVar == "" || senhaVar == "") {
        Swal.fire({
            title: 'Preecha todos os campos!',
            icon: 'error',
            timer: 3000, // Tempo de exibição do toast em milissegundos
            toast: true,
            position: 'top-end',
            showConfirmButton: false
        })
        return false;
    }
    else {
        setInterval(5000)
    }

    console.log("FORM LOGIN: ", emailVar);
    console.log("FORM SENHA: ", senhaVar);

    fetch("/usuarios/autenticar2", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            emailServer: emailVar,
            senhaServer: senhaVar
        })
    }).then(function (resposta) {
        console.log("ESTOU NO THEN DO entrar()!")

        if (resposta.ok) {
            console.log(resposta);

            resposta.json().then(json => {
                console.log(json);
                console.log(JSON.stringify(json));

                sessionStorage.NOME_USUARIO = json.nome;
                sessionStorage.SOBRENOME_USUARIO = json.sobrenome;
                sessionStorage.ID_USUARIO = json.idAluno;
                sessionStorage.ID_TURMA = json.idTurma;
                sessionStorage.ID_INST = json.fkInstituicao;
                sessionStorage.MATRICULA = json.matricula;
                sessionStorage.NOME_TURMA = json.nomeTurma;

                Swal.fire({
                    title: 'Login Efetuado!',
                    icon: 'success',
                    timer: 10000, // Tempo de exibição do toast em milissegundos
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false
                  })
                setTimeout(function () {
                    window.location = "./painelaluno/painelaluno.html";
                }, 1000); // apenas para exibir o loading

            });

        } else {
            Swal.fire({
                title: 'Houve um erro ao realizar login:<br>E-mail ou senha incorreto',
                icon: 'error',
                timer: 10000, // Tempo de exibição do toast em milissegundos
                toast: true,
                position: 'top-end',
                showConfirmButton: false
              })

            console.log("Houve um erro ao tentar realizar o login!");

            resposta.text().then(texto => {
                console.error(texto);
            });
        }

    }).catch(function (erro) {
        console.log(erro);
    })

    return false;
}