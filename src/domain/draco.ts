import GetDracoPrice from '../services/get-draco-price';

interface IUpdateDracoValues {
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
  USDDracoVariation: number;
  USDWemixVariation: number;
  BRLDracoVariation: number;
  BRLDracoRate: number;
}

export default class Draco {
  public CreatedDT: string;
  public DracoPrice: number;
  public DracoAmount: number;
  public DracoPricePrev: number;
  public DracoAmountPrev: number;
  public USDWemixRate: number;
  public USDKLAYRate: number;
  public USDWemixRatePrev: number;
  public USDDracoRate: number;
  public DracoPriceWemix: number;
  public DracoPriceKlay: number;
  public USDDracoRatePrev: number;
  public USDDracoVariation: number;
  public USDWemixVariation: number;
  public BRLDracoVariation: number;
  public BRLDracoRate: number;

  public async updateDracoPrice() {
    GetDracoPrice()
      .then((draco) => this.updateDracoValues(draco))
      .catch((error) => console.error(error));
  }

  public async updateDracoValues({
    CreatedDT,
    DracoPrice,
    DracoAmount,
    DracoPricePrev,
    DracoAmountPrev,
    USDWemixRate,
    USDKLAYRate,
    USDWemixRatePrev,
    USDDracoRate,
    DracoPriceWemix,
    DracoPriceKlay,
    USDDracoRatePrev,
    USDDracoVariation,
    USDWemixVariation,
    BRLDracoVariation,
    BRLDracoRate,
  }: IUpdateDracoValues) {
    this.CreatedDT = CreatedDT;
    this.DracoPrice = DracoPrice;
    this.DracoAmount = DracoAmount;
    this.DracoPricePrev = DracoPricePrev;
    this.DracoAmountPrev = DracoAmountPrev;
    this.USDWemixRate = USDWemixRate;
    this.USDKLAYRate = USDKLAYRate;
    this.USDWemixRatePrev = USDWemixRatePrev;
    this.USDDracoRate = USDDracoRate;
    this.DracoPriceWemix = DracoPriceWemix;
    this.DracoPriceKlay = DracoPriceKlay;
    this.USDDracoRatePrev = USDDracoRatePrev;
    this.USDDracoVariation = USDDracoVariation;
    this.USDWemixVariation = USDWemixVariation;
    this.BRLDracoVariation = BRLDracoVariation;
    this.BRLDracoRate = BRLDracoRate;
  }
}
