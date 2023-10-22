var URL = 'https://viacep.com.br/ws';

async function buscarEndereco() {
  var cep = iptCEP.value;
  var endereco = await getEndereco(cep);
  iptLograd.value = endereco.logradouro;
  iptCidade.value = endereco.localidade;
  iptBairro.value = endereco.bairro;
  iptEstado.value = endereco.uf;


  async function getEndereco(cep) {
    var resposta = await fetch(`${URL}/${cep}/json`);
    var json = await resposta.json();
    return json;
  }

}

function sucesso() {
  //Recupere o valor da nova input pelo nome do id
  // Agora vá para o método fetch logo abaixo
  var nomeRespVar = iptNomeResp.value;
  var sobrenomeRespVar = iptSobrenome.value;
  var emailVar = iptEmail.value;

  if (
    nomeRespVar == "" ||
    emailVar == "" ||
    sobrenomeRespVar == ""
  ) {
    Swal.fire({
      title: 'Campos em branco!',
      icon: 'error',
      timer: 3000, // Tempo de exibição do toast em milissegundos
      toast: true,
      position: 'top-end',
      showConfirmButton: false
  })
    return false
  } 
  
  else {
// Enviando o valor da nova input
fetch("/usuarios/cadastrar", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    // crie um atributo que recebe o valor recuperado aqui
    // Agora vá para o arquivo routes/usuario.js
    nomeServer: nomeRespVar,
    sobrenomeServer: sobrenomeRespVar,
    emailServer: emailVar
  }),
}).then(function(resultado){
  console.log("resposta:", resultado);

  if(resultado.ok){
    Swal.fire({
      title: 'Cadastro Efetuado!',
      icon: 'success',
      timer: 10000, // Tempo de exibição do toast em milissegundos
      toast: true,
      position: 'top-end',
      showConfirmButton: false
    })

  } 
  else {
    Swal.fire({
      title: 'Houve um erro ao realizar o cadastro!',
      icon: 'error',
      timer: 3000, // Tempo de exibição do toast em milissegundos
      toast: true,
      position: 'top-end',
      showConfirmButton: false
  })
  }

}).catch(function (erro){
  console.log(`#ERRO ${erro}`)
})
  }
  
}


function sucesso2() {
  //Recupere o valor da nova input pelo nome do id
  // Agora vá para o método fetch logo abaixo
  //Instituição de ensino.
  var nomeEscolaVar = iptNomeEscola.value;
  var telefoneVar = iptTelefone.value;
  var modalidadeVar = iptModalidade.value;
  var cnpjVar = iptCNPJ.value;
  var cepVar = iptCEP.value;
  var logradouroVar = iptLograd.value;
  var numeroVar = iptNum.value;
  var bairroVar = iptBairro.value
  var complementoVar = iptComp.value;
  var cidadeVar = iptCidade.value;
  var estadoVar = iptEstado.value
  if (
    nomeEscolaVar == "" ||
    telefoneVar == "" ||
    modalidadeVar == "" ||
    cnpjVar == "" ||
    cepVar == "" ||
    logradouroVar == "" ||
    numeroVar == "" ||
    bairroVar == "" ||
    cidadeVar == "" ||
    estadoVar == ""
  ) {
    Swal.fire({
      title: 'Campos em branco!',
      icon: 'error',
      timer: 3000, // Tempo de exibição do toast em milissegundos
      toast: true,
      position: 'top-end',
      showConfirmButton: false
  })
    return false
  } 
  
  else {
    fetch("/usuarios/cadastrarEscola", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // Instituição de ensino
        nomeEscolaServer: nomeEscolaVar,
        telefoneServer: telefoneVar,
        modalidadeServer: modalidadeVar,
        cnpjServer: cnpjVar,
        cepServer: cepVar,
        logradouroServer: logradouroVar,
        numeroServer: numeroVar,
        bairroServer: bairroVar,
        complementoServer: complementoVar,
        cidadeServer: cidadeVar,
        estadoServer: estadoVar
      })
    }) .then(function(resultado){
      console.log("resposta:", resultado);

      if(resultado.ok){
        Swal.fire({
          title: 'Cadastro Efetuado!',
          icon: 'success',
          timer: 10000, // Tempo de exibição do toast em milissegundos
          toast: true,
          position: 'top-end',
          showConfirmButton: false
        })

        setTimeout(() => {
          window.location = "../index.html"
        }, "3000");

      } 
      else {
        Swal.fire({
          title: 'Houve um erro ao realizar o cadastro!',
          icon: 'error',
          timer: 3000, // Tempo de exibição do toast em milissegundos
          toast: true,
          position: 'top-end',
          showConfirmButton: false
      })
      }

    }).catch(function (erro){
      console.log(`#ERRO ${erro}`)
    })
  }
  

  }


