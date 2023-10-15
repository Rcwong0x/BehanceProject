const { findByUsername } = require("../services/user");
const jwt = require("jsonwebtoken");

exports.login = async function (request, response) {
	const { username, password } = request.body;

	const user = await findByUsername(username);

	if (!user) {
		return response.status(400).json({
			message: "Invalid Data",
			messagedev: "Not user found in DB",
			code: "ERR_AUTH",
		});
	}

	if (user.password !== password) {
		return response.status(400).json({
			message: "Invalid Data",
			messagedev: "Not user found in DB",
			code: "ERR_AUTH",
		});
	}

	const token = jwt.sign(
		{ id: user.id, username: user.username },
		process.env.JWT_SECRET
	);

	response.status(200).json({
		jwt: token,
	});
};
