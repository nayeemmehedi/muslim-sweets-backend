import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/temp");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 10);
    cb(null, file.fieldname + "-" + uniqueSuffix + file.originalname);
    // cb(null, file.fieldname + '-' + uniqueSuffix + file.name)
  },
});

const uploader = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const supportedImages = /png|jpg|jpeg|gif/;
    const extensions = path.extname(file.originalname);

    // const extensions =path.extname(file.name)

    if (supportedImages.test(extensions)) {
      cb(null, true);
    } else {
      cb(new Error("Must be png|jpg|jpeg|gif"));
    }
  },
  limits: {
    fileSize: 5000000,
  },
});

//   const upload = multer({ storage: storage })

export default uploader;
