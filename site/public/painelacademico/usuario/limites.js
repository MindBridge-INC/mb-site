

// function editar() {
//     var valorCPU = CPULimite.value;
//     var valorRAM = RAMLimite.value;
//     var valorDisco = discoLimite.value;
//     var idInstituicao = sessionStorage.ID_INST;

//     if (valorCPU == "" || valorRAM == "" || valorDisco == "" || idInstituicao == null) {
//         Swal.fire({
//             title: 'Preencha todos os campos!',
//             icon: 'error',
//             timer: 3000,
//             toast: true,
//             position: 'top-end',
//             showConfirmButton: false
//         })
//         return false;
//     }

//     fetch("/crudLimites/editar", {
//         method: "PUT",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//             CPUServer: valorCPU,
//             RAMServer: valorRAM,
//             discoServer: valorDisco,
//             idInstServer: idInstituicao
//         })
//     }).then(function (resultado) {
//         console.log("resposta:", resultado);

//         if (resultado.ok) {
//             Swal.fire({
//                 title: 'Edição efetuada!',
//                 icon: 'success',
//                 timer: 10000,
//                 toast: true,
//                 position: 'top-end',
//                 showConfirmButton: false
//             })

//             setTimeout(function () {
//                visualizar();
//             }, 1500);
//         }
//         else {
//             Swal.fire({
//                 title: 'Houve um erro ao realizar a edição!',
//                 icon: 'error',
//                 timer: 3000,
//                 toast: true,
//                 position: 'top-end',
//                 showConfirmButton: false
//             })
//         }

//     }).catch(function (erro) {
//         console.log(`#ERRO ${erro}`)
//     })

// }

function visualizar() {
    var idInstituicao = sessionStorage.ID_INST;

    fetch(`/crudLimites/visualizar/${idInstituicao}`,).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {

                console.log('Resposta mostrarMaquinasLigadas ', JSON.stringify(resposta));

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