const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) =>{
    sgMail.send({
        to: email,
        from : 'alirazapu43@gmail.com',
        subject : 'Thanks for joining in!',
        text : 'welcome to the app,' + name + '. Let me know how you get along with the app.'
    })
}

const sendCancelEmail = (email, name) =>{
    sgMail.send({
        to : email,
        from : 'alirazapu43@gmail.com',
        subject : 'Sorry to see ypu go!',
        text : 'Goodbye, '+name+ '. I hope to see you sometime soon  .'
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancelEmail
}

// sgMail.send({
//     to : 'alirazapu43@gmail.com',
//     from : 'alirazapu43@gmail.com',
//     subject : 'This is my first creatioon',
//     text : 'I hope this one actually get you'
// })