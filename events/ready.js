const Discord = require('discord.js');
const CoinGecko = require("coingecko-api");
const CoinGeckoClient = new CoinGecko();

function getHHMM(){
    let date = new Date();
    
    let hours = date.getHours();
    let minutes = date.getMinutes();
    
    hours = (hours < 10 ? hours = "0" + hours : hours);
    minutes = (minutes < 10 ? minutes = "0" + minutes : minutes);
    
    return hours + ':' + minutes;
}

module.exports = (async(client) => {
    console.log("Está online!");

    var interval = setInterval(async function(){
        let data = await CoinGeckoClient.simple.price({
            ids: ['bitcoin', 'tether'],
            vs_currencies: ['brl'],
        });
        
        let dogevalor = data.data.tether.brl.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'});

        client.user.setActivity(`1 Dólar = ${dogevalor} às ${getHHMM()} UTC`, { type: 'PLAYING' });
    }, 1 * 60000);
});
