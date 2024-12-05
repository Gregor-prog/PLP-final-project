const db = require(`../database`)
const jwt = require(`jsonwebtoken`)
const bcrypt = require(`bcryptjs`)
require(`dotenv`).config();



exports.login = (req, res) => {
    // console.log(req.body);
    const { email, password } = req.body

    if (!email || !password) {
        return res.render(`login`, {
            error: `Please input Email/Password`
        })
    } else {
        db.query(`select * from patients where email = ?`, [email], async (err, result) => {
            if (err) {
                console.log(err);

            } else if (!result[0] || !await bcrypt.compare(password, result[0].password)) {
                return res.render(`login`, {
                    error: `Invalid Email or password`
                })
            }
            
            const user = { patient_id: result[0].patient_id, firstname: result[0].firstname, email: result[0].email }
            req.session.user = user
            req.session.authenticated = true
            res.redirect(`/dashboard`)
        })
    }

    // res.send(`form submitted`)
}



exports.viewprofile = (req, res) => {
    db.query(`select * from patients where patient_id = ?`, [req.params.id], (err, rows) => {
        if (err) {
            console.log(err);
        } else {
            res.render(`viewprofile`, { rows })
        }
    })
}

exports.doctorviewprofile = (req, res) => {
    db.query(`select * from doctors where doctor_id = ?`, [req.params.id], (err, rows) => {
        if (err) {
            console.log(err);
        } else {
            res.render(`viewdoctorprofile`, { rows })
        }
    })
}

exports.doctorupdateprofile = (req, res)=>{

    // console.log(req.body);
    // console.log(req.url);
    // console.log(req.params);

    const { firstname, lastname, email, phone, address, gender, date_of_birth, password, passwordconfirm } = req.body

    if (password !== passwordconfirm) {



        db.query(`select * from doctors where doctor_id = ?`, [req.params.id], (err, rows) => {
            if (err) {
                console.log(err);
            } else {
                return res.render(`viewdoctorprofile`, {
                    rows: rows,
                    error: `password do not match`
                })
            }
        })
    } else {
        db.query(`select * from doctors where email = ?`, [email], async (err, result) => {
            if (err) {
                console.log(err);
            } else if (!result[0]) {
                return res.render(`viewdoctorprofile`, {
                    rows: { rows },
                    error: `Please use your register email address`
                })
            } else {
                const newpassword = await bcrypt.hash(password, 10);
                // console.log(newpassword);
                db.query(`update doctors set firstname = ?, lastname = ?, phone = ?, address = ?, password = ? where doctor_id = ?`, [firstname, lastname, phone, address, newpassword, req.params.id], (err, rows) => {
                    if (err) {
                        console.log(err);
                    } else {

                        db.query(`select * from doctors where doctor_id = ?`, [req.params.id], (err, rows) => {
                            if (err) {
                                console.log(err);
                            } else {
                                res.render(`viewdoctorprofile`, {
                                    rows: rows,
                                    message: `Updated successfully`
                                })
                            }
                        })
                       
                    }
                })
            }
        })


    }
    // res.send(`form submitted`)
}



exports.updateprofile = (req, res) => {
    console.log(req.body);
    console.log(req.url);
    console.log(req.params);



    const { firstname, lastname, email, phone, address, gender, date_of_birth, password, passwordconfirm } = req.body

    if (password !== passwordconfirm) {



        db.query(`select * from patients where patient_id = ?`, [req.params.id], (err, rows) => {
            if (err) {
                console.log(err);
            } else {
                return res.render(`viewprofile`, {
                    rows: rows,
                    error: `password do not match`
                })
            }
        })
    } else {
        db.query(`select * from patients where email = ?`, [email], async (err, result) => {
            if (err) {
                console.log(err);
            } else if (!result[0]) {
                return res.render(`viewprofile`, {
                    rows: { rows },
                    error: `Please use your register email address`
                })
            } else {
                const newpassword = await bcrypt.hash(password, 10);
                db.query(`update patients set firstname = ?, lastname = ?, phone = ?, address = ?, password = ? where patient_id = ?`, [firstname, lastname, phone, address, newpassword, req.params.id], (err, rows) => {
                    if (err) {
                        console.log(err);
                    } else {
                        db.query(`select * from patients where patient_id = ?`, [req.params.id], (err, rows) => {
                            if (err) {
                                console.log(err);
                            } else {
                                res.render(`viewprofile`, {
                                    rows: rows,
                                    message: `Updated successfully`
                                })
                            }
                        })
                    }
                })
            }
        })


    }
    // res.send(`form submitted`)
}

exports.userlogin = (req, res) => {
    // console.log(req.body);

    const { email, password } = req.body

    if (!email || !password) {
        return res.render(`userlogin`, { error: `Please Input Required Fields` })
    } else {
        db.query(`select * from admins where email = ?`, [email], async (err, result) => {
            if (err) {
                console.log(err);
            } else if (!result.length > 0 || !await bcrypt.compare(password, result[0].password)) {
                return res.render(`userlogin`, { error: `Password/Email Do not Match` })
            } else {
                req.session.admin = { role: 'admin', admin_id: result[0].admin_id, firstname: result[0].firstname }
               req.session.authenticated = true
                res.redirect(`/admin/dashboard`)
            }
        })
    }

}










































































// Design by Kelani Yunus Oluwadamilare
// email yunuskelani2@gmail.com//
// phone: +2348140470626 