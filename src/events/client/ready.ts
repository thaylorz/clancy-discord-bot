import { DiscordClient } from 'src/structures/Client';

import { Event } from '../../structures/Event';

export default class Ready extends Event {
    constructor(client: DiscordClient) {
        super(client, {
            name: 'ready',
            description: 'Emitido quando o cliente está pronto para começar a trabalhar.',
        });
    }

    run = () => {
        console.info(`Bot ${this.client.user.username} is ready.`);
        this.client.registrySlashCommands();
    };
}
