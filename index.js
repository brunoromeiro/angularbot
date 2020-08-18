var Twit = require('twit')

require('dotenv').config()

const Bot = new Twit({
    consumer_key:process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET,
    timeout_ms: 60 * 1000,
})

console.log('Este bot está rodando...')
console.log(Bot)

function BotInit() {
    var query = {
        q: "angular",
        result_type:"recent"
    }
    Bot.get('search/tweets', query, BotGotLatestTweet)
    
    function BotGotLatestTweet (error, data, response) {
        if (error) {
            console.log('Bot não conseguiu achar os ultimos tweet, : ' + error)
        } else {
            var id = {
                id: data.statuses[0].id_str
            }
            Bot.post('statuses/retweet/:id', id, BotRetweteed)

            function BotRetweteed(error, response) {
                if (error) {
                    console.log('Bot não conseguiu retweetar, : ' + error)
                } else {
                    console.log('Bot retweetou, :' + id.id)
                }
            }
        }
    }
}

setInterval(BotInit, 60*1000)

BotInit()