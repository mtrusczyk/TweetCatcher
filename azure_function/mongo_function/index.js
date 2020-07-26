const TweetContext = require("./TweetContext");

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    if (req.body && req.body.tweets) {
        try {
            let tweetContext = new TweetContext();
            tweetContext.insertTweets(req.body.tweets).then(() => {
                context.res = {
                    body: "Tweets inserted successfully"
                };
            }, (err) => {
                context.res = {
                    status: 500,
                    body: 'Internal Server Error'
                };
            });
        } catch (err) {
            console.log(err);
            context.res = {
                status: 500,
                body: 'Internal Server Error'
            };
        }
    }
    else {
        context.res = {
            status: 400,
            body: "Please pass a tweets in the body"
        };
    }
};