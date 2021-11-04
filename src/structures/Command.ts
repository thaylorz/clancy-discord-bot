import { Client } from 'discord.js';

export interface ICommandOptions {
    name: string | null;
    description: string | null;
    options?: string | null;
}

export class Command {
    public constructor(client: Client, options: ICommandOptions) {
        this.client = client;
        this.name = options.name;
        this.description = options.description;
        this.options = options.options;
    }

    public name: string | null;
    public description: string | null;
    public options: string | null;
    public client: Client;

    // eslint-disable-next-line no-empty-function
    public run(interaction: any): void { };
}
