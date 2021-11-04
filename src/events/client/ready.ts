import { Client } from 'discord.js';

import { Event } from '../../structures/Event';

export default class Ready extends Event {
    constructor(client: Client) {
        super(client, {
            name: 'ready',
            description: 'Emitido quando o cliente está pronto para começar a trabalhar.'
        });
    }

    run = () => console.info(`Bot ${this.client.user.username} is ready.`);
}