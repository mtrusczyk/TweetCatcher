var MongoClient = require('mongodb').MongoClient;

class TweetContext {
    mongoUrl = `mongodb://${process.env.CAPSTONE_WRITE_USER}:${process.env.CAPSTONE_WRITE_PASSWORD}@${process.env.MONGO_BASE_URL}?authSource=${process.env.TWEET_DATABASE}`;

    /**
     * Inserts tweets into db
     * @param {any[]} tweets 
     */
    async insertTweets(tweets) {
        let client = new MongoClient(this.mongoUrl, { useUnifiedTopology: true });
        client.connect().then(async () => {
            let collection = client.db(process.env.TWEET_DATABASE).collection(process.env.TWEET_COLLECTION);
            try {
                await collection.insertMany(tweets);
                return Promise.resolve();
            } catch (err) {
                this.client.close();
                console.error(err);
                throw new Error(err);
            }
        }).catch(err => {
            console.error(err);
        }).finally(_ => client.close());
    }
};

module.exports = TweetContext;