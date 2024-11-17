export enum GHNSupportType {
  'BLOCK' = 0,
  'Pick/Return' = 1,
  'Delivery' = 2,
  'Pick/Return/Delivery' = 3,
}

interface GHNAddressProps {
  NameExtension?: string[];
  CanUpdateCOD?: boolean;
  Status?: number;
}

export interface ProvincesAddressProps extends GHNAddressProps {
  ProvinceID: number | undefined;
  ProvinceName: string | undefined;
  CountryID?: number | undefined;
  Code?: number | undefined;
}

export interface DistrictAddressProps extends GHNAddressProps {
  DistrictID: number | undefined;
  ProvinceID: number | undefined;
  DistrictName: string | undefined;
  SupportType?: GHNSupportType;
}

export interface WardAddressProps extends GHNAddressProps {
  WardCode: string | undefined;
  DistrictID: number | undefined;
  WardName: string | undefined;
  SupportType?: GHNSupportType;
}

export interface AddressProps {
  _id?: string | undefined;
  address: string | undefined;
  ward: WardAddressProps | null ;
  district: DistrictAddressProps | null ;
  province: ProvincesAddressProps | null ;
  isDefault: boolean ;
}
