import expressRouter from 'express';

import {
  createProduct,
  getOneProduct,
  updateProduct,
  getAllProduct,
  getProduct,
  deleteProduct,
  ratings,
  upLoadImg,
} from '../controllers/product.js';

import { verifyToken, isAdmin } from '../middlewares/verifyToken.js';
import uploadCloud from '../middlewares/uploadCloud.js';
import { handleUpload } from '../middlewares/handlerUpload.js';
const router = expressRouter.Router();

router.post('/create', [verifyToken, isAdmin], createProduct);
router.get('/getall', getAllProduct);
router.get('/get', getProduct);
router.get('/getcurrent/:id', getOneProduct); // Thiếu [verifyToken]
router.put('/update/:uid', [verifyToken], updateProduct);
router.delete('/delete/:uid', [verifyToken, isAdmin], deleteProduct);
router.post('/rating/:uid', [verifyToken], ratings);
router.put(
  '/upload/:uid',
  (req, res, next) => {
    console.log('upload middleware chạy');
    next();
  },
  handleUpload,
  (req, res, next) => {
    console.log('upload middleware chạy 23');
    next();
  },
  upLoadImg
);

export default router;
