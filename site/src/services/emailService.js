const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'mindbridgeatendimento@gmail.com',
        pass: 'ctskwiisakkpjjvv'
    }
});

function sendMail(form, res){
    transport.sendMail({
        from: `${form.from}`,
        to: 'mindbridgeatendimento@gmail.com',
        subject: `Mensagem de ${form.responsableName}`,
        html: `
            <h1>Responsável: ${form.responsableName}</h1>
            <p>De: ${form.messege}</p>
            <p>De: ${form.from}</p>
        `
    })
    .then(() => res.send("Email sent"))
    .catch((err) => console.log(err))
    sendMail2(form, res);
}

function sendMail2(form, res){
transport.sendMail({
    from: `${form.from}mindbridgeatendimento@gmail.com`,
    to: `${form.from}`,
    subject: `MindBridge - Mensagem Recebida`,
    html: `
    <p style="color: black" >Olá ${form.responsableName}, Sua mensagem foi enviada com sucesso! Aguarde e logo mais um representante da MindBridge irá entrar em contato para mais informações.
    </p>
    <p style="color: black" >Abraços, MindBridge</p>
    <div style="display: flex; align-items: center;">
    
    </div>
    `
})
.then(() => res.send("Email sent"))
.catch((err) => console.log(err))
}
function sendMail2(form, res){
  transport.sendMail({
      from: `${form.from}mindbridgeatendimento@gmail.com`,
      to: `${form.from}`,
      subject: `MindBridge - Mensagem Recebida`,
      html: `
      <p style="color: black" >Olá ${form.responsableName}, Sua mensagem foi enviada com sucesso! Aguarde e logo mais um representante da MindBridge irá entrar em contato para mais informações.
      </p>
      <p style="color: black" >Abraços, MindBridge</p>
      <div style="display: flex; align-items: center;">
      
      </div>
      `
  })
  .then(() => res.send("Email sent"))
  .catch((err) => console.log(err))
  }
  function sendMailTelegram(clienteNome,clienteId,res){
    transport.sendMail({
        
        to: 'mindbridgeatendimento@gmail.com',
        subject: `Captação de Lead - ${clienteNome}`,
        html: `
            <h1>Captação de Lead - ${clienteNome}</h1>
            <p>O cliente com ID: ${clienteId} solicitou mais informações sobre o PayAttention!</p>
        `
    })
    .then(() => console.log("email passou aqui")
    // res.send("Email sent")
    )
    .catch((err) => console.log(err))
    // sendMail2(form, res);
}

function sendMailTelegramChamado(clienteNome,clienteId,problema, res){

    if (problema == 4) {
        transport.sendMail({
        
            to: 'mindbridgeatendimento@gmail.com',
            subject: `Abertura de Chamado -Falha no collector- ${clienteNome}`,
            html: `
                <h1>Abertura de Chamado - ${clienteNome}</h1>
                <p>O cliente com ID: ${clienteId} fez a abertura de um chamado</p>
                <p>Entar em contato para o reestabelecimento das coletas </p>
                 
            `
        })
        .then(() => console.log("Chamado aberto"))
        .catch((err) => console.log(err)) 
    }else{
        transport.sendMail({
        
            to: 'mindbridgeatendimento@gmail.com',
            subject: `Abertura de Chamado - ${clienteNome}`,
            html: `
                <h1>Abertura de Chamado -Falha nas Dashboards- ${clienteNome}</h1>
                <p>O cliente com ID: ${clienteId} fez a abertura de um chamado</p>
                <p>Dashborads apresentam falhas no cliente</p>
                 
            `
        })
        .then(() => console.log("Chamado aberto"))
        .catch((err) => console.log(err))
    }
    
    
}

module.exports = {
    sendMail,
    sendMailTelegram,
    sendMailTelegramChamado
}
