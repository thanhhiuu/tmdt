import ExpressRouter from 'express';
import { create, deletes, getCurrent, update } from '../controllers/brand.js';
import { verifyToken, isAdmin } from '../middlewares/verifyToken.js';
const router = ExpressRouter.Router();
router.post('/create', [verifyToken, isAdmin], create);
router.get('/getcurrent/:brid', [verifyToken, isAdmin], getCurrent);
router.put('/update/:brid', [verifyToken, isAdmin], update);
router.delete('/delete/:brid', [verifyToken, isAdmin], deletes);
export default router;
