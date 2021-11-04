import { Client } from "discord.js";

export interface EventOptions {
    name: string | null;
    description: string | null;
}

export class Event {
    constructor(client: Client, options: EventOptions) {
        this.client = client;
        this.name = options.name;
        this.description = options.description;
    }

    public client: Client;
    public name: string | null;
    public description: string | null;
    public run(): void {}
}