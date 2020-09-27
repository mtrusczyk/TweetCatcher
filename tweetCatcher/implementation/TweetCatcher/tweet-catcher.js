const TwitterService = require('../TwitterService/twiter-service');
const AzureService = require('../AzureService/azure-service');

class TweetCatcher {
    async catchTweets() {
        try {
            let body = {
                "query": "from:elonmusk lang:en",
                "maxResults": "100",
                "fromDate": "201701010000",
                "toDate": "201703161511"
            }
            await getTweets(body);
            Promise.resolve('complete');
        } catch (err) {
            console.error(err);
            Promise.reject();
        }
    }
}

const sleep = async (s) => {
    return new Promise((resolve) => {
        setTimeout(resolve, s * 1000);
    });
}

const getTweets = async (body) => {
    const twitterService = new TwitterService();
    const azureService = new AzureService();
    const azureUrl = process.env.AZURE_FUNCTION_URL;
    const twitterUrl = process.env.TWITTER_API_URL;

    return new Promise(async (resolve, reject) => {
        var result = {};
        do {
            try {
                result = await twitterService.getTweets(body, twitterUrl);
                if (result?.data) {
                    body.next = result.data.next
                    await azureService.insertTweets(result?.data?.results, azureUrl);
                    await sleep(2);
                } else
                    resolve();
            } catch (err) {
                console.log('getTweets', err);
                reject(err);
            }
        } while (result?.data?.next)
    })
}



module.exports = TweetCatcher