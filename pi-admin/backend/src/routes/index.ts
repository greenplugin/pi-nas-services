import {Router} from 'express';
import UserRouter from './Users';
import Device from './Device'
import Docker from './Docker'
import PPTPD from './Options'
import {Config} from "./Config";
import {App} from "./App";

// Init router and path
const router = Router();

// Add sub-routes
router.use('/users', UserRouter);
router.use('/device', Device);
router.use('/docker', Docker);
router.use('/options', PPTPD);
router.use('/config', Config);
router.use('/app', App);

// Export the base-router
export default router;
