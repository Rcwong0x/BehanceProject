
module.exports = function (err, request, response, next) {
	
	if (err && err.error && err.error.isJoi) {
		console.error(err);
		response.status(400).json({
			message: "Invalid Data",
			messagedev: "The validation middleware threw the following error",
			code: "ERR_VALIDATION",
			details: err.error.details,
		});
	} else {
		
		next(err);
	}
};
