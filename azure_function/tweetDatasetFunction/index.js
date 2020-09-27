const MongoClient = require('mongodb').MongoClient;
const MONGO_URL = process.env.mongoConnectionString;
const SKIP_LIMIT = 50;
module.exports = async function (context, req) {
    if (req.query.page) {
        const mongo = new MongoClient(MONGO_URL, { useUnifiedTopology: true });
        try {
            const collection = (await mongo.connect()).db('capstone_database').collection('projectedTweets');
            const tweets = await collection.find({}, { skip: SKIP_LIMIT * req.query.page, limit: SKIP_LIMIT, projection: { _id: 0 } }).toArray();
            context.res = {
                body: tweets
            }
        } catch (ex) {
            console.error(ex)
            context.res = {
                status: 500,
                body: 'internal server error'
            }
        }
    } else {
        context.res = {
            status: 400,
            body: 'Page is required'
        };
    }
}