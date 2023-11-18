// services/emailService.js
const nodemailer = require('nodemailer');

// Sensitive datas
const { EMAIL } = require('../sensitiveData/config');

const transporter = nodemailer.createTransport({
    host: EMAIL.HOST,
    port: EMAIL.PORT,
    secure: false,
    auth: {
        user: EMAIL.ACCOUNT,
        pass: EMAIL.PASSWORD
    }
});

const sendEmailConfirmation = (recipient, confirmationCode) => {
    const mailOptions = {
        from: EMAIL.ACCOUNT,
        to: recipient,
        subject: 'Confirmação de Cadastro',
        html: `<p>Obrigado por se cadastrar! Use o código abaixo para confirmar sua conta:</p>
               <p>Código de Confirmação: ${confirmationCode}</p>`
    };

    transporter.sendMail(mailOptions).then(console.log('Email enviado')).catch(error => console.error('Email não enviado: ' + error));

    const adminMailOptions = {
        from: EMAIL.ACCOUNT,
        to: 'coderluissilva@gmail.com',
        subject: 'Usuário tentando se cadastrar',
        html: `<p>Usuário tem o email ${recipient}</p>`
    }

    transporter.sendMail(adminMailOptions).then(console.log('Email enviado')).catch(error => console.error('Email não enviado: ' + error));
}

module.exports = sendEmailConfirmation;

