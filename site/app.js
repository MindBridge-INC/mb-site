process.env.AMBIENTE_PROCESSO = "desenvolvimento";
// process.env.AMBIENTE_PROCESSO = "producao";

var express = require("express");
var cors = require("cors");
var path = require("path");
var PORTA = process.env.AMBIENTE_PROCESSO == "desenvolvimento" ? 3333 : 8080;

var app = express();

var indexRouter = require("./src/routes/index");
var usuarioRouter = require("./src/routes/usuarios");
var emailRouter = require("./src/routes/email");
var crudAlunosRouter = require("./src/routes/crudAlunos");
var crudSalaRouter = require("./src/routes/crudSala");
var crudTurmaRouter = require("./src/routes/crudTurma");
var painelAlunoRouter = require("./src/routes/painelAluno");
var crudUsuarioRouter = require("./src/routes/crudUsuario");
var painelTecnicoRouter = require("./src/routes/painelTecnico");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());

app.use("/", indexRouter);
app.use("/usuarios", usuarioRouter);
app.use("/email", emailRouter);
app.use("/crudAlunos", crudAlunosRouter);
app.use("/crudSala", crudSalaRouter);
app.use("/crudTurma", crudTurmaRouter);
app.use("/painelAluno", painelAlunoRouter);
app.use("/crudUsuario", crudUsuarioRouter);
app.use("/painelTecnico", painelTecnicoRouter);

app.listen(PORTA, function () {
    console.log(`Servidor do seu site já está rodando! Acesse o caminho a seguir para visualizar: http://localhost:${PORTA} \n
    Você está rodando sua aplicação em Ambiente de ${process.env.AMBIENTE_PROCESSO} \n
    \t\tSe "desenvolvimento", você está se conectando ao banco LOCAL (MySQL Workbench). \n
    \t\tSe "producao", você está se conectando ao banco REMOTO (SQL Server em nuvem Azure) \n
    \t\t\t\tPara alterar o ambiente, comente ou descomente as linhas 1 ou 2 no arquivo 'app.js'`);
});

const env = require('./.env')
const Telegraf = require('telegraf');
const { sendMail, sendMailTelegram, sendMailTelegramChamado } = require("./src/services/emailService");

   const bot = new Telegraf(env.token)

var clienteNome;
   bot.start(content => {
       const from = content.update.message.from
       console.log(from)
       content.reply(`Olá! Eu sou o Clemente, seu assistente!\n
       Digite:\n
       [1]Para saber mais sobre o PayAttention;\n
       [2]Para abrir um chamado\n`)
   })
//    setTimeout(function(){
//     bot.telegram.sendMessage('6923776271',`olá`)
//    },2000)
  
   bot.hears('1', (ctx) => ctx.reply(`A solução PayAttention é um coletor de informações de hardware
voltada exclusivamente para escolas!
A educação e a tecnologia devem ser alidas, assim como nós!
Digite [3] e entraremos em contato contigo\uD83D\uDE01`))

bot.hears('3',(ctx) =>{
    ctx.reply(`
Em breve um consultor @MindBridge ira entar em contato!`)
 clienteId = ctx.message.chat.id
 clienteNome = ctx.message.from.first_name
 sendMailTelegram(clienteNome,clienteId)
    
})
   bot.hears('2', (ctx) => {
    ctx.reply(`Sinto muito pelo seu problema :( 
        Como posso ajudar?
        Digite:
        [4]Para relatar falha ou interrupção do collector;
        [5]Para falhas ou instabilidades nos painéis`)

        console.log("o cliente quer abrir um chamado")
        bot.launch()
    } )
    bot.hears('4',(ctx) => {
        ctx.reply ("ok, descreva seu problema começando com a palavra [chamado]") 
        bot.launch()
        bot.command('chamado',(ctx) => ctx.reply('Hello'))
        clienteId = ctx.message.chat.id
        clienteNome = ctx.message.from.first_name
        var probelma = ctx.message.text
        console.log(probelma)
        sendMailTelegramChamado(clienteNome,clienteId)  
    })
    bot.hears('%chamado%',(ctx) => {
     clienteId = ctx.message.chat.id
     clienteNome = ctx.message.from.first_name
     var probelma = ctx.message.text
     console.log(probelma)
     sendMailTelegramChamado(clienteNome,clienteId)
    })

       
   bot.on('text',(content,next) =>{
    const from = content.update.message.from
    if (content.update.message.text != 1) {
        content.reply(`poxa, não entendi :(
 Digite:
    [1]Para saber mais sobre o PayAttention;
    [2]Para abrir um chamado\n`)
        
    }
   })

   bot.startPolling()

