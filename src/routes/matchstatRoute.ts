import { Router } from 'express';
import MatchStatController from '../controller/MatchStatController';
const AllRouter = Router();
const matchstat = new MatchStatController();

AllRouter.route('/api/v1/creatematchstat').post(matchstat.createMatchStat);
AllRouter.route('/api/v1/updatematchstat').put(matchstat.updateMatchStat);
AllRouter.route('/api/v1/deletematchstat/:matchstatId').delete(matchstat.deleteMatchstat);
AllRouter.route('/api/v1/getmatchstat/match/:matchId').get(matchstat.getMatchstatByMatchId);
AllRouter.route('/api/v1/getmatchstat/team/:teamId').get(matchstat.getMatchstatByTeamId);
AllRouter.route('/api/v1/getmatchstat/player/:playerId').get(matchstat.getMatchstatByPlayerId);

export default AllRouter;
