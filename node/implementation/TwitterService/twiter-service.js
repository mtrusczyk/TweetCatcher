var axios = require('axios').default;
class TwitterService {
    async getTweets(body, url) {
        try {
            var config = {
                method: 'post',
                url: url,
                headers: {
                    'Authorization': `Bearer ${process.env.BEARER_TOKEN}`,
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify(body)
            };
            return await axios(config);
        } catch (err) {
            console.log('Twitter service', err);
        }
    }
}

module.exports = TwitterService;
