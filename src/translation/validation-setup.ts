import axios from 'axios';
import { Yup } from '../shared/constants';
import commonLabel from './commonLabel';
/**
 * Add Custom Method Interface
 */
// declare const yup: Yup;
declare module 'yup' {
  interface StringSchema {
    mobileNumber(message?: string): this;
    username(message?: string): this;
    password(message?: string): this;
    secondaryPassword(message?: string): this;
    tradingPassword(message?: string): this;
    noChinese(message?: string): this;
    integer(message?: string): this;
    equalTo(field: string, fieldLabel?: string): this;
    notEqualTo(field: string, fieldLabel?: string): this;
    wechatId(): this;
    containUppercase(message?: string): this;
    containLowercase(message?: string): this;
    containDigit(message?: string): this;
    noSpecialChar(message?: string): this;
    startWith0(message?: string): this;
    otp(): this;
    asyncUsername(): this;
  }

  // interface BooleanSchema<T> {
  //   shouldBe(value: boolean, message?: string): Yup.BooleanSchema<T>;
  // }

  interface BaseSchema {
    notEmpty(message?: string): this;
  }

  class NumberSchema {
    multipleOf(value: number, message?: string): this;
  }

  interface ValidateOptions {
    index?: number;
  }
}

/**
 * Set Default Validation Messages
 */
Yup.setLocale({
  mixed: {
    required: (data: any) =>
      JSON.stringify({ key: commonLabel.LABEL_is_required, data }),
    notType: (_ref: any) => {
      switch (_ref.type) {
        case 'number':
          return JSON.stringify({
            key: commonLabel.LABEL_must_be_a_number,
            data: _ref
          });
        default:
          return JSON.stringify({
            key: commonLabel.invalid_TYPE_format,
            data: _ref
          });
      }
    }
  },
  string: {
    email: (data: any) =>
      JSON.stringify({ key: commonLabel.invalid_email, data }),
    min: (data: any) => JSON.stringify({ key: commonLabel.min_MIN_char, data }),
    max: (data: any) => JSON.stringify({ key: commonLabel.max_MAX_char, data })
    // matches: (data) => JSON.stringify({ key: commonLabel.invalid_TYPE_format, data }),
  },
  number: {
    min: (data: any) => JSON.stringify({ key: commonLabel.min_MIN, data }),
    max: (data: any) => JSON.stringify({ key: commonLabel.max_MAX, data })
    // integer: (data) => JSON.stringify({ key: commonLabel.integer_only, data }),
  }
});

/**
 * Add Custom Methods for Validation
 */
// Yup.addMethod<Yup.StringSchema>(Yup.string, 'integer', function (message) {
//   message = message || ((data: any) => JSON.stringify({ key: commonLabel.integer_only, data }));
//   return this.matches(/^\d+$/, { message, excludeEmptyString: true }); //
// });

Yup.addMethod(Yup.string, 'mobileNumber', function (message) {
  // message = message || ((data: any) => JSON.stringify({ key: 'invalid format', data }));
  return this.min(8).max(15).integer(message); // all digits with min 8 and max 15
});

Yup.addMethod(Yup.string, 'noChinese', function (message) {
  message =
    message ||
    ((data: any) => JSON.stringify({ key: commonLabel.no_chinese, data }));
  return this.matches(/^[^\u4e00-\u9eff]+$/, {
    message,
    excludeEmptyString: true
  }); //
});

Yup.addMethod(Yup.string, 'containUppercase', function (message) {
  message =
    message ||
    ((data: any) =>
      JSON.stringify({ key: commonLabel.contain_uppercase, data }));
  return this.matches(/[A-Z]+/, { message }); //
});

Yup.addMethod(Yup.string, 'containLowercase', function (message) {
  message =
    message ||
    ((data: any) =>
      JSON.stringify({ key: commonLabel.contain_lowercase, data }));
  return this.matches(/[a-z]+/, { message }); //
});

Yup.addMethod(Yup.string, 'containDigit', function (message) {
  message =
    message ||
    ((data: any) => JSON.stringify({ key: commonLabel.contain_digit, data }));
  return this.matches(/[0-9]+/, { message }); //
});

Yup.addMethod(Yup.string, 'noSpecialChar', function (message) {
  message =
    message ||
    ((data: any) =>
      JSON.stringify({ key: commonLabel.no_special_characters, data }));
  return this.matches(/^[A-Za-z0-9]+$/, { message }); //
});

Yup.addMethod(Yup.string, 'username', function () {
  return this.min(4).max(19).noChinese().noSpecialChar();
});

Yup.addMethod(Yup.string, 'password', function () {
  return this.min(8).max(16).containUppercase().containDigit();
});

Yup.addMethod(Yup.string, 'secondaryPassword', function () {
  return this.min(6).max(15);
});

Yup.addMethod(Yup.string, 'tradingPassword', function () {
  return this.min(6)
    .max(15)
    .containUppercase()
    .containLowercase()
    .containDigit()
    .noSpecialChar();
});

Yup.addMethod(Yup.string, 'otp', function () {
  return this.min(6).max(6);
});

Yup.addMethod(
  Yup.string,
  'equalTo',
  function (field: string, fieldLabel?: string) {
    const message = (data: any) =>
      JSON.stringify({
        key: commonLabel.LABEL_equal_to_FIELD,
        data: { ...data, field: fieldLabel || field }
      });
    return this.test('equalTo', message, function (value?: string) {
      return value === this.parent[field];
    });
  }
);

Yup.addMethod(
  Yup.string,
  'notEqualTo',
  function (field: string, fieldLabel?: string) {
    const message = (data: any) =>
      JSON.stringify({
        key: commonLabel.LABEL_not_equal_to_FIELD,
        data: { ...data, field: fieldLabel || field }
      });
    return this.test('notEqualTo', message, function (value?: string) {
      return value !== this.parent[field];
    });
  }
);

const validateReferral = (_this: any, value: any) => {
  return axios
    .get('/referral/validate', {
      params: {
        referral_code: value
      }
    })
    .then((res) => {
      if (res.data.rst) {
        return true;
      }

      return _this.createError({
        message: res.data.msg
      });
    })
    .catch(() => {
      return true;
    });
};

Yup.addMethod(Yup.string, 'asyncUsername', function () {
  return this.test({
    test: function (this, value) {
      return value ? validateReferral(this, value) : true;
    }
  });
});

// Yup.addMethod(Yup.string, 'wechatId', function () {
//   const message = (data: any) => JSON.stringify({ key: commonLabel.invalid_TYPE_format, data });
//   return this.min(6)
//     .max(20)
//     .matches(/^[a-zA-Z][a-zA-Z0-9_-]+$/, message);
// });

// Yup.addMethod(
//   Yup.boolean,
//   "shouldBe",
//   function (shouldBe: boolean, msg?: string) {
//     const message = (data: any) => ({
//       key: commonLabel.LABEL_is_required,
//       data
//     });
//     return this.test("shouldBe", msg || message, function (value: boolean) {
//       return value === shouldBe;
//     });
//   }
// );

Yup.addMethod(
  Yup.number,
  'multipleOf',
  function (multipleof: number, msg?: string) {
    const message = (data: any) =>
      JSON.stringify({
        key: commonLabel.LABEL_multiple_of_MULTIPLEOF,
        data: { ...data, multipleof }
      });
    return this.test('multipleOf', msg || message, function (value?: number) {
      return !!value && value % multipleof === 0;
    });
  }
);

// Yup.addMethod(Yup.string, 'startWith0', function () {
//   const message = (data: any) => JSON.stringify({ key: commonLabel.LABEL_start_with_0, data });
//   return this.matches(/^0/, message);
// });

Yup.addMethod(Yup.mixed, 'notEmpty', function (msg?: string) {
  const message = (data: any) =>
    JSON.stringify({
      key: commonLabel.LABEL_is_required,
      data
    });
  return this.test('notEmpty', msg || message, function (value: any) {
    return !!value;
  });
});
