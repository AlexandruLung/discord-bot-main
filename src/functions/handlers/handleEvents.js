const { fs } = require("fs");

module.exports = (client) => {
  client.handleEvents = async () => {
    const eventFolders = fs.readdirSync("./src/events");

    for (const folder of eventFolders) {
      const eventFiles = fs
        .readdirSync(`./src/evets/${folder}`)
        .filter((file) => file.endsWith(".js"));

      switch (folder) {
        case "client":
          for (const files of eventFiles) {
            const events = require(`../../events/${folder}/${files}`);
            if (events.once)
              client.once(events.name, (...args) => {
                events.execute(...args, client);
              });
            else
              client.on(events.name, (...args) =>
                events.execute(...args, client)
              );
          }
          break;

        default:
          break;
      }
    }
  };
};
