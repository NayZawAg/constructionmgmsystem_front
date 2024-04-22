export type TypeInvoiceInformation = {
  id: number;
  construction_id: number;
  name: string;
  amount: number;
  remarks: string;
  special_report: string;
  invoice_issued_date: string;
  deposit_planned_date: string;
  construction_division: number;
  add_inc_dec_construction_id: number;
};

export type TypeInvoiceInformationsList = {
  id: number | undefined;
  construction_id: number | undefined;
  name: string;
  amount: number | undefined;
  remarks: string;
  special_report: string;
  invoice_issued_date: string;
  deposit_planned_date: string;
  construction_division: number | undefined;
  add_inc_dec_construction_id: number | undefined;
  added_row?: number;
  type?: string;
  del_id?: number;
}[];

export type TypeInvoiceInformationsListAddDecInc = {
  add_dec_inc_amount: {
    id: number;
    subject: string;
    estimate_amount: number;
    remain: number;
  };
  add_dec_inc_invoice: [
    {
      id: number | undefined;
      construction_id: number | undefined;
      name: string;
      amount: number | undefined;
      remarks: string;
      special_report: string;
      invoice_issued_date: string;
      deposit_planned_date: string;
      construction_division: number | undefined;
      add_inc_dec_construction_id: number | undefined;
      added_row?: number;
      type?: string;
      del_id?: number;
    },
  ];
}[];

export type TypeGetInvoiceInformationsList = {
  invoice_informations_construction: {
    construction_amount: {
      id: number;
      order_amount: number;
      remain: number;
    };
    construction_invoice: [
      {
        id: number | undefined;
        construction_id: number | undefined;
        name: string;
        amount: number | undefined;
        old_remain: number;
        remarks: string;
        special_report: string;
        invoice_issued_date: string;
        deposit_planned_date: string;
        construction_division: number | undefined;
        add_inc_dec_construction_id: number | undefined;
        added_row?: number;
        type?: string;
        del_id?: number;
        nameErrMsg: string;
        amountErrMsg: string;
        remarkErrMsg: string;
        specialReportErrMsg: string;
        invoiceIssuedDateErrMsg: string;
        depositPlannedDateErrMsg: string;
      },
    ];
  };
  invoice_informations_add_dec_inc: [
    {
      add_dec_inc_amount: {
        id: number;
        subject: string;
        estimate_amount: number;
        remain: number;
      };
      add_dec_inc_invoice: [
        {
          id: number | undefined;
          construction_id: number | undefined;
          name: string;
          amount: number | undefined;
          old_remain: number;
          remarks: string;
          special_report: string;
          invoice_issued_date: string;
          deposit_planned_date: string;
          construction_division: number | undefined;
          add_inc_dec_construction_id: number | undefined;
          added_row?: number;
          type?: string;
          del_id?: number;
          nameErrMsg: string;
          amountErrMsg: string;
          remarkErrMsg: string;
          specialReportErrMsg: string;
          invoiceIssuedDateErrMsg: string;
          depositPlannedDateErrMsg: string;
        },
      ];
    },
  ];
};
