import axios from 'axios';

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
    BRLDracoRate: number;
    USDDracoVariation: number;
    USDWemixVariation: number;
    BRLDracoVariation: number
}

const fetchApi = () => {
    return axios.post('https://api.mir4global.com/wallet/prices/draco/lastest')
        .then(({ data }) => data.Data);
};

export default async function GetDracoPrice(usdData) {
    const data: IResponseDracoPrice = await fetchApi();

    data.BRLDracoRate = parseFloat(data.USDDracoRate) * parseFloat(usdData.bid);
    data.USDDracoVariation = ((parseFloat(data.USDDracoRate) - parseFloat(data.USDDracoRatePrev)) / parseFloat(data.USDDracoRatePrev)) * 100;
    data.USDWemixVariation = ((parseFloat(data.DracoPriceWemix) - parseFloat(data.DracoPricePrev)) / parseFloat(data.DracoPricePrev)) * 100;
    data.BRLDracoVariation = data.USDDracoVariation * parseFloat(usdData.bid);

    return data;
}
