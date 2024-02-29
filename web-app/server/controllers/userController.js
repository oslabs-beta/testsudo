const { User } = require('../models/mongodb');
const bcrypt = require('bcryptjs');


const userController = {};

userController.createUser = async (req, res, next) => {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);
    try {
        const newUser = await User.create({
            email,
            password: hashedPassword
        });
        res.locals.user = newUser;
        console.log('new user created is: ', newUser);
        return next();
    } catch (error) {
        return next({
            log: 'Error in userController.createUser',
            status: 400,
            message: { err: 'Create User Error' },
        });
    }
}

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
            return next();
        }
    } catch (error) {
        return next({
            log: 'Error in userController.verifyUser',
            status: 400,
            message: { err: 'Error verifying user' },
        });
    }
}



module.exports = userController;
