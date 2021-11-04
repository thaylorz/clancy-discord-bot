import axios from 'axios';

interface IResponseDracoPrice {
    Code: Number,
    Data: {
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
}

const fetchApi = () => {
    return axios.post('https://api.mir4global.com/wallet/prices/draco/lastest')
        .then(({ data }) => data);
};

export default async function GetDracoPrice() {
    const data: IResponseDracoPrice = await fetchApi();

    console.log(data.Data);
}
