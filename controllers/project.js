var express 		= require('express'),
		router      = express.Router(),
		User				= require('../models/users.js'),
		Project			= require('../models/project.js'),
		passport		= require('passport');



router.get('/', function(req, res) {
	Project.find(function(err, project) {
		res.render('project/index.ejs', { 
			project: project 
		});
	});
});

router.get('/json', function(req, res) {
	Project.find(function(err, project) {
		res.send(project);
	});
});

module.exports = router;