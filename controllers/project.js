var express 		= require('express'),
		router      = express.Router(),
		User				= require('../models/users.js'),
		Project			= require('../models/project.js'),
		passport		= require('passport');



//GET THE INDEX PAGE
router.get('/', function(req, res) {
	//FIND ALL LOCATIONS
	Project.find({}, function(err, projects){
		// PASS OFF LOCATIONS TO THE LOCATIONS INDEX VIEW
		res.render('projects/index.ejs', {
			projects: projects

		})
		// console.log(projects)
		// console.log('this is index page')
	})
});


router.get('/:id', function(req, res) {
		Project.find({}, function(err, projects){
        Project.findById(req.params.id, function(err, projects) {
            res.render('projects/showproject.ejs', {
                projects: projects
           });
        });		
    });					     
});						


router.delete('/:id', function(req, res){
	console.log("delete route accessed")
  Project.findByIdAndRemove(req.params.id, function(err, projects){
    res.redirect('/');
  });
  //console.log(projects)
  //console.log("delete route accessed")
})

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