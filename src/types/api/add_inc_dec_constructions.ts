export type AddIncDecConstructionsDetail = {
  id: number;
  construction_id: number;
  subject: string;
  estimate_amount: number;
  assumed_cost: number;
  remarks: string;
  add_inc_dec_status: number;
}; 

export type TypeUpdateAddIncDecConstructions = {
  add_inc_dec_status: number;
  estimate_amount: number;
};

export type TypeUpdateAddIncDecConstructionAppId= {
  id: number;
};

export type TypeAddIncDecConstructionsList = {
  id: number;
  construction_id: number;
  subject: string;
  estimate_amount: number;
  assumed_cost: number;
  remarks: string;
  add_inc_dec_status: number;
};

