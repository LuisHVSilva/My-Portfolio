// services/emailService.js
const nodemailer = require('nodemailer');

// Sensitive datas
const { email } = require('../sensitiveData/config');

const transporter = nodemailer.createTransport({
    host: 'smtp-mail.outlook.com',
    port: '587',
    secure: false,
    auth: {
        user: email.account,
        pass: email.password
    }
});

const sendEmailConfirmation = (recipient, confirmationCode) => {
    const mailOptions = {
        from: email.account,
        to: recipient,
        subject: 'Confirmação de Cadastro',
        html: `<p>Obrigado por se cadastrar! Use o código abaixo para confirmar sua conta:</p>
               <p>Código de Confirmação: ${confirmationCode}</p>`
    };

    transporter.sendMail(mailOptions).then(console.log('Email enviado')).catch(error => console.error('Email não enviado: ' + error));

    const adminMailOptions = {
        from: email.account,
        to: 'coderluissilva@gmail.com',
        subject: 'Usuário tentando se cadastrar',
        html: `<p>Usuário tem o email ${recipient}</p>`
    }

    transporter.sendMail(adminMailOptions).then(console.log('Email enviado')).catch(error => console.error('Email não enviado: ' + error));
}

module.exports = sendEmailConfirmation;

