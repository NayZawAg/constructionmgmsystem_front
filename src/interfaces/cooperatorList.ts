export type CooperatorList = {
  id: number;
  cooperator_code: string;
  cooperator_name: string;
  municipality: string;
  zipcode: string;
  prefecture: string;
  use_suspension_flag: boolean;
};

export type CooperatorStructure = {
  construction_name: string;
  middle_category_name: string;
  cooperator_name: string;
  email: string;
  phone_no: string;
  strat_date: string;
  end_date: string;
  cooperators: [];
};
