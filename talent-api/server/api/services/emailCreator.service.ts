import mail from 'mailgun-js';
import '../../common/env';
let mailGun;
let mailCreator;
if (
  process.env.MAILGUN_APIKEY &&
  process.env.MAILGUN_DOMAIN &&
  process.env.LINK
) {
  mailGun = mail({
    apiKey: process.env.MAILGUN_APIKEY,
    domain: process.env.MAILGUN_DOMAIN,
  });

  mailCreator = function mailGenerator(to, uuid) {
    const mailOptions = {
      from: 'talenthenry2020@gmail.com',
      to: to,
      subject: 'Talent Support',
      html: `<!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body>
          <div>
              <h3>Folder with candidates</h3>
              <a href=${process.env.LINK}${uuid}> Open folder here </a>
              <p>thanks for doing business with us</p>
          </div>
      </body>
      </html>`,
    };
    mailGun.messages().send(mailOptions, (err, data) => {
      if (err) console.log('Error => ', err);
      else {
        console.log(`
      Email sent sucsessfully to ${to}!!
      More details:`);
        console.log(data);
      }
    });
  };
}
export default mailCreator;
