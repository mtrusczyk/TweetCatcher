var axios = require('axios').default;
class AzureService {
    async insertTweets(tweets, url) {
        var data = JSON.stringify({ "tweets": tweets });

        var config = {
            method: 'post',
            url: url,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };
        try {
            return await axios(config)
        } catch (err) {
            console.log('error in AzureService');
            Promise.reject('error in AzureService')
        }
    }
}

module.exports = AzureService;