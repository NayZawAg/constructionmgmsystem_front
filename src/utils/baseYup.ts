/* eslint @typescript-eslint/no-explicit-any: 0 */
/**
 * yup バリデーション設定
 * @see https://github.com/jquense/yup
 */
import * as yup from 'yup';

// 日本語のルールと文言の対応を定義
const LocaleJP = {
  mixed: {
    default: '${path}は無効です',
    required: '${path}を入力してください',
    oneOf: '${path}は次の値のいずれかでなければなりません:${values}',
    notOneOf: '${path}は次の値のいずれかであってはなりません:${values}',
  },
  string: {
    length: '${path}は正確に${length}文字でなければなりません',
    min: '${path}は少なくとも${min}文字でなければなりません',
    // max: '${path}は最大${max}文字でなければなりません',
    max: '${path}は${max}文字以内で入力してください',
    matches: '${path}は数値で入力してください',
    email: '${path}はメールアドレス形式である必要があります',
    url: '${path}は有効なURLでなければなりません',
    trim: '${path}はトリミングされた文字列でなければなりません',
    lowercase: '${path}は小文字の文字列でなければなりません',
    uppercase: '${path}は大文字の文字列でなければなりません',
  },
  number: {
    min: '${path}は${min}以上である必要があります',
    // max: '${path}は${max}以下でなければなりません',
    max: '${path}は${max}桁以内で入力してください',
    lessThan: '${path}は${less}より小さくなければなりません',
    moreThan: '${path}は${more}より大きくなければなりません',
    notEqual: '${path}は${notEqual}と等しくない必要があります',
    positive: '${path}は正の数でなければなりません',
    negative: '${path}は負の数でなければなりません',
    integer: '${path}は整数でなければなりません',
  },
  date: {
    min: '${path}フィールドは${min}より後でなければなりません',
    max: '${path}フィールドは${max}より前でなければなりません',
  },
  object: {
    noUnknown:
      '${path}フィールドには,オブジェクトシェイプで指定されていないキーを含めることはできません',
  },
  array: {
    min: '${path}フィールドには少なくとも${min}の項目が必要です',
    max: '${path}フィールドには${max}以下の項目が必要です',
  },
};

/**
 * input[number]時のnullチェック
 * @param currentValue
 * @param originalValue
 * @returns {boolean}
 */
export const checkNumIsNull = (currentValue: any, originalValue: any) => {
  return originalValue === '' ? null : currentValue;
};

export const phoneRegExp = /^[0-9]{1,13}$/;
export const notMatchPhoneNumber = '電話番号形式である必要があります';

// 日本語バリデーションセット
yup.setLocale(LocaleJP);
export const BaseYup = yup;
