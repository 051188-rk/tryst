const express = require('express');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;
const auth = require('../middleware/auth');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'lovely_photos',
    allowed_formats: ['jpg','jpeg','png','webp']
  }
});

const parser = multer({ storage });

const router = express.Router();

router.post('/photo', auth, parser.single('photo'), async (req,res) => {
  if(!req.file) return res.status(400).json({ error: 'No file' });
  const file = req.file;
  res.json({ url: file.path, public_id: file.filename });
});

module.exports = router;
