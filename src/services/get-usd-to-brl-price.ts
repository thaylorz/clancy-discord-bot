import axios from 'axios';

import { day } from '../app';

export interface IResponseUsdToBrl {
  code: string,
  codein: string,
  name: string,
  high: string,
  low: string,
  varBid: string,
  pctChange: string,
  bid: string,
  ask: string,
  timestamp: string,
  create_date: string,
}

const fetchApi = () => {
  return axios.get(' https://economia.awesomeapi.com.br/last/USD-BRL')
    .then(({ data }) => data.USDBRL);
};

export default async function GetUsdToBrlPrice() {
  const data: IResponseUsdToBrl = await fetchApi();

  console.info(`Cotação do dolar atualizada as ${day.utc()}`);

  return data;
}
