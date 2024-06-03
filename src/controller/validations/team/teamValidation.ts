import Validator from 'validator';

import Helper from '../../../utils/helper';
import ErrorObject from '../../../interface/error';
import iTeamData from '../../../interface/team';

const isEmpty = Helper.isEmpty;

const validateTeam = (data: iTeamData) => {
  const errors: ErrorObject = {};
  data.name = !isEmpty(data.name) ? data.name : '';

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Team name is required';
  }

  if (!Validator.isLength(data.name, { min: 4, max: 30 })) {
    errors.password = 'Team name must have 4 charactors';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export default validateTeam;
