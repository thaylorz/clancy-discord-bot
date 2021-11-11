import { MessageEmbed } from 'discord.js';
import { DracoPrice } from '../app';
import randomColor from './random-color';

export default function createEmbedDracoPrice(): MessageEmbed {
  return new MessageEmbed()
    .setAuthor('mir4 draco', '', 'https://www.mir4draco.com')
    .setFields({
      name: 'USD/DRACO',
      value: `${DracoPrice.USDDracoRate.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 4 })}\n${DracoPrice.USDDracoVariation.toLocaleString('pt-br', { minimumFractionDigits: 2 })}%`,
      inline: true,
    }, {
      name: 'WEMIX/DRACO',
      value: `${DracoPrice.DracoPriceWemix.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 4 })}\n${DracoPrice.USDWemixVariation.toLocaleString('pt-br', { minimumFractionDigits: 2 })}%`,
      inline: true,
    }, {
      name: 'BRL/DRACO',
      value: `${DracoPrice.BRLDracoRate.toLocaleString('pt-br', { style: 'currency', currency: 'BRL', minimumFractionDigits: 4 })}\n${DracoPrice.BRLDracoVariation.toLocaleString('pt-br', { minimumFractionDigits: 2 })}%`,
      inline: true,
    })
    .setImage('https://file.mir4global.com/draco/img/mir4draco.png')
    .setColor(randomColor())
    .setTimestamp()
    .setURL('https://www.mir4draco.com');
}
