import { readdirSync } from 'fs';
import { join } from 'path';

import { Client, ClientOptions } from 'discord.js';

import dotenv from 'dotenv';

import { Event } from './Event';
import { Command } from './Command';

dotenv.config();

export class DiscordClient extends Client {
    constructor() {
        const options: ClientOptions = {
            intents: [
                'GUILDS',
                'GUILD_MEMBERS',
                'GUILD_MESSAGES',
                'GUILD_MESSAGE_REACTIONS',
                'GUILD_INVITES',
                'GUILD_VOICE_STATES',
                'GUILD_PRESENCES',
            ],
        };

        super(options);

        this.commands = [];

        this.loadCommands();
        this.loadEvents();

        this.login(process.env.DISCORD_BOT_TOKEN);
    }

    public commands: Array<any>;

    public getCommands() {
        return this.commands;
    }

    public setCommand(command: Command) {
        this.commands.push(command);
    }

    public registrySlashCommands() {
        this.guilds.cache.get('900118599774142514').commands.set(this.commands);
    }

    public loadCommands() {
        const path = 'dist/commands';
        const categories = readdirSync(path);

        for (const category of categories) {
            const commands: string[] = readdirSync(`${path}/${category}`);

            for (const command of commands) {
                const commandClass = require(join(process.cwd(), `${path}/${category}/${command}`));
                // eslint-disable-next-line new-cap
                const cmd: Command = new commandClass.default(this);

                this.setCommand(cmd);

                console.info(`Comando ${cmd.name} carregado.`);
            }
        }
    }

    public loadEvents() {
        const path = 'dist/events';
        const categories = readdirSync(path);

        for (const category of categories) {
            const events: string[] = readdirSync(`${path}/${category}`);

            for (const event of events) {
                const eventClass = require(join(process.cwd(), `${path}/${category}/${event}`));
                // eslint-disable-next-line new-cap
                const evt: Event = new eventClass.default(this);

                this.on(evt.name, evt.run);
                console.info(`Evento ${evt.name} carregado.`);
            }
        }
    }
}
