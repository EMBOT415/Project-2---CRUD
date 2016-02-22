/////////////////////////////////
//REQUIREMENTS//
/////////////////////////////////

var express							= require('express'),
		bodyParser					= require('body-parser'),
		methodOverride			= require('method-override'),
		mongoose						= require('mongoose'),
		morgan							=	require('morgan'),
		passport						= require('passport'),
		session							= require('express-session'),
		app									= express(),
		port 								= process.env.PORT || 3000;
		//configDB						=	require('./config/database.js');

/////////////////////////////////
//CONFIGURATION//
/////////////////////////////////

mongoose.connect('mongodb://localhost:27017/ericportfolio');

/////////////////////////////////
//MIDDLEWARE//
/////////////////////////////////

app.use(express.static('public'));

app.use(morgan('dev'));


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}));


/////////////////////////////////
//PASSPORT//
/////////////////////////////////
app.use(session({ name: 'project2crud', secret: 'conventional wisdom', resave: true,
    saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());


/////////////////////////////////
//ROUTES/CONTROLLERS//
/////////////////////////////////
require('./config/passport.js')(passport);

var userController 			= require('./controllers/users.js');
// var projectController = require('./controllers/projects.js');
app.use('/eric', userController);



///////////////////////////////////////////////////////
// app.use(function(req, res, next) {
//   res.locals.login = req.isAuthenticated();
//   next();
// });


app.get('/', function(req, res) {
	res.redirect('/eric');
});


/////////////////////////////////
//LISTEN//
/////////////////////////////////

//mongoose.connection.once('open', function() {
	app.listen(port);
	console.log('=========================')
	console.log('listening')
	
//});
					

