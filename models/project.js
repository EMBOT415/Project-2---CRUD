var mongoose 		= require('mongoose');
var bcrypt 			= require('bcrypt-nodejs');

var projectSchema = mongoose.Schema({
	projectName: String,
	startDate: String,
 	quote: Number,
	timeline: String,
	details: String
	

})

// /////////////////////////////////
// // METHODS
// /////////////////////////////////

// // //generating a hash
// userSchema.methods.generateHash = function(password) {
//    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
// };

// // checking if password is valid
// userSchema.methods.validPassword = function(password) {
// 	return bcrypt.compareSync(password, this.password);
// }


module.exports = mongoose.model('Project', projectSchema);