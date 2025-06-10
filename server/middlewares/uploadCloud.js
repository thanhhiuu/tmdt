import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../configs/cloundinaryConfigs.js';
import multer from 'multer';
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: 'commerce',
      allowed_formats: ['jpg', 'png'],
    };
  },
});
const uploadCloud = multer({ storage });
export default uploadCloud;
