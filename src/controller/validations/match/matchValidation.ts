import Validator from 'validator';

import Helper from '../../../utils/helper';
import ErrorObject from '../../../interface/error';
import iMatchData from '../../../interface/match';
import { eMatchStatusType } from '@prisma/client';

const isEmpty = Helper.isEmpty;

const validateMatch = (data: iMatchData) => {
  const errors: ErrorObject = {};

  data.team1Id = !isEmpty(data.team1Id) ? data.team1Id : '';
  data.team2Id = !isEmpty(data.team2Id) ? data.team2Id : '';
  data.team1_score = !isEmpty(data.team1_score) ? data.team1_score : 0;
  data.team2_score = !isEmpty(data.team2_score) ? data.team2_score : 0;
  data.winnerId = !isEmpty(data.winnerId) ? data.winnerId : '';
  data.status = !isEmpty(data.status) ? data.status : eMatchStatusType.SCHEDULED;
  data.schedule = !isEmpty(data.schedule) ? data.schedule : undefined;

  if (Validator.isEmpty(data.team1Id)) {
    errors.team1Id = 'Team id is required';
  }

  if (Validator.isEmpty(data.team2Id)) {
    errors.team2Id = 'Team id is required';
  }

  if (Helper.isEmpty(data.schedule)) {
    errors.schedule = 'Schedule is required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export default validateMatch;
