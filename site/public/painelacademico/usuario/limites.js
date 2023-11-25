function visualizar() {
    var idInstituicao = sessionStorage.ID_INST;

    fetch(`/crudLimites/visualizar/${idInstituicao}`,).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {

                console.log('Resposta mostrarLimites ', JSON.stringify(resposta));

                if (resposta.length > 0) {
                    CPULimite.value = `${resposta[0].cpuPorcent}`
                    RAMLimite.value= `${resposta[0].ramPorcent}`
                    discoLimite.value= `${resposta[0].discoPorcent}`
    
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

function editar() {
    var idInst = sessionStorage.ID_INST;
    var valorCPU = Number(CPULimite.value)
    var valorRAM = Number(RAMLimite.value)
    var valorDisco = Number(discoLimite.value)

    if (idInst == "" || valorCPU == "" || valorRAM == "" || valorDisco == "") {
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

    fetch("/crudLimites/editar", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            idInstServer: idInst,
            valorCPUServer: valorCPU,
            valorRAMServer: valorRAM,
            valorDiscoServer: valorDisco,

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