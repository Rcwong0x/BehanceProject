const { connect, sync } = require("./models/sequelize");
const User = require("./models/user");
const Post = require("./models/post");
const Comment = require("./models/comment");


User.hasMany(Post);
Post.belongsTo(User);

Post.hasMany(Comment);
Comment.belongsTo(Post);

User.hasMany(Comment);
Comment.belongsTo(User);

exports.initDatabase = async function () {
	await connect();
	await sync();
};
