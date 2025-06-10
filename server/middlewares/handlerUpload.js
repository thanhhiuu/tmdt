import uploadCloud from './uploadCloud.js';

export const handleUpload = (req, res, next) => {
  uploadCloud.array('image')(req, res, function (err) {
    if (err) {
      console.error('Upload error:', err);
      return res
        .status(400)
        .json({ success: false, message: 'Upload failed', error: err.message });
    }
    next();
  });
};
