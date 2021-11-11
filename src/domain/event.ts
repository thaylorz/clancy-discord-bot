import DiscordClient from './client';

export interface EventOptions {
  name: string | null;
  description: string | null;
}

export class Event {
  constructor(client: DiscordClient, options: EventOptions) {
    this.client = client;
    this.name = options.name;
    this.description = options.description;
  }

  public client: DiscordClient;
  public name: string | null;
  public description: string | null;
  // eslint-disable-next-line no-empty-function
  public run(any: any): any { }
}
