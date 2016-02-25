var express 		= require('express'),
		router      = express.Router(),
		User				= require('../models/users.js'),
		Project			= require('../models/project.js'),
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
// BASS WORK

//////////////////////////////////////
router.get('/bass', function(req, res) {
	User.find(function(err, users) {
		res.render('users/bass.ejs', { users: users });
	});
});

//////////////////////////////////////
// TORY BURCH WORK
//////////////////////////////////////
router.get('/tory', function(req, res) {
	User.find(function(err, users) {
		res.render('users/tory.ejs', { users: users });
	});
});

//////////////////////////////////////
// STA IN GREENWICH
//////////////////////////////////////
router.get('/staGrnwch', function(req, res) {
	User.find(function(err, users) {
		res.render('users/staGrnwch.ejs', { users: users });
	});
});

//////////////////////////////////////
// STA ON NEWBURY ST
//////////////////////////////////////
router.get('/staNby', function(req, res) {
	User.find(function(err, users) {
		res.render('users/sta.ejs', { users: users });
	});
});

//////////////////////////////////////
// RESUME PAGE
//////////////////////////////////////
router.get('/resume', function(req, res) {
	User.find(function(err, users) {
		res.render('users/resume.ejs', { users: users });
	});
});

//////////////////////////////////////
// RESUME PAGE
//////////////////////////////////////
router.get('/allprojects', function(req, res) {
	Project.find(function(err, projects) {
		res.render('projects/index.ejs', { projects: projects });
	});
});

//////////////////////////////////////
// NEW PROJECT FORM
//////////////////////////////////////
router.get('/:id/newproject', function(req, res) {
	User.find(function(err, users) {
		res.render('projects/newproject.ejs', { users: users });
		console.log(users)
	});
});



//////////////////////////////////////
// CLIENT LOG IN
//////////////////////////////////////
router.get('/client', function(req, res) {
	User.find(function(err, users) {
		res.render('users/user.ejs', { users: users });
	});
});

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
    res.redirect('/eric');
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
//NEW PROJECT TO USER
///////////////////////////////////

router.post('/:id/newproject', function(req, res) {
	User.findById(req.params.id, function(err, user) {
		var project = new Project(req.body);
		project.save(function(err, project) {
			user.project.push(project);
			user.save(function(err, user) {
				res.redirect('/eric/' + req.params.id);
			});		
		});
	});
	console.log(req.body)
});


// router.post('/:id/newproject', function(req, res) {
// 	User.findById(req.params.id, function(err, user) {
// 		var project = new Project(req.body);
// 		project.save(function(err, project) {
// 			user.project.push(project);
// 			user.save(function(err, user) {
// 				res.redirect('/eric/' + req.params.id);
// 			});		
// 		});
// 	});
// });

///////////////////////////////////
// SIGN UP
///////////////////////////////////
router.post('/', passport.authenticate('local-signup', {
	failureRedirect: '/eric' }), function(req, res) {
	res.redirect('/eric/' + req.user.id);
	console.log('=========================')		
	console.log('sign up') 
});


///////////////////////////////////
//LOG IN
///////////////////////////////////
router.post('/login', passport.authenticate('local-login', { 
	failureRedirect: '/pop' }), function(req, res) {
    // success redirect goes to show page
    //	successRedirect : '/eric/' + req.user.id
    res.redirect('/eric/' + req.user.id);
    console.log('7=========================')
    console.log("logging in with " + req.user.id)
});


///////////////////////////////////
//UPDATE User
///////////////////////////////////
router.get('/:id/edit', function(req, res){
	User.findById(req.params.id, function(err, users){
	res.render('users/edituser.ejs', {
	 	users: users
	 });
	});
});

//SET UP THE PATH TO UPDATE AND ITEM IN MONGO ... WHAT HAPPENS WHEN YOU CLICK THE BUTTON
router.put('/:id', function(req, res){
	User.findByIdAndUpdate(req.params.id, req.body, function(err, users){
		res.redirect('/eric/' + req.params.id);
		console.log(err);
	});
});

///////////////////////////////////
//UPDATE project
///////////////////////////////////
router.get('/:id/editproject', function(req, res){
	Project.findById(req.params.id, function(err, projects){
	res.render('projects/editproject.ejs', {
	 	projects: projects
	 });
	});
});

//SET UP THE PATH TO UPDATE AND ITEM IN MONGO ... WHAT HAPPENS WHEN YOU CLICK THE BUTTON
router.put('/:id', function(req, res){
	User.findByIdAndUpdate(req.params.id, req.body, function(err, users){
		res.redirect('/eric/' + req.params.id);
		console.log(err);
	});
});
///////////////////////////////////
//DELETE
///////////////////////////////////

router.get('/allprojects', function(req, res){
	find
})

// router.delete('/:id', function(req, res){
// 	User.findByIdAndRemove(req.params.id, function(err, taco){
// 	//	console.log(req.params.id)
// 	//	console.log(taco)
// 		//console.log(taco.locations)
// 		//console.log(taco.locations[0].id)
// 		for (var i=0; i<taco.locations.length; i++){
// 			//console.log(taco.locations.length)
// 			console.log(taco.locations[i].id);
// 			Locations.findByIdAndRemove(taco.locations[i].id, function(err, locations){
// 			})
// 			res.redirect('/users')
// 		}
// 		// Locations.findById(req.body.id, function(err, locations){
// 		// 	console.log(req.body.id)
// 		// })
// 	});
// });


// router.delete('/:id', function(req, res) {
// 	console.log('DELETE ROUTE ACCESSED');
// 	// User.findById(req.params.id, function(err, user) {
// 	// 	if (user.locations.length == 0) {
// 	// 		user.remove(function(err) {
// 	// 			res.redirect('/users');
// 	// 		});
// 	// 	} else {
// 	// 		user.locations.forEach(function(location) {
// 	// 			Location.findOneAndRemove({ _id: location.id }, function(err) {
// 	// 				if (err) console.log(err);
// 	// 			});
// 	// 		});
// 	// 		user.remove(function(err) {
// 	// 			res.redirect('/users');
// 	// 		});
// 	// 	} // end is
// 	// }); // end User find
// });


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



// router.put('/:id', function(req, res){
//   Item.findByIdAndUpdate(req.params.id, { $inc: { qty:-1 } }, function(err, data){
//     res.redirect('/shop/' + req.params.id);
//   });
// });


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


