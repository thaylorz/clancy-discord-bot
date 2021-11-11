import { Client, ApplicationCommandOption } from 'discord.js';


interface IOptions {
  name: string,
  type: string,
  description: string,
  required?: boolean,
}

export interface ICommandOptions {
  name: string;
  description?: string;
  autocomplete?: boolean;
  ephemeral?: boolean,
  options?: Array<ApplicationCommandOption>;
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
  public options: Array<IOptions>;
  public client: Client;

  // eslint-disable-next-line no-empty-function
  public run(interaction: any): void { };
}
