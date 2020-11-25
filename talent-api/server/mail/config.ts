import mail from 'mailgun-js';
const mailGun = mail({
  apiKey: process.env.APIKEY,
  domain: process.env.DOMAIN,
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
  mailGun.messages().send(mailOptions, (err, data) => {
    if (err) console.log('Error => ', err);
    else {
      console.log(`
    Email sent sucsessfully to ${to}!!
    More details:`);
      console.log(data);
    }
  });
}
export default mailCreator;
