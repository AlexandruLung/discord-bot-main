const { fs } = require("fs");

module.exports = (client) => {
  client.handleCommands = async () => {
    const commandFolder = fs.readdirSync(`./src/commands`);
    for (const folder of commandFolder) {
      const commandFile = fs
        .readdirSync(`./src/commands/${folder}`)
        .fiter((file) => file.endWith(".js"));
    }

    const { commands, commandArray } = client;
    for (const file of commandFile) {
      const command = require(`../../commands/${folder}/${file}`);
      commands.set(command.data.name, command);
      commandArray.push(command.data.toJSON());
      console.log(
        `Commands: ${command.data.name} has passed throught the handler`
      );
    }
  };
};
