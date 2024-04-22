/* eslint @typescript-eslint/no-explicit-any: 0 */
import type { ColumnBodyType } from 'primereact/column';

export type CommonColumn = {
  /** UUID */
  uuid?: string;
  /** 作成日時 */
  createdAt?: string;
  /** 作成者 */
  createdBy?: string;
  /** 更新日時 */
  updatedAt?: string;
  /** 更新者 */
  updatedBy?: string;
};

export type CommonFetchResponseType = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mutate?: any;
  isLoading: boolean;
  isError: boolean;
};

export type SelectItemType = {
  id?: string;
  label: string;
  value: number | string | boolean;
  checked?: boolean;
  disabled?: boolean;
};

/**
 * カラムデータ型
 * date, datetyme, countName, body は併用不可
 */
export type ColumnType = {
  /** 表示プロパティ名 */
  field: string;
  /** テーブル表示ヘッダー名 */
  header?: string;
  /** style上書き */
  style?: object;
  /** 日付の場合 */
  date?: boolean;
  /** 日付時刻の場合 */
  datetime?: boolean;
  /* 表示データに単位を表示する場合に単位指定 */
  countName?: string;
  /** データ表示時に処理実行する場合 */
  body?: ColumnBodyType;
  /** ソートしない場合 */
  isUnableSort?: boolean;
};

export type CustomizedItem = {
  customizedInputKey: string;
  label: string;
  values: string[];
};

export type ManageType = {
  manageFlg?: boolean;
};

export type MyObject = {
  [index: string]: any
};
