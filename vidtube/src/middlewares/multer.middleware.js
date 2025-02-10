import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/temp");
  },
  filename: (req, file, cb) => {
    // Todo for user
    //const uniqueSuffix =
    //Date.now() + "-" + Math.random().toString(36).substr(-6);

    cb(null, file.originalname);
  },
});

export const upload = multer({ storage: storage });
