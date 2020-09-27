const MongoClient = require('mongodb').MongoClient;
const MONGO_URL = process.env.mongoConnectionString;

module.exports = async function (context, req) {
    const mongo = new MongoClient(MONGO_URL, { useUnifiedTopology: true });
    if (req.body && req.body.tweets) {
        try {
            const collection = (await mongo.connect()).db('capstone_database').collection('projectedTweets');
            req.body.tweets.forEach(async tweet => {
                try {
                    await collection.findOneAndReplace({ id: tweet.id }, tweet);
                } catch (ex) {
                    console.error(ex)
                    throw new Error(ex);
                }
            });
            context.res = {
                body: 'tweets updated successfully'
            }
        } catch (ex) {
            console.error(ex);
            context.res = {
                status: 500,
                body: 'internal server error'
            }
        }
    } else {
        context.res = {
            status: 400,
            body: 'tweets are required'
        }
    }
}