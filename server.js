var express							= require('express'),
		bodyParser					= require('body-parser'),
		methodOverride			= require('method-override'),
		mongoose						= require('mongoose'),
		passport						= require('passport'),
		session							= require('express-session'),
		app									= express();
		port 								= process.env.PORT || 3000;

var userController 			= require('./controllers/users.js');
// var portfolioController = require('./controllers/portfolio.js');
app.use('/users', userController);


mongoose.connect('mongodb://localhost:27017/ericportfolio');


app.use(express.static('public'));



app.get('/', function(req, res){
	res.send('hello')
})

mongoose.connection.once('open', function() {
	app.listen(port);
	console.log('====================================')
	console.log('====================================')
	console.log('====================================')

})
					

