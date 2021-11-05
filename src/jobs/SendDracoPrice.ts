import cron from 'node-cron';

import { MessageEmbed } from 'discord.js';

import { Client } from '../app';
import GetDracoPrice from '../services/GetDracoPrice';
import GetUsdToBrlPrice from '../services/GetUsdToBrlPrice';
import RandomColor from '../util/RandomColor';


function sendDracoPrice() {
    const channel = Client.channels.cache.get('905946315320610826');

    GetUsdToBrlPrice()
        .then((usdData) => GetDracoPrice(usdData))
        .then((dracoData) => {
            const embed = new MessageEmbed()
                .setAuthor('mir4 draco', '', 'https://www.mir4draco.com')
                .setFields({
                    name: 'USD/DRACO',
                    value: `${parseFloat(dracoData.USDDracoRate).toLocaleString('pt-br', { style: 'currency', currency: 'USD', minimumFractionDigits: 4 })}\n${dracoData.USDDracoVariation.toLocaleString('pt-br', { minimumFractionDigits: 2 })}%`,
                    inline: true,
                }, {
                    name: 'WEMIX/DRACO',
                    value: `${parseFloat(dracoData.DracoPriceWemix).toLocaleString('pt-br', { style: 'currency', currency: 'USD', minimumFractionDigits: 4 })}\n${dracoData.USDWemixVariation.toLocaleString('pt-br', { minimumFractionDigits: 2 })}%`,
                    inline: true,
                }, {
                    name: 'BRL/DRACO',
                    value: `${dracoData.BRLDracoRate.toLocaleString('pt-br', { style: 'currency', currency: 'BRL', minimumFractionDigits: 4 })}\n${dracoData.BRLDracoVariation.toLocaleString('pt-br', { minimumFractionDigits: 2 })}%`,
                    inline: true,
                })
                .setImage('https://file.mir4global.com/draco/img/mir4draco.png')
                .setColor(RandomColor())
                .setTimestamp()
                .setURL('https://www.mir4draco.com');

            channel.send({ embeds: [embed] });
            console.info('Nova atualização de preço enviada.');
        });
}

export default cron.schedule('*/15 * * * *', sendDracoPrice, {
    scheduled: false,
});
