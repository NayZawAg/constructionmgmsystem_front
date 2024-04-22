/** 清算見積メニュカテゴリー */
export type EstimateCategoryMenu = {
  estimate_categories: [
    {
      large_categories: {
        id: number;
        construction_type_name: string;
        middle_categories: [
          {
            id: number;
            construction_type_name: string;
            estimate_category_id: number;
          }
        ]
      }
    }
  ],
  application_status: number;
}