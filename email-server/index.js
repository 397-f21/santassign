const { createTransport } = require('nodemailer');

const sender = 'santassign@gmail.com';
const password = 'christmas@25';

const transporter = createTransport({
  service: 'gmail',
  auth: {
    user: sender,
    pass: password,
  },
});

const transport = (error, { messageId }) =>
  error ? console.log(error) : console.log(messageId);

exports.handler = async (event) => {
    console.log(event);
    if (!event.body) {
        const response = {
            statusCode: 400,
            body: "You forgot the body",
        }
        return response;
    }
    
    const body = JSON.parse(event.body);
    if (!body || !body.pairs) {
      
        const response = {
            statusCode: 400,
            body: "Your body is bad",
        }
        return response;
    }
    
    
    await Promise.all(body.pairs.map(async (pair) => {
      let mailOptions = {
        from: sender,
        to: pair[1][1],
        subject: 'SANTAssign Match',
        text: `Your match: ${pair[0][0]}`,
        html: `<h1>Your match: ${pair[0][0]}</h1>`,
      };
      
      await transporter.sendMail(mailOptions)
        .then((err, info) => 
          err ? console.log(err) : console.log(info));
    }));
    
    const response = {
        statusCode: 200,
        body: "Your mail has been sent",
    };
    return response;
};