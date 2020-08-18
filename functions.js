const Twit = require("twit");
const config = require("./config/config");
const T = new Twit(config);

//////////////////////////// Adjustables //////////////////////////////

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
  q: dailyKeywords[0],
  count: 100, // max call
  lang: "en",
  result_type: "recent",
};

///////////////////////////////////////////////////////////////////////////

function unfollowPerson(user) {
  T.post(
    "friendships/destroy",
    { user_id: user.id, screen_name: user.screen_name },
    function (err, data, response) {
      if (err) {
        console.log(err, "Error in unfollowPerson");
      }
      console.log(`You unfollowed ${user.screen_name}`);
    }
  );
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

function getCurrentFriends(callback) {
  T.get("friends/list", function (err, data, response) {
    if (err) console.log(err);

    let namesAndIds = [];

    data.users.forEach((user) => {
      namesAndIds.push({
        id: user.id_str,
        screen_name: user.screen_name,
        following: user.following,
      });
    });

    callback(namesAndIds);
  });
}

function checkRelationshipAndUnfollow(friend) {
  T.get(
    "friendships/show",
    {
      target_id: friend.id,
      target_screen_name: friend.sreen_name,
    },
    function (err, data, response) {
      if (err) {
        console.log(err, `Error in check relationship. Cannot find ${friend}`);
      }

      if (!err) {
        if (!data.relationship.source.followed_by) {
          unfollowPerson(friend);
        } else if (data.relationship.source.followed_by) {
          console.log(`${friend.screen_name} is following you!`);
        } else {
          console.log("No relation with user");
        }
      }
    }
  );
}

exports.getStatusAndAddToFriends = getStatusAndAddToFriends;
exports.filterUsers = filterUsers;
exports.unfollowPerson = unfollowPerson;
exports.addFriend = addFriend;
exports.getDataObject = getDataObject;
exports.getCurrentFriends = getCurrentFriends;
exports.checkRelationshipAndUnfollow = checkRelationshipAndUnfollow;
