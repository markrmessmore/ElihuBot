# 🤖 ElihuBot

[![Open Source Love](https://firstcontributions.github.io/open-source-badges/badges/open-source-v1/open-source.svg)](https://github.com/firstcontributions/open-source-badges)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

This is a simple bot that listens to the RSS feed of your choice and posts an update into a selected discord channel.

## Prerequisite

1. Go to the [Discord Developers Portal](https://discord.com/developers/applications/).

2. Click on the New Application button, enter your desired bot name, and click Create.

3. In your new application, go to the Bot tab, click Add Bot, and confirm Yes, do it!

4. Change your bot's Public Bot setting off so only you can invite it, save, and then get your Bot Token with the Copy button.
Go in index.js file to replace `<BOT_TOKEN_HERE>`
```
discordToken: "<BOT_TOKEN_HERE>",
```

6. Replace `<CLIENT_ID_HERE>` in the following URL and visit it in the browser to invite your bot to your new test server.
```
https://discordapp.com/api/oauth2/authorize?client_id=<CLIENT_ID_HERE>&permissions=8&scope=bot
```

7. First, enable developer mode in your client so you can easily copy IDs.

8. Go to your User Settings and click on the Appearance tab.
Under Advanced, enable Developer Mode.

9. Right click the server icon and click Copy ID.
Go in index.js file to replace `<GUILD_ID_HERE>` 
```
guildID : "<GUILD_ID_HERE>",
```

10. Create a test channel.
Right click a channel name and click Copy ID.
Go in index.js file to replace `<GUILD_PRIMARY_CHANNEL_HERE>`
```
guildPrimaryChannel : "<GUILD_PRIMARY_CHANNEL_HERE>",
```

## Installation & Run Bot

Install node libraries
```
npm install
```
Run application
```
node index.js
```

