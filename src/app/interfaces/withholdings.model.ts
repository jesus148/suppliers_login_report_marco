


export interface Withholdings {

  // recordar q una interface debe tener constructor



  DocEntry?:number ;
  PROV_RUC?:string;
  PROV_RZ?:string;
  PROV_DIR?:string;
  TIPO?:string;
  SERIE_CORRELATIVO?:string;
  FEC_EMI_FACT?:string;
  MONEDA_FACT?:string;
  TOTAL_FACT?:string;
  FECHA_RETENCION?:string;
  MONEDA_PAGO?:string;
  TOTAL_PAGO?:String;
  RETENIDO?:string;
  COMPRET?:string;
  TC?:string;
  TCO?:string;
}
