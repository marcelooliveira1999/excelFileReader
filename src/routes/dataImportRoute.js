const { Router } = require("express");
const { mkdirSync, existsSync } = require("fs");
const multer = require("multer");
const dayjs = require("dayjs");
const dataImportController = require("../controller/dataImportController");

const route = Router();
const storage = multer.diskStorage({
  // Defines the directory where the files will be stored
  destination: (req, file, callback) => {
    const path = "uploads/dataImport/";

    const exists = existsSync(path);
    if (exists) {
      callback(null, path);
    } else {
      mkdirSync(path, { recursive: true });

      callback(null, path);
    }
  },

  // Set file name to be saved
  filename: (req, { originalname }, callback) => {
    const name = `${dayjs().toISOString()}-${originalname}`;

    callback(null, name);
  },
});

const uploadsConfig = multer({
  // Set storage settings
  storage,

  // Set upload limits
  limits: { files: 1, fileSize: 1024 * 1024 * 250 },

  // Function to filter files
  fileFilter(req, { mimetype }, callback) {
    // Allowed only Excel files (.xls e .xlsx)
    const allowedTypes = [
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ];

    if (allowedTypes.includes(mimetype)) return callback(null, true);
    callback(new Error("Tipo de arquivo não permitido."), false);
  },
});

route.post(
  "/dataImport/upload",
  uploadsConfig.single("file"),
  async (req, res) => {
    try {
      const { file } = req;
      const message = await dataImportController(file);

      res.json(message);
    } catch (error) {
      const { code, message } = error;

      if (code && message) {
        res.status(code).json({ message });
      } else {
        res.status(500).json({ message: `Internal server error: ${message}` });
      }
    }
  }
);

module.exports = route;
