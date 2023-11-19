const emailController = require('../controllers/emailController');
const express = require('express');
const router = express.Router();

router.post('/sendmail', (req, res) => {
    emailController.sendMail(req, res);
})

router.post('/sendmailTelegram', (req, res) => {
    emailController.sendMailTelegram(req, res);
})

router.post('/sendmailTelegramChamado', (req, res) => {
    emailController.sendMailTelegramChamado(req, res);
})

module.exports = router;