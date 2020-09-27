const { TextAnalyticsClient, AzureKeyCredential, AnalyzeSentimentResultArray, RecognizeCategorizedEntitiesResultArray, RecognizeLinkedEntitiesResultArray } = require("@azure/ai-text-analytics");

const key = process.env.textAnalyticsKey;
const endpoint = process.env.textAnalyticsURI;

/**
 * perform sentiment analysis and entity extraction on a collection of tweets
 * @param {any[]} tweets a list of tweet objects
 */
const performTextAnalytics = async (tweets) => {
    const textAnalyticsClient = new TextAnalyticsClient(endpoint, new AzureKeyCredential(key));
    const tweetText = tweets.map(t => t.text);
    return new Promise(async (resolve, reject) => {
        try {
            const sentimentAnalysis = performSentimentAnalysis(tweetText, textAnalyticsClient);
            const entityExtraction = performEntityExtraction(tweetText, textAnalyticsClient);
            const linkedEntities = recognizeLinkedEntities(tweetText, textAnalyticsClient);
            const results = await Promise.all([sentimentAnalysis, entityExtraction, linkedEntities]);
            for (let i = 0; i < tweets.length; i++) {
                console.log(i, tweets[i]);
                tweets[i].sentimentAnalysis = results[0][i];
                tweets[i].entityExtraction = results[1][i];
                tweets[i].linkedEntities = results[2][i];
            }
            resolve(tweets);
        } catch (ex) {
            console.error(ex);
            reject(ex);
        }
    });
}

/**
 * Perform sentiment analysis on a collection of tweets
 * @param {string[]} tweets array of tweet text
 * @param {TextAnalyticsClient} client Azure Text Analytics client
 * @return {Promise<AnalyzeSentimentResultArray>}
 */
const performSentimentAnalysis = async (tweets, client) => {
    return new Promise(async (resolve, reject) => {
        try {
            resolve(await client.analyzeSentiment(tweets));
        } catch (ex) {
            console.error(ex);
            reject('an error ocurred in sentimentAnalysis');
        }
    });
}

/**
 * Perform entity extraction on a collection of tweets
 * @param {string[]} tweets array of tweet text
 * @param {TextAnalyticsClient} client Azure Text Analytics client
 * @returns {Promise<RecognizeCategorizedEntitiesResultArray>}
 */
const performEntityExtraction = async (tweets, client) => {
    return new Promise(async (resolve, reject) => {
        try {
            resolve(await client.recognizeEntities(tweets));
        } catch (ex) {
            console.error(ex);
            reject('an error ocurred in sentimentAnalysis');
        }
    });
}

/**
 * Perform entity extraction on a collection of tweets
 * @param {string[]} tweets array of tweet text
 * @param {TextAnalyticsClient} client Azure Text Analytics client
 * @returns {Promise<RecognizeLinkedEntitiesResultArray>}
 */
const recognizeLinkedEntities = async (tweets, client) => {
    return new Promise(async (resolve, reject) => {
        try {
            resolve(await client.recognizeLinkedEntities(tweets));
        } catch (ex) {
            console.error(ex);
            reject('an error ocurred in sentimentAnalysis');
        }
    });
}


module.exports = performTextAnalytics;