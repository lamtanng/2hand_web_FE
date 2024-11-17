export interface CalcShippingFeeRequestProps {
    shopid: number;
    weight: number;
    service_type_id: number;
    from_district_id: number | undefined;
    from_ward_code: string | undefined;
    to_district_id: number | undefined;
    to_ward_code?: string | undefined;
    insurance_value?: number;
    height?: number;
    length?: number;
    width?: number;
    cod_value?: number;
  }

  export interface GetAvailableServiceRequestProps {
    shop_id: number | undefined;
    from_district: number | undefined;
    to_district: number | undefined;
  }