import express from 'express'
import {getLoginController ,
        postLoginController,
        getRegisterController,
        postRegisterController,
        logoutController} from '../controller/auth.js';
import {sessionControl} from '../middleware/sessionMiddleware.js'
import {registerValidate} from '../validations/registerValidate.js';

const router = express.Router()

router.get("/login" ,sessionControl, getLoginController);
router.post("/login" ,sessionControl, postLoginController);
router.get("/register" ,sessionControl, getRegisterController);
router.get("/logout" , logoutController);
router.post("/register" ,
[
    sessionControl,
    registerValidate()
]
, postRegisterController);

export default router;