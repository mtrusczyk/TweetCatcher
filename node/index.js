var TweetContext = require('./implementation/context/tweetContext');
const TwitterService = require('./implementation/TwitterService/twiter-service');

const getTweets = async () => {
    console.log(process.env);
    let context
    try {
        context = new TweetContext();
        const service = new TwitterService();
        let response = await service.getTweets({
            "query": "from:elonmusk lang:en",
            "maxResults": "100",
            "fromDate": "201701010000",
            "toDate": "202007010000"
        }, 'https://api.twitter.com/1.1/tweets/search/fullarchive/capstone.json');

        console.log(response.data.next);

        while (response.data.next) {
            await context.insertTweets(response.data.results);
            await sleep();
            response = await service.getTweets({
                "query": "from:elonmusk lang:en",
                "maxResults": "100",
                "fromDate": "201701010000",
                "toDate": "202007010000",
                "next": response.data.next
            }, 'https://api.twitter.com/1.1/tweets/search/fullarchive/capstone.json');
        }
    } catch (err) {
        console.error(err);
    } finally {
        context.closeConnection();
    }
}

const sleep = async (ms) => {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

getTweets();

