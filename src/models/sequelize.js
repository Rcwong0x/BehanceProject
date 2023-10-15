const { Sequelize } = require("sequelize");

const {
	MYSQL_HOST,
	MYSQL_DATABASE,
	MYSQL_USERNAME,
	MYSQL_PASSWORD,
	FORCE_DB_UPDATE,
} = process.env;

const sequelize =
	process.env.NODE_ENV === "test"
		? new Sequelize("sqlite::memory:")
		: new Sequelize({
				dialect: "mysql",
				host: MYSQL_HOST,
				username: MYSQL_USERNAME,
				password: MYSQL_PASSWORD,
				database: MYSQL_DATABASE,
		  });

exports.sequelize = sequelize;

exports.connect = async function () {
	try {
		await sequelize.authenticate();
		console.log("> DB connected");
	} catch (e) {
		console.error("> Not possible connect to DB");
		console.error(e);
	}
};

exports.sync = async function () {
	try {
		await sequelize.sync({ force: FORCE_DB_UPDATE === "yes" });
		console.log("> DB updated");
	} catch (e) {
		console.error("> DB cannot be updated");
		console.error(e);
	}
};
