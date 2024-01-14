import {body} from 'express-validator';
export const registerValidate = () => [

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
]
