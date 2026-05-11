const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser'); // Corrected import
const usersModel = require('../models/user-model');
const { generateToken } = require('../utils/generated-token');

module.exports.isLoggedIn = async function(req, res, next) {
    try {
        // Initialize cookie parser middleware
        cookieParser()(req, res, () => {});


        // Retrieve token from cookies
        const token = req.cookies.token;

        // If token is not present, redirect to login
        if (!token) {
            req.flash("error", "You need to login first");
            return res.status(401).redirect('/');
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_KEY);

        // Find user by ID from decoded token
        req.user = await usersModel.findById(decoded.id).select("-password");

        // If user not found, throw an error
        if (!req.user) {
            req.flash("error","User Not Found");
            return res.status(401).redirect('/');
        }

        // User is authenticated, proceed to next middleware
        next();
    } catch (err) {
        console.error(err); // Log the error for debugging
        req.flash("error", "Something went wrong.");
        return res.status(401).redirect("/");
    }
}
