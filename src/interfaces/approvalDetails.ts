import { Brand } from "./brand";

export interface ApprovalDetails{
    id: number;
    applicationDate: string;
    applicationNo: number;
    subject: string;
    requestDecisionName:string;
    constructionName:string;
    constructionCode:string;
    brand: Brand;
    expenseCharge: string;
    amount: number;
    returnReason:string;
    firstApprovalUser:string;
    firstApprovalStatus:string;
    secondApprovalUser:string;
    secondApprovalStatus:string;
    thirdApprovalUser:string;
    thirdApprovalStatus:string;
    comment:string;
}