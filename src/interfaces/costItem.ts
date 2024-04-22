export interface CostItem {
    id: number;
    rowgroupid: number;
    rowType: string,
    title: string,
    classification: string,
    detail: string,
    specification: string,
    quantity: string,
    unit: string,
    unitPrice: string,
    subtotal: string,
    remarks: string,
    maxErrorMessage: {
      detail: string;
      specification: string;
      quantity: string;
      unit: string;
      unitPrice: string;
      remarks: string;
    };
    requireErrorMessage: { detail: string; classification: string, quantity: string; unitPrice: string };
    formatErrorMessage: { quantity: string; unitPrice: string };
    newLineErrorMessage: {
      detail: string;
      specification: string;
      unit: string;
      remarks: string;
    };
  }
