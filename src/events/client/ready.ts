import SendDracoPrice from '../../jobs/send-draco-price';
import UpdateDracoPrice from '../../jobs/update-draco-price';
import CheckDracoPrice from '../../jobs/check-price-alert';
import DiscordClient from '../../domain/client';
import priceAlertController from '../../controllers/price-alert-controller';
import { Event } from '../../domain/event';
import { day } from '../../app';

export default class Ready extends Event {
  constructor(client: DiscordClient) {
    super(client, {
      name: 'ready',
      description: 'Emitido quando o cliente está pronto para começar a trabalhar.',
    });
  }

  run = () => {
    UpdateDracoPrice.start();
    SendDracoPrice.start();
    CheckDracoPrice.start();

    console.info(`Bot ${this.client.user.username} está pronto as ${day.utc()}`);
    this.client.registrySlashCommands();

    priceAlertController.getAll();
  };
}
