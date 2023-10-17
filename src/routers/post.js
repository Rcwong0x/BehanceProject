const express = require("express");
const router = express.Router();

const {
	getPosts,
	createPost,
	getPost,
	deletePost,
	updatePost,
	getPostByCategory,
} = require("../controllers/post");

const validator = require("../middlewares/validator");

const jwtValidator = require("../middlewares/jwt");

const {
	createPostSchema,
	updatePostSchema,
	paramsSchema,
} = require("../validations/post");

router.get("/posts", getPosts);
router.get("/posts/:id", validator.params(paramsSchema), getPost);
router.post(
	"/posts",
	jwtValidator,
	validator.body(createPostSchema),
	createPost
);
router.get("/posts/:category", getPostByCategory);

router.put(
	"/posts/:id",
	jwtValidator,
	validator.params(paramsSchema),
	validator.body(updatePostSchema),
	updatePost
);
router.delete(
	"/posts/:id",
	jwtValidator,
	validator.params(paramsSchema),
	deletePost
);

module.exports = router;
