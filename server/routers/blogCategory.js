import {
  createBlog,
  getCurrent,
  getAll,
  update,
  deletes,
} from '../controllers/blogCategory.js';
import expressRouter from 'express';
import { isAdmin, verifyToken } from '../middlewares/verifyToken.js';
const router = expressRouter.Router();

router.post('/', verifyToken, createBlog);
router.get('/current/:blid', verifyToken, getCurrent);
router.get('/all', verifyToken, getAll);
router.put('/update/:blid', verifyToken, update);
router.delete('/delete/:blid', verifyToken, deletes);

export default router;
