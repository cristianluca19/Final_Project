const DOMAIN = 'sandbox07c054a06bec41c19432905517039fb3.mailgun.org';
const APIKEY = '3570c64af40cfc0c128270f779aebe71-360a0b2c-9076c742';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const mailGun = require('mailgun-js')({
  apiKey: APIKEY,
  domain: DOMAIN,
});

function mailCreator(to, dataFront) {
  // if (type === "Register"){
  const mailOptions = {
    from: 'talenthenry2020@gmail.com',
    to: to,
    subject: 'Test de mail',
    html: `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Talent mail Test</title>
    </head>
    <body>
        <div>
            <h3>Mail de prueba</h3>
            <p>Henry Talent es una plataforma para conseguir empleo</p>
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
mailCreator('fede4872@gmail.com', null);
// mailCreator('sebalevin@hotmail.com.ar');
module.exports = mailCreator;
