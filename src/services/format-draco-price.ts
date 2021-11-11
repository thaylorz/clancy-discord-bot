import { IResponseDracoPrice } from './get-draco-price';
import { IResponseUsdToBrl } from './get-usd-to-brl-price';

interface IFormatDracoPrice {
  CreatedDT: string;
  DracoPrice: number;
  DracoAmount: number;
  DracoPricePrev: number;
  DracoAmountPrev: number;
  USDWemixRate: number;
  USDKLAYRate: number;
  USDWemixRatePrev: number;
  USDDracoRate: number;
  DracoPriceWemix: number;
  DracoPriceKlay: number;
  USDDracoRatePrev: number;
  BRLDracoRate: number;
  USDDracoVariation: number;
  USDWemixVariation: number;
  BRLDracoVariation: number
}

export default function formatDracoPrice(rawDataDraco: IResponseDracoPrice, rawDataUsdToBrlPrice: IResponseUsdToBrl): IFormatDracoPrice {
  return {
    CreatedDT: rawDataDraco.CreatedDT,
    DracoPrice: Number(rawDataDraco.DracoPrice),
    DracoAmount: Number(rawDataDraco.DracoAmount),
    DracoPricePrev: Number(rawDataDraco.DracoPricePrev),
    DracoAmountPrev: Number(rawDataDraco.DracoAmountPrev),
    USDWemixRate: Number(rawDataDraco.USDWemixRate),
    USDKLAYRate: Number(rawDataDraco.USDKLAYRate),
    USDWemixRatePrev: Number(rawDataDraco.USDWemixRatePrev),
    USDDracoRate: Number(rawDataDraco.USDDracoRate),
    DracoPriceWemix: Number(rawDataDraco.DracoPriceWemix),
    DracoPriceKlay: Number(rawDataDraco.DracoPriceKlay),
    USDDracoRatePrev: Number(rawDataDraco.USDDracoRatePrev),
    BRLDracoRate: calculateBRLDracoRate(rawDataDraco.USDDracoRate, rawDataUsdToBrlPrice.bid),
    USDDracoVariation: calculateUSDDracoVariation(rawDataDraco.USDDracoRate, rawDataDraco.USDDracoRatePrev),
    USDWemixVariation: calculateUSDWemixVariation(rawDataDraco.DracoPriceWemix, rawDataDraco.DracoPricePrev),
    BRLDracoVariation: calculateUSDDracoVariation(rawDataDraco.USDDracoRate, rawDataDraco.USDDracoRatePrev) * parseFloat(rawDataUsdToBrlPrice.bid),
  };
}

function calculateBRLDracoRate(usdDracoRate, bid) {
  return Number(parseFloat(usdDracoRate) * parseFloat(bid));
}

function calculateUSDDracoVariation(usdDracoRate, usdDracoRatePrev) {
  return Number(((parseFloat(usdDracoRate) - parseFloat(usdDracoRatePrev)) / parseFloat(usdDracoRatePrev)) * 100);
}

function calculateUSDWemixVariation(dracoPriceWemix, dracoPricePrev) {
  return Number(((parseFloat(dracoPriceWemix) - parseFloat(dracoPricePrev)) / parseFloat(dracoPricePrev)) * 100);
}
