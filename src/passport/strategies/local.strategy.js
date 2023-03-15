import { Strategy } from 'passport-local';
import jwt from 'jsonwebtoken';
import { userService } from '../../services';

require('dotenv').config();

const jwtsecret = process.env.JWTSECRET;

const config = {
  usernameField: 'email',
  passwordField: 'password',
};

const local = new Strategy(config, async (email, password, done) => {
  try {
    const user = await userService.checkUser(email, password);
    const token = jwt.sign(
      { type: 'JWT', userId: user[0].user_id, userEmail: email },
      jwtsecret,
      {
        expiresIn: '1h',
      },
    );

    done(null, token);
  } catch (error) {
    done(error);
  }
});

export default local;
