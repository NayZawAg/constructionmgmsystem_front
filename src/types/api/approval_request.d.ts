/** 承認依頼一覧 **/
export type ApprovalRequestList = {
  totalCount: number;
  results: ApprovalRequestListResult[];
};

export type ApprovalRequestListResult = {
  id: number;
  reportName: string;
  createdBy: string;
  createdAt: string;
  approvedBy: string;
  approvedAt: string;
  status: string;
  industryCode: string;
  cmsTitle: string;
  requestType: string;
  reportType: string;
};

/** 承認依頼詳細 **/
export type ApprovalRequestDetail = {
  id: number;
  reportName: string;
  createdBy: string;
  createdAt: string;
  approvedBy: string;
  approvedAt: string;
  status: string;
  industryCode: string;
  cmsTitle: string;
  requestType: string;
  remandReason: string;
  reportType: string;
  // 報告書テンプレート
  reportTemplate: {
    id: number;
    reportTemplateName: string;
    reportName: string;
    approvalIsRequired: boolean;
    isEnabled: boolean;
  };
  // 報告書項目
  reportItems: [
    {
      id: number;
      // テンプレート項目
      reportTemplateItem: {
        id: number;
        name: string;
        isRequired: boolean;
        inputFormat: string;
        order: number;
        choices: string[];
      };
      // 項目値
      reportItemValues: {
        id: number;
        value: string;
        imageUuid: string;
        imageCategoryUuid: string;
        cmsUuid: string;
      };
    },
  ];
};
