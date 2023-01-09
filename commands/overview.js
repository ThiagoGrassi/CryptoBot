const Discord = require('discord.js');
const CoinGecko = require("coingecko-api");
const CoinGeckoClient = new CoinGecko();

exports.run = async (client, message, args) => {
    let data = await CoinGeckoClient.simple.price({
        ids: ['bitcoin', 'dogecoin', 'usd-coin'],
        vs_currencies: ['brl'],
    });

    let dogevalor = data.data.dogecoin.brl.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'});
    let btcvalor = data.data.bitcoin.brl.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'});
    let usdvalor = data.data['usd-coin'].brl.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'});
    
    const embed = new Discord.MessageEmbed()
    .setTitle("Visão Geral")
    .setThumbnail('https://cdn.discordapp.com/attachments/838762386818072599/838912491047092294/candlestick-chart-candlestick-pattern-technical-analysis-trader-stock-stock-quotes-e03c5a6687ecde21d.png')
    .setDescription("Mostra os preços das moedas de mais interesse")
    .addField('USD', `1 Dólar = ${usdvalor}`)
    .addField('<:btcemote:838913868130287687> BTC', `1 Bitcoin = ${btcvalor}`)
    .addField("<:dogeemote:838913772768591912> DOGE", `1 Dogecoin = ${dogevalor}`)
    .setTimestamp()
    .setFooter("Dados por CoinGecko");
    
    message.channel.send(embed);
};
