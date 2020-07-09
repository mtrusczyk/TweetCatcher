var axios = require('axios').default;
class TwitterService {
    async getTweets(body, url) {
        try {
            var config = {
                method: 'post',
                url: url,
                headers: {
                    'Authorization': `Bearer ${process.env.BEARER_TOKEN}`,
                    'Content-Type': 'application/json',
                    'Cookie': 'personalization_id="v1_HEjATDUwDCYKR2Jp0414lQ=="; guest_id=v1%3A159390443859769921'
                },
                data: JSON.stringify(body)
            };
            return await axios(config);
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = TwitterService;
