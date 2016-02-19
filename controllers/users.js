var express 		= require('express'),
		router      = express.Router(),
		User				= require('../models/user1.js');



router.get('/', function(req, res){
	res.render('users/users.ejs');
	//res.send('sup');
});


module.exports = router;
