export const formatCurrency = (value: number) => {
  return value.toLocaleString('jp-JP', { style: 'currency', currency: 'JPY' });
};

/**
 * 粗々利益額
 *
 * 受注金額ー（想定原価＋想定人工×8万円）
 * ※1桁で切り捨て(1円単位で）
 * ※切り捨ては想定人工×8の金額に対して行う
 * @param {number} orderAmount 受注金額
 * @param {number} estimatedAssumptionCost 想定原価
 * @param {number} assumptionArtificial 想定人工
 * @returns {number}
 */
export const grossProfitAmount = (
  orderAmount: number | null | undefined,
  estimatedAssumptionCost: number | null | undefined,
  assumptionArtificial: number | null | undefined,
) => {
  if (!orderAmount || !estimatedAssumptionCost) return null;
  if (!assumptionArtificial) assumptionArtificial = 0;

  const amount = (
    orderAmount -
    (estimatedAssumptionCost + assumptionArtificial * 80000)
  );
  return toFixed(amount, 2);
};

/**
 * 粗々利益率
 *
 * １－粗々利益額÷受注金額
 * @param {number} grossProfitAmount 粗々利益額
 * @param {number} orderAmount 受注金額
 * @returns {number}
 */
export const grossProfitRate = (
  orderAmount: number | null | undefined,
  grossProfitAmount: number | null | undefined,
) => {
  if (!orderAmount || grossProfitAmount == null) return null;

  const rate = ((grossProfitAmount / orderAmount) * 100);
  return toFixed(rate, 2);
};

export const orderProfitAmount = (
  orderAmount: number | null | undefined,
  orderAssumptionCost: number | null | undefined,
) => {
  if (!orderAmount) return null;
  if (!orderAssumptionCost) orderAssumptionCost = 0;

  const amount = (orderAmount - orderAssumptionCost);
  return toFixed(amount, 2);
};

export const orderProfitRate = (
  orderAmount: number | null | undefined,
  orderProfitAmount: number | null | undefined,
) => {
  if (!orderAmount || orderProfitAmount == null) return null;

  const rate = ((orderProfitAmount / orderAmount) * 100);
  return toFixed(rate, 2)
};

export const calculateSubtotal = (
  quantity: number | null | undefined,
  unitPrice: number | null | undefined,
) => {
  if (!unitPrice && !quantity) return null;
  if (!unitPrice) unitPrice = 0;
  if (!quantity) quantity = 0;
  const total = unitPrice * quantity;
  return isNaN(total) ? '' : toFixed(total, 2);
};

export const countDecimalPoint = (value: number) => {
  // if no decimal point
  if (Math.floor(value) === value) return 0;

  return fetchDecimalPoint.length || 0;
};

export const fetchDecimalPoint = (value: number) => {
  return value.toString().split('.')[1] || '';
};

export const fetchBeforeDecimalPoint = (value: number) => {
  // if no decimal point
  if (Math.floor(value) === value) return value;

  return parseInt(value.toString().split('.')[0]) || value;
};

export const removeZeroDecimalPoint = (value: number) => {
  // if no decimal point
  if (Math.floor(value) === value) return value;

  let result = value;
  // if decimal point is 0
  const decimalPoint = fetchDecimalPoint(value);
  if (decimalPoint.length > 0 && parseInt(decimalPoint) == 0) {
    result = fetchBeforeDecimalPoint(value);
  }
  return result;
};

export const isMinusValueOnChangeOrBlur = (
  value: number | string | null | undefined,
) => {
  if (value == undefined || value == null) return null;

  return String(value) == '-' ? true : false;
};

export const fetchNumberValueOnBlur = (
  value: number | string | null | undefined,
) => {
  if (value == undefined || value == null) return null;

  return Number(String(value).replace(/[$¥,]+/g, ''));
};

export const prefixYenSign = (value: number | string | null | undefined) => {
  if (value == undefined || value == null) return null;

  return '¥' + value;
};

// Currency
export const changeFormatCurrency = (
  value: number | string | null | undefined,
) => {
  if (value == undefined || value == null) return null;

  return value.toLocaleString('jp-JP');
};

// PercentSign
export const postfixPercentSign = (
  value: number | string | null | undefined,
) => {
  if (value == undefined || value == null) return null;

  return value + '%';
};

// max length
export const calculateMaxLength = (maxFractionDigits?: number, maxLength?: number, target?: {value: number}, form?: string) => {
  let decimalDigits = 0
  if (form && form === 'NUMBER_FREE_FORM') {
    decimalDigits = maxFractionDigits ? (maxFractionDigits + 4) : 0 // 「maxFractionDigits + 4」は",".00"のため
    maxLength = maxFractionDigits ? (maxLength? maxLength - 3 : 0) : maxLength // 3は「.00」
  } else {
    decimalDigits = maxFractionDigits ? (maxFractionDigits + 1) : 0 // 1 is for dot
  }
  return maxLength && target && target?.value % 1 === 0 ? (maxLength - decimalDigits) : maxLength // 小数点かどうかチェックして計算
}

// toFixed without rounding
export const toFixed = (n: number, fixed: number): number => n ? +(`${n}`.match(new RegExp(`^-?\\d+(?:.\\d{0,${fixed}})?`)) as string[])[0] : 0;
