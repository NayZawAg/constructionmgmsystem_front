export const MESSAGES = {
  ORDER_CONDITION_REMARKS:
    '以下の通り発注いたします。\n発注金額：２０００００\n前提条件：工期はｚｚｚｚからｙｙｙｙ',
  API_RESULT: {
    AUTH: {
      SUCCESS: (): string => {
        return 'ログインに成功しました';
      },
      NOT_FOUND: (): string => {
        return 'ログインしているログインIDが登録されてないです';
      },
      LOGIN_FAILED: (): string => {
        return 'IDまたはパスワードに誤りがあります';
      },
      UNAUTHORIZED: (): string => {
        return '不正なアクセスです';
      },
      FAILURE: (): string => {
        return 'ログインに失敗しました';
      },
    },
    REQUESTTOKEN: {
      SUCCESS: (): string => {
        return 'メールの送信に成功しました';
      },
      NOT_FOUND: (): string => {
        return '入力されたログインIDが登録されてないです';
      },
      FAILURE: (): string => {
        return 'メールの送信に失敗しました';
      },
    },
    GET: {
      SUCCESS: (name: string): string => {
        return `${name}の取得に成功しました`;
      },
      FAILURE: (name: string): string => {
        return `${name}の取得に失敗しました`;
      },
    },
    CREATE: {
      SUCCESS: (name: string): string => {
        return `${name}の新規登録に成功しました`;
      },
      FAILURE: (name: string): string => {
        return `${name}の新規登録に失敗しました`;
      },
    },
    UPDATE: {
      SUCCESS: (name: string): string => {
        return `${name}の更新に成功しました`;
      },
      FAILURE: (name: string): string => {
        return `${name}の更新に失敗しました`;
      },
      TIMEOUT: (): string => {
        return 'トークンの有効期限が切れました。';
      },
    },
    DELETE: {
      SUCCESS: (name: string): string => {
        return `${name}の削除に成功しました`;
      },
      FAILURE: (name: string): string => {
        return `${name}の削除に失敗しました`;
      },
    },
    ADD: {
      SUCCESS: (name: string): string => {
        return `${name}の追加に成功しました`;
      },
      FAILURE: (name: string): string => {
        return `${name}の追加に失敗しました`;
      },
    },
    SAVE: {
      SUCCESS: (name: string): string => {
        return `${name}の保存に成功しました`;
      },
      FAILURE: (name: string): string => {
        return `${name}の保存に失敗しました`;
      },
    },
    DOWNLOAD: {
      SUCCESS: (name: string): string => {
        return `${name}のダウンロードに成功しました`;
      },
      FAILURE: (name: string): string => {
        return `${name}のダウンロードに失敗しました`;
      },
    },
  },
};
