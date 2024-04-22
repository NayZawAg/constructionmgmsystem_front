/** 清算見積メニュカテゴリー */
export type CostManageCategoryMenu = {
    cost_categories: [
      {
        large_categories: {
          id: number;
          construction_type_name: string;
          middle_categories: [
            {
              id: number;
              construction_type_name: string;
              cost_category_id: number;
            }
          ]
        }
      }
    ]
  }