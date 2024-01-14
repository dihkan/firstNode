import express from 'express'
import {getLoginController , postLoginController ,getRegisterController,postRegisterController, logoutController} from '../controller/auth.js';
import {sessionControl} from '../middleware/sessionMiddleware.js'
import {body} from 'express-validator'
const router = express.Router()

router.get("/login" ,sessionControl, getLoginController);
router.post("/login" ,sessionControl, postLoginController);
router.get("/register" ,sessionControl, getRegisterController);
router.get("/logout" , logoutController);
router.post("/register" ,
[
    sessionControl,
    body('username')
    .isLength({min:3 , max:10})
    .withMessage("username minimum olarak 3 karakter olamalıdır"),
    body('email')
    .isEmail()
    .withMessage("Geçerli bir email vermediniz"),
    body('password')
    .isLength({min:6})
    .withMessage("Parola minimum 6 karakter olmalıdır"),
    body('passwordConfirm').custom((value, {req}) => {
        if(value !== req.body.password)
        {
            throw new Error('Şifre Doğrulama eşleşmiyor')
        }
        return true
    })
], postRegisterController);

export default router;