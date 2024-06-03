import { Router } from 'express';
import UserController from '../controller/UserController';

const AllRouter = Router();
const user = new UserController();

AllRouter.route('/api/v1/getuserrolelist').get(user.getUserRoleList);
AllRouter.route('/api/v1/updateuserrole').put(user.updateUserRole);
AllRouter.route('/api/v1/updateuserteam').put(user.updateUserTeam);
AllRouter.route('/api/v1/getplayerbyteam').get(user.getPlayersByTeamId);

export default AllRouter;
