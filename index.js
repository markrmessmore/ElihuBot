const { Client, GatewayIntentBits } = require('discord.js'),
      discordClient                 = new Client({ intents: [ GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent ]}),
      messageHandler                = require('./messageHandler.js'),
      RssFeedEmitter                = require('rss-feed-emitter'),
      settings                      = {
            botId             : "", //LISTED IN DISCORD AS APPLICATION ID
            botName           : "Elihu's RSS Bot",
            discordToken      : "",
            guildID           : "",
            guildChannel      : "",
            messageColor      : "#bb0000",
            refreshInterval   : 30000, //IN MS - FOR MORE INFO SEE https://github.com/filipedeschamps/rss-feed-emitter
            //WARNING - POLLING TOO OFTEN MAY LEAD TO YOU BEING BLOCKED FROM SOME SITES/SERVICES.
      }


// START'ER UP
discordClient.login(settings.discordToken)

discordClient.on('ready', () => {
      console.log(`Logged into Discord as ${settings.botName}`);
      rssListener1(
            {
                  img: "https://i.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U",
                  url: 'https://lorem-rss.herokuapp.com/feed'
            }
      )
      // DUPLICATE RSS FEED SETUP, READY FOR YOUR USE
      // rssListener2(
      //       {
      //             img: "https://i.picsum.photos/id/1012/3973/2639.jpg?hmac=s2eybz51lnKy2ZHkE2wsgc6S81fVD1W2NKYOSh8bzDc",
      //             url: 'https://lorem-rss.herokuapp.com/feed'
      //       }
      // )
});

// RSS FEED
const rssListener1 = (rssData) => {
      let getRSS = new RssFeedEmitter({ skipFirstLoad: true })
      console.log("Listening for RSS Updates!")
    
      getRSS.add({
        url: rssData.url,
        refresh: settings.refreshInterval
      });
    
      getRSS.on('new-item', item => {
            let postDetails =  {
                  date  : item.date.toDateString(),
                  img   : rssData.img,
                  link  : item.link,
                  title : item.title
            }
        messageHandler.discordMessage(discordClient, postDetails, settings)
      })
};

// DUPLICATE RSS FEED SETUP, READY FOR YOUR USE
// const rssListener2 = (rssData) => {
//       let getRSS = new RssFeedEmitter({ skipFirstLoad: true })
//       console.log("Listening for RSS Updates on feed two!")
    
//       getRSS.add({
//         url: rssData.url,
//         refresh: settings.refreshInterval
//       });
    
//       getRSS.on('new-item', item => {
//             let mappedItem =  {
//                   date  : item.date.toDateString(),
//                   img   : rssData.img,
//                   link  : item.link,
//                   title : item.title
//             }
//        messageHandler.discordMessage(mappedItem)
//       })
// };