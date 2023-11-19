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


module.exports = {
    sendMail
}