export const sessionControl = (req,res , next) => {
    if(req.session.isLogged)
    {
        return res.redirect("/");
    }
    next()
}
