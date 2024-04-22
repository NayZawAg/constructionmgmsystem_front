/* eslint @typescript-eslint/no-explicit-any: 0 */
import { MESSAGES } from "./constants/message";

export const validationErrorMessage = (error: any) => {
  if (!error) return ''

  let message = '';
  if (typeof error === 'object') {
    for (const key in error) {
      console.log(error[key])
      error[key].map((msg: string) => {
        message = message.concat(msg)
      })
    }
  } else {
    message = error
  }

  return message;
};

export const validationErrorMessageHtmlFormat = (error: any) => {
  let message = '';
  if (typeof error == 'string') {
    message = error
  } else if (typeof error == 'object') {
    Object.keys(error).map((item) => {
      message += error[item][0] + '<br/>';
    });
  }
  return message;
};

export const authErrorShow = (error: string) => {
  if (!error) return false

  let show = true;
  switch (error) {
  case 'SessionRequired':
    show = false
    break;
  default:
    show = true
  }
  return show;
};

export const authErrorMessage = (error: string) => {
  if (!error) return ''

  let message = null;
  switch (error) {
  case 'AccessDenied':
    message = MESSAGES.API_RESULT.AUTH.NOT_FOUND();
    break;
  case 'CredentialsSignin':
    message = MESSAGES.API_RESULT.AUTH.LOGIN_FAILED();
    break;
  case 'SessionRequired':
    message = MESSAGES.API_RESULT.AUTH.UNAUTHORIZED();
    break;
  default:
    message = MESSAGES.API_RESULT.AUTH.FAILURE();
  }
  return message;
};
