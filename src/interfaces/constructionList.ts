export type ConstructionList = {
  id: number;
  construction_code: string;
  construction_name: string;
  east_west_division: number;
  municipality: string;
  status: number;
  old_construction_code: string;
  new_repair_division: number;
  employee_code: string;
  employee_name: string;
  site_area: number;
  building_area: number;
  total_floor_area: number;
  structure_s: boolean;
  structure_rc: boolean;
  structure_src: boolean;
  structure_wooden: boolean;
  product: string;
  ground_floor: number;
  underground_floor: number;
  schedule_construction_start_date: Date;
  schedule_construction_end_date: Date;
  updated_at: Date;
  contract_date: Date;
  estimated_date: Date;
  order_date: Date;
  construction_completion_date: Date;
  estimated_amount: number;
  estimated_assumption_cost: number;
  gross_profit_amount_1: number;
  gross_profit_amount_2: number;
  gross_profit_amount_3: number;
  gross_profit_amount_4: number;
  gross_profit_amount_5: number;
  gross_profit_rate_1: number;
  gross_profit_rate_2: number;
  gross_profit_rate_3: number;
  gross_profit_rate_4: number;
  gross_profit_rate_5: number;
  assumption_artificial: number;
  order_assumption_cost: number;
  expected_gross_profit_amount: number;
  expected_gross_profit_rate: number;
  cost_real_time: number;
  working_budget: number;
  order_amount: number;
  sales_amount: number;
  final_expected_cost: number;
  work_place_score: number;
  contract_email_address: string;
  zipcode: string;
  prefecture: string;
  address_1: string;
  address_2: string;
  phone_no: string;
  dr0: Date;
  dr1: Date;
  dr2: Date;
  confirmation_application: Date;
  fire_inspection_date: Date;
  customer: {
    id: number;
    company_name: string;
    customer_code: string;
    branch_department_name: string;
    representative_name: string;
  };
  main_brand: {
    id: number;
    brand_id: string;
    brand_icon: string;
    brand_name: string;
  };
  sub_brand1: {
    id: number;
    brand_id: string;
    brand_name: string;
  };
  sub_brand2: {
    id: number;
    brand_id: string;
    brand_name: string;
  };
};
