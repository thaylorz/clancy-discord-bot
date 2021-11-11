import cron from 'node-cron';
import sendDracoPrice from '../services/send-draco-price';

export default cron.schedule('*/15 * * * *', sendDracoPrice, {
  scheduled: false,
});
