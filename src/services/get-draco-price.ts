import axios from 'axios';

import { day } from '../app';
import formatDracoPrice from './format-draco-price';
import GetUsdToBrlPrice from './get-usd-to-brl-price';

export interface IResponseDracoPrice {
  CreatedDT: string;
  DracoPrice: string;
  DracoAmount: string;
  DracoPricePrev: string;
  DracoAmountPrev: string;
  USDWemixRate: string;
  USDKLAYRate: string;
  USDWemixRatePrev: string;
  USDDracoRate: string;
  DracoPriceWemix: string;
  DracoPriceKlay: string;
  USDDracoRatePrev: string;
}

const fetchApi = () => {
  return axios.post('https://api.mir4global.com/wallet/prices/draco/lastest')
    .then(({ data }) => data.Data);
};

export default async function GetDracoPrice() {
  const dracoPrice: IResponseDracoPrice = await fetchApi();
  const usdToBrlPrice = await GetUsdToBrlPrice();

  console.info(`Cotação do draco atualizada as ${day.utc()}`);

  return formatDracoPrice(dracoPrice, usdToBrlPrice);
}
