var express 		= require('express'),
		router      = express.Router(),
		User				= require('../models/users.js'),
		passport		= require('passport');



//////////////////////////////////////
router.get('/', function(req, res) {
	res.locals.login = req.isAuthenticated();
	User.find(function(err, users) {
		res.render('users/users.ejs', {
			users: users
		})
	})
})



// json for all users (for testing)
router.get('/json', function(req, res) {
	User.find(function(err, users) {
		res.send(users);
	});
});


// json for single user(for testing)
router.get('/:id/json', function(req, res) {
	User.findById(req.params.id, function(err, users) {
		res.send(users);
	});
});


////////////////////////////////////////////
//show page
///////////////////////////////////////////
// router.get('/:id', isLoggedIn, function(req, res) {
// 	//req.params.id == req.user.id ? res.usertrue = true : res.usertrue = false;
// 	//req.params.id == req.user.id ? res.locals.usertrue = true : res.locals.usertrue = false;
// 	console.log('hello you')
// 	User.findById(req.params.id, function(err, user) {
// 		console.log(req.params.id)
// 		res.render('users/show.ejs', {
// 			user: user
// 		});
// 	});
// });

router.get('/:id', function(req, res){
	User.findById(req.params.id, function(err, users){
		res.render('users/show.ejs', {
			users: users
		});
	});
});
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
router.post('/login', passport.authenticate('local-login', {
	failureRedirect: '/users' }), function(req, res) {
	//console.log('hello');   // not console logging
	res.redirect('/users/' + req.user.id);
	//res.send('sup')
});




function isLoggedIn(req, res, next) {
	console.log('isLoggedIn middleware');
  if (req.isAuthenticated()) {
  	//console.log('isloggedin')  // not logging
  	return next(); 
  } else {
  	res.redirect('/users');
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