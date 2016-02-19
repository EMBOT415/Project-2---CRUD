var express 		= require('express'),
		router      = express.Router(),
		User				= require('../models/user1.js');



router.get('/', function(req, res){
	//res.render('users/users.ejs');
	//res.send('sup');

	User.find({}, function(err, data){
		res.render('users/users.ejs', {
			users: data
		});
	})
});

router.get('/new', function(req, res) {
	res.render('users/new.ejs');
})

router.post('/', function(req, res) {
	var newUser = new User(req.body);
	newUser.save(function(err, data) {
		res.redirect('/');
	})
})


module.exports = router;
