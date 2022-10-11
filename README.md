# 🤖 ElihuBot

[![Open Source Love](https://firstcontributions.github.io/open-source-badges/badges/open-source-v1/open-source.svg)](https://github.com/firstcontributions/open-source-badges)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

This is a simple bot that listens to the RSS feed of your choice and posts an update into a selected discord channel.

## 📝 Prerequisites
#### Install Node.js and npm.
- Please find the installation instructions for your respective environment [here](https://www.digitalocean.com/community/tutorial_collections/how-to-install-node-js).

## 🚀 Getting Started
Fork this repository by clicking on the fork button on the top of this page. This will create a copy of this repository in your account.

### 📋 Step 1
- Go to your GitHub account, open the forked repository, click on the code button and then click the _copy to clipboard_ icon.

### 📋 Step 2
- Open a terminal and run the following git command:
```
git clone "url you just copied"
```
- where "url you just copied" (without the quotation marks) is the url to this repository (your fork of this project).

### 📋 Step 3
- Run the following commands in the terminal to install all the required dependencies.
```
cd ElihuBot
npm install
```
### 📋 Step 4
- Create a new file called `.env` in the root of the project.
- Add the following environment variables to the `.env` file.
```
DISCORD_TOKEN=YOUR_DISCORD_TOKEN
GUILD_ID=YOUR_GUILD_ID
GUILD_CHANNEL_ID=YOUR_GUILD_CHANNEL_ID
```
## Setup Discord Bot
- Create a new application in the [Discord Developer Portal](https://discord.com/developers/applications).
![Discord Developer Portal](https://i.imgur.com/IESJttn.png)
- Go to the bot tab and create a new bot.
- Copy the bot token and paste it in the `.env` file in the `DISCORD_TOKEN` field.
![Discord Bot Token](https://i.imgur.com/1G8kQYX.png)
- Go to the OAuth2 tab and select `bot` in the scopes section.
![Discord OAuth2](https://i.imgur.com/kEuipiK.png)
- Select the permissions you want to give to the bot. Here we have selected `Send Messages` and `Manage Messages`.
![Discord Permissions](https://i.imgur.com/1MH188C.png)
- Copy the generated link and paste it in your browser to add the bot to your server.
![Discord Invite Link](https://i.imgur.com/wXxKxDv.png)
- Then enable the `Developer Mode` in the Discord settings to be able to copy ids, by going to `User Settings > Appearance > Advanced > Developer Mode`.
- Right click on the server icon and select `Copy ID` to copy the `GUILD_ID` and right click on the channel you want to post the updates in and select `Copy ID` to copy the `GUILD_CHANNEL_ID` and paste them in the `.env` file.

## 📦 Running the bot
- Run the following command in the terminal to start the bot.
```
npm start
```
- You should see the following message in the terminal.
```
Logged into Discord as Elihu's RSS Bot
Listening for RSS Updates!
```

## 📖 Contributing
We love contributions from everyone. Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📃 License
Distributed under the MIT License. See [LICENSE](https://github.com/markrmessmore/ElihuBot/blob/main/LICENSE) for more information.
