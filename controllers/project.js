var express 		= require('express'),
		router      = express.Router(),
		User				= require('../models/users.js'),
		Project			= require('../models/project.js'),
		passport		= require('passport');



router.get('/eric/allprojects', function(req, res) {
	Project.find(function(err, project) {
		res.send('hi')
	});
});
//////////////////////////////////////
// NEW PROJECT FORM
//////////////////////////////////////
// router.get('/:id/newproject', function(req, res) {
// 	User.find(function(err, users) {
// 		res.render('projects/newproject.ejs', { users: users });
// 	});
// });

// router.get('/json', function(req, res) {
// 	Project.find(function(err, project) {
// 		res.send(project);
// 	});
// });

module.exports = router;