import axios from 'axios';
import { format } from 'date-fns';
import { SYSTEM_DATE_FORMAT, Yup } from '../shared/constants';
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
    optionalMin(min: number): this;
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
    required: (data: any) => ({ key: commonLabel.LABEL_is_required, data }),
    notType: (_ref: any) => {
      switch (_ref.type) {
        case 'number':
          return {
            key: commonLabel.LABEL_must_be_a_number,
            data: _ref
          };
        default:
          return {
            key: commonLabel.invalid_TYPE_format,
            data: _ref
          };
      }
    }
  },
  string: {
    email: (data: any) => ({ key: commonLabel.invalid_email, data }),
    min: (data: any) => ({ key: commonLabel.min_MIN_char, data }),
    max: (data: any) => ({ key: commonLabel.max_MAX_char, data })
    // matches: (data) => ({ key: commonLabel.invalid_TYPE_format, data }),
  },
  number: {
    min: (data: any) => ({ key: commonLabel.min_MIN, data }),
    max: (data: any) => ({ key: commonLabel.max_MAX, data })
    // integer: (data) => ({ key: commonLabel.integer_only, data }),
  },
  date: {
    min: (data: any) => {
      let min = data.min;
      if (typeof data.min === 'string') {
        min = format(new Date(min), SYSTEM_DATE_FORMAT);
      } else if (data.min instanceof Date) {
        min = format(min, SYSTEM_DATE_FORMAT);
      }

      return {
        key: commonLabel.date_must_be_later_than_MIN,
        data: { ...data, min }
      };
    },
    max: (data: any) => {
      let max = data.max;
      if (typeof data.max === 'string') {
        max = format(new Date(max), SYSTEM_DATE_FORMAT);
      } else if (data.max instanceof Date) {
        max = format(max, SYSTEM_DATE_FORMAT);
      }

      return {
        key: commonLabel.date_must_be_earlier_than_MAX,
        data: { ...data, max }
      };
    }
  }
});

/**
 * Add Custom Methods for Validation
 */
// Yup.addMethod<Yup.StringSchema>(Yup.string, 'integer', function (message) {
//   message = message || ((data: any) => ({ key: commonLabel.integer_only, data }));
//   return this.matches(/^\d+$/, { message, excludeEmptyString: true }); //
// });

Yup.addMethod(Yup.string, 'mobileNumber', function (message) {
  // message = message || ((data: any) => ({ key: 'invalid format', data }));
  return this.optionalMin(8).max(15).integer(message); // all digits with min 8 and max 15
});

Yup.addMethod(Yup.string, 'noChinese', function (message) {
  message = message || ((data: any) => ({ key: commonLabel.no_chinese, data }));
  return this.matches(/^[^\u4e00-\u9eff]+$/, {
    message,
    excludeEmptyString: true
  }); //
});

Yup.addMethod(Yup.string, 'containUppercase', function (message) {
  message =
    message || ((data: any) => ({ key: commonLabel.contain_uppercase, data }));
  return this.matches(/[A-Z]+/, { excludeEmptyString: true, message }); //
});

Yup.addMethod(Yup.string, 'containLowercase', function (message) {
  message =
    message || ((data: any) => ({ key: commonLabel.contain_lowercase, data }));
  return this.matches(/[a-z]+/, { excludeEmptyString: true, message }); //
});

Yup.addMethod(Yup.string, 'containDigit', function (message) {
  message =
    message || ((data: any) => ({ key: commonLabel.contain_digit, data }));
  return this.matches(/[0-9]+/, { excludeEmptyString: true, message }); //
});

Yup.addMethod(Yup.string, 'noSpecialChar', function (message) {
  message =
    message ||
    ((data: any) => ({ key: commonLabel.no_special_characters, data }));
  return this.matches(/^[A-Za-z0-9]+$/, { excludeEmptyString: true, message }); //
});

Yup.addMethod(Yup.string, 'optionalMin', function (min: number) {
  const regex = new RegExp(`.{${min},}`);
  return this.matches(regex, {
    excludeEmptyString: true,
    message: (data) => ({
      key: commonLabel.min_MIN_char,
      data: { ...data, min }
    })
  });
});

Yup.addMethod(Yup.string, 'username', function () {
  return this.optionalMin(4).max(19).noChinese().noSpecialChar();
});

Yup.addMethod(Yup.string, 'password', function () {
  return this.optionalMin(8).max(16).containUppercase().containDigit();
});

Yup.addMethod(Yup.string, 'secondaryPassword', function () {
  return this.optionalMin(6).max(15);
});

Yup.addMethod(Yup.string, 'tradingPassword', function () {
  return this.optionalMin(6)
    .max(15)
    .containUppercase()
    .containLowercase()
    .containDigit()
    .noSpecialChar();
});

Yup.addMethod(Yup.string, 'otp', function () {
  return this.optionalMin(6).max(6);
});

Yup.addMethod(
  Yup.string,
  'equalTo',
  function (field: string, fieldLabel?: string) {
    const message = (data: any) => ({
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
    const message = (data: any) => ({
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
//   const message = (data: any) => ({ key: commonLabel.invalid_TYPE_format, data });
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
    const message = (data: any) => ({
      key: commonLabel.LABEL_multiple_of_MULTIPLEOF,
      data: { ...data, multipleof }
    });
    return this.test('multipleOf', msg || message, function (value?: number) {
      return !!value && value % multipleof === 0;
    });
  }
);

// Yup.addMethod(Yup.string, 'startWith0', function () {
//   const message = (data: any) => ({ key: commonLabel.LABEL_start_with_0, data });
//   return this.matches(/^0/, message);
// });

Yup.addMethod(Yup.mixed, 'notEmpty', function (msg?: string) {
  const message = (data: any) => ({
    key: commonLabel.LABEL_is_required,
    data
  });
  return this.test('notEmpty', msg || message, function (value: any) {
    return !!value;
  });
});
