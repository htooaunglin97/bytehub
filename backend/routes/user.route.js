import express from 'express';
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getAllUserProfiles,
  getUserById,
  deleteUser,
  verifyEmail,
  updateUser,
} from '../controllers/user.controller.js';
import {
  protect,
  verifyEmailProtect,
  admin,
} from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(registerUser).get(protect, admin, getAllUserProfiles);
router.get('/verify-email', verifyEmail);
router.post('/logout', logoutUser);
router.post('/auth', authUser);
router
  .route('/profile')
  .get(protect, verifyEmailProtect, getUserProfile)
  .put(protect, updateUserProfile);
router
  .route('/:id')
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser);

export default router;
