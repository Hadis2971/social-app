import multer from 'multer';
const baseURL = 'http://localhost:5000/profile_images/';
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log('inside multer disk storage req.body', req.body);
    console.log('inside multer disk storage file', file);
    cb(null, './src/public/profile_images');
  },
  filename: (req, file, cb) => {
    const filename = `${baseURL}${Date.now()}_${file.originalname}`;
    req.filename = filename;
    cb(null, Date.now() + '_' + file.originalname);
  }
});

const upload = multer({ storage: storage });

export default upload;
