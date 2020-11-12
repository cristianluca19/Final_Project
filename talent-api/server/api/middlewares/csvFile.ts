import multer from 'multer';
import path from 'path';

// const csvFilter = (req, file, cb) => {
//   if (file.mimetype.includes('csv')) {
//     cb(null, true);
//   } else {
//     cb('Please upload only csv file.', false);
//   }
// };

const storage = multer.diskStorage({
  destination: path.join(__dirname, '../../../public/uploads'),
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const uploadFile = multer({ storage: storage });

export default uploadFile;
