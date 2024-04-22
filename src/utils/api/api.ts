/* eslint @typescript-eslint/no-unused-vars: 0 */
/* eslint @typescript-eslint/no-explicit-any: 0 */
import axios, { AxiosResponse } from 'axios';
import { saveAs } from 'file-saver';
import { parseCookies, setCookie } from 'nookies';
import qs from 'query-string';
import { tokenRefresh } from '@/api/auth';
import { AuthToken } from '@/types/api/auth';
import { auth } from '@/utils/auth';
import { API_STATUS_CODE } from '@/utils/constants/api';
import { COOKIE_KEYS, LOGIN_TYPE } from '@/utils/constants/common';

export const api = {
  /**
   * tokenを使用してアプリケーションに対してGet処理を行う
   * @param url get実行のパス(ホストは無し)
   * @param query query-stringのqueryオブジェクト。get実行時のqueryパラメータ
   */
  get: async <T>(url: string, query?: qs.UrlObject['query']): Promise<T> => {
    // const accessToken =
    //   parseCookies()[
    //     auth.getPageType() === LOGIN_TYPE.employee
    //       ? COOKIE_KEYS.apiAccessToken
    //       : COOKIE_KEYS.cooperatorApiAccessToken
    //   ];
    const accessToken = parseCookies()[COOKIE_KEYS.apiAccessToken];
    try {
      const response = await axios.get<T>(
        qs.stringifyUrl({
          url,
          query,
        }),
        {
          headers: {
            'sanwa-access-token': accessToken,
          },
        },
      );
      if (!response) throw Error;

      return response.data;
    } catch (e: any) {
      // トークン有効期限切れの場合の処理
      if (e.response.status === API_STATUS_CODE.HTTP_403_FORBIDDEN) {
        return await reRequest(e.response);
      }
      throw e;
    }
  },
  getPdf: async <T>(url: string, query?: qs.UrlObject['query']): Promise<T> => {
    // const accessToken =
    //   parseCookies()[
    //     auth.getPageType() === LOGIN_TYPE.employee
    //       ? COOKIE_KEYS.apiAccessToken
    //       : COOKIE_KEYS.cooperatorApiAccessToken
    //   ];
    const accessToken = parseCookies()[COOKIE_KEYS.apiAccessToken];
    try {
      const response = await axios.get<T>(
        qs.stringifyUrl({
          url,
          query,
        }),
        {
          headers: {
            'sanwa-access-token': accessToken,
          },
          responseType: 'blob',
        },
      );
      if (!response) throw Error;

      return response.data;
    } catch (e: any) {
      // トークン有効期限切れの場合の処理
      if (e.response.status === API_STATUS_CODE.HTTP_403_FORBIDDEN) {
        return await reRequest(e.response);
      }
      throw e;
    }
  },
  getCsv: async (url: string, query?: qs.UrlObject['query']): Promise<void> => {
    // const accessToken =
    //   parseCookies()[
    //     auth.getPageType() === LOGIN_TYPE.employee
    //       ? COOKIE_KEYS.apiAccessToken
    //       : COOKIE_KEYS.cooperatorApiAccessToken
    //   ];
    const accessToken = parseCookies()[COOKIE_KEYS.apiAccessToken];
    try {
      const response = await axios.get(
        qs.stringifyUrl({
          url,
          query,
        }),
        {
          headers: {
            'sanwa-access-token': accessToken,
          },
          responseType: 'blob',
        },
      );
      if (!response) throw Error;

      const blob = new Blob([response.data], { type: response.data.type });

      // ファイル名取得
      const contentDisposition = response.headers['content-disposition'];
      if (!contentDisposition) throw Error;
      const fileName = getFileName(contentDisposition);
      if (!fileName) throw Error;

      // ファイルダウンロード
      saveAs(await blob, fileName);
    } catch (e: any) {
      // トークン有効期限切れの場合の処理
      if (e.response?.status === API_STATUS_CODE.HTTP_403_FORBIDDEN) {
        return await reRequest(e.response);
      }
      throw e;
    }
  },
  // TODO: 未検証
  post: async <T>(url: string, data: any): Promise<T> => {
    try {
      // const accessToken =
      //   parseCookies()[
      //     auth.getPageType() === LOGIN_TYPE.employee
      //       ? COOKIE_KEYS.apiAccessToken
      //       : COOKIE_KEYS.cooperatorApiAccessToken
      //   ];
      const accessToken = parseCookies()[COOKIE_KEYS.apiAccessToken];
      const response = await axios.post<T>(url, data, {
        headers: {
          'Content-Type': 'application/json',
          'sanwa-access-token': accessToken,
        },
      });

      return response.data;
    } catch (e: any) {
      // トークン有効期限切れの場合の処理
      if (e.response.status === API_STATUS_CODE.HTTP_403_FORBIDDEN) {
        return await reRequest(e.response);
      }
      throw e;
    }
  },
  // TODO: 未検証
  filePost: async <T>(url: string, data: any): Promise<T> => {
    try {
      // const accessToken =
      //   parseCookies()[
      //     auth.getPageType() === LOGIN_TYPE.employee
      //       ? COOKIE_KEYS.apiAccessToken
      //       : COOKIE_KEYS.cooperatorApiAccessToken
      //   ];
      const accessToken = parseCookies()[COOKIE_KEYS.apiAccessToken];
      const response = await axios.post<T>(url, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'sanwa-access-token': accessToken,
        },
      });

      return response.data;
    } catch (e: any) {
      // トークン有効期限切れの場合の処理
      if (e.response.status === API_STATUS_CODE.HTTP_403_FORBIDDEN) {
        return await reRequest(e.response);
      }
      throw e;
    }
  },

  filePut: async <T>(url: string, data: any): Promise<T> => {
    try {
      // const accessToken =
      //   parseCookies()[
      //     auth.getPageType() === LOGIN_TYPE.employee
      //       ? COOKIE_KEYS.apiAccessToken
      //       : COOKIE_KEYS.cooperatorApiAccessToken
      //   ];
      const accessToken = parseCookies()[COOKIE_KEYS.apiAccessToken];
      const response = await axios.put<T>(url, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'sanwa-access-token': accessToken,
        },
      });

      return response.data;
    } catch (e: any) {
      // トークン有効期限切れの場合の処理
      if (e.response.status === API_STATUS_CODE.HTTP_403_FORBIDDEN) {
        return await reRequest(e.response);
      }
      throw e;
    }
  },
  // TODO: 未検証
  put: async <T>(url: string, data: any): Promise<T> => {
    try {
      // const accessToken =
      //   parseCookies()[
      //     auth.getPageType() === LOGIN_TYPE.employee
      //       ? COOKIE_KEYS.apiAccessToken
      //       : COOKIE_KEYS.cooperatorApiAccessToken
      //   ];
      const accessToken = parseCookies()[COOKIE_KEYS.apiAccessToken];

      const response = await axios.put<T>(url, data, {
        headers: {
          'sanwa-access-token': accessToken,
        },
      });

      return response.data;
    } catch (e: any) {
      // トークン有効期限切れの場合の処理
      if (e.response.status === API_STATUS_CODE.HTTP_403_FORBIDDEN) {
        return await reRequest(e.response);
      }
      throw e;
    }
  },
  // TODO: 未検証
  delete: async <T>(url: string, data?: any): Promise<T> => {
    try {
      // const accessToken =
      //   parseCookies()[
      //     auth.getPageType() === LOGIN_TYPE.employee
      //       ? COOKIE_KEYS.apiAccessToken
      //       : COOKIE_KEYS.cooperatorApiAccessToken
      //   ];
      const accessToken = parseCookies()[COOKIE_KEYS.apiAccessToken];
      const response = await axios.delete(url, {
        headers: {
          'sanwa-access-token': accessToken,
        },
        data: data,
      });

      return response.data;
    } catch (e: any) {
      // トークン有効期限切れの場合の処理
      if (e.response.status === API_STATUS_CODE.HTTP_403_FORBIDDEN) {
        return await reRequest(e.response);
      }
      // ステータスコードなど必要なため throw e しています。
      throw e;
    }
  },
  /**
   * ファイルのダウンロードを実施する
   * @param url ファイルurl
   * @param fileName ダウンロードされるファイル名
   */
  fileDownload: async (url: string, fileName: string): Promise<void> => {
    // ファイルダウンロード
    saveAs(url, fileName);
  },
};

/**
 * トークン認証エラー時のもう一度通信するための処理
 * @param response
 * @returns
 */
async function reRequest<T>(response: AxiosResponse<T>) {
  const newToken = await tokenUpdate();
  const reResponse = await axios.request<T>({
    ...response.config,
    headers: {
      ...response.config.headers,
      'sanwa-access-token': newToken.accessToken,
    },
  });
  if (reResponse.status !== API_STATUS_CODE.HTTP_200_OK) {
    throw Error();
  }
  return reResponse.data;
}

/**
 * トークン更新とCookie更新
 */
async function tokenUpdate(): Promise<AuthToken> {
  const isCurrentCooperatorPage = auth.getPageType() === LOGIN_TYPE.cooperator;
  const apiRefreshToken =
    parseCookies()[
      isCurrentCooperatorPage
        ? COOKIE_KEYS.cooperatorApiRefreshToken
        : COOKIE_KEYS.apiRefreshToken
    ];
  const newToken = await tokenRefresh(apiRefreshToken);
  // アクセストークン再設定
  // setCookie(
  //   null,
  //   isCurrentCooperatorPage
  //     ? COOKIE_KEYS.cooperatorApiAccessToken
  //     : COOKIE_KEYS.apiAccessToken,
  //   newToken.accessToken,
  //   {
  //     path: '/',
  //   },
  // );
  setCookie(
    null,
    COOKIE_KEYS.apiAccessToken,
    newToken.accessToken,
    {
      path: '/',
    },
  );
  // リフレッシュトークン再設定
  setCookie(
    null,
    isCurrentCooperatorPage
      ? COOKIE_KEYS.cooperatorApiRefreshToken
      : COOKIE_KEYS.apiRefreshToken,
    newToken.refreshToken,
    {
      path: '/',
    },
  );
  return newToken;
}

function throwError(responseJson: { errorCode: string; errorMsg: string }[]) {
  if (responseJson[0].errorMsg) {
    // APIから返却エラーメッセージがあればそのメッセージを表示する
    throw new Error(responseJson[0].errorMsg);
  } else {
    // APIから返却エラーメッセージが無ければメッセージ表示無し
    throw new Error();
  }
}

/**
 * ファイル名取得
 */
function getFileName(disposition: string) {
  const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
  const matches = filenameRegex.exec(disposition);
  if (matches != null && matches[1]) {
    const fileName = matches[1].replace(/['"]/g, '');
    return decodeURI(fileName);
  } else {
    return null;
  }
}
