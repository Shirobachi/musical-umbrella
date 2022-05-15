const express = require('express');
const common = require('../common'); // Import common.js with the functions
const router = express.Router();


// POST 'office': data office{}, auth: token
router.post('/', async (req, res) => {
	// console barer token
	const token = req.headers.authorization.split(' ')[1];
	const isAdmin = await common.isAdmin(token);

	if (!isAdmin)
		return res.status(401).json({
			error: 'Unauthorized',
		});

	// get data from request
	const office = req.body;		
  console.log("🚀 ~ file: office.js ~ line 19 ~ router.post ~ office", office)

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


module.exports = router;