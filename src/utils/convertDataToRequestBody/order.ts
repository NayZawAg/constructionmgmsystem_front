import { orderIds, OrderParams } from "@/api/order";
import { OrderSubmitData } from "@/components/constructions/costManage/ordersDialog";
import { MyObject } from "@/types/common";

export type Order = {
  sch_con_start_date: Date;
  sch_con_end_date: Date;
  cooperator_id: number;
  // coopertor_name: string;
  order_condition_remarks: string;
  order_details: orderIds[]

};

export const convertDataToAddOrderRequest = (
  data: OrderSubmitData,
): OrderParams => {
  const convertData: OrderParams | MyObject = {};
  Object.keys(data).map((key) => {
    const dataObj: MyObject = data
    if (key == 'sch_con_start_date') {
      dataObj[key] = dataObj[key].toLocaleString()
    }
    if (key == 'sch_con_end_date') {
      dataObj[key] = dataObj[key].toLocaleString()
    }
    convertData[key] = dataObj[key];
  });
  return convertData as OrderParams;
};

