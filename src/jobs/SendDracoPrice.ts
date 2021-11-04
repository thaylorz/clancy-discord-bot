import { MessageEmbed } from 'discord.js';
import cron from 'node-cron';

import { Client } from '../app';
import GetDracoPrice from '../services/GetDracoPrice';
import GetUsdToBrlPrice from '../services/GetUsdToBrlPrice';
import RandomColor from '../util/RandomColor';


function sendDracoPrice() {
    const channel = Client.channels.cache.get('900118600277446709');

    GetUsdToBrlPrice()
        .then((usdData) => GetDracoPrice(usdData))
        .then((dracoData) => {
            const embed = new MessageEmbed()
                .setAuthor('mir4 draco', '', 'https://www.mir4draco.com')
                .setFields({
                    name: 'USD/DRACO',
                    value: `${parseFloat(dracoData.USDDracoRate).toLocaleString('pt-br', { style: 'currency', currency: 'USD', minimumFractionDigits: 4 })}\r
                    ${dracoData.USDDracoVariation.toLocaleString('pt-br', { minimumFractionDigits: 2 })}%`,
                    inline: true,
                }, {
                    name: 'WEMIX/DRACO',
                    value: `
                        ${parseFloat(dracoData.DracoPriceWemix).toLocaleString('pt-br', { style: 'currency', currency: 'USD', minimumFractionDigits: 4 })}\r
                        ${dracoData.USDWemixVariation.toLocaleString('pt-br', { minimumFractionDigits: 2 })}`,
                    inline: true,
                }, {
                    name: 'BRL/DRACO',
                    value: `
                        ${dracoData.BRLDracoRate.toLocaleString('pt-br', { style: 'currency', currency: 'BRL', minimumFractionDigits: 4 })}\r
                        ${dracoData.BRLDracoVariation.toLocaleString('pt-br', { minimumFractionDigits: 2 })}`,
                    inline: true,
                })
                .setImage('https://file.mir4global.com/draco/img/mir4draco.png')
                .setColor(RandomColor())
                .setTimestamp()
                .setURL('https://www.mir4draco.com');

            channel.send({ embeds: [embed] });
        });
}

export default cron.schedule('*/15 * * * *', sendDracoPrice, {
    scheduled: false,
});
