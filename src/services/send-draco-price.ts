import { Guild, GuildChannel } from 'discord.js';

import { Client } from '../app';
import createEmbedDracoPrice from '../util/create-draco-price-embed';

export default function sendDracoPrice() {
  Client.guilds.fetch(process.env.GUILD_ID)
    .then((guild: Guild) => guild.channels.fetch(process.env.GUILD_CHANNEL_ID))
    .then((channel: GuildChannel) => channel.send({ embeds: [createEmbedDracoPrice()] }))
    .catch(error => console.error(error.message));
}
