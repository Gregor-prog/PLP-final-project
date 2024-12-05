const db = require(`../database`)
const jwt = require(`jsonwebtoken`)
const bcrypt = require(`bcryptjs`)
const session = require("express-session")


exports.doctorlogin = (req, res) => {

    const { email, password } = req.body;

    // console.log(req.body);

    if (!email || !password) {
        return res.render(`logindoctor`, {
            error: `Please input email or password`
        })
    } else {
        db.query(`select * from doctors where email = ?`, [email], async (err, result) => {
            if (err) {
                console.log(err);

            } else if (!result[0] || !await bcrypt.compare(password, result[0].password)) {
                return res.render(`logindoctor`, {
                    error: `Invalid Email or password`
                })
            }
            req.session.authenticated = true;
            req.session.doctor = {role: 'doctor', doctor_id: result[0].doctor_id, firstname: result[0].firstname, email: result[0].email }
            res.redirect(`/doctor/dashboard`)
        })
    }

}


















































































































// Design by Kelani Yunus Oluwadamilare
// email yunuskelani2@gmail.com//
// phone: +2348140470626 