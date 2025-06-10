import {
  CreateCartUser,
  getOtherUser,
  updateStatus,
} from '../controllers/other.js';
import express from 'express';
import { isAdmin, verifyToken } from '../middlewares/verifyToken.js';

const router = express.Router();

router.post('/cart', [verifyToken, isAdmin], CreateCartUser);
router.put('/status/:oid', [verifyToken, isAdmin], updateStatus);
router.get('/get-other/:oid', [verifyToken], getOtherUser);
router.get('/get-other/:oid', [verifyToken, isAdmin], getOtherUser);

export default router; // Export the router
