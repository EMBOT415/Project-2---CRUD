var mongoose 		= require('mongoose');
var bcrypt 			= require('bcrypt-nodejs');
var projectSchema = require('./projects').schema;


var userSchema = mongoose.Schema({
	username: String,
 	email: String,
	password: String,
	projects: [projectSchema]

})

/////////////////////////////////
// METHODS
/////////////////////////////////

// //generating a hash
userSchema.methods.generateHash = function(password) {
   return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
	return bcrypt.compareSync(password, this.password);
}


module.exports = mongoose.model('User', userSchema);

