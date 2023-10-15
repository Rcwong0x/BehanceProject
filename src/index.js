require("dotenv").config();

const { initDatabase } = require("./db");
initDatabase();

const express = require("express");
const app = express();

app.use(express.json());

const postRouter = require("./routers/post");
const userRouter = require("./routers/user");
const commentRouter = require("./routers/comment");
const authRouter = require("./routers/auth");

const validationError = require("./middlewares/validation-error");
const unknownError = require("./middlewares/unknown-error");

app.use(postRouter);
app.use(userRouter);
app.use(commentRouter);
app.use(authRouter);

app.use(validationError);
app.use(unknownError);

app.listen(process.env.SERVER_PORT, function () {
	console.log("> Listen port " + process.env.SERVER_PORT);
});
