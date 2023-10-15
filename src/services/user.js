const User = require("../models/user");

exports.insert = function (data) {
	return User.create(data);
};

exports.findByUsername = function (username) {
	
	return User.findOne({
		where: {
			username,
		},
	});
};

exports.findById = function (id) {
	
	return User.findByPk(id);
};
