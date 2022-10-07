const Discord           = require("discord.js"),
      discordClient     = new Discord.Client(),
      moment            = require('moment'),
      RssFeedEmitter    = require('rss-feed-emitter'),
      settings          = {
        botName                 : "Elihu's Test Bot",
        discordToken            : "",
        guildID                 : "",
        guildPrimaryChannel     : "",
        pollInterval            : "60000",
    }


// START'ER UP

discordClient.login(settings.discordToken)

discordClient.on('ready', () => {
      console.log("Logged into Discord");
      rssListener1(
        {
            img: "https://i.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U",
            url: 'https://lifehacker.com/rss'
        }
      )
    //   rssListener2(
    //     {
    //         img: "https://i.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U",
    //         url: 'http://lorem-rss.herokuapp.com/feed'
    //     }
    //   )
});

// DISCORD MESSAGE FUNCTION
const discordMessage = function (msg) {
    let titles      = new Set()
    let limitDate   = moment().subtract(7, 'days')
    let dChannel    = discordClient.channels.cache.get(settings.guildPrimaryChannel)
    //IF THE DATE OF THE POST IS LESS THAN 7 DAYS OLD...REVIEW
    if (limitDate < moment(msg.date, "ddd MMM DD YYYY")){
          dChannel.messages.fetch()
          .then(res => {
                for (let item of res.values()){
                //GATHER THE LAST 100 POSTS FROM THE CHANNEL POSTED BY THE BOT, ADD THEM TO THE SET
                      if (item.author.username == settings.botName && item.embeds.length > 0) { 
                            titles.add(item.embeds[0].title)
                      }
                }
          })
          .then(() => {
                //NOW THAT WE HAVE ALL THE TITLES IN THE SET, WE CHECK IF THIS TITLE IS PRESENT. IF IT IS NOT, WE SEND IT TO THE CHANNEL. THIS HELPS PREVENT DUPLCIATE POSTS
                if (!titles.has(`***${msg.title}***`)) {
                      let rssEmbed = new Discord.MessageEmbed()
                            .setTitle(`***${msg.title}***`)
                            .setThumbnail(`${msg.img}`)
                            .setColor(3447003)
                            .addField("Update URL:", `${msg.link}`)
                            .addField("Published:", `${msg.date}`);
                      dChannel.send(rssEmbed)
                }
          })
          .catch(err => console.log(err))
    }
};

// RSS FEED
const rssListener1 = (rssData) => {
      let getRSS = new RssFeedEmitter()
      console.log("Listening for RSS Updates!")
    
      getRSS.add({
        url: rssData.url,
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

// RSS FEED
const rssListener2 = (rssData) => {
    let getRSS = new RssFeedEmitter()
    console.log("Listening for RSS Updates!")
  
    getRSS.add({
      url: rssData.url,
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