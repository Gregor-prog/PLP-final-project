const db = require(`../database`)


exports.deleted = (req, res)=>{
    
    const deleteId = req.params.id

    db.query(`update patients set status = 'disable' where patient_id = ?`, [deleteId], (err, result)=>{
        if(err){
            console.log(`Unable to delete`);
            return res.render(`viewpatient`, {error: `Unable To Delete Patient Detail`})
            
        }else{
            db.query(`select patient_id, firstname, lastname, email, gender, address, phone from patients where status = 'active'`, (err, rows)=>{
                if(err){
                    console.log(`Unable to Reload Patient Data`, err);
                    return res.render(`viewpatient`, {error: `Unable to Reload Patient Data`})
                    
                }else{
                    res.status(200).render(`viewpatient`,{rows})
                  
                }
            })
        }
    })
    
}