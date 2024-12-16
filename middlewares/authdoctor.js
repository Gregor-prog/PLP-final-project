const cookieParser = require(`cookie-parser`)



exports.isAuthenticateddoctororadmin = (req, res, next) => {
    if (!req.session.authenticated) {
        if (req.url.includes(`/doctor`)) {
            return res.render(`logindoctor`, { error: `Session Expires, Please Re-Login` })


        } else if (req.url.includes(`/admin`)) {
            return res.render(`userlogin`, { error: `Session Expires, Please Re-Login` })
        }
else{
    return res.redirect(`/`)
}
    }

    try {
        next()
    } catch (error) {
        console.log(error);
        if (req.url.includes(`/doctor`)) {
            return res.redirect(`/doctor/login`)
        } else if (req.url.includes(`/admin`)) {
            return res.redirect(`/admin/login`)
        }else{
            return res.redirect(`/`)
        }
    }
}
