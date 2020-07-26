var MongoClient = require('mongodb').MongoClient;

class TweetContext {
    constructor() {
        const mongoUrl = process.env.mongoConnectionString;
        this.client = new MongoClient(mongoUrl, { useUnifiedTopology: true });
    }
    /**
     * Inserts tweets into db
     * @param {any[]} tweets 
     */
    async insertTweets(tweets) {
        this.client.connect().then(() => {
            const collection = this.client.db("capstone_database").collection("tweets");
            return collection.insertMany(tweets).then(_ => Promise.resolve());
        }).catch(err => {
            this.client.close();
            console.error(err);
            throw err;
        });
    }

    closeConnection() {
        this.client.close();
    }
}

module.exports = TweetContext;