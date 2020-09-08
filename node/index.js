const TweetCatcher = require('./implementation/TweetCatcher/tweet-catcher');
const express = require('express')

const app = express()
const port = process.env.PORT

app.get('/migrateTweets', (req, res) => {

});

app.get('/getTweets', (req, res) => {
    getTweets().then(_ => {
        res.send('done');
    }).catch(err => {
        console.log('index.js', err);
        res.send('error');
    })
})

app.listen(port, () => {
    console.log(`listening on port ${process.env.PORT}`);
})

const getTweets = async () => {
    try {
        const tweetCatcher = new TweetCatcher();
        const result = await tweetCatcher.catchTweets()
        return Promise.resolve(result);
    } catch (err) {
        Promise.reject(err);
    }
}


