const { Router } = require("express");
const multer = require("multer");
const dayjs = require("dayjs");
const dataImportController = require("../controller/dataImportController");

const route = Router();
const storage = multer.diskStorage({
  // Defines the directory where the files will be stored
  destination: (req, file, callback) => {
    callback(null, "uploads/");
  },

  // Set file name to be saved
  filename: (req, file, callback) => {
    const name = `${dayjs().toISOString()}-${file.originalname}`;

    callback(null, name);
  },
});

const uploadsConfig = multer({
  // Set storage settings
  storage,

  // Set upload limits
  limits: { files: 1, fileSize: 1024 * 1024 * 250 },

  // Function to filter files
  fileFilter(req, file, callback) {
    // Allowed only Excel files (.xls e .xlsx)
    const allowedTypes = [
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ];

    if (allowedTypes.includes(file.mimetype)) return callback(null, true);
    callback(new Error("Tipo de arquivo não permitido."), false);
  },
});

route.post(
  "/dataImport/excel",
  uploadsConfig.single("file"),
  async (req, res) => {
    try {
      const { file } = req;
      const { data } = await dataImportController(file);

      res.json(data);
    } catch (error) {
      const { code, message } = error;

      if (code && message) {
        res.status(code).json({ message });
      } else {
        res.status(code).json({ message: `Internal server error: ${message}` });
      }
    }
  }
);
