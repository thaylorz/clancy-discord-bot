import { PriceAlertInterface } from 'src/models/price-alert-model';
import { alerts, DracoPrice } from '../app';
import { PriceAlert } from '../models/index';

class PriceAlertController {
  async getAll(): Promise<Array<PriceAlertInterface>> {
    const alerts = await PriceAlert.findAll()
      .then((result: Object) => JSON.parse(JSON.stringify(result)))
      .catch(error => console.error(error.message));

    return alerts;
  }

  async create(data) {
    if (isNaN(data.price) || typeof data.price !== 'number') {
      throw new Error('Valor informado precisa ser um valor numerico.');
    }

    if (data.alertType === 0 && data.price < DracoPrice.USDDracoRate) {
      throw new Error(`O valor deve ser superior ao último preço ${DracoPrice.USDDracoRate.toLocaleString('pt-br', { style: 'currency', currency: 'USD', minimumFractionDigits: 4 })}`);
    }

    PriceAlert.create(data)
      .then((result: PriceAlertInterface) => alerts.push(JSON.parse(JSON.stringify(result))))
      .catch((error) => console.error(error.message));
  };

  async destroy(id) {
    PriceAlert.destroy({
      where: {
        id: id,
      },
    }).then((number: Number) => console.info(`Price alert number ${id} deleted successfully.`))
      .catch(error => console.error(error.message));
  }
}

export default new PriceAlertController();
