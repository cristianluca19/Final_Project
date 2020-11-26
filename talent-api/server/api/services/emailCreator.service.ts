import mail from 'mailgun-js';
import '../../common/env';
const mailGun = mail({
  apiKey: process.env.MAILGUN_APIKEY,
  domain: process.env.MAILGUN_DOMAIN,
});

function mailCreator(to, uuid) {
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
  if (process.env.NODE_ENV !== 'ci') {
    mailGun.messages().send(mailOptions, (err, data) => {
      if (err) console.log('Error => ', err);
      else {
        console.log(`
      Email sent sucsessfully to ${to}!!
      More details:`);
        console.log(data);
      }
    });
    return true;
  } else return false;
}
export default mailCreator;
