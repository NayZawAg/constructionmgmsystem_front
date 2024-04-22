export type EstimateDetails = {
  small_categories: {
    id: number,
    construction_type_name: string
  },
  estimate_small_categories: {
    id: number,
    entry_small_category_name: string,
    remarks: string
  },
  estimate_details: {
    id: number,
    detail: string,
    quantity: number,
    unit: string,
    unit_price: number,
    specification: string,
    subtotal: number,
    remarks: string
  }[]
};