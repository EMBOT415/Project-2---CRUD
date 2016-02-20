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
		res.render('users/users.ejs', {
			users: users
		})
		//console.log(users)
	})
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
// logout of session
//////////////////////////////////////
router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/users');
});

////////////////////////////////////////////
//show page
///////////////////////////////////////////

//SHOW PAGE FOR WHEN USER IS LOGGED IN
router.get('/:id', isLoggedIn, function(req, res) {
    //checks if the user is logged in
    res.locals.usertrue = (req.user.is == req.params.id);
    //list users
    User.find({}, function(err, users) {
        //finds single user
        User.findById(req.params.id, function(err, users) {
            res.render('users/show.ejs', {
                users: users
                //other schema info??????
            });
        });
    });
});

// //CAN ONLY SEE IF YOU'RE LOGGED IN
// router.get('/:id', isLoggedIn, function(req, res) {
// 	//USER EDITING ONLY ON USER PAGE
// 	//res.locals.usertrue = (req.user.id == req.params.id);
// 	//req.params.id == req.user.id ? res.usertrue = true : res.usertrue = false;
// 	req.params.id == req.user.id ? res.locals.usertrue = true : res.locals.usertrue = false;
// 	//User.find({}, function(err, users) {
// 	User.findById(req.params.id, function(err, user) {
// 		//console.log(req.params.id)
// 		res.render('users/show.ejs', {
// 			user: user
// 		//});
// 		});
// 	});
// });

// router.get('/:id', function(req, res){
// 	User.findById(req.params.id, function(err, users){
// 		console.log(req.params.id);
// 		res.render('users/show.ejs', {
// 			users: users
// 		});
// 	});
// });



///////////////////////////////////
// user signup
///////////////////////////////////
router.post('/', passport.authenticate('local-signup', {
	failureRedirect: '/users' }), function(req, res) {
	res.redirect('/users/' + req.user.id);

});


///////////////////////////////////
//login
///////////////////////////////////
// router.post('/login', passport.authenticate('local-login', {
// 	failureRedirect: '/users' }), function(req, res) {
// 	//console.log('hello');   // not console logging
// 	res.redirect('/users/' + req.user.id);
// 	//res.send('sup')
// });


// login
router.post('/login', passport.authenticate('local-login', { 
	failureRedirect: '/pop' }), function(req, res) {
    // success redirect goes to show page
    //res.rediret('www.google.com')
    //successRedirect : '/users/' + req.user.id
    res.redirect('/users/' + req.user.id);
    console.log(req.user.id)
});


function isLoggedIn(req, res, next) {
	console.log('isLoggedIn middleware');
  if (req.isAuthenticated()) {
  	//console.log('isloggedin')  // not logging
  	return next(); 
  } else {
  	res.redirect('/')
  	//res.redirect('/users');
  	//res.send('yello')
  }
}

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