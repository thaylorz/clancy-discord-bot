import { Client, CommandInteraction } from 'discord.js';

import { Command } from '../../structures/Command';

export default class PingCommand extends Command {
    public constructor(client: Client) {
        super(client, {
            name: 'ping',
            description: 'Mostra a latência do Clancy.',
        });
    }

    run = (interaction: CommandInteraction) => {
        interaction.reply({
            content: `O meu ping é ${this.client.ws.ping}ms.`,
            ephemeral: true,
            fetchReply: true,
        });
    };
}
