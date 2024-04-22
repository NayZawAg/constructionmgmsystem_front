export type CooperatorList = {
  id: number;
  name: string;
  cooperator_name: string;
  comment: string;
  qualification_license: string;
  order_date: string;
  construction_name: string;
  cooperators: [
    {
      id: number;
      cooperator_name: string;
      comment: string;
      qualification_license: string;
    },
  ];
  construction: [
    {
      id: number;
      construction_name: string;
      order_date: string;
    },
  ];
};

export type Cooperator = {
  id: number;
  name: string;
  cooperator_name: string;
  comment: string;
  qualification_license: string;
};

export type Construction = {
  id: number;
  construction_name: string;
  order_date: string;
};

export type OrderList = {
  orders: [];
  id: number;
  construction_code: string;
  construction_name: string;
  cooperator_name: string;
  middle_category_name: string;
  isChecked: boolean;
  isCheckedItem: boolean;
  new_repair_division: string;
  total_amount: string;
  order_date: string;
  isCheckedDetail: boolean;
  details: [];
  small_categories: [];
};
