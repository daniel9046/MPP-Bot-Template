const Command = require('../command.js')

module.exports = class HelpCommand extends Command {
  constructor (client) {
    super('help', ['h'], 'A Help Command.', {
      usage: `${client.settings.prefix}help OR ${client.settings.prefix}h`,
      category: 'gen'
    })
  }

  async run (client, msg) {

    client.mpp.sendMessage('📖 Help')
    client.mpp.sendMessage(`Built by Khai <3 - Use ${client.settings.prefix}convert {YOUTUBE_URL} to use the AI midi converter. It only works for piano videos.`)

    let data = []

    let commandCategories = client.commands.map(x => x.category)
    commandCategories.reduce((a, b) => { // remove dupes
      a = a || []
      if (!a.includes(b)) a.push(b)
      return a
    }, [])
    .forEach(category => {
      if(category.toLowerCase() === 'dev' && !client.settings.admins.includes(msg.author.id)) return
      category = category.charAt(0).toUpperCase() + category.slice(1) // make 1st character uppercase
      client.mpp.sendMessage(`${category}ㅤㅤ${client.commands.filter(x => x.category === category.toLowerCase()).map(x => `${client.settings.prefix}${x.name.toLowerCase()}`).join(', ')}`)
    })
  }
}
