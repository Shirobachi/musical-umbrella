const express = require('express');
const common = require('../common'); // Import common.js with the functions
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // jwt

// 201: return object with added user, req object with user
router.post('/', async (req, res) => {
	// check if params are set
	if (!req.body || !req.body.email || !req.body.password || !req.body.name) {
		res.status(400).json({
			message: 'Missing required fields'
		})
		return
	}

	const db = await common.connectDB('users');

	// validate if email is valid
	const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if (!emailRegex.test(req.body.email)) {
		res.status(400).json({
			message: 'Invalid email'
		})
		return
	}

	// Check if mail already exists
	const email = await db.findOne({
		email: req.body.email
	});
	if (email) {
		res.status(400).json({
			message: 'Email already exists'
		})
		return
	}

	// Check if name already exists
	const name = await db.findOne({
		name: req.body.name
	});
	if (name) {
		res.status(400).json({
			message: 'Name already exists'
		})
		return
	}

	// Check if password is secure
	const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
	if (!passwordRegex.test(req.body.password)) {
		res.status(400).json({
			message: 'Password is not secure'
		})
		return
	}
	else{
		// Hash password
		req.body.password = await bcrypt.hash(req.body.password, 10);
	}

	// make variable for the collection
	var user = {
		email: req.body.email,
		password: req.body.password,
		name: req.body.name,
		admin: false,
	}

	// Add user to DB
	try{
		db.insertOne(user);
		
		res.status(201).json(user);
		return
	}
	catch (err) {
		res.status(500).json({
			message: 'Internal server error'
		})
		return
	}
});

// 200: return token JWT with email, req: basic auth
router.get('/', async (req, res) => {
	// get basic auth header
	var authHeader = req.headers.authorization;

	// decode base64
	var authHeader	= Buffer.from(authHeader.split(' ')[1], 'base64').toString();
	const login = authHeader.split(':')[0];
	const pass = authHeader.split(':')[1];

	// look in database for user where email is login or name is login
	const db = await common.connectDB('users');
	const user = await db.findOne({
		$or: [
			{
				email: login
			}, 
			{
				name: login
			}
		]
	});

	if (!user) {
		res.status(401).json({
			message: 'Credentials are not valid'
		})
		return
	}
	
	// check if password is correct
	if (!await bcrypt.compare(pass, user.password)) {
		res.status(401).json({
			message: 'Credentials are not valid'
		})
		return
	}

	const JWT_SECRET = process.env.JWT_SECRET;
	// Generate token JWT
	const token = jwt.sign(
		user.email,
		JWT_SECRET 
	);

	res.status(200).json({
		token: token
	})
});

// '/auth/verify': data.token
// 200: User{}
router.post('/verify', async (req, res) => {
	const token = req.body.token;

	if (!token) {
		res.status(400).json({
			message: 'Missing required fields'
		})
		return
	}

	const JWT_SECRET = process.env.JWT_SECRET;
	try{
		var decoded = jwt.verify(token, JWT_SECRET);
	}
	catch (err) {
		res.status(401).json({
			message: 'Token is not valid'
		})
		return
	}

	// get user from database
	const db = await common.connectDB('users');
	const user = await db.findOne({
		email: decoded
	});

	res.status(200).json(user);

});




module.exports = router;