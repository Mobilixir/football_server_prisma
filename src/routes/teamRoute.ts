import { Router } from 'express';
import TeamController from '../controller/TeamController';

const AllRouter = Router();
const team = new TeamController();

AllRouter.route('/api/v1/createteam').post(team.createTeam);
AllRouter.route('/api/v1/updateteam').put(team.updateTeam);
AllRouter.route('/api/v1/teams').get(team.getAllTeam);
AllRouter.route('/api/v1/teams/:teamId').get(team.getTeamById);
AllRouter.route('/api/v1/teams/:teamId').delete(team.deleteTeamById);

export default AllRouter;
