import { Request, Response, NextFunction, RequestHandler } from "express"


const cookieController: { [key: string]: RequestHandler } = {
    
    setSSIDCookie: (req: Request, res: Response, next: NextFunction ) => {
        res.cookie('ssid', res.locals.userID, { httpOnly: true });
        return next();
    }

};

export default cookieController;