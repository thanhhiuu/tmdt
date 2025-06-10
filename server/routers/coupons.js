import ExpressRouter from 'express';
import { create, deletes, getCurrent, update } from '../controllers/coupons.js';
import { verifyToken, isAdmin } from '../middlewares/verifyToken.js';
const router = ExpressRouter.Router();
router.post('/create', [verifyToken, isAdmin], create);
router.get('/getcurrent/:cid', [verifyToken, isAdmin], getCurrent);
router.put('/update/:cid', [verifyToken, isAdmin], update);
router.delete('/delete/:cid', [verifyToken, isAdmin], deletes);
export default router;
