import Validator from 'validator';

import Helper from '../../../utils/helper';
import ErrorObject from '../../../interface/error';
import iLoginData from '../../../interface/login';

const isEmpty = Helper.isEmpty;

const validateLogin = (data: iLoginData) => {
  const errors: ErrorObject = {};
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email is required';
  }

  if (!Validator.isLength(data.password, { min: 8, max: 30 })) {
    errors.password = 'Password must have 8 chars';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password is required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export default validateLogin;
