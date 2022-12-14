import {
  STATUS_FETCH,
  LOADING_MESSAGE,
  INVALID_NAME,
  NOT_FOUND,
} from "./constants";

export const obterMensagem: (
  quote: string,
  requestStatus: STATUS_FETCH
) => string = (quote, requestStatus) => {
  if (requestStatus === STATUS_FETCH.LOADING) {
    return LOADING_MESSAGE;
  }

  if (requestStatus === STATUS_FETCH.ERROR) {
    return INVALID_NAME;
  }

  return quote ? `${quote}` : NOT_FOUND;
};
