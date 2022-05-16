const express = require('express');
const common = require('../common'); // Import common.js with the functions
const router = express.Router();
const ObjectID = require('mongodb').ObjectID;

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

// GET '/:_id': get office by _id, auth: token
router.get('/:_id', async (req, res) => {
	// const id
	const id = req.params._id;
  console.log("🚀 ~ file: office.js ~ line 74 ~ router.get ~ id", id)
	
	// check token
	const token = req.headers.authorization;
  console.log("🚀 ~ file: office.js ~ line 74 ~ router.get ~ token", token)
	if (!token) {
		return res.status(401).json({
			error: 'No token provided.'
		});
	}

	// check token valid
	const isTokenValid = await common.decode(token.split(' ')[1]);
  console.log("🚀 ~ file: office.js ~ line 82 ~ router.get ~ isTokenValid", isTokenValid)
	if(!isTokenValid)
		return res.status(401).json({
			error: 'Unauthorized',
		});


	// Connect DB
	const db = await common.connectDB('offices');
  console.log("🚀 ~ file: office.js ~ line 97 ~ router.get ~ objId", objId)
  console.log("🚀 ~ file: office.js ~ line 97 ~ router.get ~ id", id)
	// Get by _id
	try{
		var objId = new ObjectID(id); 
		const office = await db.findOne({
			_id: objId,
		});
    console.log("🚀 ~ file: office.js ~ line 104 ~ router.get ~ office", office)

		if (!office)
			return res.status(404).json({
				error: 'Office not found',
			});

		res.status(200).json(office);
	}
	catch(err){
		res.status(500).json({
			error: err.message,
		});
	}

});

// DEL '/:_id': delete office by _id, auth: token
router.delete('/:_id', async (req, res) => {
	// validate token
	const token = req.headers.authorization;
	if (!token) {
		return res.status(401).json({
			error: 'No token provided.'
		});
	}

	// validate token valid
	const isTokenValid = await common.decode(token.split(' ')[1]);
	if(!isTokenValid)
		return res.status(401).json({
			error: 'Unauthorized',
		});

	// validate id
	const id = req.params._id;
	if (!id) {
		return res.status(400).json({
			error: 'No id provided.'
		});
	}

	// Check id valid
	try{
		var objId = new ObjectID(id);
	}
	catch(err){
		return res.status(400).json({
			error: 'Invalid id',
		});
	}

	// Connect DB
	const db = await common.connectDB('offices');

	// Delete object by id
	try{
		const office = await db.findOneAndDelete({
			_id: objId,
		});
		if (!office || !office.value)
			return res.status(404).json({
				error: 'Office not found',
			});
				
		res.status(200).json(
			{
				message: 'Office deleted',
			}
		);
	}
	catch(err){
		res.status(500).json({
			error: err.message,
		});
	}

})

module.exports = router;