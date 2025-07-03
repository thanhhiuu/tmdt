import expressRouter from 'express';

import {
  login,
  register,
  getOneUser,
  refreshToken,
  logOut,
  resetPassword,
  verifyResetPassword,
  getAllUser,
  deleteUser,
  updateCurrentUser,
  updateByAdmin,
  addAddress,
  addCart,
  kycGmail,
} from '../controllers/user.js';
import { verifyToken, isAdmin } from '../middlewares/verifyToken.js';
const router = expressRouter.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/verify-email/:token', kycGmail);
router.get('/getone', [verifyToken, isAdmin], getOneUser);
router.get('/getall', [verifyToken, isAdmin], getAllUser);
router.put('/address', [verifyToken], addAddress);
router.put('/addcart', [verifyToken], addCart);
router.post('/refreshtoken', refreshToken);
router.post('/logout', logOut);
router.get('/reset-password', resetPassword);
router.put('/verify-password', verifyResetPassword);
router.delete('/delete-current', [verifyToken, isAdmin], deleteUser);
router.put('/update-current', [verifyToken], updateCurrentUser);
router.put('/update-admin/:uid', [verifyToken, isAdmin], updateByAdmin);

export default router;
