const performTextAnalytics = require('./textAnalytics');

module.exports = async function (context, req) {
    if (req.body && req.body.tweets) {
        const tweets = await performTextAnalytics(req.body.tweets);
        context.res = {
            status: 200,
            body: tweets
        }
    } else {
        context.res = {
            status: 400,
            body: 'bad request'
        }
    }
}