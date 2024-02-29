const userController = {};

userController.createUser = async (req, res, next) => {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);
    try {
        const newUser = await UserActivation.create({
            email,
            password: hashedPassword
        });
        res.locals.user = newUser;
        return next();
    } catch (error) {
        return next(error);
    }

}


module.exports = userController;
