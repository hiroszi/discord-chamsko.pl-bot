const { Client, RichEmbed, Attachment } = require("discord.js");
const axios = require("axios");
const { parse } = require("node-html-parser");
const TOKEN = "YOUR TOKEN";
const chamskoUrl = "https://www.chamsko.pl";

const bot = new Client();
bot.login(TOKEN);

function requestAxios(url) {
    return axios.get(url);
}

let getHtml = async url => {
    let html = await requestAxios(url);
    return html.data;
};

bot.on("message", message => {
    let matches = message.content.match(/!mem\s([0-9]*)/);
    matches = matches ? parseInt(matches[1]) : 1;

    if (message.content === "!mem" || matches > 1) {
        // const msg = new RichEmbed()
        //     .setTitle("Jakiś tam komunikat")
        //     .setColor(0x00ff00)
        //     .setDescription("Testowa wiadomość ❤️");
        for (let i = 0; i < matches; i++) {
            setTimeout(() => {
                getHtml("https://www.chamsko.pl/losowy.html").then(data => {
                    const html = parse(data);
                    const imageSrc = html.querySelector(
                        ".frame .image .img-responsive"
                    ).attributes.src;
                    const attachment = new Attachment(chamskoUrl + imageSrc);
                    bot.channels.get("548272115724451884").send(attachment);
                });
            }, 2000);
        }
    }
});

bot.on("ready", () => {
    console.log("Bot is ready.");
});
