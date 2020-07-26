var TweetContext = require('./implementation/context/tweetContext');
const TwitterService = require('./implementation/TwitterService/twiter-service');
const AzureService = require('./implementation/AzureService/azure-service');

const getTweets = async () => {
    let context
    try {
        context = new TweetContext();
        const twitterService = new TwitterService();
        const azureService = new AzureService();
        const azureUrl = process.env.AZURE_FUNCTION_URL;
        const twitterUrl = 'https://api.twitter.com/1.1/tweets/search/fullarchive/capstone.json';
        let cont = true;

        while (cont) {
            const result = await twitterService.getTweets({
                "query": "from:elonmusk lang:en",
                "maxResults": "100",
                "fromDate": "201701010000",
                "toDate": "202007010000"
            }, twitterUrl);
            await context.insertTweets(response.data.results);
            await azureService.insertTweets(response.data.results, azureUrl);
            if (!result.data.next)
                cont = false;
            await sleep(500);
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

