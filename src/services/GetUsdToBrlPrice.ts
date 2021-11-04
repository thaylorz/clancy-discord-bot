import axios from 'axios';

export interface IResponseUsdBrl {
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
    const data: IResponseUsdBrl = await fetchApi();

    return data;
}
