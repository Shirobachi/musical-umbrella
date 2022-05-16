const express = require('express');
const common = require('../common'); // Import common.js with the functions
const router = express.Router();


// POST 'office': data office{}, auth: token
router.post('/', async (req, res) => {
	// console barer token
	const token = req.headers.authorization;
	if (!token) {
		return res.status(401).json({
			error: 'No token provided.'
		});
	}

	const isAdmin = await common.isAdmin(token.split(' ')[1]);

	if (!isAdmin)
		return res.status(401).json({
			error: 'Unauthorized',
		});

	// get data from request
	const office = req.body;		

	// connect to DB
	const db = await common.connectDB('offices');

	// insert data
	try{
		await db.insertOne(office);
		res.status(201).json(office)
	}
	catch(err){
		res.status(500).json({
			error: err.message,
		});
	}
}); 


// GET '/': get all offices, auth: token
router.get('/', async (req, res) => {
	// connect to DB
	const db = await common.connectDB('offices');

	// Get all
	try{
		const offices = await db.find().toArray();
	
		// remove _id
		offices.forEach(office => {
			delete office.size;
			delete office.phone;
			delete office.email;
		});

		const settings = req.query || {};
    console.log("🚀 ~ file: office.js ~ line 66 ~ router.get ~ settings", settings)
		res.status(200).json(common.paging(offices, settings));
	}
	catch(err){
		res.status(500).json({
			error: err.message,
		});
	}

});

module.exports = router;