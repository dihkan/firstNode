export const getLoginController = (req,res) => {
    res.render("auth/login")
    res.locals.formData = "undefined"
}

export const postLoginController = (req, res) => {
    const {username , password} = req.body 
    let error;
    res.locals.formData = req.body 
    if(!username)
    {
        error = "Kullanıcı Adı Boş Olamaz"
    }else if(!password){
        error = "Parola Alanı boş olamaz"
    }else if(username !== 'dihkan' || password !== 'container'){
        error = "Şifre yada parola yanlış"
    }else if(username === 'dihkan' || password === 'container'){
        req.session.isLogged = true;
        req.session.username = username;

    }
    if (error) {
        return res.render('auth/login', {
            error
        })
    };
    res.redirect("/")
}

export const logoutController = (req, res) => {
    req.session.destroy();
    res.redirect('/')
}