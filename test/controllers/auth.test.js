const { login } = require("../../src/controllers/auth");
const { findByUsername } = require("../../src/services/user");
const { sign } = require("jsonwebtoken");

jest.mock("jsonwebtoken");
jest.mock("../../src/services/user");

describe("Auth Controller Unit Test", () => {
	describe("login(request, response) test", () => {
		it("should return a json web token if the credentials are correct", async () => {
			
			const request = {
				body: {
					username: "NewUser",
					password: "123456789",
				},
			};

			const response = {
				status: jest.fn().mockReturnThis(),
				json: jest.fn(),
			};

			findByUsername.mockResolvedValueOnce({
				id: 1,
				username: "NewUser",
				password: "123456789",
			});

			sign.mockReturnValue("thi-is-a-jwt-xd");

			await login(request, response);

			expect(response.status).toHaveBeenCalledWith(200);
			expect(response.json).toHaveBeenCalledWith({
				jwt: "thi-is-a-jwt-xd",
			});
		});

		it("should return an error 400 if the username doesnt exist", async () => {
			const request = {
				body: {
					username: "NewUser",
					password: "781923891723981",
				},
			};

			const response = {
				status: jest.fn().mockReturnThis(),
				json: jest.fn(),
			};

			findByUsername.mockResolvedValueOnce(null);

			await login(request, response);

			expect(response.status).toHaveBeenCalledWith(400);
			expect(response.json).toHaveBeenCalledWith({
				message: "Invalid Data",
				messagedev: "Cannot find user",
				code: "ERR_AUTH",
			});
		});

		it("should return an error 400 if the password is not the same", async () => {
			const request = {
				body: {
					username: "NewUser",
					password: "781923891723981",
				},
			};

			const response = {
				status: jest.fn().mockReturnThis(),
				json: jest.fn(),
			};

			findByUsername.mockResolvedValueOnce({
				id: 1,
				username: "NewUser",
				password: "unacontraseñatodachafaxd",
			});

			await login(request, response);

			expect(response.status).toHaveBeenCalledWith(400);
			expect(response.json).toHaveBeenCalledWith({
				message: "Invalid Data",
				messagedev: "Cannot find user",
				code: "ERR_AUTH",
			});
		});
	});
});
