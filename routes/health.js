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
            res.render("list.ejs", {availableMeasurements:result})
         });
    });

