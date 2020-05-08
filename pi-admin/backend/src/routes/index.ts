import {Router} from 'express';
import UserRouter from './Users';
import Device from './Device'
import Docker from './Docker'
import PPTPD from './PPTPD'

// Init router and path
const router = Router();

// Add sub-routes
router.use('/users', UserRouter);
router.use('/device', Device);
router.use('/docker', Docker);
router.use('/pptpd', PPTPD);

// Export the base-router
export default router;
