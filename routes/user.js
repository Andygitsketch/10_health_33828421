//user can register
const { check, validationResult } = require('express-validator');

// Create a new router
const express = require("express")
const router = express.Router()

const redirectLogin = (req, res, next) => {
  if (!req.session.userId) {
    res.redirect('./login') // redirect to the login page
  } else {
    next(); // move to the next middleware function
  }
}

router.get('/register', function (req, res, next) {
  res.render('register.ejs')
})

const saltRounds = 10

router.post('/registered', [check('email').isEmail(),

  // Match password to 

check('password').isLength({ min: 8, max: 20 })], 
  function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render('./register')
      return
    }
    else {
    }
    const bcrypt = require('bcrypt')
    const plainPassword = req.body.password
    bcrypt.hash(plainPassword, saltRounds, function (err, hashedPassword) {

      // Store hashed password in your database.
      let sqlquery = "INSERT INTO users (username, hashedpassword, first_name, last_name, email) VALUES (?,?,?,?,?)"
      // execute sql query
      let newrecord = [req.sanitize(req.body.username), hashedPassword, req.sanitize(req.body.first), req.sanitize(req.body.last), req.sanitize(req.body.email)]
      db.query(sqlquery, newrecord, (err, result) => {
        if (err) {
          next(err)
        }
        else {
          result = 'Hello ' + req.sanitize(req.body.first) + ' ' + req.sanitize(req.body.last) + ' you are now registered!  We will send an email to you at ' + req.body.email
          res.send(result)
        }
      })
    })
  })



//user can log in
router.get('/login', function (req, res, next) {
  res.render('login.ejs')
})


router.post('/login', function (req, res, next) {
  const bcrypt = require('bcrypt')


    let sqlquery = 'SELECT * FROM users WHERE username LIKE ?';
    login = ["%"+req.body.username+"%"]
     db.query(sqlquery, login, (err, result) => {
            if (err) {
                next(err)
            }
               hashedPassword = result[0].hashedPassword

              // Compare the password supplied with the password in the database
              bcrypt.compare(req.body.password, hashedPassword, function (err, result) {
                if (err) {
                
                }
                else if (result == true) {
                  console.log ('passwords are matching')   // Save user session here, when login is successful
                  req.session.userId = req.sanitize(req.body.username);


                  return res.redirect ('./list');
                }
                else {
                console.log("Passwords  don't  match")
                }
              })

         });

})

// Export the router object so index.js can access it
module.exports = router