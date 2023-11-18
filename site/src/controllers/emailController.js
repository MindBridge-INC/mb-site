const emailService = require('../services/emailService');

function sendMail(req, res){
    emailService.sendMail(req.body, res);
}
function sendMailTelegram(req, res){
    emailService.sendMailTelegram(req.body, res);
}

function sendMailTelegramChamado(req, res){
    emailService.sendMailTelegramChamado(req.body, res);
}


module.exports = {
    sendMail,
    sendMailTelegram,
    sendMailTelegramChamado
}
