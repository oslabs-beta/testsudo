const cookieController = {};

cookieController.setSSIDCookie = (req, res, next) => {
    console.log('cookieController running')
    console.log('res locals userID is ', res.locals.userID)
    res.cookie('ssid', res.locals.userID, { httpOnly: true });
    return next();
}

export default cookieController;
