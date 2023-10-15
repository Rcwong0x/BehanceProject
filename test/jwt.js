const jwt = require("jsonwebtoken");

function generateToken() {
	const token = jwt.sign({ id: 1, username: "NewUser" }, process.env.JWT_SECRET);
	return token;
}

module.exports = generateToken;
