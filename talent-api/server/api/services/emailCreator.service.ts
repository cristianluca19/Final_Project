import '../../common/env';
import mail from 'mailgun-js';
import mailTemplate from '../templates/mail.template';
let mailGunConfig;
let sendMail;
if (
  process.env.MAILGUN_APIKEY &&
  process.env.MAILGUN_DOMAIN &&
  process.env.LINK
) {
  mailGunConfig = mail({
    apiKey: process.env.MAILGUN_APIKEY,
    domain: process.env.MAILGUN_DOMAIN,
  });

  sendMail = function mailSender(to, uuid) {
    const mailOptions = {
      from: 'talenthenry2020@gmail.com',
      to: to,
      subject: 'Talent Support',
      html: mailTemplate(process.env.LINK, uuid),
    };
    mailGunConfig.messages().send(mailOptions, (err, data) => {
      if (err) console.log('Error => ', err);
    });
  };
}
export default sendMail;
