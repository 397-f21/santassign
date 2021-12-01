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
        text: `SANTAssign\nChristmas is coming up!\nIt's your job to find a gift for:\n${pair[0][0]}`,
        html: `
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com">
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
          <link href="https://fonts.googleapis.com/css2?family=Rochester&display=swap" rel="stylesheet">
        </head>
        <body>
          <div style="width: 100%; height: 100%; min-height: fit-content; background-color: #AF0B26; font-family: sans-serif; text-align: center; color: white;">
            <div style="padding: 0.5em;">
              <h1 style="font-family: 'Rochester', cursive; color:#56a367; font-weight: bold; font-size: 3.5em;">
                SANTA<span style="color: white;">ssign</span>
              </h1>
              
              <h4 style="margin-bottom: 0.1em;">
                Christmas is coming up! <br> 
                It's your job to find a gift for:
              </h4>
      
              <h2>
                ${pair[0][0]}
              </h2>
              ${body.pricelimit ? `<h3>Your spending limit is : $${body.pricelimit} </h3>` : ``}
            </div>
            <img src="https://www.pngkit.com/png/full/857-8570261_bg-footer-snow.png" style="width:100%, filter: drop-shadow(0 0 9px white)">
          </div>
      </body>`,
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