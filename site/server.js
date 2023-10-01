const express = require('express');
const bodyParser = require('body-parser');
const {sendMail} = require('./public/js/smtp.js');


const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

// Rota para lidar com o envio de emails
app.post('/email/sendmail', (req, res) => {
  const formData = req.body;

  // Chame a função sendMail para enviar o email
  sendMail(formData, res);
});

app.get('/', (req, res)=>{
res.sendFile(`${__dirname}/public/index.html`)
} )

app.use(express.static('public'))

