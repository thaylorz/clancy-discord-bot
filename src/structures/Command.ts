import { Client } from "discord.js";

export interface CommandOptions {
    name: string | null;
    description: string | null;
    options?: string | null;
}

export class Command {
    public constructor(client: Client, options: CommandOptions) {
        this.client = client;
        this.name = options.name;
        this.description = options.description;
        this.options = options.options
    }

    public name: string | null;
    public description: string | null;
    public options: string | null;
    public client: Client;

    public run(interaction: any): void { };
}