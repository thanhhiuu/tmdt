import express from 'express';
import {
  createCategory,
  getCurrent,
  getAll,
  update,
  deletes,
} from '../controllers/productCategory.js';
import { verifyToken, isAdmin } from '../middlewares/verifyToken.js';
const router = express.Router();

router.post('/', [verifyToken], createCategory);
router.get('/all', getAll);
router.get('/current/:uid', [verifyToken], getCurrent);
router.put('/update/:uid', [verifyToken], update);
router.delete('/delete/:uid', [verifyToken], deletes);

export default router;
