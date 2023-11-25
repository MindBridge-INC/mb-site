var idTurmas = [];
var listaTurmas = [];

function listarSalas() {
    var idInst = sessionStorage.ID_INST;

    fetch(`/painelMaquina/listarSalas/${idInst}`,).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {

                console.log('Resposta listarSalas ', JSON.stringify(resposta));

                if (resposta.length > 0) {
          
                    for (var i = 0; i < resposta.length; i++) {
                        var salaAtual = resposta[i];
                        //listaSala.push(salaAtual.nome);
                        //idSala.push(salaAtual.id)
                        selSala.innerHTML += `
                                <option value="${salaAtual.id}">${salaAtual.nome}</option>
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

function visualizarMaquinasTotal(idInst) {
    fetch(`/crudMaquinas/visualizarMaquinasTotal/${idInst}`,).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {

                console.log('Resposta listarMaquinas ', JSON.stringify(resposta));

                if (resposta.length > 0) {

                    for (var i = 0; i < resposta.length; i++) {
                        var maquinaAtual = resposta[i];

                        divNome.innerHTML += `
                            <div style="display: flex; align-items: center; justify-content: start; gap: 2vh; height: 8vh;">
                                <span class="dadosCadastrados">${maquinaAtual.hostname}</span>
                            </div>
                            `

                        if (maquinaAtual.fkSala == null) {
                            divSala.innerHTML += `
                            <span style=" display: flex;align-items: center;justify-content: start; height: 8vh;" class="dadosCadastrados">
                                Não alocada
                            </span>
                            `
                        } else {
                            divSala.innerHTML += `
                            <span style=" display: flex;align-items: center;justify-content: start; height: 8vh;" class="dadosCadastrados">
                                ${maquinaAtual.fkSala}
                            </span>
                            `
                        }

                        if (maquinaAtual.statSist == 1) {
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
                            <a onclick="guardarIdMaquina(${maquinaAtual.id})" style="display: none;
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
                            " href="./editarMaquina.html">
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

function visualizarMaquinas(idSala) {

    fetch(`/crudMaquinas/visualizarMaquinas/${idSala}`,).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {

                console.log('Resposta listarMaquinas ', JSON.stringify(resposta));

                if (resposta.length > 0) {

                    for (var i = 0; i < resposta.length; i++) {
                        var maquinaAtual = resposta[i];

                        divNome.innerHTML += `
                            <div style="display: flex; align-items: center; justify-content: start; gap: 2vh; height: 8vh;">
                                <span class="dadosCadastrados">${maquinaAtual.hostname}</span>
                            </div>
                            `

                        if (maquinaAtual.fkSala == null) {
                            divSala.innerHTML += `
                            <span style=" display: flex;align-items: center;justify-content: start; height: 8vh;" class="dadosCadastrados">
                                Não alocada
                            </span>
                            `
                        } else {
                            divSala.innerHTML += `
                            <span style=" display: flex;align-items: center;justify-content: start; height: 8vh;" class="dadosCadastrados">
                                ${maquinaAtual.fkSala}
                            </span>
                            `
                        }

                        if (maquinaAtual.statSist == 1) {
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
                            <a onclick="guardarIdMaquina(${maquinaAtual.id})" style="display: none;
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
                            " href="./editarMaquina.html">
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

function guardarIdMaquina(id) {
    sessionStorage.GUARDAR_ID_MAQUINA = id;
}

function trazerDados(id) {

    iptNome.innerHTML = "CADEEEEEEEEEE"

    fetch(`/crudMaquinas/trazerDados/${id}`,).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {

                console.log('Resposta trazerDados', JSON.stringify(resposta));

                    iptNome.value = resposta[0].hostname
                    iptSO.value = resposta[0].sistemaOperacional
                    iptCPU.value = resposta[0].processador
                    iptRAM.value = resposta[0].ram + ' GB'
                    iptArm.value = resposta[0].armazenamento + ' GB'
                
                if (resposta[0].fkSala != null) {
                    setTimeout(() => {
                        document.getElementById('selSala').value = resposta[0].fkSala;
                    }, "1500")
                }
                
                setTimeout(() => {
                    document.getElementById('selStatus').value = resposta[0].statSist;
                }, "1500")

            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados: ${error.message}`);
        });
}


function editar() {
    var idMaquina = sessionStorage.GUARDAR_ID_MAQUINA;
    var idSala = Number(document.getElementById("selSala").value);
    var status = Number(document.getElementById("selStatus").value);

    if (idSala == null || status == null) {
        Swal.fire({
            title: 'Houve um erro, por favor, tente novamente!',
            icon: 'error',
            timer: 3000,
            toast: true,
            position: 'top-end',
            showConfirmButton: false
        })
        return false;
    }

    fetch("/crudMaquinas/editar", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            idMaquinaServer: idMaquina,
            idSalaServer: idSala,
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
                window.location = "./máquina.html";
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

function mudarSala() {
    var selectBox = document.getElementById("selSala");
    var selectedValue = selectBox.options[selectBox.selectedIndex].value;
    divNome.innerHTML = "";
    divSala.innerHTML = "";
    divStatus.innerHTML = "";
    divAcaoBotoes.innerHTML = "";
    visualizarMaquinas(selectedValue);
}