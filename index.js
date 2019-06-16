const Twit = require("twit");
const quotes = require("./quotes");
const config = require("./config/config");

const T = new Twit(config);

const randomNumberGen = max => {
  return Math.floor(Math.random() * max);
};

const grabRandomQuote = () => {
  const maxRandomNumber = quotes.length;
  return quotes[randomNumberGen(maxRandomNumber)];
};

function tweetQuote() {
  const { quote, author } = grabRandomQuote();
  const trimmedAuthor = author.replace(/\s/g, "");

  const tweet = `${quote} --${author} #quotes #quotesauce #${trimmedAuthor} #inspiration #motivation`;

  T.post(
    "statuses/update",
    {
      status: tweet
    },
    (err, data, response) => {
      if (err) console.log(err);

      console.log("Message sent!");
    }
  );
}

const hour = 3600000;

setInterval(() => tweetQuote(), hour);
