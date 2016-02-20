var express 		= require('express'),
		router      = express.Router(),
		User				= require('../models/users.js'),
		passport		= require('passport');

//////////////////////////////////////
// INDEX
//////////////////////////////////////
router.get('/', function(req, res) {
	res.locals.login = req.isAuthenticated();
	User.find(function(err, users) {
		res.render('users/index.ejs', {
			users: users
		})
	console.log('0=========================')		
	console.log('INDEX PAGE LINE 2')
	})
	console.log('0=========================')		
	console.log('INDEX PAGE LINE 1')
})


//////////////////////////////////////
// json for all users (for testing)
//////////////////////////////////////
router.get('/json', function(req, res) {
	User.find(function(err, users) {
		res.send(users);
	});
});


//////////////////////////////////////
// json for single user(for testing)
//////////////////////////////////////
router.get('/:id/json', function(req, res) {
	User.findById(req.params.id, function(err, user) {
		res.send(user);
	});
});


//////////////////////////////////////
// LOG OUT OF SESSION
//////////////////////////////////////
router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/users');
	    console.log('15=========================')		
			console.log('LINE 50 log out of session')    
});


////////////////////////////////////////////
// SHOW PAGE
///////////////////////////////////////////
router.get('/:id', isLoggedIn, function(req, res) {
    // IS THE USER LOGGED IN?
    res.locals.usertrue = (req.user.id == req.params.id);
    // FIND ALL USERS
    User.find({}, function(err, users) {
        // FIND THE USER BY THE ID
        User.findById(req.params.id, function(err, users) {
            res.render('users/show.ejs', {
                users: users
            });		// CLOSE RES.RENDER
                console.log('13=========================')		
								console.log('LINE 68 SHOW PAGE')
        });				// CLOSE FINDBYID
                console.log('12=========================')		
								console.log('LINE 71 SHOW PAGE')
    });						// CLOSE FINDALL
                console.log('10=========================')		
								console.log('LINE 74 SHOW PAGE')
});								// CLOSE ROUTER.GET


///////////////////////////////////
// SIGN UP
///////////////////////////////////
router.post('/', passport.authenticate('local-signup', {
	failureRedirect: '/users' }), function(req, res) {
	res.redirect('/users/' + req.user.id);
	console.log('=========================')		
	console.log('sign up') 
});


///////////////////////////////////
//LOG IN
///////////////////////////////////
router.post('/login', passport.authenticate('local-login', { 
	failureRedirect: '/pop' }), function(req, res) {
    // success redirect goes to show page
    //	successRedirect : '/users/' + req.user.id
    res.redirect('/users/' + req.user.id);
    console.log('7=========================')
    console.log("logging in with " + req.user.id)
});


function isLoggedIn(req, res, next) {
	console.log('9=========================')
	console.log('passing through isLoggedIn');
  if (req.isAuthenticated()) {
  	return next(); 
  } else {
  	res.redirect('/');
  };
};

module.exports = router;





// router.get('/', function(req, res){
// 	User.find({}, function(err, data){
// 		res.render('users/users.ejs', {
// 			users: data
// 		});
// 	});
// });

// router.get('/new', function(req, res) {
// 	res.render('users/new.ejs');
// })


// router.get('/:id', function(req, res){
// 	User.findById(req.params.id, function(err, data){
// 		res.render('users/show.ejs', {
// 			users: data
// 		});
// 	});
// });


// router.post('/', function(req, res) {
// 	var newUser = new User(req.body);
// 	console.log(req.body);
// 	newUser.save(function(err, data) {
// 		//console.log(err);
// 		//console.log(data);
// 		res.redirect('/users');
// 	})
// })

// login
// router.post('/login', passport.authenticate('local-login', {
// 	failureRedirect: '/users' }), function(req, res) {
// 	//console.log('hello');   // not console logging
// 	res.redirect('/users/' + req.user.id);
// 	//res.send('sup')
// });

