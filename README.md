# SoupTube

A Twitter bot that automatically shares classic movie trivia and manages follower relationships while building an engaged community of classic film enthusiasts.

> ⚠️ **Warning**: This is not really used for reuse. Moreso a personal project to play with the Twitter API. It prolly won't work anymore since the Twitter (X) API hasn changed significantly. Wah wah... 😭
## Features

- 🎬 Automated posting of classic movie trivia and facts
- 👥 Smart follower management system
- ⏱️ Scheduled posting at optimal times
- 🔄 Automatic unfollowing of non-reciprocal followers
- #️⃣ Integrated hashtag system for better reach
- 📊 Filtering system for targeting quality accounts

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/souptube.git
cd souptube
```

2. Install dependencies:
```bash
npm install
```

3. Set up your Twitter API credentials:
   - Create a Twitter Developer account and create a new app
   - Copy your API keys and tokens
   - Create a `config/config.js` file with your credentials:
   ```javascript
   module.exports = {
     consumer_key: "YOUR_CONSUMER_KEY",
     consumer_secret: "YOUR_CONSUMER_SECRET",
     access_token: "YOUR_ACCESS_TOKEN",
     access_token_secret: "YOUR_ACCESS_TOKEN_SECRET",
     timeout_ms: 60 * 1000,
     strictSSL: true,
   };
   ```

## Usage

Start the bot:
```bash
npm start
```

The bot will automatically:
- Post movie trivia at 8 AM daily
- Follow relevant users based on configured keywords
- Manage following/follower relationships
- Unfollow accounts that don't follow back after a certain period

### Customization

You can modify the following parameters in `functions.js`:

```javascript
let dailyKeywords = [
  "drunk commentary",
  "drunk",
  "party animal",
  "terrible movie"
];
```

Adjust follower criteria in the `filterUsers` function:
```javascript
const criteria = {
  followers_count: 1000,  // Minimum followers
  statuses_count: 100,    // Minimum tweets
  following: false,       // Not already following
  follow_request_sent: false  // No pending requests
};
```

## Configuration

The bot can be configured through several timing constants in `index.js`:

```javascript
const thirtyMinutes = 1800000;
const fiveMinutes = 300000;
const hour = 3600000;
const fiveHour = 18000000;
const twoHour = 7200000;
const threeHour = 10800000;
```

You can adjust these values to change the frequency of various operations.

## Contributing

This is not really used for reuse. Moreso a personal project to play with the Twitter API. But feel free to copy!

## Testing

What's testing?

## License

This project is licensed under the ISC License - see the LICENSE file for details.

## Acknowledgements

- Built using the [Twit](https://github.com/ttezel/twit) package for Twitter API integration
- Classic movie trivia sourced from various public domain resources
- Inspired by the classic film community on Twitter

## Security Note

Remember to never commit your actual Twitter API credentials. Always use environment variables or a secure configuration management system in production.
