module.exports = function (err, request, response, next) {
	response.status(500).json({
		message: "Unexpected error",
		messagedev: "Occured a error in the code",
		code: "ERR_UNKNOWN",
		details: err,
	});
};
