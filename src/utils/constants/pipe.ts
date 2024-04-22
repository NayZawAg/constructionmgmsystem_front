import dayjs from 'dayjs';
import {
  DATE_FORMAT_DISPLAY,
  DATE_TIME_FORMAT_DISPLAY,
} from '@/utils/constants/common';

/**
 * 日付
 */
export const datePipe = (value: string) => {
  const result = value ? dayjs(value).format(DATE_FORMAT_DISPLAY) : '';
  return result;
};

/**
 * 日時
 */
export const dateTimePipe = (value: string) => {
  const result = value ? dayjs(value).format(DATE_TIME_FORMAT_DISPLAY) : '';
  return result;
};

/**
 * 所在階
 */
export const floorsPipe = (floorGroundTypeJa: string, floor: number) => {
  const result =
    floorGroundTypeJa && floor ? `${floorGroundTypeJa} ${floor} 階` : '';
  return result;
};

/**
 * 建物階数
 */
export const buildingPipe = (
  storiesAboveGround: number,
  storiesUnderground: number,
) => {
  const result = storiesAboveGround
    ? `${storiesAboveGround}階 ${
      storiesUnderground ? `\n(地下${storiesUnderground}階)` : ''
    }`
    : '';
  return result;
};

/**
 * 戸数
 */
export const doorPipe = (value: number) => {
  const result = value ? `${value}戸` : '';
  return result;
};

/**
 * 平方メートル
 */
export const squareMeterPipe = (value: number) => {
  const result = value ? `${value}㎡` : '';
  return result;
};

/**
 * 住所
 */
export const addressPipe = (postcode: string, address: string) => {
  const result = postcode && address ? `〒${postcode}\n${address}` : '';
  return result;
};
