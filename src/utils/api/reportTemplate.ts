export const ReportInputTextKinds = {
  text: 'text',
  textMulti: 'text-multi',
  textDate: 'text-date',
  datetime: 'datetime',
} as const;

export const ReportInputKinds = {
  checkbox: 'checkbox',
  pulldown: 'pulldown',
  radio: 'radio',
  picture: 'picture',
  ...ReportInputTextKinds,
} as const;

export const DateTypes = [
  ReportInputTextKinds.textDate,
  ReportInputTextKinds.datetime,
] as const;
