const express = require("express")
const router = express.Router()

//user can search specific measurements
router.get('/search',function(req, res, next){
    res.render("search.ejs")
});

router.get('/search_result', function(req, res, next) {
        let sqlquery = "SELECT * FROM measurements WHERE result, wrist, height LIKE ???"; 
        search_text = ["%"+req.query.search_text+"%"]
        db.query(sqlquery, search_text, (err, result) => {
            if (err) {
                next(err)
            }
            res.render("list.ejs", {availableMeasurements:result})
         });
    });

    //user can find general measurements 
    router.get('/list', function(req, res, next) {
        let sqlquery = "SELECT * FROM measurements"; 
        db.query(sqlquery, (err, result) => {
            if (err) {
                next(err)
            }
            res.render("listofdata.ejs", {availableMeasurements:result})
         });
    });

   
    router.get('/addmeasurements',function(req, res, next){
    res.render('addmeasurements.ejs')
});

router.post('/measurementsadded', function (req, res, next) {
    // saving data in database
    let sqlquery = "INSERT INTO measurements (wrist, height, result) VALUES (?,?,?)"
    // execute sql query
    let newrecord = [req.body.wrist, req.body.height, req.body.result]
    db.query(sqlquery, newrecord, (err, result) => {
        if (err) {
            next(err)
        }
        else {
            var result = req.body.height/req.body.wrist
            res.render('showdata.ejs', {availableMeasurements:{wrist:req.body.wrist, height:req.body.height, result:req.body.result}})
           // res.send(' These measurements have been added to the database, wrist: '+ req.body.wrist + ' and height '+ req.body.height)
        }
    })
}) 