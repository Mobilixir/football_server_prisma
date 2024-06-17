import { Router } from 'express';
import MatchController from '../controller/MatchController';

const AllRouter = Router();
const match = new MatchController();

AllRouter.route('/api/v1/creatematch').post(match.createMatch);
AllRouter.route('/api/v1/updatematch').put(match.updateMatch);
AllRouter.route('/api/v1/deletematch/:matchId').delete(match.deleteMatch);
AllRouter.route('/api/v1/getallmatches').get(match.getAllMatches);
AllRouter.route('/api/v1/getmatch/:matchId').get(match.getMatchById);
AllRouter.route('/api/v1/getmatch/team/:teamId').get(match.getMatchesByTeamId);
AllRouter.route('/api/v1/getmatchhistory/:teamId').get(match.getMatchesHistoryByTeamId);

export default AllRouter;
