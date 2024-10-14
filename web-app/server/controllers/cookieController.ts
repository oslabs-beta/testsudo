import { RequestHandler } from "express"


const cookieController = {
    
    setSSIDCookie: ((req, res, next ) => {
        res.cookie('ssid', res.locals.userID, { httpOnly: true });
    }) as RequestHandler

};

export default cookieController;