// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { TypeConstruction } from '@/interfaces'

export const CONSTRUCTION_LIST = [
  {
    id: 1,
    name: "AAAA工事",
    code: "7510460",
    zipcode:'1000013',
    prefecture:'東京',
    municipality:'大阪',
    address1:'住所1',
    address2: "住所2",
    structureRc: "RC",
    structureS: "大",
    structureSrc:"代",
    structureWooden: "議",
    groundFloor: 2,
    basementFloor: 3,
    siteArea: 3000,
    siteAreaInTsubo:30.2,
    buildingArea: 2000,
    buildingAreaInTsubo: 20.1,
    totalFloorArea: 2500,
    totalFloorAreaInTsubo: 25.1,
    commodity: "危険物　倉庫",
    construction_details: "あああ あ ああ あああ あああ ああ あああ あああ あああ ああああ ああああ あ ああ あああ あああ ああ あああ あああ あああ ああああ ああああ あ ああ あああ あああ ああ あああ あああ あああ ああああ あ",
    eastWestDivision: "大阪",
    newConstruction: "新築",
    scheduledStartDate: "2022/02/02",
    scheduledEndDate: "2023/02/02",
    estimatedDate:"2023/02/02",
    orderDate: "2023/02/02",
    contractDate: "2023/02/02",
    updatedDate: "2023/02/02",
    completionDate: "2023/02/02",
    assumedArtificial:"3.5",
    dr0: "2022/02/02",
    dr1: "2022/02/02",
    dr2: "2022/02/02",
    confirmCompletionDate: "2022/02/02",
    fireinspectionDate: "2023/02/03",
    brand: {
      id: 1,
      brand_name: "ブランド名1",
      brand_icon: "https://robohash.org/XM0.png?set=set1",
    },
    supplier: {
      id: 1,
      name: "〇〇株式会社１",
      image: "https://robohash.org/XM0.png?set=set1",
      email: "aaaaaa@co.jp"
    },
    company: {
      id: 1,
      name: "AAAA",
      branch: "横浜",
      prefecture: "神奈川",
      city: "横浜",
      town: "豊岡",
      phoneno: "080-1111-2222",
      description: "あああああああああああああああああああああああああああああ",
    },
    costManageMenu: [
      {
        label: '大項目',
        middleItems: [
          {
            label: 'AAA工事'
          },
          {
            label: '中項目'
          },
          {
            label: '中項目'
          }
        ]
      },
      {
        label: '大項目',
        middleItems: [
          {
            label: '中項目'
          }
        ]
      },
      {
        label: '大項目',
        middleItems: [
          {
            label: '中項目'
          },
          {
            label: '中項目'
          }
        ]
      },
      {
        label: '大項目',
        middleItems: [
          {
            label: '中項目'
          }
        ]
      }
    ]
  },
  // {
  //   id: 2,
  //   name: "BBBB工事",
  //   code: "工事コード",
  //   zipcode:'1000013',
  //   prefecture:'東京',
  //   municipality:'大阪',
  //   address1:'住所1',
  //   address2: "住所2",
  //   structureRc: "RC",
  //   structureS: "大",
  //   structureSrc:"代",
  //   structureWooden: "議",
  //   groundFloor: 2,
  //   basementFloor: 3,
  //   siteArea: 3000,
  //   siteAreaInTsubo:30.2,
  //   buildingArea: 2000,
  //   buildingAreaInTsubo: 20.1,
  //   totalFloorArea: 2500,
  //   totalFloorAreaInTsubo: 25.1,
  //   commodity: "bla bal baa",
  //   construction_details: "あああ あ ああ あああ あああ ああ あああ あああ あああ ああああ ああああ あ ああ あああ あああ ああ あああ あああ あああ ああああ ああああ あ ああ あああ あああ ああ あああ あああ あああ ああああ あ",
  //   eastWestDivision: "大阪",
  //   newConstruction: "新築",
  //   scheduledStartDate: "2022/02/02",
  //   scheduledEndDate: "2023/02/02",
  //   estimatedDate:"2023/02/02",
  //   orderDate: "2023/02/02",
  //   contractDate: "2023/02/02",
  //   updatedDate: "2023/02/02",
  //   completionDate: "2023/02/02",
  //   assumedArtificial:"3.5",
  //   dr0: "2022/02/02",
  //   dr1: "2022/02/02",
  //   dr2: "2022/02/02",
  //   confirmCompletionDate: "2022/02/02",
  //   fireinspectionDate: "2023/02/03",
  //   brand: {
  //     id: 1,
  //     brand_name: "ブランド名1",
  //     brand_icon: "https://robohash.org/XM0.png?set=set1",
  //   },
  //   supplier: {
  //     id: 1,
  //     name: "〇〇株式会社１",
  //     image: "https://robohash.org/XM0.png?set=set1",
  //     email: "aaaaaa@co.jp"
  //   },
  //   company: {
  //     id: 1,
  //     name: "AAAA",
  //     branch: "横浜",
  //     address: {
  //       prefecture: "神奈川",
  //       city: "横浜",
  //       town: "豊岡"
  //     },
  //     phoneno: "080-1111-2222",
  //     description: "あああああああああああああああああああああああああああああ"
  //   },
  //   costManageMenu: [
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: 'AAA工事'
  //         },
  //         {
  //           label: '中項目'
  //         },
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     },
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     },
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: '中項目'
  //         },
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     },
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     }
  //   ]
  // },
  // {
  //   id: 3,
  //   name: "CCCC工事",
  //   code: "工事コード",
  //   zipcode:'1000013',
  //   prefecture:'東京',
  //   municipality:'大阪',
  //   address1:'住所1',
  //   address2: "住所2",
  //   structureRc: "RC",
  //   structureS: "大",
  //   structureSrc:"代",
  //   structureWooden: "議",
  //   groundFloor: 2,
  //   basementFloor: 3,
  //   siteArea: 3000,
  //   siteAreaInTsubo:30.2,
  //   buildingArea: 2000,
  //   buildingAreaInTsubo: 20.1,
  //   totalFloorArea: 2500,
  //   totalFloorAreaInTsubo: 25.1,
  //   commodity: "bla bal baa",
  //   construction_details: "あああ あ ああ あああ あああ ああ あああ あああ あああ ああああ ああああ あ ああ あああ あああ ああ あああ あああ あああ ああああ ああああ あ ああ あああ あああ ああ あああ あああ あああ ああああ あ",
  //   eastWestDivision: "大阪",
  //   newConstruction: "新築",
  //   scheduledStartDate: "2022/02/02",
  //   scheduledEndDate: "2023/02/02",
  //   estimatedDate:"2023/02/02",
  //   orderDate: "2023/02/02",
  //   contractDate: "2023/02/02",
  //   updatedDate: "2023/02/02",
  //   completionDate: "2023/02/02",
  //   assumedArtificial:"3.5",
  //   dr0: "2022/02/02",
  //   dr1: "2022/02/02",
  //   dr2: "2022/02/02",
  //   confirmCompletionDate: "2022/02/02",
  //   fireinspectionDate: "2023/02/03",
  //   brand: {
  //     id: 1,
  //     brand_name: "ブランド名1",
  //     brand_icon: "https://robohash.org/XM0.png?set=set1",
      
  //   },
  //   supplier: {
  //     id: 1,
  //     name: "〇〇株式会社１",
  //     image: "https://robohash.org/XM0.png?set=set1",
  //     email: "aaaaaa@co.jp"
  //   },
  //   company: {
  //     id: 1,
  //     name: "AAAA",
  //     branch: "横浜",
  //     address: {
  //       prefecture: "神奈川",
  //       city: "横浜",
  //       town: "豊岡"
  //     },
  //     phoneno: "080-1111-2222",
  //     description: "あああああああああああああああああああああああああああああ"
  //   },
  //   costManageMenu: [
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: 'AAA工事'
  //         },
  //         {
  //           label: '中項目'
  //         },
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     },
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     },
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: '中項目'
  //         },
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     },
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     }
  //   ]
  // },
  // {
  //   id: 4,
  //   name: "DDDD工事",
  //   code: "工事コード",
  //   zipcode:'1000013',
  //   prefecture:'東京',
  //   municipality:'大阪',
  //   address1:'住所1',
  //   address2: "住所2",
  //   structureRc: "RC",
  //   structureS: "大",
  //   structureSrc:"代",
  //   structureWooden: "議",
  //   groundFloor: 2,
  //   basementFloor: 3,
  //   siteArea: 3000,
  //   siteAreaInTsubo:30.2,
  //   buildingArea: 2000,
  //   buildingAreaInTsubo: 20.1,
  //   totalFloorArea: 2500,
  //   totalFloorAreaInTsubo: 25.1,
  //   commodity: "bla bal baa",
  //   construction_details: "あああ あ ああ あああ あああ ああ あああ あああ あああ ああああ ああああ あ ああ あああ あああ ああ あああ あああ あああ ああああ ああああ あ ああ あああ あああ ああ あああ あああ あああ ああああ あ",
  //   eastWestDivision: "大阪",
  //   newConstruction: "新築",
  //   scheduledStartDate: "2022/02/02",
  //   scheduledEndDate: "2023/02/02",
  //   estimatedDate:"2023/02/02",
  //   orderDate: "2023/02/02",
  //   contractDate: "2023/02/02",
  //   updatedDate: "2023/02/02",
  //   completionDate: "2023/02/02",
  //   assumedArtificial:"3.5",
  //   dr0: "2022/02/02",
  //   dr1: "2022/02/02",
  //   dr2: "2022/02/02",
  //   confirmCompletionDate: "2022/02/02",
  //   fireinspectionDate: "2023/02/03",
  //   brand: {
  //     id: 1,
  //     brand_name: "ブランド名1",
  //     brand_icon: "https://robohash.org/XM0.png?set=set1",
  //   },
  //   supplier: {
  //     id: 1,
  //     name: "〇〇株式会社１",
  //     image: "https://robohash.org/XM0.png?set=set1",
  //     email: "aaaaaa@co.jp"
  //   },
  //   company: {
  //     id: 1,
  //     name: "AAAA",
  //     branch: "横浜",
  //     address: {
  //       prefecture: "神奈川",
  //       city: "横浜",
  //       town: "豊岡"
  //     },
  //     phoneno: "080-1111-2222",
  //     description: "あああああああああああああああああああああああああああああ"
  //   },
  //   costManageMenu: [
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: 'AAA工事'
  //         },
  //         {
  //           label: '中項目'
  //         },
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     },
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     },
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: '中項目'
  //         },
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     },
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     }
  //   ]
  // },
  // {
  //   id: 5,
  //   name: "AAAA工事",
  //   code: "工事コード",
  //   zipcode:'1000013',
  //   prefecture:'東京',
  //   municipality:'大阪',
  //   address1:'住所1',
  //   address2: "住所2",
  //   structureRc: "RC",
  //   structureS: "大",
  //   structureSrc:"代",
  //   structureWooden: "議",
  //   groundFloor: 2,
  //   basementFloor: 3,
  //   siteArea: 3000,
  //   siteAreaInTsubo:30.2,
  //   buildingArea: 2000,
  //   buildingAreaInTsubo: 20.1,
  //   totalFloorArea: 2500,
  //   totalFloorAreaInTsubo: 25.1,
  //   commodity: "bla bal baa",
  //   construction_details: "あああ あ ああ あああ あああ ああ あああ あああ あああ ああああ ああああ あ ああ あああ あああ ああ あああ あああ あああ ああああ ああああ あ ああ あああ あああ ああ あああ あああ あああ ああああ あ",
  //   eastWestDivision: "大阪",
  //   newConstruction: "新築",
  //   scheduledStartDate: "2022/02/02",
  //   scheduledEndDate: "2023/02/02",
  //   estimatedDate:"2023/02/02",
  //   orderDate: "2023/02/02",
  //   contractDate: "2023/02/02",
  //   updatedDate: "2023/02/02",
  //   completionDate: "2023/02/02",
  //   assumedArtificial:"3.5",
  //   dr0: "2022/02/02",
  //   dr1: "2022/02/02",
  //   dr2: "2022/02/02",
  //   confirmCompletionDate: "2022/02/02",
  //   fireinspectionDate: "2023/02/03",
  //   brand: {
  //     id: 1,
  //     brand_name: "ブランド名1",
  //     brand_icon: "https://robohash.org/XM0.png?set=set1",
  //   },
  //   supplier: {
  //     id: 1,
  //     name: "〇〇株式会社１",
  //     image: "https://robohash.org/XM0.png?set=set1",
  //     email: "aaaaaa@co.jp"
  //   },
  //   company: {
  //     id: 1,
  //     name: "AAAA",
  //     branch: "横浜",
  //     address: {
  //       prefecture: "神奈川",
  //       city: "横浜",
  //       town: "豊岡"
  //     },
  //     phoneno: "080-1111-2222",
  //     description: "あああああああああああああああああああああああああああああ"
  //   },
  //   costManageMenu: [
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: 'AAA工事'
  //         },
  //         {
  //           label: '中項目'
  //         },
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     },
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     },
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: '中項目'
  //         },
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     },
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     }
  //   ]
  // },
  // {
  //   id: 6,
  //   name: "AAAA工事",
  //   code: "工事コード",
  //   zipcode:'1000013',
  //   prefecture:'東京',
  //   municipality:'大阪',
  //   address1:'住所1',
  //   address2: "住所2",
  //   structureRc: "RC",
  //   structureS: "大",
  //   structureSrc:"代",
  //   structureWooden: "議",
  //   groundFloor: 2,
  //   basementFloor: 3,
  //   siteArea: 3000,
  //   siteAreaInTsubo:30.2,
  //   buildingArea: 2000,
  //   buildingAreaInTsubo: 20.1,
  //   totalFloorArea: 2500,
  //   totalFloorAreaInTsubo: 25.1,
  //   commodity: "bla bal baa",
  //   construction_details: "あああ あ ああ あああ あああ ああ あああ あああ あああ ああああ ああああ あ ああ あああ あああ ああ あああ あああ あああ ああああ ああああ あ ああ あああ あああ ああ あああ あああ あああ ああああ あ",
  //   eastWestDivision: "大阪",
  //   newConstruction: "新築",
  //   scheduledStartDate: "2022/02/02",
  //   scheduledEndDate: "2023/02/02",
  //   estimatedDate:"2023/02/02",
  //   orderDate: "2023/02/02",
  //   contractDate: "2023/02/02",
  //   updatedDate: "2023/02/02",
  //   completionDate: "2023/02/02",
  //   assumedArtificial:"3.5",
  //   dr0: "2022/02/02",
  //   dr1: "2022/02/02",
  //   dr2: "2022/02/02",
  //   confirmCompletionDate: "2022/02/02",
  //   fireinspectionDate: "2023/02/03",
  //   brand: {
  //     id: 1,
  //     brand_name: "ブランド名1",
  //     brand_icon: "https://robohash.org/XM0.png?set=set1",
  //   },
  //   supplier: {
  //     id: 1,
  //     name: "〇〇株式会社１",
  //     image: "https://robohash.org/XM0.png?set=set1",
  //     email: "aaaaaa@co.jp"
  //   },
  //   company: {
  //     id: 1,
  //     name: "AAAA",
  //     branch: "横浜",
  //     address: {
  //       prefecture: "神奈川",
  //       city: "横浜",
  //       town: "豊岡"
  //     },
  //     phoneno: "080-1111-2222",
  //     description: "あああああああああああああああああああああああああああああ"
  //   },
  //   costManageMenu: [
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: 'AAA工事'
  //         },
  //         {
  //           label: '中項目'
  //         },
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     },
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     },
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: '中項目'
  //         },
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     },
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     }
  //   ]
  // },
  // {
  //   id: 7,
  //   name: "AAAA工事",
  //   code: "工事コード",
  //   zipcode:'1000013',
  //   prefecture:'東京',
  //   municipality:'大阪',
  //   address1:'住所1',
  //   address2: "住所2",
  //   structureRc: "RC",
  //   structureS: "大",
  //   structureSrc:"代",
  //   structureWooden: "議",
  //   groundFloor: 2,
  //   basementFloor: 3,
  //   siteArea: 3000,
  //   siteAreaInTsubo:30.2,
  //   buildingArea: 2000,
  //   buildingAreaInTsubo: 20.1,
  //   totalFloorArea: 2500,
  //   totalFloorAreaInTsubo: 25.1,
  //   commodity: "bla bal baa",
  //   construction_details: "あああ あ ああ あああ あああ ああ あああ あああ あああ ああああ ああああ あ ああ あああ あああ ああ あああ あああ あああ ああああ ああああ あ ああ あああ あああ ああ あああ あああ あああ ああああ あ",
  //   eastWestDivision: "大阪",
  //   newConstruction: "新築",
  //   scheduledStartDate: "2022/02/02",
  //   scheduledEndDate: "2023/02/02",
  //   estimatedDate:"2023/02/02",
  //   orderDate: "2023/02/02",
  //   contractDate: "2023/02/02",
  //   updatedDate: "2023/02/02",
  //   completionDate: "2023/02/02",
  //   assumedArtificial:"3.5",
  //   dr0: "2022/02/02",
  //   dr1: "2022/02/02",
  //   dr2: "2022/02/02",
  //   confirmCompletionDate: "2022/02/02",
  //   fireinspectionDate: "2023/02/03",
  //   brand: {
  //     id: 1,
  //     name: "ブランド名1",
  //     brand_icon: "https://robohash.org/XM0.png?set=set1",
  //   },
  //   supplier: {
  //     id: 1,
  //     name: "〇〇株式会社１",
  //     image: "https://robohash.org/XM0.png?set=set1",
  //     email: "aaaaaa@co.jp"
  //   },
  //   company: {
  //     id: 1,
  //     name: "AAAA",
  //     branch: "横浜",
  //     address: {
  //       prefecture: "神奈川",
  //       city: "横浜",
  //       town: "豊岡"
  //     },
  //     phoneno: "080-1111-2222",
  //     description: "あああああああああああああああああああああああああああああ"
  //   },
  //   costManageMenu: [
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: 'AAA工事'
  //         },
  //         {
  //           label: '中項目'
  //         },
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     },
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     },
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: '中項目'
  //         },
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     },
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     }
  //   ]
  // },
  // {
  //   id: 8,
  //   name: "AAAA工事",
  //   code: "工事コード",
  //   zipcode:'1000013',
  //   prefecture:'東京',
  //   municipality:'大阪',
  //   address1:'住所1',
  //   address2: "住所2",
  //   structureRc: "RC",
  //   structureS: "大",
  //   structureSrc:"代",
  //   structureWooden: "議",
  //   groundFloor: 2,
  //   basementFloor: 3,
  //   siteArea: 3000,
  //   siteAreaInTsubo:30.2,
  //   buildingArea: 2000,
  //   buildingAreaInTsubo: 20.1,
  //   totalFloorArea: 2500,
  //   totalFloorAreaInTsubo: 25.1,
  //   commodity: "bla bal baa",
  //   construction_details: "あああ あ ああ あああ あああ ああ あああ あああ あああ ああああ ああああ あ ああ あああ あああ ああ あああ あああ あああ ああああ ああああ あ ああ あああ あああ ああ あああ あああ あああ ああああ あ",
  //   eastWestDivision: "大阪",
  //   newConstruction: "新築",
  //   scheduledStartDate: "2022/02/02",
  //   scheduledEndDate: "2023/02/02",
  //   estimatedDate:"2023/02/02",
  //   orderDate: "2023/02/02",
  //   contractDate: "2023/02/02",
  //   updatedDate: "2023/02/02",
  //   completionDate: "2023/02/02",
  //   assumedArtificial:"3.5",
  //   dr0: "2022/02/02",
  //   dr1: "2022/02/02",
  //   dr2: "2022/02/02",
  //   confirmCompletionDate: "2022/02/02",
  //   fireinspectionDate: "2023/02/03",
  //   brand: {
  //     id: 1,
  //     brand_name: "ブランド名1",
  //     brand_icon: "https://robohash.org/XM0.png?set=set1",
  //   },
  //   supplier: {
  //     id: 1,
  //     name: "〇〇株式会社１",
  //     image: "https://robohash.org/XM0.png?set=set1",
  //     email: "aaaaaa@co.jp"
  //   },
  //   company: {
  //     id: 1,
  //     name: "AAAA",
  //     branch: "横浜",
  //     address: {
  //       prefecture: "神奈川",
  //       city: "横浜",
  //       town: "豊岡"
  //     },
  //     phoneno: "080-1111-2222",
  //     description: "あああああああああああああああああああああああああああああ"
  //   },
  //   costManageMenu: [
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: 'AAA工事'
  //         },
  //         {
  //           label: '中項目'
  //         },
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     },
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     },
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: '中項目'
  //         },
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     },
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     }
  //   ]
  // },
  // {
  //   id: 9,
  //   name: "AAAA工事",
  //   code: "工事コード",
  //   zipcode:'1000013',
  //   prefecture:'東京',
  //   municipality:'大阪',
  //   address1:'住所1',
  //   address2: "住所2",
  //   structureRc: "RC",
  //   structureS: "大",
  //   structureSrc:"代",
  //   structureWooden: "議",
  //   groundFloor: 2,
  //   basementFloor: 3,
  //   siteArea: 3000,
  //   siteAreaInTsubo:30.2,
  //   buildingArea: 2000,
  //   buildingAreaInTsubo: 20.1,
  //   totalFloorArea: 2500,
  //   totalFloorAreaInTsubo: 25.1,
  //   commodity: "bla bal baa",
  //   construction_details: "あああ あ ああ あああ あああ ああ あああ あああ あああ ああああ ああああ あ ああ あああ あああ ああ あああ あああ あああ ああああ ああああ あ ああ あああ あああ ああ あああ あああ あああ ああああ あ",
  //   eastWestDivision: "大阪",
  //   newConstruction: "新築",
  //   scheduledStartDate: "2022/02/02",
  //   scheduledEndDate: "2023/02/02",
  //   estimatedDate:"2023/02/02",
  //   orderDate: "2023/02/02",
  //   contractDate: "2023/02/02",
  //   updatedDate: "2023/02/02",
  //   completionDate: "2023/02/02",
  //   assumedArtificial:"3.5",
  //   dr0: "2022/02/02",
  //   dr1: "2022/02/02",
  //   dr2: "2022/02/02",
  //   confirmCompletionDate: "2022/02/02",
  //   fireinspectionDate: "2023/02/03",
  //   brand: {
  //     id: 1,
  //     brand_name: "ブランド名1",
  //     brand_icon: "https://robohash.org/XM0.png?set=set1",
  //   },
  //   supplier: {
  //     id: 1,
  //     name: "〇〇株式会社１",
  //     image: "https://robohash.org/XM0.png?set=set1",
  //     email: "aaaaaa@co.jp"
  //   },
  //   company: {
  //     id: 1,
  //     name: "AAAA",
  //     branch: "横浜",
  //     address: {
  //       prefecture: "神奈川",
  //       city: "横浜",
  //       town: "豊岡"
  //     },
  //     phoneno: "080-1111-2222",
  //     description: "あああああああああああああああああああああああああああああ"
  //   },
  //   costManageMenu: [
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: 'AAA工事'
  //         },
  //         {
  //           label: '中項目'
  //         },
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     },
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     },
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: '中項目'
  //         },
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     },
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     }
  //   ]
  // },
  // {
  //   id: 10,
  //   name: "AAAA工事",
  //   code: "工事コード",
  //   zipcode:'1000013',
  //   prefecture:'東京',
  //   municipality:'大阪',
  //   address1:'住所1',
  //   address2: "住所2",
  //   structureRc: "RC",
  //   structureS: "大",
  //   structureSrc:"代",
  //   structureWooden: "議",
  //   groundFloor: 2,
  //   basementFloor: 3,
  //   siteArea: 3000,
  //   siteAreaInTsubo:30.2,
  //   buildingArea: 2000,
  //   buildingAreaInTsubo: 20.1,
  //   totalFloorArea: 2500,
  //   totalFloorAreaInTsubo: 25.1,
  //   commodity: "bla bal baa",
  //   construction_details: "あああ あ ああ あああ あああ ああ あああ あああ あああ ああああ ああああ あ ああ あああ あああ ああ あああ あああ あああ ああああ ああああ あ ああ あああ あああ ああ あああ あああ あああ ああああ あ",
  //   eastWestDivision: "大阪",
  //   newConstruction: "新築",
  //   scheduledStartDate: "2022/02/02",
  //   scheduledEndDate: "2023/02/02",
  //   estimatedDate:"2023/02/02",
  //   orderDate: "2023/02/02",
  //   contractDate: "2023/02/02",
  //   updatedDate: "2023/02/02",
  //   completionDate: "2023/02/02",
  //   assumedArtificial:"3.5",
  //   dr0: "2022/02/02",
  //   dr1: "2022/02/02",
  //   dr2: "2022/02/02",
  //   confirmCompletionDate: "2022/02/02",
  //   fireinspectionDate: "2023/02/03",
  //   brand: {
  //     id: 1,
  //     brand_name: "ブランド名1",
  //     brand_icon: "https://robohash.org/XM0.png?set=set1",
  //   },
  //   supplier: {
  //     id: 1,
  //     name: "〇〇株式会社１",
  //     image: "https://robohash.org/XM0.png?set=set1",
  //     email: "aaaaaa@co.jp"
  //   },
  //   company: {
  //     id: 1,
  //     name: "AAAA",
  //     branch: "横浜",
  //     address: {
  //       prefecture: "神奈川",
  //       city: "横浜",
  //       town: "豊岡"
  //     },
  //     phoneno: "080-1111-2222",
  //     description: "あああああああああああああああああああああああああああああ"
  //   },
  //   costManageMenu: [
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: 'AAA工事'
  //         },
  //         {
  //           label: '中項目'
  //         },
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     },
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     },
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: '中項目'
  //         },
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     },
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     }
  //   ]
  // },
  // {
  //   id: 11,
  //   name: "AAAA工事",
  //   code: "工事コード",
  //   zipcode:'1000013',
  //   prefecture:'東京',
  //   municipality:'大阪',
  //   address1:'住所1',
  //   address2: "住所2",
  //   structureRc: "RC",
  //   structureS: "大",
  //   structureSrc:"代",
  //   structureWooden: "議",
  //   groundFloor: 2,
  //   basementFloor: 3,
  //   siteArea: 3000,
  //   siteAreaInTsubo:30.2,
  //   buildingArea: 2000,
  //   buildingAreaInTsubo: 20.1,
  //   totalFloorArea: 2500,
  //   totalFloorAreaInTsubo: 25.1,
  //   commodity: "bla bal baa",
  //   construction_details: "あああ あ ああ あああ あああ ああ あああ あああ あああ ああああ ああああ あ ああ あああ あああ ああ あああ あああ あああ ああああ ああああ あ ああ あああ あああ ああ あああ あああ あああ ああああ あ",
  //   eastWestDivision: "大阪",
  //   newConstruction: "新築",
  //   scheduledStartDate: "2022/02/02",
  //   scheduledEndDate: "2023/02/02",
  //   estimatedDate:"2023/02/02",
  //   orderDate: "2023/02/02",
  //   contractDate: "2023/02/02",
  //   updatedDate: "2023/02/02",
  //   completionDate: "2023/02/02",
  //   assumedArtificial:"3.5",
  //   dr0: "2022/02/02",
  //   dr1: "2022/02/02",
  //   dr2: "2022/02/02",
  //   confirmCompletionDate: "2022/02/02",
  //   fireinspectionDate: "2023/02/03",
  //   brand: {
  //     id: 1,
  //     brand_name: "ブランド名1",
  //     brand_icon: "https://robohash.org/XM0.png?set=set1",
  //   },
  //   supplier: {
  //     id: 1,
  //     name: "〇〇株式会社１",
  //     image: "https://robohash.org/XM0.png?set=set1",
  //     email: "aaaaaa@co.jp"
  //   },
  //   company: {
  //     id: 1,
  //     name: "AAAA",
  //     branch: "横浜",
  //     address: {
  //       prefecture: "神奈川",
  //       city: "横浜",
  //       town: "豊岡"
  //     },
  //     phoneno: "080-1111-2222",
  //     description: "あああああああああああああああああああああああああああああ"
  //   },
  //   costManageMenu: [
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: 'AAA工事'
  //         },
  //         {
  //           label: '中項目'
  //         },
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     },
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     },
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: '中項目'
  //         },
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     },
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     }
  //   ]
  // },
  // {
  //   id: 12,
  //   name: "AAAA工事",
  //   code: "工事コード",
  //   zipcode:'1000013',
  //   prefecture:'東京',
  //   municipality:'大阪',
  //   address1:'住所1',
  //   address2: "住所2",
  //   structureRc: "RC",
  //   structureS: "大",
  //   structureSrc:"代",
  //   structureWooden: "議",
  //   groundFloor: 2,
  //   basementFloor: 3,
  //   siteArea: 3000,
  //   siteAreaInTsubo:30.2,
  //   buildingArea: 2000,
  //   buildingAreaInTsubo: 20.1,
  //   totalFloorArea: 2500,
  //   totalFloorAreaInTsubo: 25.1,
  //   commodity: "bla bal baa",
  //   construction_details: "あああ あ ああ あああ あああ ああ あああ あああ あああ ああああ ああああ あ ああ あああ あああ ああ あああ あああ あああ ああああ ああああ あ ああ あああ あああ ああ あああ あああ あああ ああああ あ",
  //   eastWestDivision: "大阪",
  //   newConstruction: "新築",
  //   scheduledStartDate: "2022/02/02",
  //   scheduledEndDate: "2023/02/02",
  //   estimatedDate:"2023/02/02",
  //   orderDate: "2023/02/02",
  //   contractDate: "2023/02/02",
  //   updatedDate: "2023/02/02",
  //   completionDate: "2023/02/02",
  //   assumedArtificial:"3.5",
  //   dr0: "2022/02/02",
  //   dr1: "2022/02/02",
  //   dr2: "2022/02/02",
  //   confirmCompletionDate: "2022/02/02",
  //   fireinspectionDate: "2023/02/03",
  //   brand: {
  //     id: 1,
  //     brand_name: "ブランド名1",
  //     brand_icon: "https://robohash.org/XM0.png?set=set1",
  //   },
  //   supplier: {
  //     id: 1,
  //     name: "〇〇株式会社１",
  //     image: "https://robohash.org/XM0.png?set=set1",
  //     email: "aaaaaa@co.jp"
  //   },
  //   company: {
  //     id: 1,
  //     name: "AAAA",
  //     branch: "横浜",
  //     address: {
  //       prefecture: "神奈川",
  //       city: "横浜",
  //       town: "豊岡"
  //     },
  //     phoneno: "080-1111-2222",
  //     description: "あああああああああああああああああああああああああああああ"
  //   },
  //   costManageMenu: [
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: 'AAA工事'
  //         },
  //         {
  //           label: '中項目'
  //         },
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     },
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     },
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: '中項目'
  //         },
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     },
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     }
  //   ]
  // },
  // {
  //   id: 13,
  //   name: "CCCC工事",
  //   code: "工事コード",
  //   zipcode:'1000013',
  //   prefecture:'東京',
  //   municipality:'大阪',
  //   address1:'住所1',
  //   address2: "住所2",
  //   structureRc: "RC",
  //   structureS: "大",
  //   structureSrc:"代",
  //   structureWooden: "議",
  //   groundFloor: 2,
  //   basementFloor: 3,
  //   siteArea: 3000,
  //   siteAreaInTsubo:30.2,
  //   buildingArea: 2000,
  //   buildingAreaInTsubo: 20.1,
  //   totalFloorArea: 2500,
  //   totalFloorAreaInTsubo: 25.1,
  //   commodity: "bla bal baa",
  //   construction_details: "あああ あ ああ あああ あああ ああ あああ あああ あああ ああああ ああああ あ ああ あああ あああ ああ あああ あああ あああ ああああ ああああ あ ああ あああ あああ ああ あああ あああ あああ ああああ あ",
  //   eastWestDivision: "大阪",
  //   newConstruction: "新築",
  //   scheduledStartDate: "2022/02/02",
  //   scheduledEndDate: "2023/02/02",
  //   estimatedDate:"2023/02/02",
  //   orderDate: "2023/02/02",
  //   contractDate: "2023/02/02",
  //   updatedDate: "2023/02/02",
  //   completionDate: "2023/02/02",
  //   assumedArtificial:"3.5",
  //   dr0: "2022/02/02",
  //   dr1: "2022/02/02",
  //   dr2: "2022/02/02",
  //   confirmCompletionDate: "2022/02/02",
  //   fireinspectionDate: "2023/02/03",
  //   brand: {
  //     id: 1,
  //     brand_name: "ブランド名1",
  //     brand_icon: "https://robohash.org/XM0.png?set=set1",
      
  //   },
  //   supplier: {
  //     id: 1,
  //     name: "〇〇株式会社１",
  //     image: "https://robohash.org/XM0.png?set=set1",
  //     email: "aaaaaa@co.jp"
  //   },
  //   company: {
  //     id: 1,
  //     name: "AAAA",
  //     branch: "横浜",
  //     address: {
  //       prefecture: "神奈川",
  //       city: "横浜",
  //       town: "豊岡"
  //     },
  //     phoneno: "080-1111-2222",
  //     description: "あああああああああああああああああああああああああああああ"
  //   },
  //   costManageMenu: [
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: 'AAA工事'
  //         },
  //         {
  //           label: '中項目'
  //         },
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     },
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     },
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: '中項目'
  //         },
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     },
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     }
  //   ]
  // },
  // {
  //   id: 14,
  //   name: "CCCC工事",
  //   code: "工事コード",
  //   zipcode:'1000013',
  //   prefecture:'東京',
  //   municipality:'大阪',
  //   address1:'住所1',
  //   address2: "住所2",
  //   structureRc: "RC",
  //   structureS: "大",
  //   structureSrc:"代",
  //   structureWooden: "議",
  //   groundFloor: 2,
  //   basementFloor: 3,
  //   siteArea: 3000,
  //   siteAreaInTsubo:30.2,
  //   buildingArea: 2000,
  //   buildingAreaInTsubo: 20.1,
  //   totalFloorArea: 2500,
  //   totalFloorAreaInTsubo: 25.1,
  //   commodity: "bla bal baa",
  //   construction_details: "あああ あ ああ あああ あああ ああ あああ あああ あああ ああああ ああああ あ ああ あああ あああ ああ あああ あああ あああ ああああ ああああ あ ああ あああ あああ ああ あああ あああ あああ ああああ あ",
  //   eastWestDivision: "大阪",
  //   newConstruction: "新築",
  //   scheduledStartDate: "2022/02/02",
  //   scheduledEndDate: "2023/02/02",
  //   estimatedDate:"2023/02/02",
  //   orderDate: "2023/02/02",
  //   contractDate: "2023/02/02",
  //   updatedDate: "2023/02/02",
  //   completionDate: "2023/02/02",
  //   assumedArtificial:"3.5",
  //   dr0: "2022/02/02",
  //   dr1: "2022/02/02",
  //   dr2: "2022/02/02",
  //   confirmCompletionDate: "2022/02/02",
  //   fireinspectionDate: "2023/02/03",
  //   brand: {
  //     id: 1,
  //     brand_name: "ブランド名1",
  //     brand_icon: "https://robohash.org/XM0.png?set=set1",
      
  //   },
  //   supplier: {
  //     id: 1,
  //     name: "〇〇株式会社１",
  //     image: "https://robohash.org/XM0.png?set=set1",
  //     email: "aaaaaa@co.jp"
  //   },
  //   company: {
  //     id: 1,
  //     name: "AAAA",
  //     branch: "横浜",
  //     address: {
  //       prefecture: "神奈川",
  //       city: "横浜",
  //       town: "豊岡"
  //     },
  //     phoneno: "080-1111-2222",
  //     description: "あああああああああああああああああああああああああああああ"
  //   },
  //   costManageMenu: [
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: 'AAA工事'
  //         },
  //         {
  //           label: '中項目'
  //         },
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     },
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     },
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: '中項目'
  //         },
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     },
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     }
  //   ]
  // },
  // {
  //   id: 15,
  //   name: "CCCC工事",
  //   code: "工事コード",
  //   zipcode:'1000013',
  //   prefecture:'東京',
  //   municipality:'大阪',
  //   address1:'住所1',
  //   address2: "住所2",
  //   structureRc: "RC",
  //   structureS: "大",
  //   structureSrc:"代",
  //   structureWooden: "議",
  //   groundFloor: 2,
  //   basementFloor: 3,
  //   siteArea: 3000,
  //   siteAreaInTsubo:30.2,
  //   buildingArea: 2000,
  //   buildingAreaInTsubo: 20.1,
  //   totalFloorArea: 2500,
  //   totalFloorAreaInTsubo: 25.1,
  //   commodity: "bla bal baa",
  //   construction_details: "あああ あ ああ あああ あああ ああ あああ あああ あああ ああああ ああああ あ ああ あああ あああ ああ あああ あああ あああ ああああ ああああ あ ああ あああ あああ ああ あああ あああ あああ ああああ あ",
  //   eastWestDivision: "大阪",
  //   newConstruction: "新築",
  //   scheduledStartDate: "2022/02/02",
  //   scheduledEndDate: "2023/02/02",
  //   estimatedDate:"2023/02/02",
  //   orderDate: "2023/02/02",
  //   contractDate: "2023/02/02",
  //   updatedDate: "2023/02/02",
  //   completionDate: "2023/02/02",
  //   assumedArtificial:"3.5",
  //   dr0: "2022/02/02",
  //   dr1: "2022/02/02",
  //   dr2: "2022/02/02",
  //   confirmCompletionDate: "2022/02/02",
  //   fireinspectionDate: "2023/02/03",
  //   brand: {
  //     id: 1,
  //     brand_name: "ブランド名1",
  //     brand_icon: "https://robohash.org/XM0.png?set=set1",
      
  //   },
  //   supplier: {
  //     id: 1,
  //     name: "〇〇株式会社１",
  //     image: "https://robohash.org/XM0.png?set=set1",
  //     email: "aaaaaa@co.jp"
  //   },
  //   company: {
  //     id: 1,
  //     name: "AAAA",
  //     branch: "横浜",
  //     address: {
  //       prefecture: "神奈川",
  //       city: "横浜",
  //       town: "豊岡"
  //     },
  //     phoneno: "080-1111-2222",
  //     description: "あああああああああああああああああああああああああああああ"
  //   },
  //   costManageMenu: [
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: 'AAA工事'
  //         },
  //         {
  //           label: '中項目'
  //         },
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     },
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     },
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: '中項目'
  //         },
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     },
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     }
  //   ]
  // },
  // {
  //   id: 16,
  //   name: "CCCC工事",
  //   code: "工事コード１",
  //   zipcode:'1000013',
  //   prefecture:'東京',
  //   municipality:'大阪',
  //   address1:'住所1',
  //   address2: "住所2",
  //   structureRc: "RC",
  //   structureS: "大",
  //   structureSrc:"代",
  //   structureWooden: "議",
  //   groundFloor: 2,
  //   basementFloor: 3,
  //   siteArea: 3000,
  //   siteAreaInTsubo:30.2,
  //   buildingArea: 2000,
  //   buildingAreaInTsubo: 20.1,
  //   totalFloorArea: 2500,
  //   totalFloorAreaInTsubo: 25.1,
  //   commodity: "bla bal baa",
  //   construction_details: "あああ あ ああ あああ あああ ああ あああ あああ あああ ああああ ああああ あ ああ あああ あああ ああ あああ あああ あああ ああああ ああああ あ ああ あああ あああ ああ あああ あああ あああ ああああ あ",
  //   eastWestDivision: "大阪",
  //   newConstruction: "新築",
  //   scheduledStartDate: "2022/02/02",
  //   scheduledEndDate: "2023/02/02",
  //   estimatedDate:"2023/02/02",
  //   orderDate: "2023/02/02",
  //   contractDate: "2023/02/02",
  //   updatedDate: "2023/02/02",
  //   completionDate: "2023/02/02",
  //   assumedArtificial:"3.5",
  //   dr0: "2022/02/02",
  //   dr1: "2022/02/02",
  //   dr2: "2022/02/02",
  //   confirmCompletionDate: "2022/02/02",
  //   fireinspectionDate: "2023/02/03",
  //   brand: {
  //     id: 1,
  //     brand_name: "ブランド名1",
  //     brand_icon: "https://robohash.org/XM0.png?set=set1",
      
  //   },
  //   supplier: {
  //     id: 1,
  //     name: "〇〇株式会社１",
  //     image: "https://robohash.org/XM0.png?set=set1",
  //     email: "aaaaaa@co.jp"
  //   },
  //   company: {
  //     id: 1,
  //     name: "AAAA",
  //     branch: "横浜",
  //     address: {
  //       prefecture: "神奈川",
  //       city: "横浜",
  //       town: "豊岡"
  //     },
  //     phoneno: "080-1111-2222",
  //     description: "あああああああああああああああああああああああああああああ"
  //   },
  //   costManageMenu: [
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: 'AAA工事'
  //         },
  //         {
  //           label: '中項目'
  //         },
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     },
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     },
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: '中項目'
  //         },
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     },
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     }
  //   ]
  // },
  // {
  //   id: 17,
  //   name: "CCCC工事",
  //   code: "工事コード１",
  //   zipcode:'1000013',
  //   prefecture:'東京',
  //   municipality:'大阪',
  //   address1:'住所1',
  //   address2: "住所2",
  //   structureRc: "RC",
  //   structureS: "大",
  //   structureSrc:"代",
  //   structureWooden: "議",
  //   groundFloor: 2,
  //   basementFloor: 3,
  //   siteArea: 3000,
  //   siteAreaInTsubo:30.2,
  //   buildingArea: 2000,
  //   buildingAreaInTsubo: 20.1,
  //   totalFloorArea: 2500,
  //   totalFloorAreaInTsubo: 25.1,
  //   commodity: "bla bal baa",
  //   construction_details: "あああ あ ああ あああ あああ ああ あああ あああ あああ ああああ ああああ あ ああ あああ あああ ああ あああ あああ あああ ああああ ああああ あ ああ あああ あああ ああ あああ あああ あああ ああああ あ",
  //   eastWestDivision: "大阪",
  //   newConstruction: "新築",
  //   scheduledStartDate: "2022/02/02",
  //   scheduledEndDate: "2023/02/02",
  //   estimatedDate:"2023/02/02",
  //   orderDate: "2023/02/02",
  //   contractDate: "2023/02/02",
  //   updatedDate: "2023/02/02",
  //   completionDate: "2023/02/02",
  //   assumedArtificial:"3.5",
  //   dr0: "2022/02/02",
  //   dr1: "2022/02/02",
  //   dr2: "2022/02/02",
  //   confirmCompletionDate: "2022/02/02",
  //   fireinspectionDate: "2023/02/03",
  //   brand: {
  //     id: 1,
  //     brand_name: "ブランド名1",
  //     brand_icon: "https://robohash.org/XM0.png?set=set1",
      
  //   },
  //   supplier: {
  //     id: 1,
  //     name: "〇〇株式会社１",
  //     image: "https://robohash.org/XM0.png?set=set1",
  //     email: "aaaaaa@co.jp"
  //   },
  //   company: {
  //     id: 1,
  //     name: "AAAA",
  //     branch: "横浜",
  //     address: {
  //       prefecture: "神奈川",
  //       city: "横浜",
  //       town: "豊岡"
  //     },
  //     phoneno: "080-1111-2222",
  //     description: "あああああああああああああああああああああああああああああ"
  //   },
  //   costManageMenu: [
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: 'AAA工事'
  //         },
  //         {
  //           label: '中項目'
  //         },
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     },
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     },
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: '中項目'
  //         },
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     },
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     }
  //   ]
  // },
  // {
  //   id: 18,
  //   name: "CCCC工事",
  //   code: "工事コード１",
  //   zipcode:'1000013',
  //   prefecture:'東京',
  //   municipality:'大阪',
  //   address1:'住所1',
  //   address2: "住所2",
  //   structureRc: "RC",
  //   structureS: "大",
  //   structureSrc:"代",
  //   structureWooden: "議",
  //   groundFloor: 2,
  //   basementFloor: 3,
  //   siteArea: 3000,
  //   siteAreaInTsubo:30.2,
  //   buildingArea: 2000,
  //   buildingAreaInTsubo: 20.1,
  //   totalFloorArea: 2500,
  //   totalFloorAreaInTsubo: 25.1,
  //   commodity: "bla bal baa",
  //   construction_details: "あああ あ ああ あああ あああ ああ あああ あああ あああ ああああ ああああ あ ああ あああ あああ ああ あああ あああ あああ ああああ ああああ あ ああ あああ あああ ああ あああ あああ あああ ああああ あ",
  //   eastWestDivision: "大阪",
  //   newConstruction: "新築",
  //   scheduledStartDate: "2022/02/02",
  //   scheduledEndDate: "2023/02/02",
  //   estimatedDate:"2023/02/02",
  //   orderDate: "2023/02/02",
  //   contractDate: "2023/02/02",
  //   updatedDate: "2023/02/02",
  //   completionDate: "2023/02/02",
  //   assumedArtificial:"3.5",
  //   dr0: "2022/02/02",
  //   dr1: "2022/02/02",
  //   dr2: "2022/02/02",
  //   confirmCompletionDate: "2022/02/02",
  //   fireinspectionDate: "2023/02/03",
  //   brand: {
  //     id: 1,
  //     brand_name: "ブランド名1",
  //     brand_icon: "https://robohash.org/XM0.png?set=set1",
      
  //   },
  //   supplier: {
  //     id: 1,
  //     name: "〇〇株式会社１",
  //     image: "https://robohash.org/XM0.png?set=set1",
  //     email: "aaaaaa@co.jp"
  //   },
  //   company: {
  //     id: 1,
  //     name: "AAAA",
  //     branch: "横浜",
  //     address: {
  //       prefecture: "神奈川",
  //       city: "横浜",
  //       town: "豊岡"
  //     },
  //     phoneno: "080-1111-2222",
  //     description: "あああああああああああああああああああああああああああああ"
  //   },
  //   costManageMenu: [
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: 'AAA工事'
  //         },
  //         {
  //           label: '中項目'
  //         },
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     },
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     },
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: '中項目'
  //         },
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     },
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     }
  //   ]
  // },
  // {
  //   id: 19,
  //   name: "CCCC工事",
  //   code: "工事コード１",
  //   zipcode:'1000013',
  //   prefecture:'東京',
  //   municipality:'大阪',
  //   address1:'住所1',
  //   address2: "住所2",
  //   structureRc: "RC",
  //   structureS: "大",
  //   structureSrc:"代",
  //   structureWooden: "議",
  //   groundFloor: 2,
  //   basementFloor: 3,
  //   siteArea: 3000,
  //   siteAreaInTsubo:30.2,
  //   buildingArea: 2000,
  //   buildingAreaInTsubo: 20.1,
  //   totalFloorArea: 2500,
  //   totalFloorAreaInTsubo: 25.1,
  //   commodity: "bla bal baa",
  //   construction_details: "あああ あ ああ あああ あああ ああ あああ あああ あああ ああああ ああああ あ ああ あああ あああ ああ あああ あああ あああ ああああ ああああ あ ああ あああ あああ ああ あああ あああ あああ ああああ あ",
  //   eastWestDivision: "大阪",
  //   newConstruction: "新築",
  //   scheduledStartDate: "2022/02/02",
  //   scheduledEndDate: "2023/02/02",
  //   estimatedDate:"2023/02/02",
  //   orderDate: "2023/02/02",
  //   contractDate: "2023/02/02",
  //   updatedDate: "2023/02/02",
  //   completionDate: "2023/02/02",
  //   assumedArtificial:"3.5",
  //   dr0: "2022/02/02",
  //   dr1: "2022/02/02",
  //   dr2: "2022/02/02",
  //   confirmCompletionDate: "2022/02/02",
  //   fireinspectionDate: "2023/02/03",
  //   brand: {
  //     id: 1,
  //     brand_name: "ブランド名1",
  //     brand_icon: "https://robohash.org/XM0.png?set=set1",
      
  //   },
  //   supplier: {
  //     id: 1,
  //     name: "〇〇株式会社１",
  //     image: "https://robohash.org/XM0.png?set=set1",
  //     email: "aaaaaa@co.jp"
  //   },
  //   company: {
  //     id: 1,
  //     name: "AAAA",
  //     branch: "横浜",
  //     address: {
  //       prefecture: "神奈川",
  //       city: "横浜",
  //       town: "豊岡"
  //     },
  //     phoneno: "080-1111-2222",
  //     description: "あああああああああああああああああああああああああああああ"
  //   },
  //   costManageMenu: [
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: 'AAA工事'
  //         },
  //         {
  //           label: '中項目'
  //         },
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     },
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     },
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: '中項目'
  //         },
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     },
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     }
  //   ]
  // },
  // {
  //   id: 20,
  //   name: "CCCC工事",
  //   code: "工事コード１",
  //   zipcode:'1000013',
  //   prefecture:'東京',
  //   municipality:'大阪',
  //   address1:'住所1',
  //   address2: "住所2",
  //   structureRc: "RC",
  //   structureS: "大",
  //   structureSrc:"代",
  //   structureWooden: "議",
  //   groundFloor: 2,
  //   basementFloor: 3,
  //   siteArea: 3000,
  //   siteAreaInTsubo:30.2,
  //   buildingArea: 2000,
  //   buildingAreaInTsubo: 20.1,
  //   totalFloorArea: 2500,
  //   totalFloorAreaInTsubo: 25.1,
  //   commodity: "bla bal baa",
  //   construction_details: "あああ あ ああ あああ あああ ああ あああ あああ あああ ああああ ああああ あ ああ あああ あああ ああ あああ あああ あああ ああああ ああああ あ ああ あああ あああ ああ あああ あああ あああ ああああ あ",
  //   eastWestDivision: "大阪",
  //   newConstruction: "新築",
  //   scheduledStartDate: "2022/02/02",
  //   scheduledEndDate: "2023/02/02",
  //   estimatedDate:"2023/02/02",
  //   orderDate: "2023/02/02",
  //   contractDate: "2023/02/02",
  //   updatedDate: "2023/02/02",
  //   completionDate: "2023/02/02",
  //   assumedArtificial:"3.5",
  //   dr0: "2022/02/02",
  //   dr1: "2022/02/02",
  //   dr2: "2022/02/02",
  //   confirmCompletionDate: "2022/02/02",
  //   fireinspectionDate: "2023/02/03",
  //   brand: {
  //     id: 1,
  //     brand_name: "ブランド名1",
  //     brand_icon: "https://robohash.org/XM0.png?set=set1",
      
  //   },
  //   supplier: {
  //     id: 1,
  //     name: "〇〇株式会社１",
  //     image: "https://robohash.org/XM0.png?set=set1",
  //     email: "aaaaaa@co.jp"
  //   },
  //   company: {
  //     id: 1,
  //     name: "AAAA",
  //     branch: "横浜",
  //     address: {
  //       prefecture: "神奈川",
  //       city: "横浜",
  //       town: "豊岡"
  //     },
  //     phoneno: "080-1111-2222",
  //     description: "あああああああああああああああああああああああああああああ"
  //   },
  //   costManageMenu: [
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: 'AAA工事'
  //         },
  //         {
  //           label: '中項目'
  //         },
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     },
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     },
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: '中項目'
  //         },
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     },
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     }
  //   ]
  // },
  // {
  //   id: 21,
  //   name: "CCCC工事",
  //   code: "工事コード１",
  //   zipcode:'1000013',
  //   prefecture:'東京',
  //   municipality:'大阪',
  //   address1:'住所1',
  //   address2: "住所2",
  //   structureRc: "RC",
  //   structureS: "大",
  //   structureSrc:"代",
  //   structureWooden: "議",
  //   groundFloor: 2,
  //   basementFloor: 3,
  //   siteArea: 3000,
  //   siteAreaInTsubo:30.2,
  //   buildingArea: 2000,
  //   buildingAreaInTsubo: 20.1,
  //   totalFloorArea: 2500,
  //   totalFloorAreaInTsubo: 25.1,
  //   commodity: "bla bal baa",
  //   construction_details: "あああ あ ああ あああ あああ ああ あああ あああ あああ ああああ ああああ あ ああ あああ あああ ああ あああ あああ あああ ああああ ああああ あ ああ あああ あああ ああ あああ あああ あああ ああああ あ",
  //   eastWestDivision: "大阪",
  //   newConstruction: "新築",
  //   scheduledStartDate: "2022/02/02",
  //   scheduledEndDate: "2023/02/02",
  //   estimatedDate:"2023/02/02",
  //   orderDate: "2023/02/02",
  //   contractDate: "2023/02/02",
  //   updatedDate: "2023/02/02",
  //   completionDate: "2023/02/02",
  //   assumedArtificial:"3.5",
  //   dr0: "2022/02/02",
  //   dr1: "2022/02/02",
  //   dr2: "2022/02/02",
  //   confirmCompletionDate: "2022/02/02",
  //   fireinspectionDate: "2023/02/03",
  //   brand: {
  //     id: 1,
  //     brand_name: "ブランド名1",
  //     brand_icon: "https://robohash.org/XM0.png?set=set1",
      
  //   },
  //   supplier: {
  //     id: 1,
  //     name: "〇〇株式会社１",
  //     image: "https://robohash.org/XM0.png?set=set1",
  //     email: "aaaaaa@co.jp"
  //   },
  //   company: {
  //     id: 1,
  //     name: "AAAA",
  //     branch: "横浜",
  //     address: {
  //       prefecture: "神奈川",
  //       city: "横浜",
  //       town: "豊岡"
  //     },
  //     phoneno: "080-1111-2222",
  //     description: "あああああああああああああああああああああああああああああ"
  //   },
  //   costManageMenu: [
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: 'AAA工事'
  //         },
  //         {
  //           label: '中項目'
  //         },
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     },
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     },
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: '中項目'
  //         },
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     },
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     }
  //   ]
  // },
  // {
  //   id: 22,
  //   name: "CCCC工事",
  //   code: "工事コード１",
  //   zipcode:'1000013',
  //   prefecture:'東京',
  //   municipality:'大阪',
  //   address1:'住所1',
  //   address2: "住所2",
  //   structureRc: "RC",
  //   structureS: "大",
  //   structureSrc:"代",
  //   structureWooden: "議",
  //   groundFloor: 2,
  //   basementFloor: 3,
  //   siteArea: 3000,
  //   siteAreaInTsubo:30.2,
  //   buildingArea: 2000,
  //   buildingAreaInTsubo: 20.1,
  //   totalFloorArea: 2500,
  //   totalFloorAreaInTsubo: 25.1,
  //   commodity: "bla bal baa",
  //   construction_details: "あああ あ ああ あああ あああ ああ あああ あああ あああ ああああ ああああ あ ああ あああ あああ ああ あああ あああ あああ ああああ ああああ あ ああ あああ あああ ああ あああ あああ あああ ああああ あ",
  //   eastWestDivision: "大阪",
  //   newConstruction: "新築",
  //   scheduledStartDate: "2022/02/02",
  //   scheduledEndDate: "2023/02/02",
  //   estimatedDate:"2023/02/02",
  //   orderDate: "2023/02/02",
  //   contractDate: "2023/02/02",
  //   updatedDate: "2023/02/02",
  //   completionDate: "2023/02/02",
  //   assumedArtificial:"3.5",
  //   dr0: "2022/02/02",
  //   dr1: "2022/02/02",
  //   dr2: "2022/02/02",
  //   confirmCompletionDate: "2022/02/02",
  //   fireinspectionDate: "2023/02/03",
  //   brand: {
  //     id: 1,
  //     brand_name: "ブランド名1",
  //     brand_icon: "https://robohash.org/XM0.png?set=set1",
      
  //   },
  //   supplier: {
  //     id: 1,
  //     name: "〇〇株式会社１",
  //     image: "https://robohash.org/XM0.png?set=set1",
  //     email: "aaaaaa@co.jp"
  //   },
  //   company: {
  //     id: 1,
  //     name: "AAAA",
  //     branch: "横浜",
  //     address: {
  //       prefecture: "神奈川",
  //       city: "横浜",
  //       town: "豊岡"
  //     },
  //     phoneno: "080-1111-2222",
  //     description: "あああああああああああああああああああああああああああああ"
  //   },
  //   costManageMenu: [
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: 'AAA工事'
  //         },
  //         {
  //           label: '中項目'
  //         },
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     },
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     },
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: '中項目'
  //         },
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     },
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     }
  //   ]
  // },
  // {
  //   id: 23,
  //   name: "CCCC工事",
  //   code: "工事コード１",
  //   zipcode:'1000013',
  //   prefecture:'東京',
  //   municipality:'大阪',
  //   address1:'住所1',
  //   address2: "住所2",
  //   structureRc: "RC",
  //   structureS: "大",
  //   structureSrc:"代",
  //   structureWooden: "議",
  //   groundFloor: 2,
  //   basementFloor: 3,
  //   siteArea: 3000,
  //   siteAreaInTsubo:30.2,
  //   buildingArea: 2000,
  //   buildingAreaInTsubo: 20.1,
  //   totalFloorArea: 2500,
  //   totalFloorAreaInTsubo: 25.1,
  //   commodity: "bla bal baa",
  //   construction_details: "あああ あ ああ あああ あああ ああ あああ あああ あああ ああああ ああああ あ ああ あああ あああ ああ あああ あああ あああ ああああ ああああ あ ああ あああ あああ ああ あああ あああ あああ ああああ あ",
  //   eastWestDivision: "大阪",
  //   newConstruction: "新築",
  //   scheduledStartDate: "2022/02/02",
  //   scheduledEndDate: "2023/02/02",
  //   estimatedDate:"2023/02/02",
  //   orderDate: "2023/02/02",
  //   contractDate: "2023/02/02",
  //   updatedDate: "2023/02/02",
  //   completionDate: "2023/02/02",
  //   assumedArtificial:"3.5",
  //   dr0: "2022/02/02",
  //   dr1: "2022/02/02",
  //   dr2: "2022/02/02",
  //   confirmCompletionDate: "2022/02/02",
  //   fireinspectionDate: "2023/02/03",
  //   brand: {
  //     id: 1,
  //     brand_name: "ブランド名1",
  //     brand_icon: "https://robohash.org/XM0.png?set=set1",
      
  //   },
  //   supplier: {
  //     id: 1,
  //     name: "〇〇株式会社１",
  //     image: "https://robohash.org/XM0.png?set=set1",
  //     email: "aaaaaa@co.jp"
  //   },
  //   company: {
  //     id: 1,
  //     name: "AAAA",
  //     branch: "横浜",
  //     address: {
  //       prefecture: "神奈川",
  //       city: "横浜",
  //       town: "豊岡"
  //     },
  //     phoneno: "080-1111-2222",
  //     description: "あああああああああああああああああああああああああああああ"
  //   },
  //   costManageMenu: [
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: 'AAA工事'
  //         },
  //         {
  //           label: '中項目'
  //         },
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     },
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     },
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: '中項目'
  //         },
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     },
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     }
  //   ]
  // },
  // {
  //   id: 24,
  //   name: "CCCC工事",
  //   code: "工事コード１",
  //   zipcode:'1000013',
  //   prefecture:'東京',
  //   municipality:'大阪',
  //   address1:'住所1',
  //   address2: "住所2",
  //   structureRc: "RC",
  //   structureS: "大",
  //   structureSrc:"代",
  //   structureWooden: "議",
  //   groundFloor: 2,
  //   basementFloor: 3,
  //   siteArea: 3000,
  //   siteAreaInTsubo:30.2,
  //   buildingArea: 2000,
  //   buildingAreaInTsubo: 20.1,
  //   totalFloorArea: 2500,
  //   totalFloorAreaInTsubo: 25.1,
  //   commodity: "bla bal baa",
  //   construction_details: "あああ あ ああ あああ あああ ああ あああ あああ あああ ああああ ああああ あ ああ あああ あああ ああ あああ あああ あああ ああああ ああああ あ ああ あああ あああ ああ あああ あああ あああ ああああ あ",
  //   eastWestDivision: "大阪",
  //   newConstruction: "新築",
  //   scheduledStartDate: "2022/02/02",
  //   scheduledEndDate: "2023/02/02",
  //   estimatedDate:"2023/02/02",
  //   orderDate: "2023/02/02",
  //   contractDate: "2023/02/02",
  //   updatedDate: "2023/02/02",
  //   completionDate: "2023/02/02",
  //   assumedArtificial:"3.5",
  //   dr0: "2022/02/02",
  //   dr1: "2022/02/02",
  //   dr2: "2022/02/02",
  //   confirmCompletionDate: "2022/02/02",
  //   fireinspectionDate: "2023/02/03",
  //   brand: {
  //     id: 1,
  //     brand_name: "ブランド名1",
  //     brand_icon: "https://robohash.org/XM0.png?set=set1",
      
  //   },
  //   supplier: {
  //     id: 1,
  //     name: "〇〇株式会社１",
  //     image: "https://robohash.org/XM0.png?set=set1",
  //     email: "aaaaaa@co.jp"
  //   },
  //   company: {
  //     id: 1,
  //     name: "AAAA",
  //     branch: "横浜",
  //     address: {
  //       prefecture: "神奈川",
  //       city: "横浜",
  //       town: "豊岡"
  //     },
  //     phoneno: "080-1111-2222",
  //     description: "あああああああああああああああああああああああああああああ"
  //   },
  //   costManageMenu: [
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: 'AAA工事'
  //         },
  //         {
  //           label: '中項目'
  //         },
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     },
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     },
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: '中項目'
  //         },
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     },
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     }
  //   ]
  // },
  // {
  //   id: 25,
  //   name: "CCCC工事",
  //   code: "工事コード１",
  //   zipcode:'1000013',
  //   prefecture:'東京',
  //   municipality:'大阪',
  //   address1:'住所1',
  //   address2: "住所2",
  //   structureRc: "RC",
  //   structureS: "大",
  //   structureSrc:"代",
  //   structureWooden: "議",
  //   groundFloor: 2,
  //   basementFloor: 3,
  //   siteArea: 3000,
  //   siteAreaInTsubo:30.2,
  //   buildingArea: 2000,
  //   buildingAreaInTsubo: 20.1,
  //   totalFloorArea: 2500,
  //   totalFloorAreaInTsubo: 25.1,
  //   commodity: "bla bal baa",
  //   construction_details: "あああ あ ああ あああ あああ ああ あああ あああ あああ ああああ ああああ あ ああ あああ あああ ああ あああ あああ あああ ああああ ああああ あ ああ あああ あああ ああ あああ あああ あああ ああああ あ",
  //   eastWestDivision: "大阪",
  //   newConstruction: "新築",
  //   scheduledStartDate: "2022/02/02",
  //   scheduledEndDate: "2023/02/02",
  //   estimatedDate:"2023/02/02",
  //   orderDate: "2023/02/02",
  //   contractDate: "2023/02/02",
  //   updatedDate: "2023/02/02",
  //   completionDate: "2023/02/02",
  //   assumedArtificial:"3.5",
  //   dr0: "2022/02/02",
  //   dr1: "2022/02/02",
  //   dr2: "2022/02/02",
  //   confirmCompletionDate: "2022/02/02",
  //   fireinspectionDate: "2023/02/03",
  //   brand: {
  //     id: 1,
  //     brand_name: "ブランド名1",
  //     brand_icon: "https://robohash.org/XM0.png?set=set1",
      
  //   },
  //   supplier: {
  //     id: 1,
  //     name: "〇〇株式会社１",
  //     image: "https://robohash.org/XM0.png?set=set1",
  //     email: "aaaaaa@co.jp"
  //   },
  //   company: {
  //     id: 1,
  //     name: "AAAA",
  //     branch: "横浜",
  //     address: {
  //       prefecture: "神奈川",
  //       city: "横浜",
  //       town: "豊岡"
  //     },
  //     phoneno: "080-1111-2222",
  //     description: "あああああああああああああああああああああああああああああ"
  //   },
  //   costManageMenu: [
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: 'AAA工事'
  //         },
  //         {
  //           label: '中項目'
  //         },
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     },
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     },
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: '中項目'
  //         },
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     },
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     }
  //   ]
  // },
  // {
  //   id: 26,
  //   name: "CCCC工事",
  //   code: "工事コード１",
  //   zipcode:'1000013',
  //   prefecture:'東京',
  //   municipality:'大阪',
  //   address1:'住所1',
  //   address2: "住所2",
  //   structureRc: "RC",
  //   structureS: "大",
  //   structureSrc:"代",
  //   structureWooden: "議",
  //   groundFloor: 2,
  //   basementFloor: 3,
  //   siteArea: 3000,
  //   siteAreaInTsubo:30.2,
  //   buildingArea: 2000,
  //   buildingAreaInTsubo: 20.1,
  //   totalFloorArea: 2500,
  //   totalFloorAreaInTsubo: 25.1,
  //   commodity: "bla bal baa",
  //   construction_details: "あああ あ ああ あああ あああ ああ あああ あああ あああ ああああ ああああ あ ああ あああ あああ ああ あああ あああ あああ ああああ ああああ あ ああ あああ あああ ああ あああ あああ あああ ああああ あ",
  //   eastWestDivision: "大阪",
  //   newConstruction: "新築",
  //   scheduledStartDate: "2022/02/02",
  //   scheduledEndDate: "2023/02/02",
  //   estimatedDate:"2023/02/02",
  //   orderDate: "2023/02/02",
  //   contractDate: "2023/02/02",
  //   updatedDate: "2023/02/02",
  //   completionDate: "2023/02/02",
  //   assumedArtificial:"3.5",
  //   dr0: "2022/02/02",
  //   dr1: "2022/02/02",
  //   dr2: "2022/02/02",
  //   confirmCompletionDate: "2022/02/02",
  //   fireinspectionDate: "2023/02/03",
  //   brand: {
  //     id: 1,
  //     brand_name: "ブランド名1",
  //     brand_icon: "https://robohash.org/XM0.png?set=set1",
      
  //   },
  //   supplier: {
  //     id: 1,
  //     name: "〇〇株式会社１",
  //     image: "https://robohash.org/XM0.png?set=set1",
  //     email: "aaaaaa@co.jp"
  //   },
  //   company: {
  //     id: 1,
  //     name: "AAAA",
  //     branch: "横浜",
  //     address: {
  //       prefecture: "神奈川",
  //       city: "横浜",
  //       town: "豊岡"
  //     },
  //     phoneno: "080-1111-2222",
  //     description: "あああああああああああああああああああああああああああああ"
  //   },
  //   costManageMenu: [
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: 'AAA工事'
  //         },
  //         {
  //           label: '中項目'
  //         },
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     },
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     },
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: '中項目'
  //         },
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     },
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     }
  //   ]
  // },
  // {
  //   id: 27,
  //   name: "CCCC工事",
  //   code: "工事コード１",
  //   zipcode:'1000013',
  //   prefecture:'東京',
  //   municipality:'大阪',
  //   address1:'住所1',
  //   address2: "住所2",
  //   structureRc: "RC",
  //   structureS: "大",
  //   structureSrc:"代",
  //   structureWooden: "議",
  //   groundFloor: 2,
  //   basementFloor: 3,
  //   siteArea: 3000,
  //   siteAreaInTsubo:30.2,
  //   buildingArea: 2000,
  //   buildingAreaInTsubo: 20.1,
  //   totalFloorArea: 2500,
  //   totalFloorAreaInTsubo: 25.1,
  //   commodity: "bla bal baa",
  //   construction_details: "あああ あ ああ あああ あああ ああ あああ あああ あああ ああああ ああああ あ ああ あああ あああ ああ あああ あああ あああ ああああ ああああ あ ああ あああ あああ ああ あああ あああ あああ ああああ あ",
  //   eastWestDivision: "大阪",
  //   newConstruction: "新築",
  //   scheduledStartDate: "2022/02/02",
  //   scheduledEndDate: "2023/02/02",
  //   estimatedDate:"2023/02/02",
  //   orderDate: "2023/02/02",
  //   contractDate: "2023/02/02",
  //   updatedDate: "2023/02/02",
  //   completionDate: "2023/02/02",
  //   assumedArtificial:"3.5",
  //   dr0: "2022/02/02",
  //   dr1: "2022/02/02",
  //   dr2: "2022/02/02",
  //   confirmCompletionDate: "2022/02/02",
  //   fireinspectionDate: "2023/02/03",
  //   brand: {
  //     id: 1,
  //     brand_name: "ブランド名1",
  //     brand_icon: "https://robohash.org/XM0.png?set=set1",
      
  //   },
  //   supplier: {
  //     id: 1,
  //     name: "〇〇株式会社１",
  //     image: "https://robohash.org/XM0.png?set=set1",
  //     email: "aaaaaa@co.jp"
  //   },
  //   company: {
  //     id: 1,
  //     name: "AAAA",
  //     branch: "横浜",
  //     address: {
  //       prefecture: "神奈川",
  //       city: "横浜",
  //       town: "豊岡"
  //     },
  //     phoneno: "080-1111-2222",
  //     description: "あああああああああああああああああああああああああああああ"
  //   },
  //   costManageMenu: [
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: 'AAA工事'
  //         },
  //         {
  //           label: '中項目'
  //         },
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     },
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     },
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: '中項目'
  //         },
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     },
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     }
  //   ]
  // },
  // {
  //   id: 28,
  //   name: "CCCC工事",
  //   code: "工事コード１",
  //   zipcode:'1000013',
  //   prefecture:'東京',
  //   municipality:'大阪',
  //   address1:'住所1',
  //   address2: "住所2",
  //   structureRc: "RC",
  //   structureS: "大",
  //   structureSrc:"代",
  //   structureWooden: "議",
  //   groundFloor: 2,
  //   basementFloor: 3,
  //   siteArea: 3000,
  //   siteAreaInTsubo:30.2,
  //   buildingArea: 2000,
  //   buildingAreaInTsubo: 20.1,
  //   totalFloorArea: 2500,
  //   totalFloorAreaInTsubo: 25.1,
  //   commodity: "bla bal baa",
  //   construction_details: "あああ あ ああ あああ あああ ああ あああ あああ あああ ああああ ああああ あ ああ あああ あああ ああ あああ あああ あああ ああああ ああああ あ ああ あああ あああ ああ あああ あああ あああ ああああ あ",
  //   eastWestDivision: "大阪",
  //   newConstruction: "新築",
  //   scheduledStartDate: "2022/02/02",
  //   scheduledEndDate: "2023/02/02",
  //   estimatedDate:"2023/02/02",
  //   orderDate: "2023/02/02",
  //   contractDate: "2023/02/02",
  //   updatedDate: "2023/02/02",
  //   completionDate: "2023/02/02",
  //   assumedArtificial:"3.5",
  //   dr0: "2022/02/02",
  //   dr1: "2022/02/02",
  //   dr2: "2022/02/02",
  //   confirmCompletionDate: "2022/02/02",
  //   fireinspectionDate: "2023/02/03",
  //   brand: {
  //     id: 1,
  //     brand_name: "ブランド名1",
  //     brand_icon: "https://robohash.org/XM0.png?set=set1",
      
  //   },
  //   supplier: {
  //     id: 1,
  //     name: "〇〇株式会社１",
  //     image: "https://robohash.org/XM0.png?set=set1",
  //     email: "aaaaaa@co.jp"
  //   },
  //   company: {
  //     id: 1,
  //     name: "AAAA",
  //     branch: "横浜",
  //     address: {
  //       prefecture: "神奈川",
  //       city: "横浜",
  //       town: "豊岡"
  //     },
  //     phoneno: "080-1111-2222",
  //     description: "あああああああああああああああああああああああああああああ"
  //   },
  //   costManageMenu: [
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: 'AAA工事'
  //         },
  //         {
  //           label: '中項目'
  //         },
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     },
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     },
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: '中項目'
  //         },
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     },
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     }
  //   ]
  // },
  // {
  //   id: 29,
  //   name: "CCCC工事",
  //   code: "工事コード１",
  //   zipcode:'1000013',
  //   prefecture:'東京',
  //   municipality:'大阪',
  //   address1:'住所1',
  //   address2: "住所2",
  //   structureRc: "RC",
  //   structureS: "大",
  //   structureSrc:"代",
  //   structureWooden: "議",
  //   groundFloor: 2,
  //   basementFloor: 3,
  //   siteArea: 3000,
  //   siteAreaInTsubo:30.2,
  //   buildingArea: 2000,
  //   buildingAreaInTsubo: 20.1,
  //   totalFloorArea: 2500,
  //   totalFloorAreaInTsubo: 25.1,
  //   commodity: "bla bal baa",
  //   construction_details: "あああ あ ああ あああ あああ ああ あああ あああ あああ ああああ ああああ あ ああ あああ あああ ああ あああ あああ あああ ああああ ああああ あ ああ あああ あああ ああ あああ あああ あああ ああああ あ",
  //   eastWestDivision: "大阪",
  //   newConstruction: "新築",
  //   scheduledStartDate: "2022/02/02",
  //   scheduledEndDate: "2023/02/02",
  //   estimatedDate:"2023/02/02",
  //   orderDate: "2023/02/02",
  //   contractDate: "2023/02/02",
  //   updatedDate: "2023/02/02",
  //   completionDate: "2023/02/02",
  //   assumedArtificial:"3.5",
  //   dr0: "2022/02/02",
  //   dr1: "2022/02/02",
  //   dr2: "2022/02/02",
  //   confirmCompletionDate: "2022/02/02",
  //   fireinspectionDate: "2023/02/03",
  //   brand: {
  //     id: 1,
  //     brand_name: "ブランド名1",
  //     brand_icon: "https://robohash.org/XM0.png?set=set1",
      
  //   },
  //   supplier: {
  //     id: 1,
  //     name: "〇〇株式会社１",
  //     image: "https://robohash.org/XM0.png?set=set1",
  //     email: "aaaaaa@co.jp"
  //   },
  //   company: {
  //     id: 1,
  //     name: "AAAA",
  //     branch: "横浜",
  //     address: {
  //       prefecture: "神奈川",
  //       city: "横浜",
  //       town: "豊岡"
  //     },
  //     phoneno: "080-1111-2222",
  //     description: "あああああああああああああああああああああああああああああ"
  //   },
  //   costManageMenu: [
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: 'AAA工事'
  //         },
  //         {
  //           label: '中項目'
  //         },
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     },
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     },
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: '中項目'
  //         },
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     },
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     }
  //   ]
  // },
  // {
  //   id: 30,
  //   name: "CCCC工事",
  //   code: "工事コード１",
  //   zipcode:'1000013',
  //   prefecture:'東京',
  //   municipality:'大阪',
  //   address1:'住所1',
  //   address2: "住所2",
  //   structureRc: "RC",
  //   structureS: "大",
  //   structureSrc:"代",
  //   structureWooden: "議",
  //   groundFloor: 2,
  //   basementFloor: 3,
  //   siteArea: 3000,
  //   siteAreaInTsubo:30.2,
  //   buildingArea: 2000,
  //   buildingAreaInTsubo: 20.1,
  //   totalFloorArea: 2500,
  //   totalFloorAreaInTsubo: 25.1,
  //   commodity: "bla bal baa",
  //   construction_details: "あああ あ ああ あああ あああ ああ あああ あああ あああ ああああ ああああ あ ああ あああ あああ ああ あああ あああ あああ ああああ ああああ あ ああ あああ あああ ああ あああ あああ あああ ああああ あ",
  //   eastWestDivision: "大阪",
  //   newConstruction: "新築",
  //   scheduledStartDate: "2022/02/02",
  //   scheduledEndDate: "2023/02/02",
  //   estimatedDate:"2023/02/02",
  //   orderDate: "2023/02/02",
  //   contractDate: "2023/02/02",
  //   updatedDate: "2023/02/02",
  //   completionDate: "2023/02/02",
  //   assumedArtificial:"3.5",
  //   dr0: "2022/02/02",
  //   dr1: "2022/02/02",
  //   dr2: "2022/02/02",
  //   confirmCompletionDate: "2022/02/02",
  //   fireinspectionDate: "2023/02/03",
  //   brand: {
  //     id: 1,
  //     brand_name: "ブランド名1",
  //     brand_icon: "https://robohash.org/XM0.png?set=set1",
      
  //   },
  //   supplier: {
  //     id: 1,
  //     name: "〇〇株式会社１",
  //     image: "https://robohash.org/XM0.png?set=set1",
  //     email: "aaaaaa@co.jp"
  //   },
  //   company: {
  //     id: 1,
  //     name: "AAAA",
  //     branch: "横浜",
  //     address: {
  //       prefecture: "神奈川",
  //       city: "横浜",
  //       town: "豊岡"
  //     },
  //     phoneno: "080-1111-2222",
  //     description: "あああああああああああああああああああああああああああああ"
  //   },
  //   costManageMenu: [
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: 'AAA工事'
  //         },
  //         {
  //           label: '中項目'
  //         },
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     },
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     },
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: '中項目'
  //         },
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     },
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     }
  //   ]
  // },
  // {
  //   id: 31,
  //   name: "CCCC工事",
  //   code: "工事コード１",
  //   zipcode:'1000013',
  //   prefecture:'東京',
  //   municipality:'大阪',
  //   address1:'住所1',
  //   address2: "住所2",
  //   structureRc: "RC",
  //   structureS: "大",
  //   structureSrc:"代",
  //   structureWooden: "議",
  //   groundFloor: 2,
  //   basementFloor: 3,
  //   siteArea: 3000,
  //   siteAreaInTsubo:30.2,
  //   buildingArea: 2000,
  //   buildingAreaInTsubo: 20.1,
  //   totalFloorArea: 2500,
  //   totalFloorAreaInTsubo: 25.1,
  //   commodity: "bla bal baa",
  //   construction_details: "あああ あ ああ あああ あああ ああ あああ あああ あああ ああああ ああああ あ ああ あああ あああ ああ あああ あああ あああ ああああ ああああ あ ああ あああ あああ ああ あああ あああ あああ ああああ あ",
  //   eastWestDivision: "大阪",
  //   newConstruction: "新築",
  //   scheduledStartDate: "2022/02/02",
  //   scheduledEndDate: "2023/02/02",
  //   estimatedDate:"2023/02/02",
  //   orderDate: "2023/02/02",
  //   contractDate: "2023/02/02",
  //   updatedDate: "2023/02/02",
  //   completionDate: "2023/02/02",
  //   assumedArtificial:"3.5",
  //   dr0: "2022/02/02",
  //   dr1: "2022/02/02",
  //   dr2: "2022/02/02",
  //   confirmCompletionDate: "2022/02/02",
  //   fireinspectionDate: "2023/02/03",
  //   brand: {
  //     id: 1,
  //     brand_name: "ブランド名1",
  //     brand_icon: "https://robohash.org/XM0.png?set=set1",
      
  //   },
  //   supplier: {
  //     id: 1,
  //     name: "〇〇株式会社１",
  //     image: "https://robohash.org/XM0.png?set=set1",
  //     email: "aaaaaa@co.jp"
  //   },
  //   company: {
  //     id: 1,
  //     name: "AAAA",
  //     branch: "横浜",
  //     address: {
  //       prefecture: "神奈川",
  //       city: "横浜",
  //       town: "豊岡"
  //     },
  //     phoneno: "080-1111-2222",
  //     description: "あああああああああああああああああああああああああああああ"
  //   },
  //   costManageMenu: [
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: 'AAA工事'
  //         },
  //         {
  //           label: '中項目'
  //         },
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     },
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     },
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: '中項目'
  //         },
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     },
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     }
  //   ]
  // },
  // {
  //   id: 32,
  //   name: "CCCC工事",
  //   code: "工事コード１",
  //   zipcode:'1000013',
  //   prefecture:'東京',
  //   municipality:'大阪',
  //   address1:'住所1',
  //   address2: "住所2",
  //   structureRc: "RC",
  //   structureS: "大",
  //   structureSrc:"代",
  //   structureWooden: "議",
  //   groundFloor: 2,
  //   basementFloor: 3,
  //   siteArea: 3000,
  //   siteAreaInTsubo:30.2,
  //   buildingArea: 2000,
  //   buildingAreaInTsubo: 20.1,
  //   totalFloorArea: 2500,
  //   totalFloorAreaInTsubo: 25.1,
  //   commodity: "bla bal baa",
  //   construction_details: "あああ あ ああ あああ あああ ああ あああ あああ あああ ああああ ああああ あ ああ あああ あああ ああ あああ あああ あああ ああああ ああああ あ ああ あああ あああ ああ あああ あああ あああ ああああ あ",
  //   eastWestDivision: "大阪",
  //   newConstruction: "新築",
  //   scheduledStartDate: "2022/02/02",
  //   scheduledEndDate: "2023/02/02",
  //   estimatedDate:"2023/02/02",
  //   orderDate: "2023/02/02",
  //   contractDate: "2023/02/02",
  //   updatedDate: "2023/02/02",
  //   completionDate: "2023/02/02",
  //   assumedArtificial:"3.5",
  //   dr0: "2022/02/02",
  //   dr1: "2022/02/02",
  //   dr2: "2022/02/02",
  //   confirmCompletionDate: "2022/02/02",
  //   fireinspectionDate: "2023/02/03",
  //   brand: {
  //     id: 1,
  //     brand_name: "ブランド名1",
  //     brand_icon: "https://robohash.org/XM0.png?set=set1",
      
  //   },
  //   supplier: {
  //     id: 1,
  //     name: "〇〇株式会社１",
  //     image: "https://robohash.org/XM0.png?set=set1",
  //     email: "aaaaaa@co.jp"
  //   },
  //   company: {
  //     id: 1,
  //     name: "AAAA",
  //     branch: "横浜",
  //     address: {
  //       prefecture: "神奈川",
  //       city: "横浜",
  //       town: "豊岡"
  //     },
  //     phoneno: "080-1111-2222",
  //     description: "あああああああああああああああああああああああああああああ"
  //   },
  //   costManageMenu: [
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: 'AAA工事'
  //         },
  //         {
  //           label: '中項目'
  //         },
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     },
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     },
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: '中項目'
  //         },
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     },
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     }
  //   ]
  // },
  // {
  //   id: 33,
  //   name: "CCCC工事",
  //   code: "工事コード１",
  //   zipcode:'1000013',
  //   prefecture:'東京',
  //   municipality:'大阪',
  //   address1:'住所1',
  //   address2: "住所2",
  //   structureRc: "RC",
  //   structureS: "大",
  //   structureSrc:"代",
  //   structureWooden: "議",
  //   groundFloor: 2,
  //   basementFloor: 3,
  //   siteArea: 3000,
  //   siteAreaInTsubo:30.2,
  //   buildingArea: 2000,
  //   buildingAreaInTsubo: 20.1,
  //   totalFloorArea: 2500,
  //   totalFloorAreaInTsubo: 25.1,
  //   commodity: "bla bal baa",
  //   construction_details: "あああ あ ああ あああ あああ ああ あああ あああ あああ ああああ ああああ あ ああ あああ あああ ああ あああ あああ あああ ああああ ああああ あ ああ あああ あああ ああ あああ あああ あああ ああああ あ",
  //   eastWestDivision: "大阪",
  //   newConstruction: "新築",
  //   scheduledStartDate: "2022/02/02",
  //   scheduledEndDate: "2023/02/02",
  //   estimatedDate:"2023/02/02",
  //   orderDate: "2023/02/02",
  //   contractDate: "2023/02/02",
  //   updatedDate: "2023/02/02",
  //   completionDate: "2023/02/02",
  //   assumedArtificial:"3.5",
  //   dr0: "2022/02/02",
  //   dr1: "2022/02/02",
  //   dr2: "2022/02/02",
  //   confirmCompletionDate: "2022/02/02",
  //   fireinspectionDate: "2023/02/03",
  //   brand: {
  //     id: 1,
  //     brand_name: "ブランド名1",
  //     brand_icon: "https://robohash.org/XM0.png?set=set1",
      
  //   },
  //   supplier: {
  //     id: 1,
  //     name: "〇〇株式会社１",
  //     image: "https://robohash.org/XM0.png?set=set1",
  //     email: "aaaaaa@co.jp"
  //   },
  //   company: {
  //     id: 1,
  //     name: "AAAA",
  //     branch: "横浜",
  //     address: {
  //       prefecture: "神奈川",
  //       city: "横浜",
  //       town: "豊岡"
  //     },
  //     phoneno: "080-1111-2222",
  //     description: "あああああああああああああああああああああああああああああ"
  //   },
  //   costManageMenu: [
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: 'AAA工事'
  //         },
  //         {
  //           label: '中項目'
  //         },
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     },
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     },
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: '中項目'
  //         },
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     },
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     }
  //   ]
  // },
  // {
  //   id: 34,
  //   name: "CCCC工事",
  //   code: "工事コード１",
  //   zipcode:'1000013',
  //   prefecture:'東京',
  //   municipality:'大阪',
  //   address1:'住所1',
  //   address2: "住所2",
  //   structureRc: "RC",
  //   structureS: "大",
  //   structureSrc:"代",
  //   structureWooden: "議",
  //   groundFloor: 2,
  //   basementFloor: 3,
  //   siteArea: 3000,
  //   siteAreaInTsubo:30.2,
  //   buildingArea: 2000,
  //   buildingAreaInTsubo: 20.1,
  //   totalFloorArea: 2500,
  //   totalFloorAreaInTsubo: 25.1,
  //   commodity: "bla bal baa",
  //   construction_details: "あああ あ ああ あああ あああ ああ あああ あああ あああ ああああ ああああ あ ああ あああ あああ ああ あああ あああ あああ ああああ ああああ あ ああ あああ あああ ああ あああ あああ あああ ああああ あ",
  //   eastWestDivision: "大阪",
  //   newConstruction: "新築",
  //   scheduledStartDate: "2022/02/02",
  //   scheduledEndDate: "2023/02/02",
  //   estimatedDate:"2023/02/02",
  //   orderDate: "2023/02/02",
  //   contractDate: "2023/02/02",
  //   updatedDate: "2023/02/02",
  //   completionDate: "2023/02/02",
  //   assumedArtificial:"3.5",
  //   dr0: "2022/02/02",
  //   dr1: "2022/02/02",
  //   dr2: "2022/02/02",
  //   confirmCompletionDate: "2022/02/02",
  //   fireinspectionDate: "2023/02/03",
  //   brand: {
  //     id: 1,
  //     brand_name: "ブランド名1",
  //     brand_icon: "https://robohash.org/XM0.png?set=set1",
      
  //   },
  //   supplier: {
  //     id: 1,
  //     name: "〇〇株式会社１",
  //     image: "https://robohash.org/XM0.png?set=set1",
  //     email: "aaaaaa@co.jp"
  //   },
  //   company: {
  //     id: 1,
  //     name: "AAAA",
  //     branch: "横浜",
  //     address: {
  //       prefecture: "神奈川",
  //       city: "横浜",
  //       town: "豊岡"
  //     },
  //     phoneno: "080-1111-2222",
  //     description: "あああああああああああああああああああああああああああああ"
  //   },
  //   costManageMenu: [
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: 'AAA工事'
  //         },
  //         {
  //           label: '中項目'
  //         },
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     },
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     },
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: '中項目'
  //         },
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     },
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     }
  //   ]
  // },
  // {
  //   id: 35,
  //   name: "CCCC工事",
  //   code: "工事コード１",
  //   zipcode:'1000013',
  //   prefecture:'東京',
  //   municipality:'大阪',
  //   address1:'住所1',
  //   address2: "住所2",
  //   structureRc: "RC",
  //   structureS: "大",
  //   structureSrc:"代",
  //   structureWooden: "議",
  //   groundFloor: 2,
  //   basementFloor: 3,
  //   siteArea: 3000,
  //   siteAreaInTsubo:30.2,
  //   buildingArea: 2000,
  //   buildingAreaInTsubo: 20.1,
  //   totalFloorArea: 2500,
  //   totalFloorAreaInTsubo: 25.1,
  //   commodity: "bla bal baa",
  //   construction_details: "あああ あ ああ あああ あああ ああ あああ あああ あああ ああああ ああああ あ ああ あああ あああ ああ あああ あああ あああ ああああ ああああ あ ああ あああ あああ ああ あああ あああ あああ ああああ あ",
  //   eastWestDivision: "大阪",
  //   newConstruction: "新築",
  //   scheduledStartDate: "2022/02/02",
  //   scheduledEndDate: "2023/02/02",
  //   estimatedDate:"2023/02/02",
  //   orderDate: "2023/02/02",
  //   contractDate: "2023/02/02",
  //   updatedDate: "2023/02/02",
  //   completionDate: "2023/02/02",
  //   assumedArtificial:"3.5",
  //   dr0: "2022/02/02",
  //   dr1: "2022/02/02",
  //   dr2: "2022/02/02",
  //   confirmCompletionDate: "2022/02/02",
  //   fireinspectionDate: "2023/02/03",
  //   brand: {
  //     id: 1,
  //     brand_name: "ブランド名1",
  //     brand_icon: "https://robohash.org/XM0.png?set=set1",
      
  //   },
  //   supplier: {
  //     id: 1,
  //     name: "〇〇株式会社１",
  //     image: "https://robohash.org/XM0.png?set=set1",
  //     email: "aaaaaa@co.jp"
  //   },
  //   company: {
  //     id: 1,
  //     name: "AAAA",
  //     branch: "横浜",
  //     address: {
  //       prefecture: "神奈川",
  //       city: "横浜",
  //       town: "豊岡"
  //     },
  //     phoneno: "080-1111-2222",
  //     description: "あああああああああああああああああああああああああああああ"
  //   },
  //   costManageMenu: [
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: 'AAA工事'
  //         },
  //         {
  //           label: '中項目'
  //         },
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     },
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     },
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: '中項目'
  //         },
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     },
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     }
  //   ]
  // },
  // {
  //   id: 36,
  //   name: "CCCC工事",
  //   code: "工事コード１",
  //   zipcode:'1000013',
  //   prefecture:'東京',
  //   municipality:'大阪',
  //   address1:'住所1',
  //   address2: "住所2",
  //   structureRc: "RC",
  //   structureS: "大",
  //   structureSrc:"代",
  //   structureWooden: "議",
  //   groundFloor: 2,
  //   basementFloor: 3,
  //   siteArea: 3000,
  //   siteAreaInTsubo:30.2,
  //   buildingArea: 2000,
  //   buildingAreaInTsubo: 20.1,
  //   totalFloorArea: 2500,
  //   totalFloorAreaInTsubo: 25.1,
  //   commodity: "bla bal baa",
  //   construction_details: "あああ あ ああ あああ あああ ああ あああ あああ あああ ああああ ああああ あ ああ あああ あああ ああ あああ あああ あああ ああああ ああああ あ ああ あああ あああ ああ あああ あああ あああ ああああ あ",
  //   eastWestDivision: "大阪",
  //   newConstruction: "新築",
  //   scheduledStartDate: "2022/02/02",
  //   scheduledEndDate: "2023/02/02",
  //   estimatedDate:"2023/02/02",
  //   orderDate: "2023/02/02",
  //   contractDate: "2023/02/02",
  //   updatedDate: "2023/02/02",
  //   completionDate: "2023/02/02",
  //   assumedArtificial:"3.5",
  //   dr0: "2022/02/02",
  //   dr1: "2022/02/02",
  //   dr2: "2022/02/02",
  //   confirmCompletionDate: "2022/02/02",
  //   fireinspectionDate: "2023/02/03",
  //   brand: {
  //     id: 1,
  //     brand_name: "ブランド名1",
  //     brand_icon: "https://robohash.org/XM0.png?set=set1",
      
  //   },
  //   supplier: {
  //     id: 1,
  //     name: "〇〇株式会社１",
  //     image: "https://robohash.org/XM0.png?set=set1",
  //     email: "aaaaaa@co.jp"
  //   },
  //   company: {
  //     id: 1,
  //     name: "AAAA",
  //     branch: "横浜",
  //     address: {
  //       prefecture: "神奈川",
  //       city: "横浜",
  //       town: "豊岡"
  //     },
  //     phoneno: "080-1111-2222",
  //     description: "あああああああああああああああああああああああああああああ"
  //   },
  //   costManageMenu: [
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: 'AAA工事'
  //         },
  //         {
  //           label: '中項目'
  //         },
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     },
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     },
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: '中項目'
  //         },
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     },
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     }
  //   ]
  // },
  // {
  //   id: 37,
  //   name: "CCCC工事",
  //   code: "工事コード１",
  //   zipcode:'1000013',
  //   prefecture:'東京',
  //   municipality:'大阪',
  //   address1:'住所1',
  //   address2: "住所2",
  //   structureRc: "RC",
  //   structureS: "大",
  //   structureSrc:"代",
  //   structureWooden: "議",
  //   groundFloor: 2,
  //   basementFloor: 3,
  //   siteArea: 3000,
  //   siteAreaInTsubo:30.2,
  //   buildingArea: 2000,
  //   buildingAreaInTsubo: 20.1,
  //   totalFloorArea: 2500,
  //   totalFloorAreaInTsubo: 25.1,
  //   commodity: "bla bal baa",
  //   construction_details: "あああ あ ああ あああ あああ ああ あああ あああ あああ ああああ ああああ あ ああ あああ あああ ああ あああ あああ あああ ああああ ああああ あ ああ あああ あああ ああ あああ あああ あああ ああああ あ",
  //   eastWestDivision: "大阪",
  //   newConstruction: "新築",
  //   scheduledStartDate: "2022/02/02",
  //   scheduledEndDate: "2023/02/02",
  //   estimatedDate:"2023/02/02",
  //   orderDate: "2023/02/02",
  //   contractDate: "2023/02/02",
  //   updatedDate: "2023/02/02",
  //   completionDate: "2023/02/02",
  //   assumedArtificial:"3.5",
  //   dr0: "2022/02/02",
  //   dr1: "2022/02/02",
  //   dr2: "2022/02/02",
  //   confirmCompletionDate: "2022/02/02",
  //   fireinspectionDate: "2023/02/03",
  //   brand: {
  //     id: 1,
  //     brand_name: "ブランド名1",
  //     brand_icon: "https://robohash.org/XM0.png?set=set1",
      
  //   },
  //   supplier: {
  //     id: 1,
  //     name: "〇〇株式会社１",
  //     image: "https://robohash.org/XM0.png?set=set1",
  //     email: "aaaaaa@co.jp"
  //   },
  //   company: {
  //     id: 1,
  //     name: "AAAA",
  //     branch: "横浜",
  //     address: {
  //       prefecture: "神奈川",
  //       city: "横浜",
  //       town: "豊岡"
  //     },
  //     phoneno: "080-1111-2222",
  //     description: "あああああああああああああああああああああああああああああ"
  //   },
  //   costManageMenu: [
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: 'AAA工事'
  //         },
  //         {
  //           label: '中項目'
  //         },
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     },
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     },
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: '中項目'
  //         },
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     },
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     }
  //   ]
  // },
  // {
  //   id: 38,
  //   name: "CCCC工事",
  //   code: "工事コード１",
  //   zipcode:'1000013',
  //   prefecture:'東京',
  //   municipality:'大阪',
  //   address1:'住所1',
  //   address2: "住所2",
  //   structureRc: "RC",
  //   structureS: "大",
  //   structureSrc:"代",
  //   structureWooden: "議",
  //   groundFloor: 2,
  //   basementFloor: 3,
  //   siteArea: 3000,
  //   siteAreaInTsubo:30.2,
  //   buildingArea: 2000,
  //   buildingAreaInTsubo: 20.1,
  //   totalFloorArea: 2500,
  //   totalFloorAreaInTsubo: 25.1,
  //   commodity: "bla bal baa",
  //   construction_details: "あああ あ ああ あああ あああ ああ あああ あああ あああ ああああ ああああ あ ああ あああ あああ ああ あああ あああ あああ ああああ ああああ あ ああ あああ あああ ああ あああ あああ あああ ああああ あ",
  //   eastWestDivision: "大阪",
  //   newConstruction: "新築",
  //   scheduledStartDate: "2022/02/02",
  //   scheduledEndDate: "2023/02/02",
  //   estimatedDate:"2023/02/02",
  //   orderDate: "2023/02/02",
  //   contractDate: "2023/02/02",
  //   updatedDate: "2023/02/02",
  //   completionDate: "2023/02/02",
  //   assumedArtificial:"3.5",
  //   dr0: "2022/02/02",
  //   dr1: "2022/02/02",
  //   dr2: "2022/02/02",
  //   confirmCompletionDate: "2022/02/02",
  //   fireinspectionDate: "2023/02/03",
  //   brand: {
  //     id: 1,
  //     brand_name: "ブランド名1",
  //     brand_icon: "https://robohash.org/XM0.png?set=set1",
      
  //   },
  //   supplier: {
  //     id: 1,
  //     name: "〇〇株式会社１",
  //     image: "https://robohash.org/XM0.png?set=set1",
  //     email: "aaaaaa@co.jp"
  //   },
  //   company: {
  //     id: 1,
  //     name: "AAAA",
  //     branch: "横浜",
  //     address: {
  //       prefecture: "神奈川",
  //       city: "横浜",
  //       town: "豊岡"
  //     },
  //     phoneno: "080-1111-2222",
  //     description: "あああああああああああああああああああああああああああああ"
  //   },
  //   costManageMenu: [
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: 'AAA工事'
  //         },
  //         {
  //           label: '中項目'
  //         },
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     },
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     },
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: '中項目'
  //         },
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     },
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     }
  //   ]
  // },
  // {
  //   id: 39,
  //   name: "CCCC工事",
  //   code: "工事コード１",
  //   zipcode:'1000013',
  //   prefecture:'東京',
  //   municipality:'大阪',
  //   address1:'住所1',
  //   address2: "住所2",
  //   structureRc: "RC",
  //   structureS: "大",
  //   structureSrc:"代",
  //   structureWooden: "議",
  //   groundFloor: 2,
  //   basementFloor: 3,
  //   siteArea: 3000,
  //   siteAreaInTsubo:30.2,
  //   buildingArea: 2000,
  //   buildingAreaInTsubo: 20.1,
  //   totalFloorArea: 2500,
  //   totalFloorAreaInTsubo: 25.1,
  //   commodity: "bla bal baa",
  //   construction_details: "あああ あ ああ あああ あああ ああ あああ あああ あああ ああああ ああああ あ ああ あああ あああ ああ あああ あああ あああ ああああ ああああ あ ああ あああ あああ ああ あああ あああ あああ ああああ あ",
  //   eastWestDivision: "大阪",
  //   newConstruction: "新築",
  //   scheduledStartDate: "2022/02/02",
  //   scheduledEndDate: "2023/02/02",
  //   estimatedDate:"2023/02/02",
  //   orderDate: "2023/02/02",
  //   contractDate: "2023/02/02",
  //   updatedDate: "2023/02/02",
  //   completionDate: "2023/02/02",
  //   assumedArtificial:"3.5",
  //   dr0: "2022/02/02",
  //   dr1: "2022/02/02",
  //   dr2: "2022/02/02",
  //   confirmCompletionDate: "2022/02/02",
  //   fireinspectionDate: "2023/02/03",
  //   brand: {
  //     id: 1,
  //     brand_name: "ブランド名1",
  //     brand_icon: "https://robohash.org/XM0.png?set=set1",
      
  //   },
  //   supplier: {
  //     id: 1,
  //     name: "〇〇株式会社１",
  //     image: "https://robohash.org/XM0.png?set=set1",
  //     email: "aaaaaa@co.jp"
  //   },
  //   company: {
  //     id: 1,
  //     name: "AAAA",
  //     branch: "横浜",
  //     address: {
  //       prefecture: "神奈川",
  //       city: "横浜",
  //       town: "豊岡"
  //     },
  //     phoneno: "080-1111-2222",
  //     description: "あああああああああああああああああああああああああああああ"
  //   },
  //   costManageMenu: [
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: 'AAA工事'
  //         },
  //         {
  //           label: '中項目'
  //         },
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     },
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     },
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: '中項目'
  //         },
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     },
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     }
  //   ]
  // },
  // {
  //   id: 40,
  //   name: "CCCC工事",
  //   code: "工事コード１",
  //   zipcode:'1000013',
  //   prefecture:'東京',
  //   municipality:'大阪',
  //   address1:'住所1',
  //   address2: "住所2",
  //   structureRc: "RC",
  //   structureS: "大",
  //   structureSrc:"代",
  //   structureWooden: "議",
  //   groundFloor: 2,
  //   basementFloor: 3,
  //   siteArea: 3000,
  //   siteAreaInTsubo:30.2,
  //   buildingArea: 2000,
  //   buildingAreaInTsubo: 20.1,
  //   totalFloorArea: 2500,
  //   totalFloorAreaInTsubo: 25.1,
  //   commodity: "bla bal baa",
  //   construction_details: "あああ あ ああ あああ あああ ああ あああ あああ あああ ああああ ああああ あ ああ あああ あああ ああ あああ あああ あああ ああああ ああああ あ ああ あああ あああ ああ あああ あああ あああ ああああ あ",
  //   eastWestDivision: "大阪",
  //   newConstruction: "新築",
  //   scheduledStartDate: "2022/02/02",
  //   scheduledEndDate: "2023/02/02",
  //   estimatedDate:"2023/02/02",
  //   orderDate: "2023/02/02",
  //   contractDate: "2023/02/02",
  //   updatedDate: "2023/02/02",
  //   completionDate: "2023/02/02",
  //   assumedArtificial:"3.5",
  //   dr0: "2022/02/02",
  //   dr1: "2022/02/02",
  //   dr2: "2022/02/02",
  //   confirmCompletionDate: "2022/02/02",
  //   fireinspectionDate: "2023/02/03",
  //   brand: {
  //     id: 1,
  //     brand_name: "ブランド名1",
  //     brand_icon: "https://robohash.org/XM0.png?set=set1",
      
  //   },
  //   supplier: {
  //     id: 1,
  //     name: "〇〇株式会社１",
  //     image: "https://robohash.org/XM0.png?set=set1",
  //     email: "aaaaaa@co.jp"
  //   },
  //   company: {
  //     id: 1,
  //     name: "AAAA",
  //     branch: "横浜",
  //     address: {
  //       prefecture: "神奈川",
  //       city: "横浜",
  //       town: "豊岡"
  //     },
  //     phoneno: "080-1111-2222",
  //     description: "あああああああああああああああああああああああああああああ"
  //   },
  //   costManageMenu: [
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: 'AAA工事'
  //         },
  //         {
  //           label: '中項目'
  //         },
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     },
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     },
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: '中項目'
  //         },
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     },
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     }
  //   ]
  // },
  // {
  //   id: 41,
  //   name: "CCCC工事",
  //   code: "工事コード１",
  //   zipcode:'1000013',
  //   prefecture:'東京',
  //   municipality:'大阪',
  //   address1:'住所1',
  //   address2: "住所2",
  //   structureRc: "RC",
  //   structureS: "大",
  //   structureSrc:"代",
  //   structureWooden: "議",
  //   groundFloor: 2,
  //   basementFloor: 3,
  //   siteArea: 3000,
  //   siteAreaInTsubo:30.2,
  //   buildingArea: 2000,
  //   buildingAreaInTsubo: 20.1,
  //   totalFloorArea: 2500,
  //   totalFloorAreaInTsubo: 25.1,
  //   commodity: "bla bal baa",
  //   construction_details: "あああ あ ああ あああ あああ ああ あああ あああ あああ ああああ ああああ あ ああ あああ あああ ああ あああ あああ あああ ああああ ああああ あ ああ あああ あああ ああ あああ あああ あああ ああああ あ",
  //   eastWestDivision: "大阪",
  //   newConstruction: "新築",
  //   scheduledStartDate: "2022/02/02",
  //   scheduledEndDate: "2023/02/02",
  //   estimatedDate:"2023/02/02",
  //   orderDate: "2023/02/02",
  //   contractDate: "2023/02/02",
  //   updatedDate: "2023/02/02",
  //   completionDate: "2023/02/02",
  //   assumedArtificial:"3.5",
  //   dr0: "2022/02/02",
  //   dr1: "2022/02/02",
  //   dr2: "2022/02/02",
  //   confirmCompletionDate: "2022/02/02",
  //   fireinspectionDate: "2023/02/03",
  //   brand: {
  //     id: 1,
  //     brand_name: "ブランド名1",
  //     brand_icon: "https://robohash.org/XM0.png?set=set1",
      
  //   },
  //   supplier: {
  //     id: 1,
  //     name: "〇〇株式会社１",
  //     image: "https://robohash.org/XM0.png?set=set1",
  //     email: "aaaaaa@co.jp"
  //   },
  //   company: {
  //     id: 1,
  //     name: "AAAA",
  //     branch: "横浜",
  //     address: {
  //       prefecture: "神奈川",
  //       city: "横浜",
  //       town: "豊岡"
  //     },
  //     phoneno: "080-1111-2222",
  //     description: "あああああああああああああああああああああああああああああ"
  //   },
  //   costManageMenu: [
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: 'AAA工事'
  //         },
  //         {
  //           label: '中項目'
  //         },
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     },
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     },
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: '中項目'
  //         },
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     },
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     }
  //   ]
  // },
  // {
  //   id: 42,
  //   name: "CCCC工事",
  //   code: "工事コード１",
  //   zipcode:'1000013',
  //   prefecture:'東京',
  //   municipality:'大阪',
  //   address1:'住所1',
  //   address2: "住所2",
  //   structureRc: "RC",
  //   structureS: "大",
  //   structureSrc:"代",
  //   structureWooden: "議",
  //   groundFloor: 2,
  //   basementFloor: 3,
  //   siteArea: 3000,
  //   siteAreaInTsubo:30.2,
  //   buildingArea: 2000,
  //   buildingAreaInTsubo: 20.1,
  //   totalFloorArea: 2500,
  //   totalFloorAreaInTsubo: 25.1,
  //   commodity: "bla bal baa",
  //   construction_details: "あああ あ ああ あああ あああ ああ あああ あああ あああ ああああ ああああ あ ああ あああ あああ ああ あああ あああ あああ ああああ ああああ あ ああ あああ あああ ああ あああ あああ あああ ああああ あ",
  //   eastWestDivision: "大阪",
  //   newConstruction: "新築",
  //   scheduledStartDate: "2022/02/02",
  //   scheduledEndDate: "2023/02/02",
  //   estimatedDate:"2023/02/02",
  //   orderDate: "2023/02/02",
  //   contractDate: "2023/02/02",
  //   updatedDate: "2023/02/02",
  //   completionDate: "2023/02/02",
  //   assumedArtificial:"3.5",
  //   dr0: "2022/02/02",
  //   dr1: "2022/02/02",
  //   dr2: "2022/02/02",
  //   confirmCompletionDate: "2022/02/02",
  //   fireinspectionDate: "2023/02/03",
  //   brand: {
  //     id: 1,
  //     brand_name: "ブランド名1",
  //     brand_icon: "https://robohash.org/XM0.png?set=set1",
      
  //   },
  //   supplier: {
  //     id: 1,
  //     name: "〇〇株式会社１",
  //     image: "https://robohash.org/XM0.png?set=set1",
  //     email: "aaaaaa@co.jp"
  //   },
  //   company: {
  //     id: 1,
  //     name: "AAAA",
  //     branch: "横浜",
  //     address: {
  //       prefecture: "神奈川",
  //       city: "横浜",
  //       town: "豊岡"
  //     },
  //     phoneno: "080-1111-2222",
  //     description: "あああああああああああああああああああああああああああああ"
  //   },
  //   costManageMenu: [
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: 'AAA工事'
  //         },
  //         {
  //           label: '中項目'
  //         },
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     },
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     },
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: '中項目'
  //         },
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     },
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     }
  //   ]
  // },
  // {
  //   id: 43,
  //   name: "CCCC工事",
  //   code: "工事コード１",
  //   zipcode:'1000013',
  //   prefecture:'東京',
  //   municipality:'大阪',
  //   address1:'住所1',
  //   address2: "住所2",
  //   structureRc: "RC",
  //   structureS: "大",
  //   structureSrc:"代",
  //   structureWooden: "議",
  //   groundFloor: 2,
  //   basementFloor: 3,
  //   siteArea: 3000,
  //   siteAreaInTsubo:30.2,
  //   buildingArea: 2000,
  //   buildingAreaInTsubo: 20.1,
  //   totalFloorArea: 2500,
  //   totalFloorAreaInTsubo: 25.1,
  //   commodity: "bla bal baa",
  //   construction_details: "あああ あ ああ あああ あああ ああ あああ あああ あああ ああああ ああああ あ ああ あああ あああ ああ あああ あああ あああ ああああ ああああ あ ああ あああ あああ ああ あああ あああ あああ ああああ あ",
  //   eastWestDivision: "大阪",
  //   newConstruction: "新築",
  //   scheduledStartDate: "2022/02/02",
  //   scheduledEndDate: "2023/02/02",
  //   estimatedDate:"2023/02/02",
  //   orderDate: "2023/02/02",
  //   contractDate: "2023/02/02",
  //   updatedDate: "2023/02/02",
  //   completionDate: "2023/02/02",
  //   assumedArtificial:"3.5",
  //   dr0: "2022/02/02",
  //   dr1: "2022/02/02",
  //   dr2: "2022/02/02",
  //   confirmCompletionDate: "2022/02/02",
  //   fireinspectionDate: "2023/02/03",
  //   brand: {
  //     id: 1,
  //     brand_name: "ブランド名1",
  //     brand_icon: "https://robohash.org/XM0.png?set=set1",
      
  //   },
  //   supplier: {
  //     id: 1,
  //     name: "〇〇株式会社１",
  //     image: "https://robohash.org/XM0.png?set=set1",
  //     email: "aaaaaa@co.jp"
  //   },
  //   company: {
  //     id: 1,
  //     name: "AAAA",
  //     branch: "横浜",
  //     address: {
  //       prefecture: "神奈川",
  //       city: "横浜",
  //       town: "豊岡"
  //     },
  //     phoneno: "080-1111-2222",
  //     description: "あああああああああああああああああああああああああああああ"
  //   },
  //   costManageMenu: [
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: 'AAA工事'
  //         },
  //         {
  //           label: '中項目'
  //         },
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     },
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     },
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: '中項目'
  //         },
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     },
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     }
  //   ]
  // },
  // {
  //   id: 44,
  //   name: "CCCC工事",
  //   code: "工事コード１",
  //   zipcode:'1000013',
  //   prefecture:'東京',
  //   municipality:'大阪',
  //   address1:'住所1',
  //   address2: "住所2",
  //   structureRc: "RC",
  //   structureS: "大",
  //   structureSrc:"代",
  //   structureWooden: "議",
  //   groundFloor: 2,
  //   basementFloor: 3,
  //   siteArea: 3000,
  //   siteAreaInTsubo:30.2,
  //   buildingArea: 2000,
  //   buildingAreaInTsubo: 20.1,
  //   totalFloorArea: 2500,
  //   totalFloorAreaInTsubo: 25.1,
  //   commodity: "bla bal baa",
  //   construction_details: "あああ あ ああ あああ あああ ああ あああ あああ あああ ああああ ああああ あ ああ あああ あああ ああ あああ あああ あああ ああああ ああああ あ ああ あああ あああ ああ あああ あああ あああ ああああ あ",
  //   eastWestDivision: "大阪",
  //   newConstruction: "新築",
  //   scheduledStartDate: "2022/02/02",
  //   scheduledEndDate: "2023/02/02",
  //   estimatedDate:"2023/02/02",
  //   orderDate: "2023/02/02",
  //   contractDate: "2023/02/02",
  //   updatedDate: "2023/02/02",
  //   completionDate: "2023/02/02",
  //   assumedArtificial:"3.5",
  //   dr0: "2022/02/02",
  //   dr1: "2022/02/02",
  //   dr2: "2022/02/02",
  //   confirmCompletionDate: "2022/02/02",
  //   fireinspectionDate: "2023/02/03",
  //   brand: {
  //     id: 1,
  //     brand_name: "ブランド名1",
  //     brand_icon: "https://robohash.org/XM0.png?set=set1",
      
  //   },
  //   supplier: {
  //     id: 1,
  //     name: "〇〇株式会社１",
  //     image: "https://robohash.org/XM0.png?set=set1",
  //     email: "aaaaaa@co.jp"
  //   },
  //   company: {
  //     id: 1,
  //     name: "AAAA",
  //     branch: "横浜",
  //     address: {
  //       prefecture: "神奈川",
  //       city: "横浜",
  //       town: "豊岡"
  //     },
  //     phoneno: "080-1111-2222",
  //     description: "あああああああああああああああああああああああああああああ"
  //   },
  //   costManageMenu: [
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: 'AAA工事'
  //         },
  //         {
  //           label: '中項目'
  //         },
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     },
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     },
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: '中項目'
  //         },
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     },
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     }
  //   ]
  // },
  // {
  //   id: 45,
  //   name: "CCCC工事",
  //   code: "工事コード１",
  //   zipcode:'1000013',
  //   prefecture:'東京',
  //   municipality:'大阪',
  //   address1:'住所1',
  //   address2: "住所2",
  //   structureRc: "RC",
  //   structureS: "大",
  //   structureSrc:"代",
  //   structureWooden: "議",
  //   groundFloor: 2,
  //   basementFloor: 3,
  //   siteArea: 3000,
  //   siteAreaInTsubo:30.2,
  //   buildingArea: 2000,
  //   buildingAreaInTsubo: 20.1,
  //   totalFloorArea: 2500,
  //   totalFloorAreaInTsubo: 25.1,
  //   commodity: "bla bal baa",
  //   construction_details: "あああ あ ああ あああ あああ ああ あああ あああ あああ ああああ ああああ あ ああ あああ あああ ああ あああ あああ あああ ああああ ああああ あ ああ あああ あああ ああ あああ あああ あああ ああああ あ",
  //   eastWestDivision: "大阪",
  //   newConstruction: "新築",
  //   scheduledStartDate: "2022/02/02",
  //   scheduledEndDate: "2023/02/02",
  //   estimatedDate:"2023/02/02",
  //   orderDate: "2023/02/02",
  //   contractDate: "2023/02/02",
  //   updatedDate: "2023/02/02",
  //   completionDate: "2023/02/02",
  //   assumedArtificial:"3.5",
  //   dr0: "2022/02/02",
  //   dr1: "2022/02/02",
  //   dr2: "2022/02/02",
  //   confirmCompletionDate: "2022/02/02",
  //   fireinspectionDate: "2023/02/03",
  //   brand: {
  //     id: 1,
  //     brand_name: "ブランド名1",
  //     brand_icon: "https://robohash.org/XM0.png?set=set1",
      
  //   },
  //   supplier: {
  //     id: 1,
  //     name: "〇〇株式会社１",
  //     image: "https://robohash.org/XM0.png?set=set1",
  //     email: "aaaaaa@co.jp"
  //   },
  //   company: {
  //     id: 1,
  //     name: "AAAA",
  //     branch: "横浜",
  //     address: {
  //       prefecture: "神奈川",
  //       city: "横浜",
  //       town: "豊岡"
  //     },
  //     phoneno: "080-1111-2222",
  //     description: "あああああああああああああああああああああああああああああ"
  //   },
  //   costManageMenu: [
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: 'AAA工事'
  //         },
  //         {
  //           label: '中項目'
  //         },
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     },
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     },
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: '中項目'
  //         },
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     },
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     }
  //   ]
  // },
  // {
  //   id: 46,
  //   name: "CCCC工事",
  //   code: "工事コード１",
  //   zipcode:'1000013',
  //   prefecture:'東京',
  //   municipality:'大阪',
  //   address1:'住所1',
  //   address2: "住所2",
  //   structureRc: "RC",
  //   structureS: "大",
  //   structureSrc:"代",
  //   structureWooden: "議",
  //   groundFloor: 2,
  //   basementFloor: 3,
  //   siteArea: 3000,
  //   siteAreaInTsubo:30.2,
  //   buildingArea: 2000,
  //   buildingAreaInTsubo: 20.1,
  //   totalFloorArea: 2500,
  //   totalFloorAreaInTsubo: 25.1,
  //   commodity: "bla bal baa",
  //   construction_details: "あああ あ ああ あああ あああ ああ あああ あああ あああ ああああ ああああ あ ああ あああ あああ ああ あああ あああ あああ ああああ ああああ あ ああ あああ あああ ああ あああ あああ あああ ああああ あ",
  //   eastWestDivision: "大阪",
  //   newConstruction: "新築",
  //   scheduledStartDate: "2022/02/02",
  //   scheduledEndDate: "2023/02/02",
  //   estimatedDate:"2023/02/02",
  //   orderDate: "2023/02/02",
  //   contractDate: "2023/02/02",
  //   updatedDate: "2023/02/02",
  //   completionDate: "2023/02/02",
  //   assumedArtificial:"3.5",
  //   dr0: "2022/02/02",
  //   dr1: "2022/02/02",
  //   dr2: "2022/02/02",
  //   confirmCompletionDate: "2022/02/02",
  //   fireinspectionDate: "2023/02/03",
  //   brand: {
  //     id: 1,
  //     brand_name: "ブランド名1",
  //     brand_icon: "https://robohash.org/XM0.png?set=set1",
      
  //   },
  //   supplier: {
  //     id: 1,
  //     name: "〇〇株式会社１",
  //     image: "https://robohash.org/XM0.png?set=set1",
  //     email: "aaaaaa@co.jp"
  //   },
  //   company: {
  //     id: 1,
  //     name: "AAAA",
  //     branch: "横浜",
  //     address: {
  //       prefecture: "神奈川",
  //       city: "横浜",
  //       town: "豊岡"
  //     },
  //     phoneno: "080-1111-2222",
  //     description: "あああああああああああああああああああああああああああああ"
  //   },
  //   costManageMenu: [
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: 'AAA工事'
  //         },
  //         {
  //           label: '中項目'
  //         },
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     },
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     },
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: '中項目'
  //         },
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     },
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     }
  //   ]
  // },
  // {
  //   id: 47,
  //   name: "CCCC工事",
  //   code: "工事コード１",
  //   zipcode:'1000013',
  //   prefecture:'東京',
  //   municipality:'大阪',
  //   address1:'住所1',
  //   address2: "住所2",
  //   structureRc: "RC",
  //   structureS: "大",
  //   structureSrc:"代",
  //   structureWooden: "議",
  //   groundFloor: 2,
  //   basementFloor: 3,
  //   siteArea: 3000,
  //   siteAreaInTsubo:30.2,
  //   buildingArea: 2000,
  //   buildingAreaInTsubo: 20.1,
  //   totalFloorArea: 2500,
  //   totalFloorAreaInTsubo: 25.1,
  //   commodity: "bla bal baa",
  //   construction_details: "あああ あ ああ あああ あああ ああ あああ あああ あああ ああああ ああああ あ ああ あああ あああ ああ あああ あああ あああ ああああ ああああ あ ああ あああ あああ ああ あああ あああ あああ ああああ あ",
  //   eastWestDivision: "大阪",
  //   newConstruction: "新築",
  //   scheduledStartDate: "2022/02/02",
  //   scheduledEndDate: "2023/02/02",
  //   estimatedDate:"2023/02/02",
  //   orderDate: "2023/02/02",
  //   contractDate: "2023/02/02",
  //   updatedDate: "2023/02/02",
  //   completionDate: "2023/02/02",
  //   assumedArtificial:"3.5",
  //   dr0: "2022/02/02",
  //   dr1: "2022/02/02",
  //   dr2: "2022/02/02",
  //   confirmCompletionDate: "2022/02/02",
  //   fireinspectionDate: "2023/02/03",
  //   brand: {
  //     id: 1,
  //     brand_name: "ブランド名1",
  //     brand_icon: "https://robohash.org/XM0.png?set=set1",
      
  //   },
  //   supplier: {
  //     id: 1,
  //     name: "〇〇株式会社１",
  //     image: "https://robohash.org/XM0.png?set=set1",
  //     email: "aaaaaa@co.jp"
  //   },
  //   company: {
  //     id: 1,
  //     name: "AAAA",
  //     branch: "横浜",
  //     address: {
  //       prefecture: "神奈川",
  //       city: "横浜",
  //       town: "豊岡"
  //     },
  //     phoneno: "080-1111-2222",
  //     description: "あああああああああああああああああああああああああああああ"
  //   },
  //   costManageMenu: [
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: 'AAA工事'
  //         },
  //         {
  //           label: '中項目'
  //         },
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     },
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     },
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: '中項目'
  //         },
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     },
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     }
  //   ]
  // },
  // {
  //   id: 48,
  //   name: "CCCC工事",
  //   code: "工事コード１",
  //   zipcode:'1000013',
  //   prefecture:'東京',
  //   municipality:'大阪',
  //   address1:'住所1',
  //   address2: "住所2",
  //   structureRc: "RC",
  //   structureS: "大",
  //   structureSrc:"代",
  //   structureWooden: "議",
  //   groundFloor: 2,
  //   basementFloor: 3,
  //   siteArea: 3000,
  //   siteAreaInTsubo:30.2,
  //   buildingArea: 2000,
  //   buildingAreaInTsubo: 20.1,
  //   totalFloorArea: 2500,
  //   totalFloorAreaInTsubo: 25.1,
  //   commodity: "bla bal baa",
  //   construction_details: "あああ あ ああ あああ あああ ああ あああ あああ あああ ああああ ああああ あ ああ あああ あああ ああ あああ あああ あああ ああああ ああああ あ ああ あああ あああ ああ あああ あああ あああ ああああ あ",
  //   eastWestDivision: "大阪",
  //   newConstruction: "新築",
  //   scheduledStartDate: "2022/02/02",
  //   scheduledEndDate: "2023/02/02",
  //   estimatedDate:"2023/02/02",
  //   orderDate: "2023/02/02",
  //   contractDate: "2023/02/02",
  //   updatedDate: "2023/02/02",
  //   completionDate: "2023/02/02",
  //   assumedArtificial:"3.5",
  //   dr0: "2022/02/02",
  //   dr1: "2022/02/02",
  //   dr2: "2022/02/02",
  //   confirmCompletionDate: "2022/02/02",
  //   fireinspectionDate: "2023/02/03",
  //   brand: {
  //     id: 1,
  //     brand_name: "ブランド名1",
  //     brand_icon: "https://robohash.org/XM0.png?set=set1",
      
  //   },
  //   supplier: {
  //     id: 1,
  //     name: "〇〇株式会社１",
  //     image: "https://robohash.org/XM0.png?set=set1",
  //     email: "aaaaaa@co.jp"
  //   },
  //   company: {
  //     id: 1,
  //     name: "AAAA",
  //     branch: "横浜",
  //     address: {
  //       prefecture: "神奈川",
  //       city: "横浜",
  //       town: "豊岡"
  //     },
  //     phoneno: "080-1111-2222",
  //     description: "あああああああああああああああああああああああああああああ"
  //   },
  //   costManageMenu: [
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: 'AAA工事'
  //         },
  //         {
  //           label: '中項目'
  //         },
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     },
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     },
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: '中項目'
  //         },
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     },
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     }
  //   ]
  // },
  // {
  //   id: 49,
  //   name: "CCCC工事",
  //   code: "工事コード１",
  //   zipcode:'1000013',
  //   prefecture:'東京',
  //   municipality:'大阪',
  //   address1:'住所1',
  //   address2: "住所2",
  //   structureRc: "RC",
  //   structureS: "大",
  //   structureSrc:"代",
  //   structureWooden: "議",
  //   groundFloor: 2,
  //   basementFloor: 3,
  //   siteArea: 3000,
  //   siteAreaInTsubo:30.2,
  //   buildingArea: 2000,
  //   buildingAreaInTsubo: 20.1,
  //   totalFloorArea: 2500,
  //   totalFloorAreaInTsubo: 25.1,
  //   commodity: "bla bal baa",
  //   construction_details: "あああ あ ああ あああ あああ ああ あああ あああ あああ ああああ ああああ あ ああ あああ あああ ああ あああ あああ あああ ああああ ああああ あ ああ あああ あああ ああ あああ あああ あああ ああああ あ",
  //   eastWestDivision: "大阪",
  //   newConstruction: "新築",
  //   scheduledStartDate: "2022/02/02",
  //   scheduledEndDate: "2023/02/02",
  //   estimatedDate:"2023/02/02",
  //   orderDate: "2023/02/02",
  //   contractDate: "2023/02/02",
  //   updatedDate: "2023/02/02",
  //   completionDate: "2023/02/02",
  //   assumedArtificial:"3.5",
  //   dr0: "2022/02/02",
  //   dr1: "2022/02/02",
  //   dr2: "2022/02/02",
  //   confirmCompletionDate: "2022/02/02",
  //   fireinspectionDate: "2023/02/03",
  //   brand: {
  //     id: 1,
  //     brand_name: "ブランド名1",
  //     brand_icon: "https://robohash.org/XM0.png?set=set1",
      
  //   },
  //   supplier: {
  //     id: 1,
  //     name: "〇〇株式会社１",
  //     image: "https://robohash.org/XM0.png?set=set1",
  //     email: "aaaaaa@co.jp"
  //   },
  //   company: {
  //     id: 1,
  //     name: "AAAA",
  //     branch: "横浜",
  //     address: {
  //       prefecture: "神奈川",
  //       city: "横浜",
  //       town: "豊岡"
  //     },
  //     phoneno: "080-1111-2222",
  //     description: "あああああああああああああああああああああああああああああ"
  //   },
  //   costManageMenu: [
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: 'AAA工事'
  //         },
  //         {
  //           label: '中項目'
  //         },
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     },
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     },
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: '中項目'
  //         },
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     },
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     }
  //   ]
  // },
  // {
  //   id: 50,
  //   name: "CCCC工事",
  //   code: "工事コード１",
  //   zipcode:'1000013',
  //   prefecture:'東京',
  //   municipality:'大阪',
  //   address1:'住所1',
  //   address2: "住所2",
  //   structureRc: "RC",
  //   structureS: "大",
  //   structureSrc:"代",
  //   structureWooden: "議",
  //   groundFloor: 2,
  //   basementFloor: 3,
  //   siteArea: 3000,
  //   siteAreaInTsubo:30.2,
  //   buildingArea: 2000,
  //   buildingAreaInTsubo: 20.1,
  //   totalFloorArea: 2500,
  //   totalFloorAreaInTsubo: 25.1,
  //   commodity: "bla bal baa",
  //   construction_details: "あああ あ ああ あああ あああ ああ あああ あああ あああ ああああ ああああ あ ああ あああ あああ ああ あああ あああ あああ ああああ ああああ あ ああ あああ あああ ああ あああ あああ あああ ああああ あ",
  //   eastWestDivision: "大阪",
  //   newConstruction: "新築",
  //   scheduledStartDate: "2022/02/02",
  //   scheduledEndDate: "2023/02/02",
  //   estimatedDate:"2023/02/02",
  //   orderDate: "2023/02/02",
  //   contractDate: "2023/02/02",
  //   updatedDate: "2023/02/02",
  //   completionDate: "2023/02/02",
  //   assumedArtificial:"3.5",
  //   dr0: "2022/02/02",
  //   dr1: "2022/02/02",
  //   dr2: "2022/02/02",
  //   confirmCompletionDate: "2022/02/02",
  //   fireinspectionDate: "2023/02/03",
  //   brand: {
  //     id: 1,
  //     brand_name: "ブランド名1",
  //     brand_icon: "https://robohash.org/XM0.png?set=set1",
      
  //   },
  //   supplier: {
  //     id: 1,
  //     name: "〇〇株式会社１",
  //     image: "https://robohash.org/XM0.png?set=set1",
  //     email: "aaaaaa@co.jp"
  //   },
  //   company: {
  //     id: 1,
  //     name: "AAAA",
  //     branch: "横浜",
  //     address: {
  //       prefecture: "神奈川",
  //       city: "横浜",
  //       town: "豊岡"
  //     },
  //     phoneno: "080-1111-2222",
  //     description: "あああああああああああああああああああああああああああああ"
  //   },
  //   costManageMenu: [
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: 'AAA工事'
  //         },
  //         {
  //           label: '中項目'
  //         },
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     },
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     },
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: '中項目'
  //         },
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     },
  //     {
  //       label: '大項目',
  //       middleItems: [
  //         {
  //           label: '中項目'
  //         }
  //       ]
  //     }
  //   ]
  // },
]

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<TypeConstruction[]>
) {
  res.status(200).json(CONSTRUCTION_LIST)
}
