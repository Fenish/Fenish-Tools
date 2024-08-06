const { NextFunction, Request, Response } = require("express");

// LOWER CASE PARAMS MIDDLEWARE
// Middleware function to lowercase;
// - Request query parameters
// - Request route parameters
// - Request body parameters

function toLowerCaseRecursive(obj) {
	if (typeof obj !== 'object' || obj === null) return obj;

	if (Array.isArray(obj)) {
		return obj.map(toLowerCaseRecursive);
	}

	return Object.fromEntries(
		Object.entries(obj).map(([key, value]) => [
			key.toLowerCase(),
			toLowerCaseRecursive(value)
		])
	);
};

// Middleware function to lowercase request parameters
const lowercaseParamsMiddleware = (req, res, next) => {
	try {
		// Lowercase query parameters
		req.query = toLowerCaseRecursive(req.query);

		// Lowercase route parameters
		req.params = toLowerCaseRecursive(req.params);

		// Lowercase body parameters
		if (req.body && typeof req.body === "object") {
			req.body = toLowerCaseRecursive(req.body);
		}

		next();
	} catch (error) {
		// Handle errors
		console.error('Error in lowercaseParamsMiddleware:', error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
};

module.exports = lowercaseParamsMiddleware;
