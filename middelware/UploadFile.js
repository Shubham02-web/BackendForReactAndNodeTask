// const multer = require("multer");
// const fs = require("fs");
// const path = require("path");
// const generateUniqueUserId = require("./genrateUniqueId");

// const storage = multer.diskStorage({
//   destination: async (req, file, cb) => {
//     const { name } = req.body;

//     if (!name) {
//       return cb(new Error("Name is required"), false);
//     }

//     // Generate unique employee ID
//     const employeeOfficeId = await generateUniqueUserId(name);
//     req.body.employeeOfficeId = employeeOfficeId;
//     console.log(employeeOfficeId);

//     // Create directory
//     const uploadPath = path.join(__dirname, `../uploads/${employeeOfficeId}`);
//     if (!fs.existsSync(uploadPath)) {
//       fs.mkdirSync(uploadPath, { recursive: true });
//     }

//     cb(null, uploadPath);
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   },
// });

// const upload = multer({ storage: storage });

// module.exports = upload;

const fs = require("fs");
const path = require("path");
const multer = require("multer");
const generateUniqueUserId = require("./genrateUniqueId");

const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    let userId = req.body.employeeOfficeId;

    if (!userId) {
      userId = await generateUniqueUserId(req.body.name);
      req.body.employeeOfficeId = userId;
    }

    const uploadPath = path.join(__dirname, `../uploads/${userId}`);

    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
