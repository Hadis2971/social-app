import Users from '../../database/models/Users';
import nodemailer from 'nodemailer';
import path from 'path';
import jwt from 'jsonwebtoken';
import hbs from 'nodemailer-express-handlebars';
import authServices from '../auth/authServices';
import { createHash } from '../../helpers';
import { serverEmail, emailPassword, emailService, secretForResetPassword } from '../../config';

class ResetPasswordServices {
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
        next(error);
      } else {
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
      const context = { userEmail };
      this._emailSender(userEmail, 'error', context, res, next);
      res.json({ Error: 'Failed To Sent Confirmation Email Please Try Again!!!' });
    } else {
      const token = await authServices.createTokenForPasswordReset(user);
      const context = { url: `http://localhost:5000/forgotPassword/resetPassword/${token}` };
      this._emailSender(userEmail, 'forgotPassword', context, res, next, (error) => {
        if (error) {
          next(error);
        } else {
          res.json({ Email_Sent: 'Success' });
        }
      });
    }
  }

  createResetPasswordView (req, res, next) {
    const { token } = req.params;
    jwt.verify(token, secretForResetPassword, async (err, decoded) => {
      if (err) {
        return res.json({
          success: false,
          message: 'Token is not valid'
        });
      } else {
        res.render('resetPasswordForm', { userID: decoded.userID });
      }
    });
  }

  async resetPassword (req, res, next) {
    const { userID, newPassword } = req.body;
    const hash = await createHash(newPassword, next);
    const updateResult = await Users.update(
      { password: hash },
      { where: { id: userID } }
    );
    if (updateResult.length > 0) {
      res.render('resetPasswordStatus', { success: true });
    } else {
      res.render('resetPasswordStatus', { success: false });
    }
  }
}

export default new ResetPasswordServices();
