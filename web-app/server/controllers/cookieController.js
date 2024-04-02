const cookieController = {};

cookieController.setSSIDCookie = (req, res, next) => {
  res.cookie('ssid', res.locals.userID, { httpOnly: true });
  return next();
};

export default cookieController;
