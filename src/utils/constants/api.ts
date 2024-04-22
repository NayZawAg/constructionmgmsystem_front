/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint @typescript-eslint/no-unused-vars: 0 */
import { url } from 'inspector';
import axios from 'axios';
import router from 'next/router';
import urlJoin from 'url-join';
import { TypeConstructionDetail } from '@/types/api/construction';
import { NEXT_PUBLIC_API_URL } from '@/utils/env';

/**
 * APIレスポンスステータスコード
 */
export const API_STATUS_CODE = {
  HTTP_200_OK: 200, // 処理成功
  HTTP_201_CREATED: 201, // 生成成功
  HTTP_400_BAD_REQUEST: 400, // リクエスト値に誤りがある場合、validationにひっかかる場合
  HTTP_401_UNAUTHORIZED: 401, // headerのアクセストークンが不正な場合
  HTTP_403_FORBIDDEN: 403, // 権限がない場合、編集権限がないユーザーによる削除処理要求など
  HTTP_404_NOT_FOUND: 404, // リソースが存在しない場合、存在しないIDを指定された場合など
  HTTP_422_UNPROCESSABLE_ENTITY: 422, // バリデーションエラーに対して応答
  HTTP_500_INTERNAL_SERVER_ERROR: 500, // 処理中に致命的なエラーが発生した場合、タイムアウト
};

// 協力会社管理のAPI URL
const COOPERATOR_API_URL_BASE = '/v1/cooperator';

/**
 * API エンドポイント
 * @see https://fotome-my.sharepoint.com/:x:/g/personal/s_ogawa_fotome_onmicrosoft_com/EZpJKWZTHL5FtfHwVhpZEHkBtPv18eL7QwCfiSVO2Le7mg?e=9LXqLy
 */
export const API_URL = {
  /** 認証 **/
  auth: {
    // login: urlJoin(NEXT_PUBLIC_API_URL, '/api/auth/login'),
    login: urlJoin('/api/auth/login'),
    token: urlJoin('/api/auth/token'),
    refresh: urlJoin('/api/auth/refresh'),
  },
  nextauth: {
    google: urlJoin('/api/auth/signin/google'),
    session: urlJoin('/api/auth/session'),
  },
  /** header アイコン **/
  header_icon: urlJoin('/api/header_icon'),
  /** 工事 **/
  construction: {
    createEstimatePdf: (id: number) =>
      urlJoin(
        NEXT_PUBLIC_API_URL,
        `/v1/employee/constructions/${id}/create_estimate.json`,
      ),
    downloadEstimatePdf: (id: number, file_name: string) =>
      urlJoin(
        NEXT_PUBLIC_API_URL,
        `/v1/employee/constructions/${id}/download_estimate.json?file_name=${file_name}`,
      ),
    deleteEstimateTmpFile: (id: number, file_name: string) =>
      urlJoin(
        NEXT_PUBLIC_API_URL,
        `/v1/employee/constructions/${id}/delete_estimate_pdf.json?file_name=${file_name}`,
      ),
    list: urlJoin(NEXT_PUBLIC_API_URL, '/v1/employee/constructions.json'),
    recents: urlJoin(
      NEXT_PUBLIC_API_URL,
      '/v1/employee/constructions/recents.json',
    ),
    all: urlJoin(NEXT_PUBLIC_API_URL, '/v1/employee/constructions/all.json'),
    conditionslist: (
      construction_code: string,
      construction_name: string,
      customer_id: number,
      brand_ids: number[],
      east_west_divisions: number[],
      construction_types: number[],
      completion_year_month_from: string,
      completion_year_month_to: string,
      page: number,
      per_page: number,
    ) =>
      urlJoin(
        NEXT_PUBLIC_API_URL,
        `/v1/employee/constructions.json?construction_code=${construction_code}&construction_name=${construction_name}&customer_id=${customer_id}&brand_ids=[${brand_ids}]&east_west_divisions=[${east_west_divisions}]&construction_types=[${construction_types}]&completion_year_month_from=${completion_year_month_from}&completion_year_month_to=${completion_year_month_to}&page=${page}&per_page=${per_page}`,
      ),
    allconditionslist: (
      construction_code: string,
      construction_name: string,
      customer_id: number,
      brand_ids: number[],
      east_west_divisions: number[],
      construction_types: number[],
      completion_year_month_from: string,
      completion_year_month_to: string,
      per_page: number,
    ) =>
      urlJoin(
        NEXT_PUBLIC_API_URL,
        `/v1/employee/constructions.json?construction_code=${construction_code}&construction_name=${construction_name}&customer_id=${customer_id}&brand_ids=[${brand_ids}]&east_west_divisions=[${east_west_divisions}]&construction_types=[${construction_types}]&completion_year_month_from=${completion_year_month_from}&completion_year_month_to=${completion_year_month_to}&per_page=${per_page}`,
      ),
    // CSV DOWNLOAD
    csvdownloadlist: (
      construction_code: string,
      construction_name: string,
      customer_id: number,
      brand_ids: number[],
      east_west_divisions: number[],
      construction_types: number[],
      completion_year_month_from: string,
      completion_year_month_to: string,
      per_page: number,
    ) =>
      urlJoin(
        NEXT_PUBLIC_API_URL,
        `/v1/employee/constructions/csv_download.json?construction_code=${construction_code}&construction_name=${construction_name}&customer_id=${customer_id}&brand_ids=[${brand_ids}]&east_west_divisions=[${east_west_divisions}]&construction_types=[${construction_types}]&completion_year_month_from=${completion_year_month_from}&completion_year_month_to=${completion_year_month_to}&per_page=${per_page}`,
      ),
    addConstructionList: urlJoin(
      NEXT_PUBLIC_API_URL,
      `/v1/employee/constructions.json`,
    ),
    detail: (id: number) =>
      urlJoin(NEXT_PUBLIC_API_URL, `/v1/employee/constructions/${id}.json`),
    update: (id: number) =>
      urlJoin(NEXT_PUBLIC_API_URL, `/v1/employee/constructions/${id}.json`),
    getdetail: (construction_code: string, workflow_no?: string) =>
      urlJoin(
        NEXT_PUBLIC_API_URL,
        `/v1/employee/constructions/get_detail.json?construction_code=${construction_code}&workflow_no=${workflow_no}`,
      ),
    detailwithstatus: (id: number, status: number) =>
      urlJoin(
        NEXT_PUBLIC_API_URL,
        `/v1/employee/constructions/${id}.json?status=${status}`,
      ),
    personalManages: (id: number) =>
      urlJoin(
        NEXT_PUBLIC_API_URL,
        `/v1/employee/constructions/${id}/information_settings/personal_manages.json`,
      ),
    informationsettings: (id: number) =>
      urlJoin(
        NEXT_PUBLIC_API_URL,
        `/v1/employee/constructions/${id}/information_settings.json`,
      ),
    getAddIncDecConstructionsByID: (id: number) =>
      urlJoin(
        NEXT_PUBLIC_API_URL,
        `/v1/employee/constructions/${id}/add_inc_dec_constructions/get_inc_dec_construction_app_id.json`,
      ),
    getAddIncDecConstructions: (id: number) =>
      urlJoin(
        NEXT_PUBLIC_API_URL,
        `/v1/employee/constructions/${id}/add_inc_dec_constructions.json`,
      ),
    addAddIncDecConstruction: (id: number) =>
      urlJoin(
        NEXT_PUBLIC_API_URL,
        `/v1/employee/constructions/${id}/add_inc_dec_constructions`,
      ),
    updateAddIncDecConstruction: (id: number, inc_id: number) =>
      urlJoin(
        NEXT_PUBLIC_API_URL,
        `/v1/employee/constructions/${id}/add_inc_dec_constructions/${inc_id}.json`,
      ),
    estimatedetails: (id: number) =>
      urlJoin(
        NEXT_PUBLIC_API_URL,
        `/v1/employee/constructions/${id}/estimates/add_estimate_details.json`,
      ),
    estimatedetailswithcategoryid: (id: number, estimate_category_id: number) =>
      urlJoin(
        NEXT_PUBLIC_API_URL,
        `/v1/employee/constructions/${id}/estimates.json?estimate_category_id=${estimate_category_id}`,
      ),
    estimateDetailsWithMiddleCategoryId: (
      id: number,
      middle_category_id: number,
    ) =>
      urlJoin(
        NEXT_PUBLIC_API_URL,
        `/v1/employee/constructions/${id}/estimates.json?middle_category_id=${middle_category_id}`,
      ),
    summary: (id: number) =>
      urlJoin(
        NEXT_PUBLIC_API_URL,
        `/v1/employee/constructions/${id}/summary.json`,
      ),
    getInvoiceInformations: (id: number) =>
      urlJoin(
        NEXT_PUBLIC_API_URL,
        `/v1/employee/constructions/${id}/invoice_informations.json`,
      ),
    deleteInvoiceInformations: (id: number, ic_id: number) =>
      urlJoin(
        NEXT_PUBLIC_API_URL,
        `/v1/employee/constructions/${id}/invoice_informations/${ic_id}.json`,
      ),
    downloadInvoiceInformation: (construction_id: number, invoice_id: number) =>
      urlJoin(
        NEXT_PUBLIC_API_URL,
        `/v1/employee/constructions/${construction_id}/invoice_informations/${invoice_id}/download_invoice.json`,
      ),
    downloadInvoicePdf: (id: number, file_name: string) =>
      urlJoin(
        NEXT_PUBLIC_API_URL,
        `/v1/employee/constructions/${id}/invoice_informations/download_invoice_pdf.json?file_name=${file_name}`,
      ),
    deleteInvoiceTmpFile: (id: number, file_name: string) =>
      urlJoin(
        NEXT_PUBLIC_API_URL,
        `/v1/employee/constructions/${id}/invoice_informations/delete_invoice_pdf.json?file_name=${file_name}`,
      ),
    showYear: urlJoin(
      NEXT_PUBLIC_API_URL,
      `/v1/employee/constructions/show_year.json`,
    ),
  },

  order: {
    list: urlJoin(NEXT_PUBLIC_API_URL, '/v1/employee/manage/orders.json'),
    orderConditionlist: (
      construction_code: string,
      construction_name: string,
      middle_category_name: string,
      order_no: string,
      cooperator_name: string,
      order_year_month_from: string,
      order_year_month_to: string,
      page: number,
      per_page: number,
    ) =>
      urlJoin(
        NEXT_PUBLIC_API_URL,
        `/v1/employee/manage/orders.json?construction_code=${construction_code}&construction_name=${construction_name}&middle_category_name=${middle_category_name}&order_no=${order_no}&cooperator_name=${cooperator_name}&order_year_month_from=${order_year_month_from}&order_year_month_to=${order_year_month_to}&page=${page}&per_page=${per_page}`,
      ),
  },

  // 査定
  assessment: {
    list: urlJoin(NEXT_PUBLIC_API_URL, '/v1/cooperator/assessments.json'),
    assessmentConditionList: (
      construction_code: string,
      construction_name: string,
      start_year_month: string,
      completion_year_month: string,
      page: number,
      per_page: number,
    ) =>
      urlJoin(
        NEXT_PUBLIC_API_URL,
        `/v1/cooperator/assessments.json?construction_code=${construction_code}&construction_name=${construction_name}&start_year_month=${start_year_month}&completion_year_month=${completion_year_month}&page=${page}&per_page=${per_page}`,
      ),
    getAssessmentInformation: (id: number) =>
      urlJoin(
        NEXT_PUBLIC_API_URL,
        `/v1/cooperator/assessments/${id}/get_order.json`,
      ),

    addAssessmentInformation: (id: number) =>
      urlJoin(
        NEXT_PUBLIC_API_URL,
        `/v1/cooperator/assessments/${id}/create_application.json`,
      ),
  },
  // 未処理申請
  pending_application: {
    list: urlJoin(
      NEXT_PUBLIC_API_URL,
      `/v1/employee/pending_applications.json`,
    ),
    conditionlist: (
      application_start_date: string,
      application_end_date: string,
      search_type: number,
      page: number,
      per_page: number,
    ) =>
      urlJoin(
        NEXT_PUBLIC_API_URL,
        `/v1/employee/pending_applications.json?application_start_date=${application_start_date}&application_end_date=${application_end_date}&search_type=${search_type}&page=${page}&per_page=${per_page}`,
      ),
    detail: (orderInformationId: number) =>
      urlJoin(
        NEXT_PUBLIC_API_URL,
        `/v1/employee/pending_applications/${orderInformationId}.json`,
      ),
    approval: (
      id: number,
      access_type: string,
      submit_type: string,
      reserve_money: boolean,
      sanwa_comment: string,
    ) =>
      urlJoin(
        NEXT_PUBLIC_API_URL,
        `/v1/employee/pending_applications/approval.json?id=${id}&access_type=${access_type}&submit_type=${submit_type}&reserve_money=${reserve_money}&sanwa_comment=${sanwa_comment}`,
      ),
  },
  request_decision: {
    list: urlJoin(NEXT_PUBLIC_API_URL, '/v1/employee/request_decisions.json'),
    requestDecisionlist: (
      approval_user_id: number,
      search_type: number,
      status: number,
      user_id: number,
      request_decision_name: string,
      completion_year_month_from: string,
      completion_year_month_to: string,
      page: number,
      per_page: number,
    ) =>
      urlJoin(
        NEXT_PUBLIC_API_URL,
        `/v1/employee/request_decisions.json?search_type=${search_type}&approval_user_id=${approval_user_id}&status=${status}&user_id=${user_id}&request_decision_name=${request_decision_name}&completion_year_month_from=${completion_year_month_from}&completion_year_month_to=${completion_year_month_to}&page=${page}&per_page=${per_page}`,
      ),
    addRequestDecisonApplication: urlJoin(
      NEXT_PUBLIC_API_URL,
      `/v1/employee/request_decisions.json`,
    ),
    detail: (id: number) =>
      urlJoin(NEXT_PUBLIC_API_URL, `/v1/employee/request_decisions/${id}.json`),
    update: (id: number) =>
      urlJoin(NEXT_PUBLIC_API_URL, `/v1/employee/request_decisions/${id}.json`),
    cancelRequest: (id: number) =>
      urlJoin(
        NEXT_PUBLIC_API_URL,
        `/v1/employee/request_decisions/${id}/cancel_request.json`,
      ),
    delete: (id: number) =>
      urlJoin(NEXT_PUBLIC_API_URL, `/v1/employee/request_decisions/${id}.json`),
    approval: urlJoin(
      NEXT_PUBLIC_API_URL,
      `/v1/employee/request_decisions/approval.json`,
    ),
  },
  // zipcode: {
  //   getAddressByZipcode: (zipcode: string) =>
  //     urlJoin(NEXT_PUBLIC_API_URL, `/v1/employee/zipcode?zipcode=${zipcode}`),
  // },
  // bank: {
  //   getBankByBankCode: (bank_code: string) =>
  //     urlJoin(
  //       NEXT_PUBLIC_API_URL,
  //       `/v1/cooperator/bank_code.json?bank_code=${bank_code}`,
  //     ),
  // },
  zipcode: {
    getAddressByZipcode: (zipcode: string) =>
      urlJoin(
        NEXT_PUBLIC_API_URL,
        `/v1/master/zip_codes/search.json?zipcode=${zipcode}`,
      ),
  },
  bank: {
    getBankByBankCode: (bank_code: string) =>
      urlJoin(
        NEXT_PUBLIC_API_URL,
        `/v1/master/bank_codes/search_bank_code.json?bank_code=${bank_code}`,
      ),
  },
  branch: {
    getBranchByBranchCode: (bank_code: string, branch_code: string) =>
      urlJoin(
        NEXT_PUBLIC_API_URL,
        `/v1/master/bank_codes/search_branch_code.json?bank_code=${bank_code}&branch_code=${branch_code}`,
      ),
  },
  // branch: {
  //   getBranchByBranchCode: (bank_code: string, branch_code: string) =>
  //     urlJoin(
  //       NEXT_PUBLIC_API_URL,
  //       `/v1/cooperator/bank_code.json?bank_code=${bank_code}&branch_code=${branch_code}`,
  //     ),
  // },
  construction_overview: {
    // list: urlJoin(`/api/constructions/overviews`),
    addConstructionOverview: (id: number) =>
      urlJoin(
        NEXT_PUBLIC_API_URL,
        `/v1/employee/constructions/${id}/overviews.json`,
      ),
    detail: (id: number, o_id: number) =>
      urlJoin(
        NEXT_PUBLIC_API_URL,
        `/v1/employee/constructions/${id}/overviews/${o_id}.json`,
      ),
    update: (id: number, o_id: number) =>
      urlJoin(
        NEXT_PUBLIC_API_URL,
        `/v1/employee/constructions/${id}/overviews/${o_id}.json`,
      ),
    list: (id: number) =>
      urlJoin(
        NEXT_PUBLIC_API_URL,
        `/v1/employee/constructions/${id}/overviews/${id}.json`,
      ),
  },
  construction_structure: {
    List: (id: number) =>
      urlJoin(
        NEXT_PUBLIC_API_URL,
        `/v1/employee/constructions/${id}/structures.json`,
      ),
    add_construction_system: (id: number) =>
      urlJoin(
        NEXT_PUBLIC_API_URL,
        `/v1/employee/constructions/${id}/structures.json`,
      ),
  },
  // 発注会社検索
  get_cooperator: (
    // id: number,
    // small_category_ids: number[],
    middle_category_id: number,
    cooperator_name: string,
  ) =>
    urlJoin(
      NEXT_PUBLIC_API_URL,
      `/v1/employee/cooperators/get_cooperators.json?middle_category_id=${middle_category_id}&cooperator_name=${cooperator_name}`,
    ),
  // 協力会社検索／工事
  get_construction: (cooperator_id: number) =>
    urlJoin(
      NEXT_PUBLIC_API_URL,
      `/v1/employee/cooperators/get_constructions.json?cooperator_id=${cooperator_id}`,
    ),

  // 発注一覧
  get_order: (
    construction_code: string,
    construction_name: string,
    cooperator_name: string,
    middle_category_name: string,
  ) =>
    urlJoin(
      NEXT_PUBLIC_API_URL,
      `/v1/employee/manage/orders.json?construction_code=${construction_code}&construction_name=${cooperator_name}&construction_name=${cooperator_name}&middle_category_name=${middle_category_name}`,
    ),

  application: {
    list: urlJoin(`/api/applications`),
  },
  approval: {
    list: urlJoin(`/api/approvals`),
  },
  applicationDetail: {
    list: urlJoin(`/api/applicationDetails`),
  },
  pendingApplication: {
    list: urlJoin(`/api/pendingApplications`),
  },
  customer: {
    list: urlJoin(NEXT_PUBLIC_API_URL, `/v1/master/customers.json`),
    detail: (id: number) => urlJoin(`/api/customers/${id}`),
  },
  customers: {
    getCustomerList: (company_name: string, page: number, per_page: number) =>
      urlJoin(
        NEXT_PUBLIC_API_URL,
        `/v1/employee/customers.json?company_name=${company_name}&page=${page}&per_page=${per_page}`,
      ),
    detail: (id: number, isCreate: number) =>
      urlJoin(
        NEXT_PUBLIC_API_URL,
        `/v1/employee/customers/${id}.json?&isCreate=${isCreate}`,
      ),
    add_customer: () =>
      urlJoin(
        NEXT_PUBLIC_API_URL,
        `/v1/employee/customers/create_application.json`,
      ),
    update_customer: (id: number) =>
      urlJoin(NEXT_PUBLIC_API_URL, `/v1/employee/customers/${id}.json`),
  },
  brand: {
    list: urlJoin(NEXT_PUBLIC_API_URL, `/v1/master/brands.json`),
  },
  /** 得意先 **/
  supplier: {
    list: urlJoin('/api/suppliers'),
  },
  user: {
    list: urlJoin(NEXT_PUBLIC_API_URL, '/v1/master/users.json'),
  },
  employee: {
    list: urlJoin(NEXT_PUBLIC_API_URL, '/v1/master/employees.json'),
  },
  costCategories: {
    list: urlJoin('/api/constructions/costCategories'),
  },
  approval_request: {
    list: urlJoin('/api/approval_request'),
  },
  // account list
  account: {
    list: urlJoin(NEXT_PUBLIC_API_URL, `/v1/master/account_titles.json`),
  },
  // expense list
  expense: {
    list: urlJoin(NEXT_PUBLIC_API_URL, `/v1/master/expenses.json`),
  },
  // department list
  department: {
    list: urlJoin(NEXT_PUBLIC_API_URL, `/v1/master/departments.json`),
  },
  request: {
    list: urlJoin(
      NEXT_PUBLIC_API_URL,
      `/v1/employee/request_decision_applications.json`,
    ),
  },
  transportation: {
    list: urlJoin(NEXT_PUBLIC_API_URL, `/v1/master/transpotations.json`),
  },
  approvalData: {
    list: urlJoin(
      NEXT_PUBLIC_API_URL,
      '/v1/employee/request_decisions/request_decision_flows.json ',
    ),
  },
  organization: {
    list: urlJoin(NEXT_PUBLIC_API_URL, `/v1/master/organizations.json`),
  },
  approvaldetails: {
    list: urlJoin(`/api/approvalDetails`),
    detail: (id: number) => urlJoin(`/api/approvalDetails/${id}`),
  },
  cooperators: {
    list: urlJoin(`/api/cooperators`),
    detail: (id: number) => urlJoin(`/api/cooperators/${id}`),
  },

  smallcategory: {
    list: (middle_category_id: number) =>
      urlJoin(
        NEXT_PUBLIC_API_URL,
        `/v1/master/small_categories.json?middle_category_id=${middle_category_id}`,
      ),
  },

  units: {
    list: urlJoin(NEXT_PUBLIC_API_URL, `/v1/master/units.json`),
  },

  // 承認状況
  apply_applications: (id: number) =>
    urlJoin(
      NEXT_PUBLIC_API_URL,
      `/v1/employee/constructions/${id}/apply_completion.json`,
    ),

  // 工事申請
  construction_applications: urlJoin(
    NEXT_PUBLIC_API_URL,
    '/v1/employee/construction_applications.json',
  ),
  add_construction_system: (id: number) =>
    urlJoin(
      NEXT_PUBLIC_API_URL,
      `/v1/employee/constructions/${id}/structures.json`,
    ),

  // パスワード変更Token
  request_token: urlJoin(
    NEXT_PUBLIC_API_URL,
    '/v1/cooperator/request_reset_password.json',
  ),
  // パスワード変更Get
  get_reset_password: (password_token: string) =>
    urlJoin(
      NEXT_PUBLIC_API_URL,
      `/v1/cooperator/reset_password_token.json?password_token=${password_token}`,
    ),

  // パスワード変更
  reset_password: urlJoin(
    NEXT_PUBLIC_API_URL,
    '/v1/cooperator/reset_password.json',
  ),
  post: {
    list: urlJoin(NEXT_PUBLIC_API_URL, '/v1/master/posts.json'),
  },
  cooperator: {
    auth: {
      login: urlJoin(
        NEXT_PUBLIC_API_URL,
        COOPERATOR_API_URL_BASE,
        '/auths.json',
      ),
      refresh: urlJoin(
        NEXT_PUBLIC_API_URL,
        COOPERATOR_API_URL_BASE,
        '/auths/refresh_token.json',
      ),
      logout: urlJoin(NEXT_PUBLIC_API_URL, COOPERATOR_API_URL_BASE, '/auths'),
    },
    basicInfo: () =>
      urlJoin(
        NEXT_PUBLIC_API_URL,
        `/v1/cooperator/cooperators/basic_info.json`,
      ),
    detail: (id: number) =>
      urlJoin(NEXT_PUBLIC_API_URL, `/v1/employee/cooperators/${id}.json`),
    cooperator_structure: (id: number) =>
      urlJoin(
        NEXT_PUBLIC_API_URL,
        `/v1/employee/constructions/${id}/structures/cooperators.json`,
      ),
    conditionslist: (
      cooperator_code: string,
      cooperator_name: string,
      address: string,
      construction_type_name: string,
      page: number,
      per_page: number,
    ) =>
      urlJoin(
        NEXT_PUBLIC_API_URL,
        `/v1/employee/cooperators.json?cooperator_code=${cooperator_code}&cooperator_name=${cooperator_name}&address=${address}&construction_type_name=${construction_type_name}&page=${page}&per_page=${per_page}`,
      ),
    addCooperatorList: urlJoin(
      NEXT_PUBLIC_API_URL,
      `/v1/employee/cooperators.json`,
    ),
    update: (id: number) =>
      urlJoin(NEXT_PUBLIC_API_URL, `/v1/employee/cooperators/${id}.json`),
  },
  middleCategory: {
    list: urlJoin(NEXT_PUBLIC_API_URL, `/v1/master/middle_categories.json`),
  },
  cooperatingCompanyRanks: {
    list: urlJoin(
      NEXT_PUBLIC_API_URL,
      `/v1/master/cooperating_company_ranks.json`,
    ),
  },
  estimates: {
    List: (id: number) =>
      urlJoin(
        NEXT_PUBLIC_API_URL,
        `/v1/employee/constructions/${id}/estimates/categories_list.json`,
      ),
    addCategories: (id: number) =>
      urlJoin(
        NEXT_PUBLIC_API_URL,
        `/v1/employee/constructions/${id}/estimates/add_categories_list.json`,
      ),
    getEstimateMenu: (id: number) =>
      urlJoin(
        NEXT_PUBLIC_API_URL,
        `/v1/employee/constructions/${id}/estimates/all_categories.json`,
      ),
    summary: (id: number) =>
      urlJoin(
        NEXT_PUBLIC_API_URL,
        `/v1/employee/constructions/${id}/estimates/summary.json`,
      ),
    application: (id: number) =>
      urlJoin(
        NEXT_PUBLIC_API_URL,
        `/v1/employee/constructions/${id}/estimates/confirm.json`,
      ),
    updateSmallCategoryName: (
      id: number,
      entry_small_category_name: string,
      estimate_small_category_id: number,
    ) =>
      urlJoin(
        NEXT_PUBLIC_API_URL,
        `/v1/employee/constructions/${id}/estimates/update_estimate_small_categories?estimate_small_category_id=${estimate_small_category_id}&entry_small_category_name=${entry_small_category_name}`,
      ),
    delete_estimate_small_category: (
      id: number,
      estimate_small_category_id: number,
    ) =>
      urlJoin(
        NEXT_PUBLIC_API_URL,
        `/v1/employee/constructions/${id}/estimates/delete_estimate_small_categories?estimate_small_category_id=${estimate_small_category_id}`,
      ),
  },
  costs: {
    getCostManageMenu: (constructionId: number) =>
      urlJoin(
        NEXT_PUBLIC_API_URL,
        `/v1/employee/constructions/${constructionId}/costs/all_categories.json`,
      ),
    costCategoriesList: (id: number) =>
      urlJoin(
        NEXT_PUBLIC_API_URL,
        `/v1/employee/constructions/${id}/costs/cost_categories_list.json`,
      ),
    addCostCategories: (id: number) =>
      urlJoin(
        NEXT_PUBLIC_API_URL,
        `/v1/employee/constructions/${id}/costs/add_cost_categories_list.json`,
      ),
    summary: (id: number) =>
      urlJoin(
        NEXT_PUBLIC_API_URL,
        `/v1/employee/constructions/${id}/costs/summary.json`,
      ),
    getCostManage: (
      id: number,
      cost_category_id: number,
      middle_category_id: number,
    ) =>
      urlJoin(
        NEXT_PUBLIC_API_URL,
        `/v1/employee/constructions/${id}/costs.json?cost_category_id=${cost_category_id}&middle_category_id=${middle_category_id}`,
      ),
    addCostDetails: (id: number, cost_category_id: number) =>
      urlJoin(
        NEXT_PUBLIC_API_URL,
        `/v1/employee/constructions/${id}/costs/add_cost_details.json?cost_category_id=${cost_category_id}`,
      ),
    getTotalCostManage: (id: number, middle_category_id: number) =>
      urlJoin(
        NEXT_PUBLIC_API_URL,
        `v1/employee/constructions/${id}/costs/calculation_cost_total_amount.json?middle_category_id=${middle_category_id}`,
      ),
    reason: {
      list: urlJoin(NEXT_PUBLIC_API_URL, `/v1/master/reasons.json`),
    },
    department: {
      list: urlJoin(NEXT_PUBLIC_API_URL, `/v1/master/departments.json`),
    },
    delete_cost_small_category: (
      construction_id: number,
      cost_small_category_id: number,
    ) =>
      urlJoin(
        NEXT_PUBLIC_API_URL,
        `v1/employee/constructions/${construction_id}/costs/delete_cost_small_categories.json?cost_small_category_id=${cost_small_category_id}`,
      ),
  },
  costManage: {
    list: (constructionId: number, cost_category_id: number) =>
      urlJoin(
        NEXT_PUBLIC_API_URL,
        `/v1/employee/constructions/${constructionId}/costs/${cost_category_id}/orders.json`,
      ),
    alllist: (
      constructionId: number,
      cost_category_id: number,
      order_information_id: number,
      assessment_status: number,
    ) =>
      urlJoin(
        NEXT_PUBLIC_API_URL,
        `/v1/employee/constructions/${constructionId}/costs/${cost_category_id}/orders/get_order_update.json?order_no=${order_information_id}&assessment_status=${assessment_status}`,
      ),
    addOrder: (construction_id: number, cost_id: number) =>
      urlJoin(
        NEXT_PUBLIC_API_URL,
        `/v1/employee/constructions/${construction_id}/costs/${cost_id}/orders.json`,
      ),
    updateOrder: (construction_id: number, cost_id: number) =>
      urlJoin(
        NEXT_PUBLIC_API_URL,
        `/v1/employee/constructions/${construction_id}/costs/${cost_id}/orders/update_order_application.json`,
      ),
  },
  // 社員立って替え
  employee_expense: {
    getExpenseApplication: () =>
      urlJoin(
        NEXT_PUBLIC_API_URL,
        `/v1/employee/constructions/employee_expenses/get_application.json`,
      ),
    update: (id: number | undefined) =>
      urlJoin(
        NEXT_PUBLIC_API_URL,
        `/v1/employee/constructions/employee_expenses/${id}.json`,
      ),
    getExpenseApproval: () =>
      urlJoin(
        NEXT_PUBLIC_API_URL,
        `/v1/employee/constructions/employee_expenses/get_approval.json`,
      ),
    getExpenseDetail: (application_date: string) =>
      urlJoin(
        NEXT_PUBLIC_API_URL,
        `/v1/employee/constructions/employee_expenses/get_detail.json?application_date=${application_date}`,
      ),
    detail: (id: number) =>
      urlJoin(
        NEXT_PUBLIC_API_URL,
        `v1/employee/constructions/employee_expenses/${id}.json`,
      ),
    addExpenseCalculationList: urlJoin(
      NEXT_PUBLIC_API_URL,
      `/v1/employee/constructions/employee_expenses`,
    ),
    addExpenseTransportation: urlJoin(
      NEXT_PUBLIC_API_URL,
      `/v1/employee/constructions/employee_expenses`,
    ),
    applicationExpenses: () =>
      urlJoin(
        NEXT_PUBLIC_API_URL,
        `/v1/employee/constructions/employee_expenses/application_expenses.json `,
      ),
    approvalExpenses: () =>
      urlJoin(
        NEXT_PUBLIC_API_URL,
        `/v1/employee/constructions/employee_expenses/approval_expenses.json `,
      ),
    deleteExpenses: (id: number) =>
      urlJoin(
        NEXT_PUBLIC_API_URL,
        `/v1/employee/constructions/employee_expenses/${id}.json `,
      ),
  },

  users: {
    list: urlJoin(NEXT_PUBLIC_API_URL, `/v1/master/users.json`),
  },

  workflow: {
    workflow_name_list: urlJoin(
      NEXT_PUBLIC_API_URL,
      `/v1/employee/workflows/workflow_name.json`,
    ),
    wf_approval_user_list: urlJoin(
      NEXT_PUBLIC_API_URL,
      `/v1/employee/workflows/approval_user_list.json`,
    ),
    wf_application_user_list: urlJoin(
      NEXT_PUBLIC_API_URL,
      `/v1/employee/workflows/application_user_list.json`,
    ),
    wf_application_date: urlJoin(
      NEXT_PUBLIC_API_URL,
      `/v1/employee/workflows/get_application_date.json`,
    ),
    getApplicationList: (
      workflow_name: string,
      construction_code: string,
      construction_name: string,
      approval_user: number,
      start_year_month: string,
      completion_year_month: string,
      page: number,
      per_page: number,
    ) =>
      urlJoin(
        NEXT_PUBLIC_API_URL,
        `/v1/employee/workflows/get_application.json?workflow_name=${workflow_name}&construction_code=${construction_code}&construction_name=${construction_name}&approval_user=${approval_user}&start_year_month=${start_year_month}&completion_year_month=${completion_year_month}&page=${page}&per_page=${per_page}`,
      ),
    getApprovalList: (
      workflow_name: string,
      construction_code: string,
      construction_name: string,
      application_user: number,
      included_all_approval: boolean,
      start_year_month: string,
      completion_year_month: string,
      page: number,
      per_page: number,
    ) =>
      urlJoin(
        NEXT_PUBLIC_API_URL,
        `/v1/employee/workflows/get_approval.json?workflow_name=${workflow_name}&construction_code=${construction_code}&construction_name=${construction_name}&application_user=${application_user}&start_year_month=${start_year_month}&completion_year_month=${completion_year_month}&included_all_approval=${included_all_approval}&page=${page}&per_page=${per_page}`,
      ),
    getManageList: (
      workflow_name: string,
      construction_code: string,
      construction_name: string,
      application_user: number,
      approval_user: number,
      start_year_month: string,
      completion_year_month: string,
      page: number,
      per_page: number,
    ) =>
      urlJoin(
        NEXT_PUBLIC_API_URL,
        `/v1/employee/workflows/get_manage.json?workflow_name=${workflow_name}&construction_code=${construction_code}&construction_name=${construction_name}&application_user=${application_user}&approval_user=${approval_user}&start_year_month=${start_year_month}&completion_year_month=${completion_year_month}&page=${page}&per_page=${per_page}`,
      ),
    setApprovalWorkflow: () =>
      urlJoin(
        NEXT_PUBLIC_API_URL,
        `/v1/employee/workflows/create_approval.json`,
      ),
    setCancelApplication: () =>
      urlJoin(
        NEXT_PUBLIC_API_URL,
        `/v1/employee/workflows/cancel_application.json`,
      ),
    getCustomerApplicationContent: (workflow_no: string) =>
      urlJoin(
        NEXT_PUBLIC_API_URL,
        `/v1/employee/workflows/get_customer.json?workflow_no=${workflow_no}`,
      ),
    getConstructionApplicationContent: (workflow_no: string) =>
      urlJoin(
        NEXT_PUBLIC_API_URL,
        `/v1/employee/workflows/get_construction.json?workflow_no=${workflow_no}`,
      ),

    getEstimateApplicationContent: (constructionId: number) =>
      urlJoin(
        NEXT_PUBLIC_API_URL,
        `/v1/employee/workflows/get_estimate.json?construction_id=${constructionId}`,
      ),
    getCostApplicationContent: (workflow_no: string) =>
      urlJoin(
        NEXT_PUBLIC_API_URL,
        `/v1/employee/workflows/get_cost.json?workflow_no=${workflow_no}`,
      ),
    getOrderApplicationContent: (workflow_no: string) =>
      urlJoin(
        NEXT_PUBLIC_API_URL,
        `/v1/employee/workflows/get_order.json?workflow_no=${workflow_no}`,
      ),
    getAddIncDecApplicationContent: (workflow_no: string) =>
      urlJoin(
        NEXT_PUBLIC_API_URL,
        `/v1/employee/workflows/get_add_inc_dec.json?workflow_no=${workflow_no}`,
      ),
    getApprovalUser: (workflow_no: string) =>
      urlJoin(
        NEXT_PUBLIC_API_URL,
        `/v1/employee/workflows/get_approval_user.json?workflow_no=${workflow_no}`,
      ),
    addPositionList: urlJoin(
      NEXT_PUBLIC_API_URL,
      `/v1/employee/workflows/create_position.json`,
    ),
    addBrandList: urlJoin(
      NEXT_PUBLIC_API_URL,
      `/v1/employee/workflows/create_brand.json`,
    ),
    addWorkflowList: urlJoin(
      NEXT_PUBLIC_API_URL,
      `/v1/employee/workflows/create_workflow_approval_flow.json`,
    ),
    addRequestDecisonList: urlJoin(
      NEXT_PUBLIC_API_URL,
      `/v1/employee/workflows/create_request_decision_flow.json`,
    ),
    getAllUsers: urlJoin(
      NEXT_PUBLIC_API_URL,
      `/v1/employee/workflows/get_all_users.json`,
    ),
    getAllPositions: urlJoin(
      NEXT_PUBLIC_API_URL,
      `/v1/employee/workflows/get_all_positions.json`,
    ),
  },
};
