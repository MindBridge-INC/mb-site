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

function mostrarNomeInstituicao(){
    var idInstituicao = sessionStorage.ID_INST;

    fetch(`/relatorio/mostrarNomeInstituicao/${idInstituicao}`,).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {

                console.log('Resposta mostrarNomeInstituicao ', JSON.stringify(resposta));

                if (resposta.length > 0) {
                    spanNomeInstituicao.innerHTML = `${resposta[0].nome}`
                    // setTimeout(() => {
                    //     gerarPDF()    
                    // }, 1000);
                       
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

function mostrarNumMaquinasArmazenamento80() {
    var idInstituicao = sessionStorage.ID_INST;

    fetch(`/relatorio/mostrarNumMaquinasArmazenamento80/${idInstituicao}`,).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {

                console.log('Resposta mostrarNumMaquinasArmazenamento80 ', JSON.stringify(resposta));

                if (resposta.length > 0) {
                    spanArmazenamento.innerHTML = `${resposta[0].total}`
                    // setTimeout(() => {
                    //     gerarPDF()    
                    // }, 1000);
                       
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

function mostrarMaquinasCPULimite() {
    var idInstituicao = sessionStorage.ID_INST;

    fetch(`/relatorio/mostrarMaquinasCPULimite/${idInstituicao}`,).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {

                console.log('Resposta CPU ', JSON.stringify(resposta));

                if (resposta.length > 0) {
                    spanCPU.innerHTML = `${resposta[0].total}`
                    // setTimeout(() => {
                    //     gerarPDF()    
                    // }, 1000);
                       
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

function mostrarMaquinasRAMLimite() {
    var idInstituicao = sessionStorage.ID_INST;

    fetch(`/relatorio/mostrarMaquinasRAMLimite/${idInstituicao}`,).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {

                console.log('Resposta mostrarMaquinasRAMLimite ', JSON.stringify(resposta));

                if (resposta.length > 0) {
                    spanRAM.innerHTML = `${resposta[0].total}`
                    
                       
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

function visualizarAlertas() {
    var idInstituicao = sessionStorage.ID_INST;
    
    fetch(`/relatorio/visualizarAlertas/${idInstituicao}`).then(function (response) {
            if (response.ok) {
                
                if (response.status != 204) {
                    response.json().then(function (resposta) {
                        console.log('Resposta visualizarAlertas ', JSON.stringify(resposta));
    
                        if (resposta.length > 0) {
                            const dataHoraFormatada = ""
                            for (var i = 0; i < resposta.length; i++) {
                                var alertaAtual = resposta[i];
    
                                divMaquina.innerHTML += `
                                    <span style="font-family:'Arimo'; font-size: 2vh; font-weight: 700; color: #2e2d2d; height: 3vh;" >${alertaAtual.maquina}</span>
                                `;
                                
                                divComponente.innerHTML += `
                                    <span style="font-family:'Arimo'; font-size: 2vh; font-weight: 700; color: #2e2d2d; height: 3vh;" >${alertaAtual.ocorrencia}</span>
                                `;
    
                                divTipo.innerHTML += `
                                    <span style="font-family:'Arimo'; font-size: 2vh; font-weight: 700; color: #2e2d2d; height: 3vh;" >${alertaAtual.classificacao}</span>
                                `;
                                  
                                divData.innerHTML += `
                                <span style="font-family:'Arimo'; font-size: 2vh; font-weight: 700; color: #2e2d2d; height: 3vh;">
                                    ${alertaAtual.dtRegistro}
                                </span>
                                `;
                            } 
                        }
                    });
                } else {
                    console.log("O resultado retornou vazio")
                }

                
            } else {
                console.error('Nenhum dado encontrado ou erro na API');
            }
        })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados: ${error.message}`);
        });
}

function visualizarAlertasArm() {
    var idInstituicao = sessionStorage.ID_INST;
    
    fetch(`/relatorio/visualizarAlertasArm/${idInstituicao}`).then(function (response) {
            if (response.ok) {

                if (response.status != 204) {

                response.json().then(function (resposta) {
                    console.log('Resposta visualizarAlertas ', JSON.stringify(resposta));

                    if (resposta.length > 0) {
                        
                        for (var i = 0; i < resposta.length; i++) {
                            var alertaAtual = resposta[i];

                            divMaquina2.innerHTML += `
                                <span style="font-family:'Arimo'; font-size: 2vh; font-weight: 700; color: #2e2d2d; height: 3vh;" >${alertaAtual.maquina}</span>
                            `;
                            
                            divComponente2.innerHTML += `
                                <span style="font-family:'Arimo'; font-size: 2vh; font-weight: 700; color: #2e2d2d; height: 3vh;" >Disco</span>
                            `;

                            divTipo2.innerHTML += `
                                <span style="font-family:'Arimo'; font-size: 2vh; font-weight: 700; color: #2e2d2d; height: 3vh;" >${alertaAtual.classificacao}</span>
                            `;
                            divData2.innerHTML += `
                            <span style="font-family:'Arimo'; font-size: 2vh; font-weight: 700; color: #2e2d2d; height: 3vh;">
                                ${new Date(alertaAtual.dtRegistro).toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' }).replace(/,/g, ' -')}
                            </span>
                            `;
                        }
                        setTimeout(() => {
                            gerarPDF()    
                        }, 1000);

                    }
                });

            } else {
                console.log("O resultado retornou vazio")
            }

            } else {
                console.error('Nenhum dado encontrado ou erro na API');
            }
        })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados: ${error.message}`);
        });
}