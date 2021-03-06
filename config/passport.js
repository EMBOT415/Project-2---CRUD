//var passport = require('passport');
var User = require('../models/users.js');
var LocalStrategy   = require('passport-local').Strategy;





module.exports = function(passport) {

////////////////////////////////////////////////
// ENCRYPT
////////////////////////////////////////////////
//console.log('passing through passport serialization');
// REQUIRED FOR PERSISTANT LOGIN SESSIONS
// PASSPORT NEEDS TO SERIALIZE AND DESERIALIZE USERS FROM SESSION

  // USED TO SERIALIZE THE USER FOR THE SESSION
  passport.serializeUser(function(user, done) {
    done(null, user.id);
    console.log('8=========================');
    console.log('passing through passport serialization');
  });
  // USED TO DESERIALIZE THE USER FOR THE SESSION
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
        console.log('11=========================');
        console.log('passing through passport deserialization');
    });
  });

//////////////////////////////////////////////
// LOCAL SIGNUP 
//////////////////////////////////////////////

  passport.use('local-signup', new LocalStrategy({
    // CHANGING THE USERNAME FIELD TO EMAIL
    usernameField: 'email',
    passwordField: 'password',
    // ALLOWS THE REQUEST TO BE PASSED AS CALLBACK
    passReqToCallback: true
    //console.log('passing through passport.use local-signup');
    }, 
    function(req, email, password, done) {
          console.log('1=========================');
          console.log('LOCAL SIGNUP CALLBACK');
    //console.log('Req.body within local signup: ', req.body);

    // ASYNCHRONOUS, WON'T HAPPEN
    process.nextTick(function() {
    // FIND THE USER WITH THAT EMAIL
    User.findOne({ 'email': email }, function(err, user) {
          console.log('2=========================');
          console.log('USER FIND ONE');

      // RETURN ANY ERROR
      if (err) { return done(err) }

      // DOES THE USER EXIST? 
      if (user) { 

        // IF THEY DO........
        return done(null, false); 

        // IF THEY DON'T SET THEM UP
      } else {
        console.log('3=========================');
        console.log('LOCAL SIGNUP SET UP NEW USER');
        var newUser = new User();
        newUser.email = email;
        newUser.password = newUser.generateHash(password);
        newUser.username = req.body.username;

        // SAVE THE NEW USER
        newUser.save(function(err) {
          console.log('4=========================');
          console.log('LOCAL SIGNUP SAVE NEW USER');
          if (err) { 
          //console.log(err)
            throw err;
            return done(null, newUser);
          }   // END IF
        });   // END USER SAVE
      }       // END USER EXISTS
    })        // END FIND USER
    })        // END NEXT TICK
    }         // END LOCAL STRATEGY
  ));         // END PASSPORT LOCAL-SIGNUP

//////////////////////////////////////////////
// LOCAL LOGIN
//////////////////////////////////////////////

  passport.use('local-login', new LocalStrategy({
    // CHANGING THE USERNAME FIELD TO EMAIL
    usernameField: 'email',
    passwordField: 'password',
    // PASS THE REQUEST TO THE CALLBACK
    passReqToCallback: true
    }, 
    // CALLBACK WITH THE EMAIL AND PASSWORD FROM FORM
    function(req, email, password, done) {
    console.log('5=========================');
    console.log('LOCAL LOGIN CALLBACK');
    // FIND A USER WITH THE FORM EMAIL  
    User.findOne({ 'email': email }, function(err, user) {
    console.log('6=========================');
    console.log('LOCAL LOGIN FIND ONE');
      // RETURN ANY ERRORS
      if (err) { return done(err) }
      // IF NO USER IS FOUND  
      if (!user) {
        console.log('NO USER FOUND');
        return done(null, false);
      }
      // IF THE USER IS FOUND BUT THE EMAIL IS WRONG
      if (!user.validPassword(password)) {
        return done(null, false);
      }
      // IF IT'S SUCCESSFUL
      return done(null, user);
    });       // END FIND USER
  }           // END LOCAL STRATEGY
  ));         // END PASSPORT LOGIN
}             // END MODULE.EXPORTS


