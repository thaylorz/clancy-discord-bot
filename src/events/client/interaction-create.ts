import { Interaction } from 'discord.js';

import DiscordClient from '../../domain/client';
import { Event } from '../../domain/event';

export default class InteractionCreate extends Event {
  constructor(client: DiscordClient) {
    super(client, {
      name: 'interactionCreate',
      description: 'Emitido quando uma interação é criada.',
    });
  }

  public run = (interaction: Interaction) => {
    if (interaction.isCommand()) {
      const cmd = this.client.commands.find(c => c.name === interaction.commandName);

      if (cmd) { cmd.run(interaction); }
    }
  };
}
