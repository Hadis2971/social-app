import Users from '../../database/models/Users';
import nodemailer from 'nodemailer';
import path from 'path';
import hbs from 'nodemailer-express-handlebars';
import { createTokenForPasswordReset } from '../../helpers';
import { serverEmail, emailPassword, emailService } from '../../config';

class ResetPassword {
  constructor () {
    this.forgotPassword = this.forgotPassword.bind(this);
  }

  async _emailSender (userEmail, template, context, res, next) {
    const transporeter = nodemailer.createTransport({
      service: emailService || 'Gmail',
      auth: {
        user: serverEmail,
        pass: emailPassword
      }
    });

    const handlebarsOptions = {
      viewEngine: {
        extName: '.handlebars',
        partialsDir: 'some/path',
        layoutsDir: 'some/path'
      },
      viewPath: path.resolve(`src/public/email_temaplates/`),
      extName: '.handlebars'
    };

    transporeter.use('compile', hbs(handlebarsOptions));

    const mailOptions = {
      to: userEmail,
      subject: 'Forgot Email Help Team',
      template: template,
      context: context
    };

    transporeter.sendMail(mailOptions, (error, result) => {
      if (error) {
        console.log('inside send mail error', error);
        next(error);
      } else {
        console.log('inside send email result', result);
        res.json({
          Email_Sent: 'Success'
        });
      }
    });
  }

  async forgotPassword (req, res, next) {
    const { userEmail } = req.body;
    const user = await Users.findOne({ where: { email: userEmail } });
    if (!user) {
      const context = {
        userEmail
      };
      this._emailSender(userEmail, 'error', context, res, next);
      res.json({ Error: 'Failed To Sent Confirmation Email Please Try Again!!!' });
    } else {
      const token = await createTokenForPasswordReset(user);
      const context = {
        url: `http://localhost:5000/auth/resetPassword/${token}`
      };
      this._emailSender(userEmail, 'forgotPassword', context, res, next, (error) => {
        if (error) {
          next(error);
        } else {
          res.json({ Email_Sent: 'Success' });
        }
      });
    }
  }
}

export default new ResetPassword();
