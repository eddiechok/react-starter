import { AxiosResponse } from 'axios';
import { JSEncrypt } from 'jsencrypt';
import { HttpResponse } from '../http/http.model';
// import SHA256 from "crypto-js/sha256";
import commonLabel from '../translation/commonLabel';

export function getMonthList(
  locales?: string | string[],
  format: 'long' | 'short' = 'long'
): string[] {
  const year = new Date().getFullYear(); // 2020
  const monthList = [...Array.from(Array(12).keys())]; // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
  const formatter = new Intl.DateTimeFormat(locales, {
    month: format
  });

  const getMonthName = (monthIndex: number) =>
    formatter.format(new Date(year, monthIndex));

  return monthList.map(getMonthName);
}

// const isiOS = () => {
//   return navigator.userAgent.match(/ipad|iphone/i);
// };

export const copyToClipboard = (str: string) => {
  // return new Promise<void>((resolve) => {
  //   const textField = document.createElement('textarea');
  //   textField.innerText = str;
  //   document.body.appendChild(textField);
  //   textField.select();

  //   if (isiOS()) {
  //     textField.setSelectionRange(0, 9999);
  //   }

  //   textField.focus();
  //   document.execCommand('copy');
  //   textField.remove();
  //   resolve();
  // });
  return navigator.clipboard.writeText(str);
};

export const checkResponse = (res: AxiosResponse<HttpResponse>) => {
  if (res.data.rst) {
    return res.data.data;
  } else {
    throw new Error(res.data.msg);
  }
};

export const checkPostResponse = (res: AxiosResponse<HttpResponse>) => {
  if (res.data.rst) {
    return res.data;
  } else {
    throw new Error(res.data.msg);
  }
};

export const checkParamsResponse = (res: any, params: any) => {
  return { data: res, params };
};

export const encrypt = (text: string, source?: 'blockchain') => {
  const encrypt = new JSEncrypt({});
  encrypt.setPublicKey(
    source === 'blockchain' ? '' : import.meta.env.VITE_RSA_PUBLIC_KEY
  );
  return encrypt.encrypt(text) || '';
};

// export const signWithSHA256 = (text: string) => {
//   const encrypt = new JSEncrypt({});
//   encrypt.setPublicKey(import.meta.env.REACT_APP_RSA_PUBLIC_KEY!);
//   return encrypt.encrypt(SHA256(text + import.meta.env.REACT_APP_PKSALT!) as unknown as string) || "";
// };

export const dp = (
  value?: number | string,
  dp: string | number = 2,
  thousandSeparator = true
) => {
  if (value === undefined) {
    return '';
  }

  // slice value to "n" decimal place.
  let x = value.toString();
  const indexOfDecimalPoint = x.indexOf('.');

  // if dp is string, convert it to num
  dp = typeof dp === 'string' ? parseInt(dp) : dp;

  if (indexOfDecimalPoint > -1) {
    // if decimal point is presented
    let sliceLength = indexOfDecimalPoint + dp;
    if (dp > 0) {
      sliceLength += 1;
    }

    x = x.slice(0, sliceLength);
  }

  x = parseFloat(x).toFixed(dp);

  if (thousandSeparator) {
    // add thousand separator
    const arr = x.split('.'); // split value into sign and exponent part.
    const sign = arr[0];
    let exponent = '';

    if (arr[1]) {
      // if exponent part present
      exponent = '.' + arr[1];
    }

    const afterParse = parseFloat(sign).toLocaleString('en');
    x = afterParse + exponent; //add thousand separator
  }

  return x;
};

type FormatNumParams = {
  value: Parameters<typeof dp>[0];
  dp?: Parameters<typeof dp>[1];
  thousandSeparator?: Parameters<typeof dp>[2];
  currencyCode?: string;
  positive?: boolean;
};

export const currency = (
  currencyCode: string,
  value = '',
  positive = false
) => {
  let sign = positive ? '+' : '';
  let formattedValue: string;

  // if is negative then remove it
  if (value.indexOf('-') >= 0) {
    value = value.replace('-', '');
    sign = '-';
  }

  switch (currencyCode.toUpperCase()) {
    case 'USD':
      formattedValue = '$' + value;
      break;
    default:
      formattedValue = value + ' ' + currencyCode;
  }

  return sign + formattedValue;
};

export const formatNum = (options: FormatNumParams) => {
  const formattedValue = dp(
    options.value,
    options.dp,
    options.thousandSeparator
  );
  return currency(options.currencyCode || '', formattedValue, options.positive);
};

export const validateMultipleOf = (
  _this: any,
  value?: number,
  multipleof = 0,
  amount = 0
) => {
  if (value && value % multipleof !== 0) {
    return _this.createError({
      path: _this.path,
      message: JSON.stringify({
        key: commonLabel.LABEL_multiple_of_MULTIPLEOF,
        data: { multipleof }
      })
    });
  }

  return true;
};

export const validateMinPercent = (
  _this: any,
  value?: number,
  minPercent = 0,
  amount = 0
) => {
  const min = (amount * minPercent) / 100;

  if (value && value < min) {
    return _this.createError({
      path: _this.path,
      message: JSON.stringify({ key: commonLabel.min_MIN, data: { min } })
    });
  }

  return true;
};

export const validateMaxPercent = (
  _this: any,
  value?: number,
  maxPercent = 100,
  amount = 0
) => {
  const max = (amount * maxPercent) / 100;

  if (value && value > max) {
    return _this.createError({
      path: _this.path,
      message: JSON.stringify({ key: commonLabel.max_MAX, data: { max } })
    });
  }

  return true;
};

export const neutralizeBack = (callback: any) => {
  window.history.pushState(window.history.state, '', window.location.href);
  window.onpopstate = () => {
    window.history.pushState(window.history.state, '', window.location.href);
    callback();
  };
};

export const revivalBack = () => {
  window.onpopstate = () => undefined;
  window.history.back();
};

export const download = (href: string, fileName?: string) => {
  const a = document.createElement('a');
  a.href = href;
  a.download = fileName || 'file';
  a.click();
};

export const convertObjectToFormData = (obj: Record<string, any>) => {
  const fd = new FormData();

  for (const key in obj) {
    if (obj[key] instanceof FileList) {
      for (let i = 0; i < obj[key].length; i++) {
        fd.append(key, obj[key].item(i));
      }
    } else {
      fd.append(key, obj[key]);
    }
  }

  return fd;
};

export const getRandomInteger = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min)) + min;
};
