import { databaseConfig } from './models';

import DiscordClient from './domain/client';
import Draco from './domain/draco';

import dayjs from 'dayjs';
import UTC from 'dayjs/plugin/utc';

export const alerts = [];

databaseConfig.sync()
  .then(() => console.info('connected to db'))
  .catch((error) => { console.error('connection fail ' + error.message); });

export const day = dayjs.extend(UTC);

export const Client = new DiscordClient();
export const DracoPrice = new Draco();

DracoPrice.updateDracoPrice();
