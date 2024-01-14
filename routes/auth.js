import express from 'express'
import {getLoginController , postLoginController , logoutController} from '../controller/auth.js';
import {sessionControl} from '../middleware/sessionMiddleware.js'
const router = express.Router()

router.get("/login" ,sessionControl, getLoginController);
router.post("/login" ,sessionControl, postLoginController);
router.get("/logout" , logoutController);

export default router;