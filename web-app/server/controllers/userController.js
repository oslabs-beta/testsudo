const { User, Project } = require('../models/mongodb.js');
const bcrypt = require('bcryptjs');

const userController = {};

userController.createUser = async (req, res, next) => {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);
    try {
        const newUser = await User.create({
            email,
            password: hashedPassword,
        });
        res.locals.user = newUser;
        res.locals.userID = newUser._id;
        console.log('new user created is: ', newUser);
        return next();
    } catch (error) {
        return next({
            log: 'Error in userController.createUser',
            status: 400,
            message: { err: 'Create User Error' + error.message },
        });
    }
};

userController.verifyUser = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            res.locals.authenticate = false;
            return next();
        } else {
            const isMatch = await bcrypt.compare(password, user.password);
            res.locals.authenticate = isMatch;
            res.locals.userID = user._id.toString();
            return next();
        }
    } catch (error) {
        return next({
            log: 'Error in userController.verifyUser',
            status: 400,
            message: { err: 'Error verifying user' },
        });
    }
};

userController.getUser = async (req, res, next) => {
    console.log('get user running')
    const userID = req.cookies.ssid;
    console.log('user id is ', userID);
    try {
        const user = await User.findOne({ _id: userID });
        res.locals.user = user;
        return next();
    } catch (error) {
        return next({
            log: 'Error in userController.getUser',
            status: 400,
            message: { err: 'Error getting user' },
        });
    }
}

userController.checkDuplicate = async (req, res, next) => {
    const { email } = req.params;
    console.log('check duplicate running: ', email)
    try {
        const user = await User.findOne({ email });
        if (user) {
            res.locals.duplicate = true;
        } else {
            res.locals.duplicate = false;
        }
        return next();
    } catch (error) {
        return next({
            log: 'Error in userController.checkDuplicate',
            status: 400,
            message: { err: 'Error checking duplicate ' + error.message },
        });
    }
}

userController.addProject = async (req, res, next) => {
  const { name } = req.body;
  const userID = req.cookies.ssid;

  try {
    const newProject = await Project.create({ name });
    console.log(newProject);
    const user = await User.findOne({ _id: userID });
    console.log(user);
    if (!user.projects) user.projects = [];
    user.projects.push(newProject);
    res.locals.user = await user.save();
    res.locals.projectID = newProject._id;
    return next();
  } catch (error) {
    return next({
      log: 'Error in userController.addProject',
      status: 400,
      message: { err: 'Error adding project' },
    });
  }
};

module.exports = userController;
