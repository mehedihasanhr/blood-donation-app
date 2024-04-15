export type TPostOffice = {
  id?: string;
  slug: string;
  bn_name: string;
  en_name: string;
  postal_code?: string;
  thana?: TThana;
  thana_id?: string;
  createdAt: Date;
  updatedAt: Date;
};

export type TThana = {
  id?: string;
  slug: string;
  bn_name: string;
  en_name: string;
  post_office?: TPostOffice;
  district?: TDistrict;
  district_id?: string;
  createdAt: Date;
  updatedAt: Date;
};

export type TDistrict = {
  id?: string;
  slug: string;
  bn_name: string;
  en_name: string;
  thana?: TThana[];
  division?: TDivision;
  division_id?: string;
  createdAt: Date;
  updatedAt: Date;
};

export type TDivision = {
  id?: string;
  slug: string;
  bn_name: string;
  en_name: string;
  district?: TDistrict[];
  createdAt: Date;
  updatedAt: Date;
};
