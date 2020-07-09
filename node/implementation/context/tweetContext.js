var MongoClient = require('mongodb').MongoClient;

class TweetContext {
    constructor() {
        const mongoUrl = `mongodb://${process.env.CAPSTONE_WRITE_USER}:${process.env.CAPSTONE_WRITE_PASSWORD}@${process.env.MONGO_BASE_URL}?authSource=${process.env.TWEET_DATABASE}`;
        this.client = new MongoClient(mongoUrl, { useUnifiedTopology: true });
        this.client.connect().then(() => {
            this.collection = this.client.db(process.env.TWEET_DATABASE).collection(process.env.TWEET_COLLECTION);
        }).catch(err => {
            console.error(err);
        });
    }
    /**
     * Inserts tweets into db
     * @param {any[]} tweets 
     */
    async insertTweets(tweets) {
        try {
            await this.collection.insertMany(tweets);
            return Promise.resolve();
        } catch (err) {
            this.client.close();
            console.error(err);
            throw new Error(err);
        }
    }

    closeConnection() {
        this.client.close();
    }
}

module.exports = TweetContext;
