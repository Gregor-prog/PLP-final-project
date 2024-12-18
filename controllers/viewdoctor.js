const db = require(`../database`)
const express = require(`express`)
const { search } = require("../routes/pages")
const router = express.Router()

exports.doctor = (req, res)=>{
    db.query(`select firstname, lastname, email, specialty, phone, doctor_id from doctors`, (err, rows)=>{
        if(err){
            
            
            console.log(err);
            
        }else{
            res.render(`viewdoctors`,{rows}); 
        }        
    } )   
}

exports.find = (req, res)=>{
    const search = req.body.search
    db.query(`select * from doctors where firstname like ? OR lastname LIKE ? OR email Like ? OR specialty like ?`, ["%" +search + '%', '%' + search + '%', '%' + search + '%', '%'+ search + `%`] , (err, rows)=>{
        if(!err){
            res.render(`viewdoctors`, {rows})
            
        }else{
            console.log(err);
            
        }
    })
    
}


exports.viewpatient = (req, res)=>{
    db.query(`select patient_id, firstname, lastname, email, gender, address,  phone from patients `, (err, rows)=>{
        if(err){
            console.log(err);
            
        }else{
            const [row] = row
            res.status(200).render(`viewpatient`,{rows})
        }
    })
}


exports.findpatient = (req, res)=>{
    console.log(req.body);
    
     const find = req.body.find
     
     
    db.query(`select * from patients where firstname Like ? or lastname Like ? or email Like ?`, ['%'+ find + '%', '%'+ find + '%', '%'+ find + '%'], (err, rows)=>{
        if(err){
            console.log(err);
            
        }else{
            res.status(200).render(`viewpatient`,{rows})
        }
    })
    
}

exports.editpatient = (req, res)=>{
db.query(`select * from patients where patient_id = ?`,[req.params.id], (err, rows)=>{
    
    if(err){
        console.log(err);
        
    }else{
        const [row] = rows
        res.render(`editpatient`, { row  })
    }
})
// console.log(req.params.id);

}
exports.update = (req, res)=>{
    const {firstname, lastname, email, address, phone, date_of_birth, gender} = req.body
    // console.log(req.body);
    // console.log(req.params.id);
    db.query(`update patients set firstname = ?, lastname = ?, email = ?, gender = ?, date_of_birth = ?, phone = ?, address = ? where firstname = ?`,[firstname, lastname, email, gender, date_of_birth, phone, address, req.params.id], (err, result)=>{
        
        // res.send(`Updated`)
        if(err){
            console.log(err);
            return res.redirect(`/viewpatient`)
            
        }else{
            db.query(`select patient_id, firstname, lastname, email, gender, address, phone from patients `, (err, rows)=>{
                if(err){
                    console.log(err);
                    
                }else{
                    const [row] = rows
                    res.status(200).render(`viewpatient`, { row })
                }
            })
        }
    })
}

