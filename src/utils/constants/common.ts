import type { SideMenuType } from '@/components/commons/sidebar/sidebar';
import { ExternalLinkageType } from '@/components/externalLinkages/externalLinkageList';
import { toFixed } from '@/utils/calculation';

// リスト取得APIの1ページ当たりの取得件数
export const GET_LIST_LIMIT_COUNT = 20;

// テーブルの最大表示ページ数
export const TABLE_PAGE_MAX_COUNT = 5;

// 日付フォーマット
export const DATE_FORMAT = 'YYYY-MM-DD';
export const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';
export const DATE_FORMAT_DISPLAY = 'YYYY年MM月DD日';
export const DATE_FORMAT_DISPLAY_SMALL = 'yyyy年mm月dd日';
export const DATE_TIME_FORMAT_DISPLAY = 'YYYY年MM月DD日 HH:mm';
export const CALENDAR_FORMAT = 'yy年mm月dd日';
export const FORM_CALENDER_FORMAT = 'yy/mm/dd';

// カナ正規表現
// 口座名義人カナ
// eslint-disable-next-line no-useless-escape, no-irregular-whitespace
export const REG_ACCOUNT_HOLDER = /^[ｧ-ﾟ0-9a-zA-Z() .-\/ァ-ワン-ヶー０-９ａ-ｚＡ-Ｚ（）　．－／・]+$/
// 宛名カナ、代表者名カナ
// eslint-disable-next-line no-irregular-whitespace
export const REG_ZENKAKU_KANA_SPACE = /^[ァ-ヶー 　]+$/
// 上記以外（会社名カナ、支店／部署カナ・・・）
export const REG_ZENKAKU_KANA_ONLY = /^[ァ-ヶー]+$/

// ファイル拡張子
export const FILE_EXTENSIONS = [
  'jpg',
  'png',
  'heic',
  'heif',
  'jpeg',
  'pdf',
  'csv',
  'xlsx',
  'xls',
  'xlsm',
  'xlsb',
  'xltx',
  'xltm',
  'xml',
  'xlt',
  'xlam',
  'xlr',
  'xlw',
  'xla',
];

export const FILE_TYPES = 'image/heic, image/heif, image/jpg, image/jpeg, image/png, application/pdf, text/csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'

// 工事のページURL
const CONSTRUCTION_PAGE_URL_BASE = '/constructions';
const APPLICATION_PAGE_URL_BASE = '/payments';
// 得意先のページURL
const CUSTOMER_PAGE_URL_BASE = '/customers';
// 管理のページURL
const MANAGE_PAGE_URL_BASE = '/manage';
// 組織のページURL
const ORGANIZATION_PAGE_URL_BASE = '/organizations';
// 協力会社のページURL
const COOPERATOR_PAGE_URL_BASE = '/cop';
//稟議管理のページURL
const EMPLOYEE_EXPENSES_PAGE_URL_BASE = '/employee-expenses';
//稟議管理のページURL
const REQUEST_PAGE_URL_BASE = '/requests';
//ワークフローのページURL
const WORKFLOW_PAGE_URL_BASE = '/workflows';
// 管理承認ルート登録
const MANAGE_APPROVAL_ROUTE_NEW_BASE = '/approval_route';
/**
 * フロントエンドの各ページのURL管理
 */
export const PAGE_URL = {
  // ユーザ
  USER: {
    // ログイン
    LOGIN: {
      TOP: '/login',
      CERTIFIED: '/login/certified',
    },
    /** ログアウト（COOPERATORと遷移先違うので注意） */
    LOGOUT: '/logout',
    // TOP
    TOP: '/',
    // ダッシュボードTOP
    DASHBOARD: '/dashboard',
    // 工事
    CONSTRUCTION: {
      // 工事検索/一覧
      SEARCH: `${CONSTRUCTION_PAGE_URL_BASE}`,
      // 工事詳細
      SHOW: (id: string) => `${CONSTRUCTION_PAGE_URL_BASE}/${id}`,
      // 工事追加
      NEW: `${CONSTRUCTION_PAGE_URL_BASE}/new`,
      // 工事変更
      EDIT: (id: string) => `${CONSTRUCTION_PAGE_URL_BASE}/${id}/edit`,
      // ダッシュボード工事
      DASHBOARD: `${CONSTRUCTION_PAGE_URL_BASE}/dashboard`,
      //工事情報設定
      INFORMATION_SETTINGS: (id: number) =>
        `${CONSTRUCTION_PAGE_URL_BASE}/${id}/information-settings`,
    },
    EMPLOYEE_EXPENSES: {
      //申請一覧
      APPLICATION: `${CONSTRUCTION_PAGE_URL_BASE}${EMPLOYEE_EXPENSES_PAGE_URL_BASE}/applications`,
      //承認一覧
      APPROVAL: `${CONSTRUCTION_PAGE_URL_BASE}${EMPLOYEE_EXPENSES_PAGE_URL_BASE}/approvals`,
      //明細一覧
      DETAILS: `${CONSTRUCTION_PAGE_URL_BASE}${EMPLOYEE_EXPENSES_PAGE_URL_BASE}/details`,
    },
    //稟議管理
    REQUEST: {
      //稟議申請一覧
      APPLICATION: `${REQUEST_PAGE_URL_BASE}/applications`,
      //稟議承認一覧
      APPROVAL: `${REQUEST_PAGE_URL_BASE}/approvals`,
    },
    // ワークフロー
    WORKFLOW: {
      // ワークフロー申請一覧
      APPLICATION: `${WORKFLOW_PAGE_URL_BASE}/applications`,
      // ワークフロー承認一覧
      APPROVAL: `${WORKFLOW_PAGE_URL_BASE}/approvals`,
    },
    // 未処理申請
    PENDING: {
      // 未処理申請の処理一覧
      APPLICATION: '/pending-applications',
    },
    // 立ち替
    PAYMENT: {
      APPLICATION: `${APPLICATION_PAGE_URL_BASE}/application`,
    },
    // 得意先
    CUSTOMER: {
      // 得意先/一覧
      SEARCH: `${CUSTOMER_PAGE_URL_BASE}`,
      // 得意先追加
      NEW: `${CUSTOMER_PAGE_URL_BASE}/new`,
    },
    // 協力会社
    COO_COMPANY: {
      // 得意先/一覧
      SEARCH: '/cooperators',
      // 得意先追加
      NEW: '/cooperators/new',
    },
    // 得意先
    CON_STU_TABLE: `${CUSTOMER_PAGE_URL_BASE}/search`,
    // 得意先
    EXP_CALCULATION: `${CUSTOMER_PAGE_URL_BASE}/search`,
    // 得意先
    EXP_APPLICATION: `${APPLICATION_PAGE_URL_BASE}/application`,
    // 発注一覧
    // ORD_LIST: `${MANAGE_PAGE_URL_BASE}/orders`,
    ORD_LIST: `/orders`,
    // 得意先
    APP_REQUEST: `${CUSTOMER_PAGE_URL_BASE}/search`,
    // 得意先
    APP_LIST: `${CUSTOMER_PAGE_URL_BASE}/search`,
    // 得意先
    MAINTENCE: `${CUSTOMER_PAGE_URL_BASE}/search`,
    // 得意先
    BUL_RECORD: `${CUSTOMER_PAGE_URL_BASE}/search`,
    // 得意先
    HET_CALL: `${CUSTOMER_PAGE_URL_BASE}/search`,
    // 管理
    MANAGE: {
      // 承認ルート登録
      APP_ROT_NEW: `${MANAGE_PAGE_URL_BASE}${MANAGE_APPROVAL_ROUTE_NEW_BASE}/new`,
      // 経費取り込み
      EXP_CAPTURE: `${MANAGE_PAGE_URL_BASE}/expense_capture`,
      // 組織
      ORGANIZATION: {
        // 組織コード検索
        SEARCH: `${MANAGE_PAGE_URL_BASE}${ORGANIZATION_PAGE_URL_BASE}/search`,
      },
      // ワークフロー管理
      WORKFLOW: `${MANAGE_PAGE_URL_BASE}/workflows`,
    },
  },
  // 協力会社
  COOPERATOR: {
    // ログイン
    LOGIN: {
      TOP: `${COOPERATOR_PAGE_URL_BASE}/login`,
      CERTIFIED: `${COOPERATOR_PAGE_URL_BASE}/login/certified`,
    },
    // ログアウト
    LOGOUT: `${COOPERATOR_PAGE_URL_BASE}/logout`,
    // TOP
    TOP: `${COOPERATOR_PAGE_URL_BASE}`,
    // ダッシュボードTOP
    DASHBOARD: `${COOPERATOR_PAGE_URL_BASE}/dashboard`,
    // 案件（査定）一覧
    ASSESSMENT: `${COOPERATOR_PAGE_URL_BASE}/assessments`,
    // 基本情報
    BASIC_INFO: `${COOPERATOR_PAGE_URL_BASE}/basic-info`,
    // 支払い一覧
    PAYMENT: `${COOPERATOR_PAGE_URL_BASE}/payments`,
  },
};

// 区分タイプ
export const BUSINESS_FORM_TYPE = {
  SOLO: 'SOLE_PROPRIETORSHIP', // 個人
  CORPORATE: 'CORPORATE', // 法人
};

// 工事フロー
export const PROJECT_STATUS_JA = {
  RECEPTION: '依頼受付',
  BEFORE_QUOTATION: '見積もり作成前',
  BEFORE_CONTRUCT: '契約前',
  BEFORE_CONSTRUCTION: '着工前',
  IN_PROGRESS_CONSTRUCTION: '着工中',
  COMPLETE_CONSTRUCTION: '完工',
  PAYMENT_COMPLETED: '精算完了',
  FAILURE: '失注',
};

// 承認依頼ステータス
export const APPROVAL_REQUEST_STATUS = {
  UNNECESSARY: '',
  UNAPPROVED: '未承認',
  APPROVED: '承認済',
  REMAND: '差戻',
};

/**
 * Cookieのキー一覧
 */
export const COOKIE_KEYS = {
  // employeeアクセス用のトークン
  apiAccessToken: 'apiAccessToken',
  apiRefreshToken: 'apiRefreshToken',
  apiAccessTokenExpires: 'accessTokenExpires',
  apiRefreshTokenExpires: 'refreshTokenExpires',
  // cooperatorアクセス用のトークン
  cooperatorApiAccessToken: 'cooperatorApiAccessToken',
  cooperatorApiRefreshToken: 'cooperatorApiRefreshToken',
  /** ログイン成功時の遷移先url */
  loginCompletedRedirectUrl: 'loginCompletedRedirectUrl',
  /** ログイン実行画面の種別(employee, cooperator) */
  loginType: 'loginType',
  userType: 'userType',
};

/** ログイン種別 */
export const LOGIN_TYPE = {
  employee: '1',
  cooperator: '2',
} as const;

// データテーブルが空のメッセージ
export const EMPTY_MESSAGE = '表示するデータがありません。';

// PC,SPのbreakpoint
export const BREAKPOINT = 768;

// トーストの表示時間
export const TOAST_LIFE = 6000;

/**
 * ユーザ画面表示時のサイドメニュー項目
 */
export const USER_SIDE_MENUS: SideMenuType[][] = [
  [
    {
      label: '工事',
      auth: 'EU_CONSTRUCTION_LABEL',
      icon: 'FlashOn'
    },
  ],
  [
    {
      label: '一覧',
      auth: 'EU_CONSTRUCTION',
      url: PAGE_URL.USER.CONSTRUCTION.SEARCH,
      icon: 'Apps'
    },
    {
      label: '新規登録',
      auth: 'EU_CONSTRUCTION_NEW',
      url: PAGE_URL.USER.CONSTRUCTION.NEW,
      icon: 'AddCircleOutline'
    },
  ],
  [
    {
      label: '得意先',
      auth: 'EU_CUSTOMER_LABEL',
      icon: 'Assistant'
    },
  ],
  [
    {
      label: '一覧',
      auth: 'EU_CUSTOMERS',
      url: PAGE_URL.USER.CUSTOMER.SEARCH,
      icon: 'Apps'
    },
    {
      label: '新規登録',
      auth: 'EU_CUSTOMERS_NEW',
      url: PAGE_URL.USER.CUSTOMER.NEW,
      icon: 'AddCircleOutline'
    },
  ],
  [
    {
      label: '協力会社',
      auth: 'EU_COOPERATOR_LABEL',
      icon: 'Business'
    },
  ],
  [
    {
      label: '一覧',
      auth: 'EU_COOPERATORS',
      url: PAGE_URL.USER.COO_COMPANY.SEARCH,
      icon: 'Apps'
    },
    {
      label: '新規登録',
      auth: 'EU_COOPERATORS_NEW',
      url: PAGE_URL.USER.COO_COMPANY.NEW,
      icon: 'AddCircleOutline'
    },
  ],
  [
    {
      label: '工事現況表',
      auth: 'EU_CONSTRUCTION_STATUS_TABLE',
      disabled: true,
      url: PAGE_URL.USER.CON_STU_TABLE,
      icon: 'Assignment'
    },
  ],
  [
    {
      label: '立替経費精算',
      auth: 'EU_ADVANCE_EXPENSE_SETTLEMENT_LABEL',
      icon: 'CurrencyYen'
    },
  ],
  [
    {
      label: '一覧・新規登録',
      auth: 'EU_CONSTRUCTION_EMPLOYEE_EXPENSES_APPLICATION',
      url: PAGE_URL.USER.EMPLOYEE_EXPENSES.APPLICATION,
      icon: 'AddCircleOutline'
    },
    {
      label: '承認一覧',
      auth: 'EU_CONSTRUCTION_EMPLOYEE_EXPENSES_APPROVALS',
      url: PAGE_URL.USER.EMPLOYEE_EXPENSES.APPROVAL,
      icon: 'Apps'
    },
    {
      label: '明細一覧',
      auth: 'EU_CONSTRUCTION_EMPLOYEE_EXPENSES',
      url: PAGE_URL.USER.EMPLOYEE_EXPENSES.DETAILS,
      icon: 'Apps'
    },
  ],
  [
    {
      label: '発注一覧',
      auth: 'EU_ORDERS',
      url: PAGE_URL.USER.ORD_LIST,
      icon: 'PlaylistAddCheck'
    },
  ],
  [
    {
      label: '申請／承認',
      auth: 'EU_APP_REQUEST_LABEL',
      icon: 'PlaylistAddCheck'
    },
  ],
  [
    {
      label: '稟議申請／一覧',
      auth: 'EU_REQUESTS_APPLICATIONS',
      url: PAGE_URL.USER.REQUEST.APPLICATION,
      icon: 'PlaylistAddCheck'
    },
    {
      label: '稟議承認／一覧',
      auth: 'EU_REQUESTS_APPROVALS',
      url: PAGE_URL.USER.REQUEST.APPROVAL,
      icon: 'PlaylistAddCheck'
    },
    {
      label: 'ﾜｰｸﾌﾛｰ申請一覧',
      auth: 'EU_WORKFLOW_SEARCH',
      url: PAGE_URL.USER.WORKFLOW.APPLICATION,
      icon: 'PlaylistAddCheck'
    },
    {
      label: 'ﾜｰｸﾌﾛｰ承認一覧',
      auth: 'EU_WORKFLOW_APPROVALS',
      url: PAGE_URL.USER.WORKFLOW.APPROVAL,
      icon: 'PlaylistAddCheck'
    },
    {
      label: '査定承認／一覧',
      auth: 'EU_PENDING_APP',
      url: PAGE_URL.USER.PENDING.APPLICATION,
      icon: 'PlaylistAddCheck'
    },
    {
      label: 'メンテナンス',
      auth: 'EU_MAINTENCE',
      disabled: true,
      url: PAGE_URL.USER.MAINTENCE,
      icon: 'Engineering'
    },
    {
      label: '建物カルテ',
      auth: 'EU_BUL_RECORD',
      disabled: true,
      url: PAGE_URL.USER.BUL_RECORD,
      icon: 'Apartment'
    },
    {
      label: 'ハートコール',
      auth: 'EU_HET_CALL',
      disabled: true,
      url: PAGE_URL.USER.HET_CALL,
      icon: 'Call'
    },
  ],
];

/**
 * 管理画面表示時のサイドメニュー項目
 */
export const USER_MANAGE_SIDE_MENUS: SideMenuType[][] = [
  [
    {
      label: '管理',
      auth: 'EM_MANAGE_LABEL',
      icon: 'Settings'
    },
  ],
  [
    {
      label: '承認ルート登録',
      auth: 'EM_APPROVAL_ROUTE_REGISTRATION',
      url: PAGE_URL.USER.MANAGE.APP_ROT_NEW,
      icon: 'AddCircleOutline'
    },
    {
      label: '経費取込',
      auth: 'EM_EXPENSE_CAPTURE',
      url: PAGE_URL.USER.MANAGE.EXP_CAPTURE,
      icon: 'CloudUpload'
    },
    {
      label: 'ﾜｰｸﾌﾛｰ管理',
      auth: 'EM_WORKFLOW',
      url: PAGE_URL.USER.MANAGE.WORKFLOW,
      icon: 'ManageHistory'
    },
  ],
];

/**
 * 強力会社画面表示時のサイドメニュー項目
 */
export const COOPERATOR_SIDE_MENUS: SideMenuType[][] = [
  [
    {
      label: '案件（査定）一覧',
      auth: 'CU_ASSESSMENTS',
      url: PAGE_URL.COOPERATOR.ASSESSMENT,
      icon: 'Notifications'
    },
    {
      label: '基本情報',
      auth: 'CU_BASIC_INFO',
      url: PAGE_URL.COOPERATOR.BASIC_INFO,
      icon: 'Notifications'
    },
    {
      label: '支払一覧',
      auth: 'CU_PAYMENTS',
      url: PAGE_URL.COOPERATOR.PAYMENT,
      icon: 'Notifications'
    },
  ],
];

// ファイルアップロードの最大ファイルサイズ
export const MAX_FILE_SIZE = 10000000;

// ファイルサイズエラー詳細メッセージ
export const INVALID_FILE_SIZE_MESSAGE_DETAIL =
  '最大アップロードサイズは{0}です';

// ファイルサイズエラー概要メッセージ
export const INVALID_FILE_SIZE_MESSAGE_SUMMARY =
  '{0}：ファイルサイズが無効です';

/** no image画像のパス */
export const NO_IMAGE_PATH = {
  square: '/images/noImage_square.png',
  normal: '/images/noImage.png',
};

/** Logo画像のパス */
export const LOGO_IMAGE_PATH = {
  normal: '/images/sw_lgo.png',
};

/**
 * 外部連携
 */
export const EXTERNAL_LINKAGES: ExternalLinkageType[] = [
  {
    label: 'SODA',
    url: 'https://sgc-soda.com/signin/?redirect_to=%2Ffeed%2F',
    disabled: false,
    target: '_blank',
  },
  {
    label: 'SOSA',
    url: 'https://sites.google.com/sgc-web.co.jp/sosa',
    disabled: false,
    target: '_blank',
  },
  {
    label: '勤怠管理',
    url: 'https://drive.google.com/drive/u/0/folders/1S70s8Cko-Lim22gh6_KCS0EnhxixXcvf',
    disabled: false,
    target: '_blank',
  },
  {
    label: 'ひとづくり\nクラウド',
    url: 'https://hitodukuri.cloud/signin',
    disabled: false,
    target: '_blank',
  },
  {
    label: '奉行クラウド',
    url: 'https://id.obc.jp/j42jl70690d9/',
    disabled: false,
    target: '_blank',
  },
  {
    label: 'sansan',
    url: 'https://ap.sansan.com/v/SSLogin.aspx',
    disabled: false,
    target: '_blank',
  },
  {
    label: 'Corporate\nStandard',
    url: 'https://drive.google.com/file/d/1--wWI_V-Mcv7hIsBJrH2F97OWqIBwWj3/view?usp=sharing',
    disabled: false,
    target: '_blank',
  },
  {
    label: 'Technical\nStandard',
    url: 'https://drive.google.com/file/d/1czN3S-NbawztJU82p3hWNPWnHUIxkIfQ/view?usp=sharing',
    disabled: false,
    target: '_blank',
  },
  {
    label: 'iNDEX',
    url: 'https://sgc-index.com/manage/signin',
    disabled: false,
    target: '_blank',
  },
  {
    label: '稼働中案件\nフォルダ',
    // url: 'https://drive.google.com/drive/u/0/folders/0AE-i-JnL1ChYUk9PVA',
    url: 'file://G:/共有ドライブ/案件共有',
    disabled: false,
    target: '_blank',
  },
  {
    label: '過去案件\nフォルダ',
    url: 'https://drive.google.com/drive/u/0/folders/1oeQMDDxljjE9IUBtJPWFEhe7BCLQ8-4d',
    disabled: false,
    target: '_blank',
  },
  {
    label: '社員一覧',
    url: '#',
    disabled: true,
    target: '_blank',
  },
];

/**
 * ダッシュボード工事メニュ
 */
export const CONSTRUCTIONS_MENUS = [
  {
    label: '見積管理',
    url: (id: number | string) => `/constructions/${id}/estimates`,
    disabled: false,
  },
  {
    label: '発注管理',
    // url: (id: number) => `/constructions/${id}/cost-manage`,
    url: (construction_code: string | number) =>
      `/orders?construction_code=${construction_code}`,
    disabled: false,
  },
  {
    label: '原価管理',
    url: (id: number | string) => `/constructions/${id}/cost-manage`,
    disabled: false,
  },
  {
    label: '査定管理',
    url: () => `/pending-applications`,
    disabled: false,
  },
  {
    label: '原価追及会議',
    url: (id: number | string) => `/constructions/${id}/cost-manage`,
    disabled: true,
  },
  {
    label: '工事情報設定',
    url: (id: number | string) => `/constructions/${id}/information-settings`,
    disabled: false,
  },
];

/*
面積フォーマット交換共通メソッド
*/
export const setAreaValue = (value: number) => {
  // const result = value * 3.305;
  // const result = value / 3.3057;
  const result = value / 3.30579;
  if (result) {
    return toFixed(result, 2);
  }
  return 0;
};
