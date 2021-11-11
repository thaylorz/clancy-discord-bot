import { DMChannel, Guild, GuildMember, Message } from 'discord.js';
import cron from 'node-cron';

import { Client, DracoPrice } from '../app';
import priceAlertController from '../controllers/price-alert-controller';

function checkPriceAlerts() {
  priceAlertController.getAll()
    .then(alerts => alerts.forEach(alert => alert.alertType === 0 ? checkPriceExceeded(alert) : checkPriceDropped(alert)))
    .catch(error => console.error(error.message));
}

function checkPriceExceeded(alert) {
  if (DracoPrice.USDDracoRate > alert.price) {
    Client.guilds.fetch(alert.guildId)
      .then((guild: Guild) => guild.members.fetch(alert.memberId))
      .then((guildMember: GuildMember) => guildMember.createDM())
      .then((dmChannel: DMChannel) => dmChannel.send(`O preço do draco subiu para ${DracoPrice.USDDracoRate.toLocaleString('pt-br', { style: 'currency', currency: 'USD', minimumFractionDigits: 4 })}`))
      .then((message: Message) => priceAlertController.destroy(alert.id))
      .catch(error => console.error(error.message));
  }
}

function checkPriceDropped(alert) {
  if (DracoPrice.USDDracoRate < alert.price) {
    Client.guilds.fetch(alert.guildId)
      .then((guild: Guild) => guild.members.fetch(alert.memberId))
      .then((guildMember: GuildMember) => guildMember.createDM())
      .then((dmChannel: DMChannel) => dmChannel.send(`O preço do draco caiu para ${DracoPrice.USDDracoRate.toLocaleString('pt-br', { style: 'currency', currency: 'USD', minimumFractionDigits: 4 })}`))
      .then((message: Message) => priceAlertController.destroy(alert.id))
      .catch(error => console.error(error.message));
  }
}

export default cron.schedule('*/5 * * * *', checkPriceAlerts, {
  scheduled: false,
});
