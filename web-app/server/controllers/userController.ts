import bcrypt from 'bcryptjs';
import supabase from '../../build/web-app/server/models/supa.js';
import { Express, RequestHandler } from 'express';

const userController: { [key: string]: RequestHandler } = {
  createUser: async (req, res, next) => {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);

    console.log('USERCONTROLLER.TS CREATEUSER');

    try {
      const { data, error } = await supabase
        .from('user')
        .insert({ user_email: email, user_password: hashedPassword })
        .select()

      res.locals.user = data;
      res.locals.userID = data[0].id;

      return next()

    }

    catch (error) {

      return next({
        log: 'Error in userController.createUser',
        status: 400,
        message: { err: 'Create User Error' + error.message },
      });
    }

  },

  verifyUser: async (req, res, next) => {

    const { email, password } = req.body;

    try {
      // const user = await User.findOne({ email });
      // if (!user) {
      //   res.locals.authenticate = false;
      //   return next();
      // } else {
      //   const isMatch = await bcrypt.compare(password, user.password);
      //   res.locals.authenticate = isMatch;
      //   res.locals.userID = user._id.toString();
      //   return next();
      // }

      const { data, error } = await supabase
        .from('user')
        .select()
        .eq('user_password', password)

      console.log(data, '<--- data');

      return next();
    } catch (error) {
      return next({
        log: 'Error in userController.verifyUser',
        status: 400,
        message: { err: 'Error verifying user' },
      });
    }
  },

  getUser: async (req, res, next) => {

    const userid = req.cookies.ssid;

    console.log('inside getUser');

    try {
      // const user = await user.findone({ _id: userid });
      const { data, error } = await supabase
        .from('user')
        .select()
        .eq('id', userid)

      res.locals.user = data;
      return next();
    } catch (error) {
      return next({
        log: 'error in usercontroller.getuser',
        status: 400,
        message: { err: 'error getting user' },
      });
    }
  },

  checkDuplicate: async (req, res, next) => {

  },

  addProject: async (req, res, next) => {

  },

  deleteProject: async (req, res, next) => {

  },
};

export default userController;
