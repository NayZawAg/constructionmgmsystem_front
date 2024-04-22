/* eslint @typescript-eslint/no-explicit-any: 0 */
import dayjs from 'dayjs';
import { BUSINESS_FORM_TYPE } from './constants/common';
import type { SelectItemType } from '@/types/common';

/**
 * 対象データをDropdown用のitemに書き換える
 * @param {any} data 書き換え対象データ
 * @param {string} labelName selectBoxのlabelにしたいvalueのkey
 * @param {string} valueName selectBoxのvalueにしたいvalueのkey
 * @returns {SelectItemType[]}
 */
export const convertDataToDropDownItems = <T extends object>(
  data: T[],
  labelName: keyof T,
  valueName: keyof T,
): SelectItemType[] => {
  const dropDownItems: any[] = [];
  data?.map((item: T) => {
    dropDownItems.push({
      label: item[labelName],
      value: item[valueName],
    });
  });
  return dropDownItems;
};

/**
 * 配列からDropdown用のitemを作成
 * @param {any[]} data 1次元配列データ
 * @returns {SelectItemType[]}
 */
export const convertDataToDropDownItemsFromList = (
  data: any[],
): SelectItemType[] => {
  return data.map((item) => {
    return { label: item, value: item };
  });
};

const START_YEAR = 1980;
/**
 * 年選択肢
 * @param {number|null} startYear 開始年 - default 1980
 * @param {number|null} endYear 終了年 - default 今年
 * @returns {SelectItemType[]}
 */
export const yearSelect = (startYear?: number, endYear?: number) => {
  const end = endYear || dayjs().get('year');
  const list: SelectItemType[] = [];
  for (let i = startYear || START_YEAR; i <= end; i++) {
    const str = i.toString();
    list.push({ value: str, label: str });
  }
  return list;
};

/**
 * 案件フロー
 */
export const ProjectStatus: SelectItemType[] = [
  // 着工前
  { label: '依頼受付', value: 'RECEPTION' },
  { label: '見積もり作成前', value: 'BEFORE_QUOTATION' },
  { label: '契約前', value: 'BEFORE_CONTRUCT' },
  { label: '着工前', value: 'BEFORE_CONSTRUCTION' },
  // 着工中
  { label: '着工中', value: 'IN_PROGRESS_CONSTRUCTION' },
  // 完工後
  { label: '完工', value: 'COMPLETE_CONSTRUCTION' },
  // 終了
  { label: '精算完了', value: 'PAYMENT_COMPLETED' },
  { label: '失注', value: 'FAILURE' },
];

/**
 * 性別
 */
export const GenderSelectItems: SelectItemType[] = [
  { label: '男性', value: 'MALE' },
  { label: '女性', value: 'FEMALE' },
];
export const BrandLists: SelectItemType[] = [
  {
    label: 'Option1',
    value: '1',
  },
  {
    label: 'Option2',
    value: '2',
  },
  {
    label: 'Option3',
    value: '3',
  },
  {
    label: 'Option4',
    value: '4',
  },
  {
    label: 'Option5',
    value: '5',
  },
];

/**
 * 区分
 */
export const BusinessFormType: SelectItemType[] = [
  { label: '個人', value: BUSINESS_FORM_TYPE.SOLO },
  { label: '法人', value: BUSINESS_FORM_TYPE.CORPORATE },
];

/**
 * 間取り
 */
export const RoomLayoutItems: SelectItemType[] = [
  { label: 'ワンルーム', value: 'ONE_DK' },
  { label: '1K', value: 'ONE_K' },
  { label: '1DK', value: 'ONE_ROOM' },
  { label: '1LDK', value: 'ONE_LDK' },
  { label: '2K', value: 'TWO_K' },
  { label: '2DK', value: 'TWO_DK' },
  { label: '2LDK', value: 'TWO_LDK' },
  { label: '3K', value: 'THREE_DK' },
  { label: '3DK', value: 'THREE_K' },
  { label: '3LDK', value: 'THREE_LDK' },
  { label: '4K', value: 'FOUR_DK' },
  { label: '4DK', value: 'FOUR_K' },
  { label: '4LDK以上', value: 'MORE_THAN_FOUR_LDK' },
];

/**
 * 物件種別
 */
export const PropertyKindItems: SelectItemType[] = [
  {
    label: 'マンション',
    value: 'LARGE_APARTMENT',
  },
  {
    label: '戸建て',
    value: 'DETACHED_HOUSE',
  },
  {
    label: 'アパート',
    value: 'APARTMENT',
  },
  {
    label: 'オフィス',
    value: 'OFFICE',
  },
  {
    label: '店舗',
    value: 'STORE',
  },
  {
    label: 'その他',
    value: 'OTHER',
  },
];

/**
 * エレベーター
 */
export const ElevatorItems: SelectItemType[] = [
  {
    label: '有り',
    value: 'NOT_PRESENCE',
  },
  {
    label: '無し',
    value: 'PRESENCE',
  },
  {
    label: '未確認',
    value: 'UNCONFIRMED',
  },
];

/**
 * 所在階タイプ
 */
export const FloorGroundTypeItems: SelectItemType[] = [
  {
    label: '地上',
    value: 'ABOVE_GROUND',
  },
  {
    label: '地下',
    value: 'UNDERGROUND',
  },
];

/**
 * オートロック
 */
export const AutoLockItems: SelectItemType[] = [
  {
    label: '有り',
    value: 'NOT_PRESENCE',
  },
  {
    label: '無し',
    value: 'PRESENCE',
  },
  {
    label: '未確認',
    value: 'UNCONFIRMED',
  },
];

/**
 * 建物構造
 */
export const BuildingStructureTypeItems: SelectItemType[] = [
  {
    label: 'アルミ造（AL造）',
    value: 'AL',
  },
  {
    label: 'コンクリートボロック造（CB造）',
    value: 'CB',
  },
  {
    label: 'コンクリート充填鋼管構造（CFT造）',
    value: 'CFT',
  },
  {
    label: '鉄筋コンクリート造（RC造）',
    value: 'RC',
  },
  {
    label: '鉄骨鉄筋コンクリート造（SRC造）',
    value: 'SRC',
  },
  {
    label: '軽量鉄骨造（S造）',
    value: 'S_LIGHT_WEIGHT',
  },
  {
    label: '重量鉄骨造（S造）',
    value: 'S_WEIGHT',
  },
  {
    label: '木造（W造）',
    value: 'W',
  },
];

/**
 * 構造
 */
export const StructureTypeItems: SelectItemType[] = [
  {
    label: 'RC造',
    value: 'RC',
  },
  {
    label: 'S造',
    value: 'S',
  },
  {
    label: 'SRC造',
    value: 'SRC',
  },
  {
    label: '木造',
    value: 'WOODEN',
  },
];

export const StatusTypeItems: SelectItemType[] = [
  {
    label: '無',
    value: 2,
  },
  {
    label: '有',
    value: 1,
  },
];

export const OrderClassifitionTypeItems: SelectItemType[] = [
  {
    label: '大阪本店',
    value: 1,
  },
  {
    label: '東京本店',
    value: 2,
  },
];

export const HeightTypeItems: SelectItemType[] = [
  {
    label: '10m以上',
    value: 1,
  },
  {
    label: '10m未満',
    value: 2,
  },
];

export const RetentionPeriodTypeItems: SelectItemType[] = [
  {
    label: '60日以上',
    value: 1,
  },
  {
    label: '60日未満',
    value: 2,
  },
];

export const ConstructionTimeTypeItems: SelectItemType[] = [
  {
    label: '定時時間内',
    value: '定時時間内',
  },
  {
    label: '時間外工事',
    value: '時間外工事',
  },
  {
    label: '休日工事',
    value: '休日工事',
  },
  {
    label: 'その他（',
    value: 'その他',
  },
];

export const ConstructionSiteTypeItems: SelectItemType[] = [
  {
    label: '危険物エリア（消防法）',
    value: '危険物エリア（消防法）',
  },
  {
    label: '内部作業',
    value: '内部作業',
  },
  {
    label: '屋外',
    value: '屋外',
  },
  {
    label: 'その他（',
    value: 'その他',
  },
];

export const ConstructionWorkTypeItems: SelectItemType[] = [
  {
    label: '解体',
    value: '解体',
  },
  {
    label: '躯体',
    value: '躯体',
  },
  {
    label: '屋根',
    value: '屋根',
  },
  {
    label: '外壁',
    value: '外壁',
  },
  {
    label: '外装',
    value: '外装',
  },
  {
    label: '内装',
    value: '内装',
  },
  {
    label: '防水',
    value: '防水',
  },
];

export const CivilEngineeringTypeItems: SelectItemType[] = [
  {
    label: '下水道',
    value: '下水道',
  },
  {
    label: '道路',
    value: '道路',
  },
  {
    label: '機械基礎',
    value: '機械基礎',
  },
  {
    label: '外構',
    value: '外構',
  },
  {
    label: '舗装',
    value: '舗装',
  },
];

export const EquipmentTypeItems: SelectItemType[] = [
  {
    label: '給排水',
    value: '給排水',
  },
  {
    label: '空調',
    value: '空調',
  },
  {
    label: '室外機',
    value: '室外機',
  },
];

export const ElectricalInstallationTypeItems: SelectItemType[] = [
  {
    label: '受変電',
    value: '受変電',
  },
  {
    label: '動力',
    value: '動力',
  },
  {
    label: '電灯',
    value: '電灯',
  },
  {
    label: '照明',
    value: '照明',
  },
  {
    label: '自火報',
    value: '自火報',
  },
  {
    label: '誘導灯',
    value: '誘導灯',
  },
];

export const RisksTypeItems: SelectItemType[] = [
  {
    label: '火気の取扱い工事',
    value: '火気の取扱い工事',
  },
  {
    label: 'ハツリ・カッタードリル',
    value: 'ハツリ・カッタードリル',
  },
  {
    label: '解体工事',
    value: '解体工事',
  },
  {
    label: 'ガス溶断・溶接',
    value: 'ガス溶断・溶接',
  },
  {
    label: '壁貫通作業',
    value: '壁貫通作業',
  },
  {
    label: 'アスベスト撤去作業',
    value: 'アスベスト撤去作業',
  },
  {
    label: '電気溶接',
    value: '電気溶接',
  },
  {
    label: '電気工事',
    value: '電気工事',
  },
  {
    label: '重機使用',
    value: '重機使用',
  },
  {
    label: '玉掛作業',
    value: '玉掛作業',
  },
  {
    label: '電気開閉器作業',
    value: '電気開閉器作業',
  },
  {
    label: '加圧作業',
    value: '加圧作業',
  },
  {
    label: '塗装作業（塗装、接着剤）',
    value: '塗装作業（塗装、接着剤）',
  },
  {
    label: '吹付作業（塗装、接着剤）',
    value: '吹付作業（塗装、接着剤）',
  },
  {
    label: '高所での工事',
    value: '高所での工事',
  },
  {
    label: 'トラック搬入・荷下ろし',
    value: 'トラック搬入・荷下ろし',
  },
  {
    label: '掘削作業',
    value: '掘削作業',
  },
  {
    label: '建設用リフト設置届',
    value: '建設用リフト設置届',
  },
  {
    label: '施工承認願（公共物）',
    value: '施工承認願（公共物）',
  },
  {
    label: '化学薬品、劇物取扱い',
    value: '化学薬品、劇物取扱い',
  },
  {
    label: 'その他危険作業',
    value: 'その他危険作業',
  },
  {
    label: 'コンクリート打設',
    value: 'コンクリート打設',
  },
  {
    label: '酸欠作業',
    value: '酸欠作業',
  },
  {
    label: '重機楊重作業',
    value: '重機楊重作業',
  },
  {
    label: '墜落・転落',
    value: '墜落・転落',
  },
  {
    label: '飛来・落下',
    value: '飛来・落下',
  },
  {
    label: '火災',
    value: '火災',
  },
  {
    label: '交通事故',
    value: '交通事故',
  },
  {
    label: '感電',
    value: '感電',
  },
  {
    label: '高圧・低温物（火傷）',
    value: '高圧・低温物（火傷）',
  },
  {
    label: '漏電・停電',
    value: '漏電・停電',
  },
  {
    label: '爆発',
    value: '爆発',
  },
  {
    label: '転倒',
    value: '転倒',
  },
  {
    label: '切れ・こすれ',
    value: '切れ・こすれ',
  },
  {
    label: '挟まれ',
    value: '挟まれ',
  },
  {
    label: '激突・激突され',
    value: '激突・激突され',
  },
  {
    label: '有害物との接触',
    value: '有害物との接触',
  },
  {
    label: '無理な動作',
    value: '無理な動作',
  },
  {
    label: '巻込まれ',
    value: '巻込まれ',
  },
  {
    label: '崩壊・倒壊',
    value: '崩壊・倒壊',
  },
  {
    label: '重量物人力運搬',
    value: '重量物人力運搬',
  },
  {
    label: '脚立作業',
    value: '脚立作業',
  },
  {
    label: 'その他',
    value: 'Sその他RC',
  },
];

export const LegelrequirementTypeItems: SelectItemType[] = [
  {
    label: 'リサイクル法（500m2以上）',
    value: 'リサイクル法（500m2以上）',
  },
  {
    label: 'リサイクル法（修繕1億以上）',
    value: 'リサイクル法（修繕1億以上）',
  },
  {
    label: 'リサイクル法（解体80m2）',
    value: 'リサイクル法（解体80m2）',
  },
  {
    label: '掘削作業（地山掘削）',
    value: '掘削作業（地山掘削）',
  },
  {
    label: '特定建設作業実施届',
    value: '特定建設作業実施届',
  },
  {
    label: '沿道掘削協議',
    value: '沿道掘削協議',
  },
  {
    label: '道路使用',
    value: '道路使用',
  },
  {
    label: '道路占用',
    value: '道路占用',
  },
  {
    label: '機械等設置届（足場）',
    value: '機械等設置届（足場）',
  },
  {
    label: '機械等設置届（型枠）',
    value: '機械等設置届（型枠）',
  },
];

export const PriorityManagementTypeItems: SelectItemType[] = [
  {
    label: 'コンクリート工事',
    value: 'コンクリート工事',
  },
  {
    label: '鉄骨工事',
    value: '鉄骨工事',
  },
  {
    label: '防水工事',
    value: '防水工事',
  },
  {
    label: '金属屋根工事',
    value: '金属屋根工事',
  },
  {
    label: '金属外壁工事',
    value: '金属外壁工事',
  },
  {
    label: '外壁タイル貼工事',
    value: '外壁タイル貼工事',
  },
  {
    label: '外壁石貼貼工事',
    value: '外壁石貼貼工事',
  },
  {
    label: 'ALC工事',
    value: 'ALC工事',
  },
  {
    label: '空調換気設備工事',
    value: '空調換気設備工事',
  },
  {
    label: '電気設備工事',
    value: '電気設備工事',
  },
  {
    label: '給排水衛生ガス設備工事',
    value: '給排水衛生ガス設備工事',
  },
  {
    label: '設計図',
    value: '設計図',
  },
  {
    label: '計画図',
    value: '計画図',
  },
];

export const OtherTypeItems: SelectItemType[] = [
  {
    label: '工種別施工計画書',
    value: '工種別施工計画書',
  },
  {
    label: '近隣挨拶',
    value: '近隣挨拶',
  },
  {
    label: '消防検査立会',
    value: '消防検査立会',
  },
  {
    label: '施主竣工検査の立会',
    value: '施主竣工検査の立会',
  },
  {
    label: '産業廃棄物（契約書）',
    value: '産業廃棄物（契約書）',
  },
  // {
  //   label: '外壁タイル貼工事',
  //   value: '外壁タイル貼工事',
  // },
  // {
  //   label: '外壁石貼工事',
  //   value: '外壁石貼工事',
  // },
  // {
  //   label: 'ALC工事',
  //   value: 'ALC工事',
  // },
];

export const CostPriceTypeItems: SelectItemType[] = [
  {
    label: '協力会社見積徴収が出来ている',
    value: '協力会社見積徴収が出来ている',
  },
  {
    label: '原価に管理費を見込んでいる',
    value: '原価に管理費を見込んでいる',
  },
  {
    label: '協力会社との取決めを行っている',
    value: '協力会社との取決めを行っている',
  },
];

export const ApproveItemtype: SelectItemType[] = [
  {
    label: '要',
    value: 1,
  },
  {
    label: '不要',
    value: 2,
  },
];

/**
 * 月選択肢
 */
export const MonthSelect: SelectItemType[] = [
  {
    label: '1',
    value: '1',
  },
  {
    label: '2',
    value: '2',
  },
  {
    label: '3',
    value: '3',
  },
  {
    label: '4',
    value: '4',
  },
  {
    label: '5',
    value: '5',
  },
  {
    label: '6',
    value: '6',
  },
  {
    label: '7',
    value: '7',
  },
  {
    label: '8',
    value: '8',
  },
  {
    label: '9',
    value: '9',
  },
  {
    label: '10',
    value: '10',
  },
  {
    label: '11',
    value: '11',
  },
  {
    label: '12',
    value: '12',
  },
];

/**
 * 管理体制
 */
export const ManagementSystemItems: SelectItemType[] = [
  {
    label: '全部委託管理',
    value: 'SELF',
  },
  {
    label: '一部委託管理',
    value: 'PARTIAL_COMMISSION',
  },
  {
    label: '自主管理',
    value: 'ALL_COMMISSION',
  },
];

/**
 * 勤務時間
 */
export const WorkingTimeItems: SelectItemType[] = [
  {
    label: '常勤',
    value: 'DAY_WORK',
  },
  {
    label: '日勤',
    value: 'FULL_TIME',
  },
  {
    label: '巡回',
    value: 'PATROL',
  },
];

/**
 * 承認依頼有無
 */
export const ApprovalIsRequired: SelectItemType[] = [
  {
    id: 'approval-required-true',
    label: '必要',
    value: true,
  },
  {
    id: 'approval-required-false',
    label: '不要',
    value: false,
  },
];

/**
 * 入力必須
 */
export const InputTypeIsRequired: SelectItemType[] = [
  {
    id: 'input-required-true',
    label: '必須項目',
    value: true,
  },
  {
    id: 'input-required-false',
    label: '任意項目',
    value: false,
  },
];

export const InputType: SelectItemType[] = [
  { label: 'テキスト', value: 'text' },
  { label: 'チェックボックス', value: 'checkbox' },
  { label: 'プルダウン', value: 'pulldown' },
  { label: 'ラジオボタン', value: 'radio' },
  { label: '写真', value: 'picture' },
];

export const TextInputType: SelectItemType[] = [
  { label: 'テキスト-１行', value: 'text-one' },
  { label: 'テキスト-複数行', value: 'text-multi' },
  { label: 'テキスト-日付', value: 'text-date' },
  { label: 'テキスト-日時', value: 'text-datetime' },
];

/**
 * 完了予定日通知フラグ
 */
export const IsNotifyDateToItems: SelectItemType[] = [
  {
    label: 'する',
    value: 'true',
  },
  {
    label: 'しない',
    value: 'false',
  },
];

/**
 * タスクステータス
 */
export const MeTaskStatusItems: SelectItemType[] = [
  {
    label: '未着手',
    value: 1,
  },
  {
    label: '作業中',
    value: 2,
  },
  {
    label: '完了',
    value: 3,
  },
];

export const EastWestDivision: SelectItemType[] = [
  {
    id: 'division-west',
    label: '大阪',
    value: 0,
  },
  {
    id: 'division-east',
    label: '東京',
    value: 1,
  },
];

export const NewRepairDivision: SelectItemType[] = [
  {
    id: 'division-new',
    label: '新築',
    value: 0,
  },
  {
    id: 'division-repair',
    label: '営繕',
    value: 1,
  },
];
export const duty: SelectItemType[] = [
  {
    id: '0',
    label: '所長',
    value: 0,
  },
  {
    id: '1',
    label: '所員',
    value: 1,
  },
  {
    id: '2',
    label: '営業',
    value: 2,
  },
  {
    id: '3',
    label: '調達',
    value: 3,
  },
  {
    id: '4',
    label: '見積',
    value: 4,
  },
  {
    id: '5',
    label: '設計',
    value: 5,
  },
];
export const requestStatus: SelectItemType[] = [
  {
    id: '',
    label: '　',
    value: -1,
  },
  {
    id: '0',
    label: '下書き',
    value: 0,
  },
  {
    id: '1',
    label: '申請中',
    value: 1,
  },
  {
    id: '4',
    label: '承認',
    value: 4,
  },
  {
    id: '5',
    label: '却下',
    value: 5,
  },
];
export const constructiontype: SelectItemType[] = [
  {
    id: 'construction-new',
    label: '新築',
    value: 0,
  },
  {
    id: 'construction-upkeep',
    label: '営繕',
    value: 1,
  },
];
export const month: SelectItemType[] = [
  {
    id: '',
    label: '　',
    value: '',
  },
  {
    id: '01',
    label: '01',
    value: '01',
  },
  {
    id: '02',
    label: '02',
    value: '02',
  },
  {
    id: '03',
    label: '03',
    value: '03',
  },
  {
    id: '04',
    label: '04',
    value: '04',
  },
  {
    id: '05',
    label: '05',
    value: '05',
  },
  {
    id: '06',
    label: '06',
    value: '06',
  },
  {
    id: '07',
    label: '07',
    value: '07',
  },
  {
    id: '08',
    label: '08',
    value: '08',
  },
  {
    id: '09',
    label: '09',
    value: '09',
  },
  {
    id: '10',
    label: '10',
    value: '10',
  },
  {
    id: '11',
    label: '11',
    value: '11',
  },
  {
    id: '12',
    label: '12',
    value: '12',
  },
];
export const status: SelectItemType[] = [
  {
    id: '',
    label: '　',
    value: 0,
  },
  {
    id: '0',
    label: '承認待ち',
    value: 1,
  },
  {
    id: '1',
    label: '他者承認待ち',
    value: 2,
  },
];

export const classification: SelectItemType[] = [
  {
    label: '査定',
    value: '査定',
  },
  {
    label: '発定',
    value: '発定',
  },
];

export const date: SelectItemType[] = [
  {
    id: '01',
    label: '01',
    value: '01',
  },
  {
    id: '02',
    label: '02',
    value: '02',
  },
  {
    id: '03',
    label: '03',
    value: '03',
  },
  {
    id: '04',
    label: '04',
    value: '04',
  },
  {
    id: '05',
    label: '05',
    value: '05',
  },
  {
    id: '06',
    label: '06',
    value: '06',
  },
  {
    id: '07',
    label: '07',
    value: '07',
  },
  {
    id: '08',
    label: '08',
    value: '08',
  },
  {
    id: '09',
    label: '09',
    value: '09',
  },
  {
    id: '10',
    label: '10',
    value: '10',
  },
  {
    id: '11',
    label: '11',
    value: '11',
  },
  {
    id: '12',
    label: '12',
    value: '12',
  },
  {
    id: '13',
    label: '13',
    value: '13',
  },
  {
    id: '14',
    label: '14',
    value: '14',
  },
  {
    id: '15',
    label: '15',
    value: '15',
  },
  {
    id: '16',
    label: '16',
    value: '16',
  },
  {
    id: '17',
    label: '17',
    value: '17',
  },
  {
    id: '18',
    label: '18',
    value: '18',
  },
  {
    id: '19',
    label: '19',
    value: '19',
  },
  {
    id: '20',
    label: '20',
    value: '20',
  },
  {
    id: '21',
    label: '21',
    value: '21',
  },
  {
    id: '22',
    label: '22',
    value: '22',
  },
  {
    id: '23',
    label: '23',
    value: '23',
  },
  {
    id: '24',
    label: '24',
    value: '24',
  },
  {
    id: '25',
    label: '25',
    value: '25',
  },
  {
    id: '26',
    label: '26',
    value: '26',
  },
  {
    id: '27',
    label: '27',
    value: '27',
  },
  {
    id: '28',
    label: '28',
    value: '28',
  },
  {
    id: '29',
    label: '29',
    value: '29',
  },
  {
    id: '30',
    label: '30',
    value: '30',
  },
  {
    id: '31',
    label: '31',
    value: '31',
  },
];

export const statusitems: SelectItemType[] = [
  {
    id: 'status-blank',
    label: '　',
    value: '',
  },
  {
    id: 'status-one',
    label: '見積',
    value: '0',
  },
  {
    id: 'status-two',
    label: '受注',
    value: '1',
  },
  {
    id: 'status-three',
    label: '実行予算',
    value: '2',
  },
  {
    id: 'status-four',
    label: '工事中',
    value: '3',
  },
  {
    id: 'status-four',
    label: '完了',
    value: '4',
  },
];

export const year: SelectItemType[] = [
  {
    id: '',
    label: '　',
    value: '',
  },
  {
    id: '1',
    label: '2013',
    value: '2013',
  },
  {
    id: '2',
    label: '2014',
    value: '2014',
  },
  {
    id: '3',
    label: '2015',
    value: '2015',
  },
  {
    id: '4',
    label: '2016',
    value: '2016',
  },
  {
    id: '5',
    label: '2017',
    value: '2017',
  },
  {
    id: '6',
    label: '2018',
    value: '2018',
  },
  {
    id: '7',
    label: '2019',
    value: '2019',
  },
  {
    id: '8',
    label: '2020',
    value: '2020',
  },
  {
    id: '9',
    label: '2021',
    value: '2021',
  },
  {
    id: '10',
    label: '2022',
    value: '2022',
  },
];

export const prefectures: SelectItemType[] = [
  { label: '北海道', value: '北海道' },
  { label: '青森県', value: '青森県' },
  { label: '岩手県', value: '岩手県' },
  { label: '宮城県', value: '宮城県' },
  { label: '秋田県', value: '秋田県' },
  { label: '山形県', value: '山形県' },
  { label: '福島県', value: '福島県' },
  { label: '茨城県', value: '茨城県' },
  { label: '栃木県', value: '栃木県' },
  { label: '群馬県', value: '群馬県' },
  { label: '埼玉県', value: '埼玉県' },
  { label: '千葉県', value: '千葉県' },
  { label: '東京都', value: '東京都' },
  { label: '神奈川県', value: '神奈川県' },
  { label: '新潟県', value: '新潟県' },
  { label: '富山県', value: '富山県' },
  { label: '石川県', value: '石川県' },
  { label: '福井県', value: '福井県' },
  { label: '山梨県', value: '山梨県' },
  { label: '長野県', value: '長野県' },
  { label: '岐阜県', value: '岐阜県' },
  { label: '静岡県', value: '静岡県' },
  { label: '愛知県', value: '愛知県' },
  { label: '三重県', value: '三重県' },
  { label: '滋賀県', value: '滋賀県' },
  { label: '京都府', value: '京都府' },
  { label: '大阪府', value: '大阪府' },
  { label: '兵庫県', value: '兵庫県' },
  { label: '奈良県', value: '奈良県' },
  { label: '和歌山県', value: '和歌山県' },
  { label: '鳥取県', value: '鳥取県' },
  { label: '島根県', value: '島根県' },
  { label: '岡山県', value: '岡山県' },
  { label: '広島県', value: '広島県' },
  { label: '山口県', value: '山口県' },
  { label: '徳島県', value: '徳島県' },
  { label: '香川県', value: '香川県' },
  { label: '愛媛県', value: '愛媛県' },
  { label: '高知県', value: '高知県' },
  { label: '福岡県', value: '福岡県' },
  { label: '佐賀県', value: '佐賀県' },
  { label: '長崎県', value: '長崎県' },
  { label: '熊本県', value: '熊本県' },
  { label: '大分県', value: '大分県' },
  { label: '宮崎県', value: '宮崎県' },
  { label: '鹿児島県', value: '鹿児島県' },
  { label: '沖縄県', value: '沖縄県' },
];

export const DesignTypeItems: SelectItemType[] = [
  {
    label: '設計漏れ',
    value: '設計漏れ',
  },
  {
    label: '設計計画変更',
    value: '設計計画変更',
  },
  {
    label: '許認可変更',
    value: '許認可変更',
  },
  {
    label: 'サイズ変更',
    value: 'サイズ変更',
  },
];

export const EstimateTypeItems: SelectItemType[] = [
  {
    label: '見積落ち',
    value: '見積落ち',
  },
  {
    label: '数量間違い',
    value: '数量間違い',
  },
  {
    label: '仕様間違い',
    value: '仕様間違い',
  },
];

export const ProcurementTypeItems: SelectItemType[] = [
  {
    label: '発注ミス',
    value: '発注ミス',
  },
  {
    label: '手配漏れ',
    value: '手配漏れ',
  },
];

export const ConstructionTypeItems: SelectItemType[] = [
  {
    label: '施工・計画変更',
    value: '施工・計画変更',
  },
  {
    label: '仕様・工法変更',
    value: '仕様・工法変更',
  },
  {
    label: 'サイズ変更',
    value: 'サイズ変更',
  },
  {
    label: '自然災害',
    value: '自然災害',
  },
  {
    label: '天候不良',
    value: '天候不良',
  },
  {
    label: '施主追加',
    value: '施主追加',
  },
  {
    label: '施工追加',
    value: '施工追加',
  },
  {
    label: '人工追加',
    value: '人工追加',
  },
  {
    label: '工期延長',
    value: '工期延長',
  },
];

export const accountType: SelectItemType[] = [
  {
    label: '普通',
    value: 0,
  },
  {
    label: '当座',
    value: 1,
  },
];

export const hasInvoice: SelectItemType[] = [
  {
    label: 'なし',
    value: false,
  },
  {
    label: 'あり',
    value: true,
  },
];

export const isSuspension: SelectItemType[] = [
  {
    label: 'しない',
    value: false,
  },
  {
    label: 'する',
    value: true,
  },
];

export const workTypeInformation: SelectItemType[] = [
  {
    label: 'xxxxxxxxxxxxxxx',
    value: '1',
  },
  {
    label: 'xxxxxxxxxxxxxxx',
    value: '2',
  },
  {
    label: 'xxxxxxxxxxxxxxx',
    value: '3',
  },
  {
    label: 'xxxxxxxxxxxxxxx',
    value: '4',
  },
  {
    label: 'xxxxxxxxxxxxxxx',
    value: '5',
  },
  {
    label: 'xxxxxxxxxxxxxxx',
    value: '6',
  },
  {
    label: 'xxxxxxxxxxxxxxx',
    value: '7',
  },
  {
    label: 'xxxxxxxxxxxxxxx',
    value: '8',
  },
  {
    label: 'xxxxxxxxxxxxxxx',
    value: '9',
  },
  {
    label: 'xxxxxxxxxxxxxxx',
    value: '10',
  },
  {
    label: 'xxxxxxxxxxxxxxx',
    value: '11',
  },
  {
    label: 'xxxxxxxxxxxxxxx',
    value: '12',
  },
  {
    label: 'xxxxxxxxxxxxxxx',
    value: '13',
  },
  {
    label: 'xxxxxxxxxxxxxxx',
    value: '14',
  },
  {
    label: 'xxxxxxxxxxxxxxx',
    value: '15',
  },
  {
    label: 'xxxxxxxxxxxxxxx',
    value: '16',
  },
  {
    label: 'xxxxxxxxxxxxxxx',
    value: '17',
  },
  {
    label: 'xxxxxxxxxxxxxxx',
    value: '18',
  },
  {
    label: 'xxxxxxxxxxxxxxx',
    value: '19',
  },
  {
    label: 'xxxxxxxxxxxxxxx',
    value: '20',
  },
];

export const subCategoryItems: SelectItemType[] = [
  {
    id: '1',
    label: 'AAA工事',
    value: 'AAA工事',
  },
  {
    id: '2',
    label: 'BBB工事',
    value: 'BBB工事',
  },
  {
    id: '3',
    label: 'CCC工事',
    value: 'CCC工事',
  },
  {
    id: '4',
    label: 'DDD工事',
    value: 'DDD工事',
  },
];

export const ConsumtionTax: SelectItemType[] = [
  {
    id: '1',
    label: '税抜き',
    value: '税抜き',
  },
  {
    id: '2',
    label: '税込み',
    value: '税込み',
  },
];