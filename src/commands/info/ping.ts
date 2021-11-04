import { Client, Interaction } from 'discord.js';

import { Command } from '../../structures/Command';

export default class PingCommand extends Command {
    public constructor(client: Client) {
        super(client, {
            name: 'ping',
            description: 'Mostra a latencia do Clancy.'
        });
    }

    run = interaction => interaction.replay('Pong!');
}