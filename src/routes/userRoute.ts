import { Router } from 'express';
import UserController from '../controller/UserController';

const AllRouter = Router();
const user = new UserController();

AllRouter.route('/api/v1/getuserrolelist').get(user.getUserRoleList);
AllRouter.route('/api/v1/updateuserrole').put(user.updateUserRole);
AllRouter.route('/api/v1/updateuserteam').put(user.updateUserTeam);
AllRouter.route('/api/v1/addusertoteam').post(user.addUsersToTeam);
AllRouter.route('/api/v1/getplayerbyteam/:teamId').get(user.getPlayersByTeamId);

export default AllRouter;
