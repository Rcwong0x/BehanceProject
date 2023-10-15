const { insert } = require("../services/user");


exports.createUser = async function (request, response) {
	const { email, username, password } = request.body;
	const user = await insert({ email, username, password });
	response.status(201).json(user);
};
