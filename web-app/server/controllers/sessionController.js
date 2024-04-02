// import { User, Session } from '../models/mongodb.js';

// const sessionController = {};

// sessionController.isLoggedIn = async (req, res, next) => {
//     try {
//         const session = await Session.findOne({ cookieID: req.cookies.ssid });
//         if (!session) {
//             return res.status(401).json(false)
//         } else {
//             const user = await User.findOne({ _id: session.cookieID });
//             res.locals.user = user;
//             return next();
//         }
//     } catch (error) {
//         return next({
//             log: 'Error in sessionController.isLoggedIn',
//             status: 400,
//             message: { err: 'Error when verifying logged in session' + error.message }
//         })
//     }
// }

// sessionController.startSession = async (req, res, next) => {
//     try {
//         let session = await Session.findOne({ cookieID: res.locals.userID });
//         if (!session) {
//             session = await Session.create({ cookieID: res.locals.userID });
//         }
//         return next();
//     } catch (error) {
//         return next({
//             log: 'Error in sessionController.startSession',
//             status: 400,
//             message: { err: 'Error when finding session' + error.message }
//         });
//     }
// }

// sessionController.endSession = async (req, res, next) => {
//     try {
//         const session = await Session.findOneAndDelete({ cookieID: req.cookies.ssid });
//         return next();
//     } catch (error) {
//         return next({
//             log: 'Error in sessionController.endSession',
//             status: 400,
//             message: { err: 'Error when ending session' + error.message }
//         });    
//     }
// }

// export default sessionController;


const { User, Session } = require('../models/mongodb.js');

const sessionController = {};

sessionController.isLoggedIn = async (req, res, next) => {
    try {
        const session = await Session.findOne({ cookieID: req.cookies.ssid });
        if (!session) {
            return res.status(401).json(false);
        } else {
            const user = await User.findOne({ _id: session.cookieID });
            res.locals.user = user;
            return next();
        }
    } catch (error) {
        return next({
            log: 'Error in sessionController.isLoggedIn',
            status: 400,
            message: { err: 'Error when verifying logged in session' + error.message }
        });
    }
};

sessionController.startSession = async (req, res, next) => {
    try {
        let session = await Session.findOne({ cookieID: res.locals.userID });
        if (!session) {
            session = await Session.create({ cookieID: res.locals.userID });
        }
        return next();
    } catch (error) {
        return next({
            log: 'Error in sessionController.startSession',
            status: 400,
            message: { err: 'Error when finding session' + error.message }
        });
    }
};

sessionController.endSession = async (req, res, next) => {
    try {
        const session = await Session.findOneAndDelete({ cookieID: req.cookies.ssid });
        return next();
    } catch (error) {
        return next({
            log: 'Error in sessionController.endSession',
            status: 400,
            message: { err: 'Error when ending session' + error.message }
        });
    }
};

module.exports = sessionController;
