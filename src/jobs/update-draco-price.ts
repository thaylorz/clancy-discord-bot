import cron from 'node-cron';
import { DracoPrice, day } from '../app';


export default cron.schedule('*/5 * * * *', () => {
  DracoPrice.updateDracoPrice();
  console.info(`Schedule de atualizar preço do draco iniciado com sucesso as ${day.utc()}`);
}, {
  scheduled: false,
});
