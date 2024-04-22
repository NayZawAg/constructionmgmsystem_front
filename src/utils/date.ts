import dayjs from "dayjs";

export const setDateValueWithFormat = (elementId: string, value: string, format: string): void => {
  if (!elementId || !value || !format) return

  const element = (document.getElementById(elementId)) as HTMLInputElement
  if (element) {
    let dateValue = ""
    if (value != "null" && value != "undefined") {
      dateValue = dayjs(value).format(format)
    }
    element.value = dateValue
  }
};
