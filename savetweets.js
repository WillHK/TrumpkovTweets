const Twitter = require('twitter');
const fs = require('fs');

var client = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN_KEY,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
});

let params = {
  screen_name: 'realDonaldTrump',
  count: 200,
  include_rts: false,
  exclude_replies: true,
};

let tweetString = '';
let lowestId = 100000000000000000000;
client.get('statuses/user_timeline', params, (err, tweets) => {
  if (!err) {
    tweets.forEach((tweet) => {
      tweetString += tweet.text + '\n';
      if (tweet.id < lowestId) lowestId = tweet.id;
    });
    // console.log(tweetString);
    fs.appendFile('./tweets.txt', tweetString, (err) => {
      if (err) throw err;
      console.log('saved ');
      for(let i = lowestId; i > lowestId - 4000; i -= 200) {
        let params = {
          screen_name: 'realDonaldTrump',
          count: 200,
          max_id: i,
          include_rts: false,
          exclude_replies: true,
        };
        let tweetString = '';
        client.get('statuses/user_timeline', params, (err, tweets) => {
          if (!err) {
            tweets.forEach((tweet) => {
            tweetString += tweet.text + '\n';
          });
            // console.log(tweetString);
            fs.appendFile('./tweets.txt', tweetString, (err) => {
              if (err) throw err;
              console.log('saved ');
            });
          }
        });
      }
    });
  }
});
