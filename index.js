const express = require('express');
const app = express();
app.get("/", (request, response) => {
  const ping = new Date();
  ping.setHours(ping.getHours() - 3);
  console.log(`Ping recebido às ${ping.getUTCHours()}:${ping.getUTCMinutes()}:${ping.getUTCSeconds()}`);
  response.sendStatus(200);
});
app.listen(process.env.PORT);


const log = console.log;
const discord = require("discord.js");
const client = new discord.Client();
const config = require("./config.json");
const fs = require("fs");

//função de eventos em pasta
fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);

    files.forEach((file) => {

        const Event = require(`./events/${file}`);

        let EventName = file.split(".")[0];

        client.on(EventName, Event.bind(null, client));

    });
});

//token.
client.login(config.token);
