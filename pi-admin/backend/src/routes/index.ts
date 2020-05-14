import {Router} from 'express';
import UserRouter from './Users';
import Device from './Device'
import Docker from './Docker'
import PPTPD from './PPTPD'
import {Config} from "./Config";
import {App} from "./App";

// Init router and path
const router = Router();

// Add sub-routes
router.use('/users', UserRouter);
router.use('/device', Device);
router.use('/docker', Docker);
router.use('/pptpd', PPTPD);
router.use('/config', Config);
router.use('/config', App);

// Export the base-router
export default router;
