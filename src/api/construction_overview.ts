import { TypeConstructionDetail } from '@/types/api/construction';
import type {
  ConstructionOverviewCreate,
} from '@/types/api/constructionOverview';
import { api } from '@/utils/api/api';
import { API_URL } from '@/utils/constants/api';

export type AddConstructionOverview = {
  overview: string;
  order_classification: number;
  orderer: string;
  scheduled_delivery_date: Date;
  usage: string;
  con_wor_demolition: boolean;
  con_wor_structure: boolean;
  con_wor_roof: boolean;
  con_wor_outer_wall: boolean;
  con_wor_interior: boolean;
  con_wor_exterior: boolean;
  con_wor_water_proof: boolean;
  con_tim_per_within_regular_hour: boolean;
  con_tim_per_outside_regular_hour: boolean;
  con_tim_per_other: boolean;
  con_tim_per_holiday_work: boolean;
  construction_time_period_other: boolean;
  con_tim_per_other_input: string;
  con_sit_dangerous_materials_area: boolean;
  construction_site: boolean;
  con_sit_indoor: boolean;
  con_sit_outdoor: boolean;
  con_sit_other: boolean;
  con_sit_per_other_input: string;
  no_of_floors: number;
  civ_eng_con_sewer: boolean;
  civ_eng_con_road: boolean;
  civ_eng_con_machine_basic: boolean;
  civ_eng_con_outside: boolean;
  civ_eng_con_pavement: boolean;
  fac_con_water_supply_and_drainage: boolean;
  fac_con_air_conditioning: boolean;
  fac_con_outdoor_unit: boolean;
  ele_equ_wor_transforming: boolean;
  ele_equ_wor_power: boolean;
  ele_equ_wor_light: boolean;
  ele_equ_wor_illumination: boolean;
  ele_equ_wor_fire_alarm: boolean;
  ele_equ_wor_guide_lights: boolean;
  scaffolding: number;
  scaffolding_10m_or_more: number;
  waterproof_construction: number;
  structure: number;
  structure_rc: boolean;
  structure_s: boolean;
  structure_src: boolean;
  structure_wooden: boolean;
  design_confirmation: number;
  heavy_equipment_work: number;
  heavy_equipment_type: string;
  retention_period_60_days_or_more: number;
  warranty: number;
  site_boundary_line: number;
  acc_ris_fire_handling: boolean;
  acc_ris_work_through_walls: boolean;
  acc_ris_heavy_machine_use: boolean;
  acc_ris_paint_work: boolean;
  acc_ris_excavation_work: boolean;
  acc_ris_excavation_work_input: string;
  acc_ris_other_danger_work: boolean;
  acc_ris_fall: boolean;
  acc_ris_electric_shock: boolean;
  acc_ris_fall_down: boolean;
  acc_ris_harmful_object_hitting: boolean;
  acc_ris_heavy_loads_manpower_transportaion: boolean;
  acc_ris_chipping_cutter_drill: boolean;
  acc_ris_asbestos_removal: boolean;
  acc_ris_slinging_work: boolean;
  acc_ris_spraying_work: boolean;
  acc_ris_construction_lift: boolean;
  acc_ris_concrete_placement: boolean;
  acc_ris_flying_falling: boolean;
  acc_ris_burn: boolean;
  acc_ris_cut: boolean;
  acc_ris_unreasonable_movement: boolean;
  acc_ris_stepladder_work: boolean;
  acc_ris_demolition_work: boolean;
  acc_ris_electric_welding: boolean;
  acc_ris_electric_switch: boolean;
  acc_ris_high_place_work: boolean;
  acc_ris_public_object: boolean;
  acc_ris_oxygen_deficieny_work: boolean;
  acc_ris_burning: boolean;
  acc_ris_leakage_outage: boolean;
  acc_ris_caught: boolean;
  acc_ris_getting_caught: boolean;
  acc_ris_gas_fusing_welding: boolean;
  acc_ris_electrical_work: boolean;
  acc_ris_pressurized_work: boolean;
  acc_ris_truck_loading_and_unloading: boolean;
  acc_ris_chemicals_deleterious_substance: boolean;
  acc_ris_heavy_lifting_work: boolean;
  acc_ris_traffic_accident: boolean;
  acc_ris_explosion: boolean;
  acc_ris_clash: boolean;
  acc_ris_collapse: boolean;
  acc_ris_other: boolean;
  assumed_risk: string;
  counter_measure: string;
  leg_con_rec_law_volume: boolean;
  leg_con_rec_law_repair_volume: boolean;
  leg_con_rec_law_dismantling: boolean;
  legal_conditions_ground_drilling: boolean;
  leg_con_not_ins_spec_form_work: boolean;
  legal_conditions_roadside_excavation: boolean;
  legal_conditions_road_use: boolean;
  legal_conditions_road_occupation: boolean;
  leg_con_not_ins_mac_etc_scaffolding: boolean;
  leg_con_not_ins_mac_form_work: boolean;
  pri_man_wor_concrete_work: boolean;
  pri_man_wor_steel_framework: boolean;
  pri_man_wor_waterproofing: boolean;
  pri_man_wor_metal_roof_work: boolean;
  pri_man_wor_metal_exterior_wall: boolean;
  pri_man_wor_outer_wall_tilling_work: boolean;
  pri_man_wor_outer_wall_tilling_work_other: boolean;
  pri_man_wor_outer_wall_stone_work: boolean;
  pri_man_wor_outer_wall_stone_work_other: boolean;
  pri_man_wor_alc_work: boolean;
  pri_man_wor_alc_work_other: boolean;
  pri_man_wor_air_ventilation_equipment_work: boolean;
  pri_man_wor_electric_eqipment_work: boolean;
  pri_man_wor_water_supply_and_drainage: boolean;
  pri_man_wor_design_drawing: boolean;
  pri_man_wor_design_road_map: boolean;
  construction_plan_work_specification: boolean;
  neighbor_greeting: boolean;
  fire_testing_witness: boolean;
  owner_completion_testing_witness: boolean;
  industrial_waste_contract: boolean;
  con_not_form_by_order_specified_document: boolean;
  subcontractor_estimate_collection: boolean;
  cost_management: boolean;
  agreement_with_cooperator: boolean;
  company_inspection: number;
  company_implementation_date: Date;
  con_rev_meeting_by_wor_type: number;
  con_rev_meeting_by_wor_type_implementation_date: Date;
  safety_quality_patrol: number;
  safety_quality_patrol_implementation_date: Date;
  basic_con_plan_document: boolean;
  con_rev_meeting: number;
  con_rev_meeting_implementation_date: Date;
  head_office_manager_interview_date: Date;
};

export type TypeConstructionOverview = {
  id: number;
  overview: string;
  order_classification: number;
  orderer: string;
  scheduled_delivery_date: Date;
  usage: string;
  con_wor_demolition: boolean;
  con_wor_structure: boolean;
  con_wor_roof: boolean;
  con_wor_outer_wall: boolean;
  con_wor_interior: boolean;
  con_wor_exterior: boolean;
  con_wor_water_proof: boolean;
  con_tim_per_within_regular_hour: boolean;
  con_tim_per_outside_regular_hour: boolean;
  con_tim_per_other: boolean;
  con_tim_per_holiday_work: boolean;
  construction_time_period_other: boolean;
  con_tim_per_other_input: string;
  con_sit_dangerous_materials_area: boolean;
  construction_site: string;
  con_sit_indoor: boolean;
  con_sit_outdoor: boolean;
  con_sit_other: boolean;
  con_sit_per_other_input: string;
  no_of_floors: number;
  civ_eng_con_sewer: boolean;
  civ_eng_con_road: boolean;
  civ_eng_con_machine_basic: boolean;
  civ_eng_con_outside: boolean;
  civ_eng_con_pavement: boolean;
  fac_con_water_supply_and_drainage: boolean;
  fac_con_air_conditioning: boolean;
  fac_con_outdoor_unit: boolean;
  ele_equ_wor_transforming: boolean;
  ele_equ_wor_power: boolean;
  ele_equ_wor_light: boolean;
  ele_equ_wor_illumination: boolean;
  ele_equ_wor_fire_alarm: boolean;
  ele_equ_wor_guide_lights: boolean;
  scaffolding: number;
  scaffolding_10m_or_more: number;
  waterproof_construction: number;
  structure: number;
  structure_rc: boolean;
  structure_s: boolean;
  structure_src: boolean;
  structure_wooden: boolean;
  design_confirmation: number;
  heavy_equipment_work: number;
  heavy_equipment_type: string;
  retention_period_60_days_or_more: number;
  warranty: number;
  site_boundary_line: number;
  acc_ris_fire_handling: boolean;
  acc_ris_work_through_walls: boolean;
  acc_ris_heavy_machine_use: boolean;
  acc_ris_paint_work: boolean;
  acc_ris_excavation_work: boolean;
  acc_ris_other_danger_work: boolean;
  acc_ris_fall: boolean;
  acc_ris_electric_shock: boolean;
  acc_ris_fall_down: boolean;
  acc_ris_harmful_object_hitting: boolean;
  acc_ris_heavy_loads_manpower_transportaion: boolean;
  acc_ris_chipping_cutter_drill: boolean;
  acc_ris_asbestos_removal: boolean;
  acc_ris_slinging_work: boolean;
  acc_ris_spraying_work: boolean;
  acc_ris_construction_lift: boolean;
  acc_ris_concrete_placement: boolean;
  acc_ris_flying_falling: boolean;
  acc_ris_burn: boolean;
  acc_ris_cut: boolean;
  acc_ris_unreasonable_movement: boolean;
  acc_ris_stepladder_work: boolean;
  acc_ris_demolition_work: boolean;
  acc_ris_electric_welding: boolean;
  acc_ris_electric_switch: boolean;
  acc_ris_high_place_work: boolean;
  acc_ris_public_object: boolean;
  acc_ris_oxygen_deficieny_work: boolean;
  acc_ris_burning: boolean;
  acc_ris_leakage_outage: boolean;
  acc_ris_caught: boolean;
  acc_ris_getting_caught: boolean;
  acc_ris_gas_fusing_welding: boolean;
  acc_ris_electrical_work: boolean;
  acc_ris_pressurized_work: boolean;
  acc_ris_truck_loading_and_unloading: boolean;
  acc_ris_chemicals_deleterious_substance: boolean;
  acc_ris_heavy_lifting_work: boolean;
  acc_ris_traffic_accident: boolean;
  acc_ris_explosion: boolean;
  acc_ris_clash: boolean;
  acc_ris_collapse: boolean;
  acc_ris_other: boolean;
  dangerous_work_or_self_risk: string;
  assumed_risk: string;
  counter_measure: string;
  leg_con_rec_law_volume: boolean;
  leg_con_rec_law_repair_volume: boolean;
  leg_con_rec_law_dismantling: boolean;
  legal_conditions_ground_drilling: boolean;
  leg_con_not_ins_spec_form_work: boolean;
  legal_conditions_roadside_excavation: boolean;
  legal_conditions_road_use: boolean;
  legal_conditions_road_occupation: boolean;
  leg_con_not_ins_mac_etc_scaffolding: boolean;
  leg_con_not_ins_mac_form_work: boolean;
  pri_man_wor_concrete_work: boolean;
  pri_man_wor_steel_framework: boolean;
  pri_man_wor_waterproofing: boolean;
  pri_man_wor_metal_roof_work: boolean;
  pri_man_wor_metal_exterior_wall: boolean;
  pri_man_wor_outer_wall_tilling_work: boolean;
  pri_man_wor_outer_wall_tilling_work_other: boolean;
  pri_man_wor_outer_wall_stone_work: boolean;
  pri_man_wor_outer_wall_stone_work_other: boolean;
  pri_man_wor_alc_work: boolean;
  pri_man_wor_alc_work_other: boolean;
  pri_man_wor_air_ventilation_equipment_work: boolean;
  pri_man_wor_electric_eqipment_work: boolean;
  pri_man_wor_water_supply_and_drainage: boolean;
  pri_man_wor_design_drawing: boolean;
  pri_man_wor_design_road_map: boolean;
  construction_plan_work_specification: boolean;
  neighbor_greeting: boolean;
  fire_testing_witness: boolean;
  owner_completion_testing_witness: boolean;
  industrial_waste_contract: boolean;
  con_not_form_by_order_specified_document: string;
  subcontractor_estimate_collection: boolean;
  cost_management: boolean;
  agreement_with_cooperator: boolean;
  company_inspection: number;
  company_implementation_date: Date;
  con_rev_meeting_by_wor_type: number;
  con_rev_meeting_by_wor_type_implementation_date: Date;
  safety_quality_patrol: number;
  safety_quality_patrol_implementation_date: Date;
  basic_con_plan_document: boolean;
  con_rev_meeting: number;
  con_rev_meeting_implementation_date: Date;
  head_office_manager_interview_date: Date;
  construction: TypeConstructionDetail;
};

/**
 * 工事概要取得
 * @param {number} construction_id
 * @param {number} id
 */
export const getConstructionOverview = async (
  construction_id: number,
  id: number
) => {
  const response = await api.get<TypeConstructionOverview>(
    API_URL.construction_overview.detail(construction_id, id)
  );
  return response;
};

/**
 * 工事概要追加
 * @param {number} construction_id
 * @param {AddConstructionOverview} data
 */
export const addConstructionOverview = async (
  construction_id: number,
  data: AddConstructionOverview
) => {
  const response = await api.post<ConstructionOverviewCreate>(
    API_URL.construction_overview.addConstructionOverview(construction_id),
    { ...data },
  );
  return response;
};

/**
 * 工事概要更新
 * @param {number} construction_id
 * @param {number} id
 * @param {AddConstructionOverview} data
 */
export const updateOverviewRequest = async (
  construction_id: number,
  id: number,
  data: AddConstructionOverview,
) => {
  const response = await api.put<ConstructionOverviewCreate>(
    API_URL.construction_overview.update(construction_id, id), {
      ...data,
    });
  return response;
};