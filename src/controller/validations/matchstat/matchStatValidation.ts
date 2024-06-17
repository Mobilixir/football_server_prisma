import Validator from 'validator';

import Helper from '../../../utils/helper';
import ErrorObject from '../../../interface/error';
import iMatchStatData from '../../../interface/matchstat';

const isEmpty = Helper.isEmpty;

const validateMatchStat = (data: iMatchStatData) => {
  const errors: ErrorObject = {};
  data.matchId = !isEmpty(data.matchId) ? data.matchId : '';
  data.teamId = !isEmpty(data.teamId) ? data.teamId : '';
  data.playerId = !isEmpty(data.playerId) ? data.playerId : '';
  data.goals = !isEmpty(data.goals) ? data.goals : 0;

  if (Validator.isEmpty(data.matchId)) {
    errors.name = 'Match id is required';
  }
  if (Validator.isEmpty(data.teamId)) {
    errors.name = 'Team id is required';
  }
  if (Validator.isEmpty(data.playerId)) {
    errors.name = 'Player id is required';
  }
  if (data.goals <= 0) {
    errors.name = 'Goals are required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export default validateMatchStat;
