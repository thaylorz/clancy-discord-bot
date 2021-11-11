import { v4 as uuidv4 } from 'uuid';
import { Client, CommandInteraction } from 'discord.js';

import { Command } from '../../domain/command';
import PriceAlertController from '../../controllers/price-alert-controller';

export default class PingCommand extends Command {
  public constructor(client: Client) {
    super(client, {
      name: 'criar-alerta',
      description: 'Cria um novo alerta de variação de preço do draco.',
      autocomplete: true,
      ephemeral: true,
      options: [{
        name: 'tipo-alerta',
        type: 'STRING',
        description: 'O tipo de alerta a ser enviado.',
        required: true,
        choices: [{
          name: 'Preço ultrapassar',
          value: '0',
        }, {
          name: 'Preço cair para',
          value: '1',
        }],
      }, {
        name: 'valor',
        type: 'STRING',
        description: 'O valor a ser verificado no alerta.',
        required: true,
        autocomplete: true,
      }],
    });
  }

  run = (interaction: CommandInteraction) => {
    const model = {
      id: uuidv4(),
      interactionId: interaction.id,
      memberId: interaction.member.user.id,
      guildId: interaction.guildId,
      channelId: interaction.channelId,
      alertType: Number(interaction.options.getString('tipo-alerta')),
      price: Number(parseFloat(interaction.options.getString('valor').replace(',', '.')).toFixed(4)),
    };

    PriceAlertController.create(model)
      .then(() => interaction.reply({ content: `Olá ${interaction.user.username}, seu alerta foi definido com sucesso.`, ephemeral: true }))
      .catch((error) => {
        interaction.reply({ content: error.message, ephemeral: true })
          .then(() => console.error(error.message));
      });
  };
}
