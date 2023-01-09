const Discord = require('discord.js');
const CoinGecko = require("coingecko-api");
const CoinGeckoClient = new CoinGecko();

exports.run = (async(client, message, args) => {
    
    switch (args[0]) {
      case 'doge':
      case 'DOGE': 
        args[0] = 'DOGECOIN'
      break;
      case 'dolar':
      case 'dollar':
        args[0] = 'TETHER'
      break
    }

    let data = await CoinGeckoClient.coins.fetch(args[0].toLowerCase(), {});
    
    if (data.success == false) return(message.channel.send("Moeda não encontrada, caso haja espaço no nome substua-o por -"));
    
    let rank = data.data.market_cap_rank
    let porcentagem = data.data.market_data.price_change_percentage_24h / 100
    let preco = data.data.market_data.current_price.brl.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    let valorAlta = data.data.market_data.high_24h.brl.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    let ValorBaixa = data.data.market_data.low_24h.brl.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    const embed = new Discord.MessageEmbed()
    .setTitle(args[0].toUpperCase())
    .setDescription("Valor das últimas 24h")
    .addField('Estastísticas', `Rank: ${rank}`)
    .addField('Preço', preco + ' > ' + porcentagem.toLocaleString ("en", {style: "percent"}))
    .addField('Valor Alta', valorAlta)
    .addField('Valor Baixa', ValorBaixa)
    .setFooter("Dados por CoinGecko")
    .setTimestamp();

    message.channel.send(embed);
});
