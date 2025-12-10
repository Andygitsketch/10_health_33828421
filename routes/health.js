const express = require("express")
const router = express.Router()

//user can search specific measurements
router.get('/wrist', function (req, res, next) {
    //let sqlquery = "SELECT * FROM measurements WHERE result, wrist, height LIKE ???";
    let sqlquery = "SELECT wrist FROM health.measurements"

    //search_text = ["%" + req.query.search_text + "%"]
    db.query(sqlquery,  (err, result) => {
        if (err) {
            next(err)
        }
        res.render("listofwristdata.ejs", { availableMeasurements: result })
    });
});

router.get('/height', function (req, res, next) {
    //let sqlquery = "SELECT * FROM measurements WHERE result, wrist, height LIKE ???";
    let sqlquery = "SELECT height FROM health.measurements"

    //search_text = ["%" + req.query.search_text + "%"]
    db.query(sqlquery,  (err, result) => {
        if (err) {
            next(err)
        }
        res.render("listofheightdata.ejs", { availableMeasurements: result })
    });
});

//user can find general measurements 
router.get('/list', function (req, res, next) {
    let sqlquery = "SELECT * FROM measurements";
    db.query(sqlquery, (err, result) => {
        if (err) {
            next(err)
        }
        res.render("listofdata.ejs", { availableMeasurements: result })
    });
});


router.get('/addmeasurements', function (req, res, next) {
    res.render('addmeasurements.ejs')
});

router.post('/measurementsadded', function (req, res, next) {
    // saving data in database
    let sqlquery = "INSERT INTO measurements (wrist, height, result) VALUES (?,?,?)"
    // execute sql query
    
    var bfs = req.body.height / req.body.wrist
    let newrecord = [req.body.wrist, req.body.height, bfs]
    db.query(sqlquery, newrecord, (err, result) => {
        if (err) {
            next(err)
        }
        else {
            res.render('showdata.ejs', { availableMeasurements: { wrist: req.body.wrist, height: req.body.height, result:bfs } })
            // res.send(' These measurements have been added to the database, wrist: '+ req.body.wrist + ' and height '+ req.body.height)
        }
    })
}) 

// Export the router object so index.js can access it
module.exports = router