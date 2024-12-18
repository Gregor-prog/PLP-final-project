const express = require(`express`)
const router = express.Router();
const cookieParser = require(`cookie-parser`)
const {isAuthenticated} = require(`../middlewares/auth`);
const { isAuthenticateddoctororadmin } = require("../middlewares/authdoctor");
const ejs = require("ejs")
const viewdoctor = require("../controllers/viewdoctor")
const db = require("../database.js")


router.get(``, (req, res)=>{
    res.render(`index`)
})
router.get(`/`, (req, res)=>{
    res.render(`index`)
})

router.get(`/home`, (req, res)=>{
    res.render(`index`)
})

// PATIENTS
router.get(`/patient`, (req, res)=>{
    res.render(`patient`)
})
router.get(`/signup`, (req, res)=>{
    res.render(`register`, {error: null})
})

router.get(`/signin`, (req, res)=>{
    res.render(`login`, {error: null})
})

router.get(`/dashboard/edit-profile`, isAuthenticated, (req, res)=>{
    res.render(`viewprofile`)
})

// DOCTORS

router.get(`/doctor`, (req, res)=>{
    res.render(`doctorpage`)
})

router.get(`/registerdoctor`, (req, res)=>{
    res.render(`registerdoctor`)
})

router.get(`/doctor/login`, (req, res)=>{
    res.render(`logindoctor`, {error:undefined})
})

router.get(`/doctor/dashboard`, isAuthenticateddoctororadmin, (req, res)=>{
    res.render(`doctordashboard`, {doctor: req.session.doctor})
})
router.get('/admin/viewdoctor', (req,res) => {
    res.render("viewdoctors")
})


// ADMINS

router.get(`/registeradmin`, (req, res)=>{
    res.render(`adduser`)
})

router.get(`/admin/login`, (req,res)=>{
    res.render(`userlogin`,{error:undefined})
})

router.get(`/admin/dashboard`, isAuthenticateddoctororadmin, (req, res)=>{
    res.render(`admin`, {admin: req.session.admin})
})

//APPOINTMENTS
router.get("/bookappointment", (req,res) => {
    const query = "select * from doctors"
    db.query(query, (error,result) => {
        if(error){
            console.log(error)
        }
        else{
            res.render("bookappointment", {error:null, result } )
        }
    })
})
router.get("/checkappointment", (req,res) => {
    const query = "select * from appointment"
    db.query(query, (error, result) => {
        if(error){
            console.log(error)
            res.status(404).send(error)
        }
        else{
        res.render("appointments", result)
        }
    })
})





// router.get(`/dashboard`, isAuthenticated, (req, res)=>{
//     // console.log(req.patients);
//     res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
//     res.set('Pragma', 'no-cache')
//     res.set('expires', '0')
//     res.sendFile(path.join(__dirname, 'public', 'dashboard.html'),{ patient: req.patients })
// })








router.get(`/logout`, (req, res)=>{
    res.clearCookie(`userRegister`)
    res.redirect(`/signin`)
})
router.get(`/doctorlogout`, (req, res)=>{
    res.clearCookie(`userRegister`)
    res.redirect(`/doctor/login`)
})

router.get(`/adminlogout`, (req, res)=>{
    res.clearCookie(`userRegister`)
    res.redirect(`/admin/login`)
})




// ROUTES BEEN ON P

router.get(`/viewpatient`,  isAuthenticateddoctororadmin, )
router.post(`/viewpatient`,  isAuthenticateddoctororadmin)
router.get(`/editpatient/:id`, isAuthenticateddoctororadmin)
router.post(`/editpatient/:id`,  isAuthenticated)
router.get(`/delete/:id`, isAuthenticateddoctororadmin)
router.get(`/viewappointment`,  isAuthenticateddoctororadmin)
router.post('/viewappointment',  isAuthenticateddoctororadmin)
router.get(`/editappointment/:id`,isAuthenticateddoctororadmin)
router.get(`/doctor/cancel/:id`, isAuthenticateddoctororadmin)
router.get(`/doctor/editappointment/:id`, isAuthenticateddoctororadmin)
router.post(`/doctor/editappointment/:id`, isAuthenticateddoctororadmin)

router.get(`/dashboard/edit-profile/:id`, isAuthenticated)
router.post(`/dashboard/edit-profile/:id`, isAuthenticated)







module.exports = router





