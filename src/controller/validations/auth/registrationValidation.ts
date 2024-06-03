import Validator from 'validator';

import Helper from '../../../utils/helper';
import ErrorObject from '../../../interface/error';
import iRegistrationData from '../../../interface/registration';
import UserType from '../../../enum/userType';

const isEmpty = Helper.isEmpty;

const validateRegister = (data: iRegistrationData) => {
  const errors: ErrorObject = {};

  data.first_name = !isEmpty(data.first_name) ? data.first_name : '';
  data.last_name = !isEmpty(data.last_name) ? data.last_name : '';
  data.user_name = !isEmpty(data.user_name) ? data.user_name : '';
  data.role = !isEmpty(data.role) ? data.role : UserType.USER;
  data.email = !isEmpty(data.email) ? data.email : '';
  data.mobile_number = !isEmpty(data.mobile_number) ? data.mobile_number : 0;
  data.password = !isEmpty(data.password) ? data.password : '';
  data.confirm_password = !isEmpty(data.confirm_password) ? data.confirm_password : '';

  if (!Validator.isLength(data.user_name, { min: 8, max: 30 })) {
    errors.user_name = 'User name must be between 4 to 30 chars';
  }

  if (Validator.isEmpty(data.user_name)) {
    errors.name = 'User name field is required';
  }

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

  if (!Validator.isLength(data.confirm_password, { min: 8, max: 30 })) {
    errors.confirm_password = 'Password must have 8 chars';
  }

  if (!Validator.equals(data.password, data.confirm_password)) {
    errors.confirm_password = 'Password and Confirm Password must match';
  }

  if (Validator.isEmpty(data.confirm_password)) {
    errors.confirm_password = 'Confirmation Password is required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export default validateRegister;
