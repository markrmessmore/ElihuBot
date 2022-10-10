const   { EmbedBuilder } = require('discord.js'),
        moment           = require('moment');

exports.discordMessage = function (discordClient, rssPost, settings){
    let titles          = new Set()
    let limitDate       = moment().subtract(7, 'days')
    let discordChannel  = discordClient.channels.cache.get(settings.guildChannel)
    //IF THE DATE OF THE POST IS LESS THAN 7 DAYS OLD...REVIEW
    if (limitDate < moment(rssPost.date, "ddd MMM DD YYYY")){
      //GATHER THE LAST 100 POSTS FROM THE CHANNEL POSTED BY THE BOT
            discordChannel.messages.fetch({limit: 100})
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
                if (!titles.has(rssPost.title)) {
                    console.log(rssPost.title, rssPost.date)
                    let rssEmbed = new EmbedBuilder()
                        .setColor(settings.messageColor)
                        .setTitle(rssPost.title)
                        .setThumbnail(rssPost.img)
                        .addFields(
                            {name: "Link:", value: rssPost.link},
                            {name: "Published:", value: rssPost.date, inline: true}
                        )
                    discordChannel.send({embeds: [rssEmbed]})
                }
            })
            .catch(err => console.log(err))
      }
}