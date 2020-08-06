const Twit = require("twit");
const config = require("./config/config");

const T = new Twit(config);

const fiveMinutes = 300000;
// const hour = 3600000;
// const fiveHour = 18000000;
// const twoHour = 7200000;
const threeHour = 10800000;

// function tweetIntervalDay() {
//   const currentHour = new Date().getHours();
//   console.log("day");
//   return currentHour >= 8 ? tweetQuote() : null;
// }

// 7 key phrases for a total of 350 friends per day

let dailyKeywords = [
  "logical reasoning",
  "critical thinking",
  "philosophy",
  "theories",
  "paradox",
  "science",
  "abstract",
];

const getDataObject = {
  q: dailyKeywords[2],
  count: 100, // max call
  lang: "en",
  result_type: "recent",
};

function getStatusAndAddToFriends(data, callback) {
  T.get("search/tweets", getDataObject, function (err, data, response) {
    let friendsList = [];

    if (err) {
      console.log("Error in the GET function");
      callback(err);
    }

    let tweets = data.statuses;

    tweets.forEach((tweet) => {
      friendsList.push({
        user_id: tweet.user.id,
        screen_name: tweet.user.screen_name,
        text: tweet.text,
        followers_count: tweet.user.followers_count,
        statuses_count: tweet.user.statuses_count,
        following: tweet.user.following,
        follow_request_sent: tweet.user.follow_request_sent,
      });
    });

    callback(friendsList);
  });
}

function addFriend(user) {
  T.post(
    "friendships/create",
    { user_id: user.user_id, screen_name: user.screen_name },
    function (err, data, response) {
      if (err) {
        console.log(err);
      } else {
        console.log(`Added ${user.screen_name} to your friends list!`);
      }
    }
  );
}

function filterUsers(users) {
  let filteredUsers = [];

  ////// Filter citeria ///////
  const criteria = {
    followers_count: 1000,
    statuses_count: 100,
    following: false,
    follow_request_sent: false,
  };

  users.forEach((user) => {
    if (
      user.followers_count > criteria.followers_count &&
      user.statuses_count > criteria.statuses_count &&
      user.following === criteria.following &&
      user.follow_request_sent === criteria.follow_request_sent
    ) {
      filteredUsers.push(user);
    }
  });

  return filteredUsers;
}

// Tweet user object: //

/////// followers_count /////
// Maybe start with only following people with 1000> followers

/////// friends_count /////
// Doesn't matter at the moment

/////// verified //////
// Doesn't matter at the moment

////// statuses_count /////
// I'd say accounts with over 100 posts would appear to be active. Eventually check time of posts.

////// following (T/F) //////
// Necessary to check

////// follow_request_sent (T/F) //////
// Necessary to check

// get specified status pool
getStatusAndAddToFriends(getDataObject, (response) => {
  let filteredUsers = filterUsers(response);

  console.log(filteredUsers.length);

  let numberOfFilteredUsers = filteredUsers.length;

  for (let i = 0; i < numberOfFilteredUsers; i++) {
    (function (i) {
      setTimeout(function () {
        addFriend(filteredUsers[i]);
      }, 5000 * i);
    })(i);
  }
});

setInterval(() => {
  getStatusAndAddToFriends(getDataObject, (response) => {
    let filteredUsers = filterUsers(response);

    console.log(filteredUsers.length);

    let numberOfFilteredUsers = filteredUsers.length;
    let addInterval = numberOfFilteredUsers * 1000;

    for (let i = 0; i < numberOfFilteredUsers; i++) {
      (function (i) {
        setTimeout(function () {
          addFriend(filteredUsers[i]);
        }, addInterval * i);
      })(i);
    }
  });
}, threeHour);
