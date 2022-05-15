// .env file
DB_LOGIN = process.env.DB_LOGIN
DB_PASS = process.env.DB_PASS
DB_HOST = process.env.DB_HOST
DEBUG = process.env.DEBUG || false
DB_DATABASE = process.env.DB_DATABASE + (DEBUG ? '-dev' : '')

const jwt = require('jsonwebtoken'); // jwt

// config mongo DB
async function connectDB (collectionName) {
	const {MongoClient}=require('mongodb');
	const URI = `mongodb+srv://${DB_LOGIN}:${DB_PASS}@${DB_HOST}?authSource=admin&replicaSet=atlas-xgft2n-shard-0&w=majority&readPreference=primary&retryWrites=true&ssl=true`
	const client = await new MongoClient(URI); 
	await client.connect();

	return client.db(DB_DATABASE).collection(collectionName);
}	

async function decode (token){
	const JWT_SECRET = process.env.JWT_SECRET;

	try{
		var decoded = jwt.verify(token, JWT_SECRET);
	}
	catch (err) {
		return undefined
	}

	// get user from database
	const db = await connectDB('users');
	const user = await db.findOne({
		email: decoded
	});

	return user;
}

async function isAdmin(token){
	const user = await decode(token);
	return user.admin;
}
// export
module.exports = {
	connectDB,
	decode,
	isAdmin,
}