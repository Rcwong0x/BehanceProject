const User = require("../src/models/user");

async function insertUser() {
	await User.create({
		id: 1,
		username: "NewUser",
		email: "user@bedu.com",
		password: "123456789",
	});
}

module.exports = insertUser;
