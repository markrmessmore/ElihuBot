const { Client, EmbedBuilder, GatewayIntentBits } = require('discord.js'),
      discordClient                 = new Client({ intents: [ GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent ]}),
      moment                        = require('moment'),
      RssFeedEmitter                = require('rss-feed-emitter'),
      settings                      = {
            botId             : "297735820788629524", //LISTED IN DISCORD AS APPLICATION ID
            botName           : "Elihu's RSS Bot",
            discordToken      : "Mjk3NzM1ODIwNzg4NjI5NTI0.GH5hgZ.Df4VUQ-QMYdPFREidLHAL1cdhjEgr0NFGD0aN0",
            guildID           : "283038901579284480",
            guildChannel      : "789933126817546251",
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
      // rssListener2(
      //       {
      //             img: "https://i.picsum.photos/id/1012/3973/2639.jpg?hmac=s2eybz51lnKy2ZHkE2wsgc6S81fVD1W2NKYOSh8bzDc",
      //             url: 'https://lorem-rss.herokuapp.com/feed'
      //       }
      // )
});

// DISCORD MESSAGE FUNCTION
const discordMessage = (msg) => {
    let titles      = new Set()
    let limitDate   = moment().subtract(7, 'days')
    let dChannel    = discordClient.channels.cache.get(settings.guildChannel)
    //IF THE DATE OF THE POST IS LESS THAN 7 DAYS OLD...REVIEW
    if (limitDate < moment(msg.date, "ddd MMM DD YYYY")){
      //GATHER THE LAST 100 POSTS FROM THE CHANNEL POSTED BY THE BOT
            dChannel.messages.fetch({limit: 100})
            .then(res => {
                  // SELECT ONLY MESSAGES POSTED BY THE BOT (IN CASE ANY OTHER MESSAGES ARE POSTED IN THIS CHANNEL), THEN ADD THEM TO THE SET
                  return res.forEach(m => {
                        if (m.author.id === settings.botId && m.embeds.length > 0){
                              titles.add(m.embeds[0].title)
                        }
                  })
            })
            .then(() => {
                  //NOW THAT WE HAVE ALL THE TITLES IN THE SET, WE CHECK IF THIS TITLE IS PRESENT. IF IT IS NOT, WE SEND IT TO THE CHANNEL. THIS HELPS PREVENT DUPLCIATE POSTS
                  if (!titles.has(msg.title)) {
                        console.log(msg.title, msg.date)
                        let rssEmbed = new EmbedBuilder()
                              .setColor('#bb0000')
                              .setTitle(msg.title)
                              .setThumbnail(msg.img)
                              .addFields(
                                    {name: "Link:", value: msg.link},
                                    {name: "Published:", value: msg.date, inline: true}
                              )
                        dChannel.send({embeds: [rssEmbed]})
                  }
            })
            .catch(err => console.log(err))
      }
}

// RSS FEED
const rssListener1 = (rssData) => {
      let getRSS = new RssFeedEmitter({ skipFirstLoad: true })
      console.log("Listening for RSS Updates!")
    
      getRSS.add({
        url: rssData.url,
        refresh: settings.refreshInterval
      });
    
      getRSS.on('new-item', item => {
            let mappedItem =  {
                  date  : item.date.toDateString(),
                  img   : rssData.img,
                  link  : item.link,
                  title : item.title
            }
        discordMessage(mappedItem)
      })
};

// DUPLICATE RSS FEED, READY FOR YOUR USE
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
//         discordMessage(mappedItem)
//       })
// };