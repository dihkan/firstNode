import {body ,check} from 'express-validator';
import path from 'path';
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
    }),
    
    check('avatar').custom((value, { req }) => {
        if (!req.files || Object.keys(req.files).length === 0) {
          throw new Error("Profil resmi yüklenmedi");
        }
      
        const uploadedFile = req.files.avatar;
        const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
        const maxFileSize = 5 * 1024 * 1024; // 5MB
        
        // Hata nesnesi oluşturma
        const errors = [];
      
        const fileExtension = path.extname(uploadedFile.name);
        if (!allowedExtensions.includes(fileExtension)) {
          errors.push("Yalnızca .jpg, .jpeg, .png veya .gif dosyalarını yükleyebilirsiniz.");
        }
      
        if (uploadedFile.size > maxFileSize) {
          errors.push("Dosya boyutu en fazla 5MB olabilir");
        }
      
        if (errors.length > 0) {
          throw new Error(errors.join('\n')); // Hataları birleştirerek fırlat
        }
        
        // Hata yoksa
        return true;
      })
   
]
