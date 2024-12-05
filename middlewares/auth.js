const cookieParser = require(`cookie-parser`)


exports.isAuthenticated = (req, res, next)=>{

if(!req.session.authenticated){
    return res.render(`login`, 
        {error: `Please Login Before you can access the page`})
}
try {
    next();
} catch (error) {
    console.log(error);
    return res.redirect(`/signin`)
}

}