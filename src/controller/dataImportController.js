const { unlink } = require("fs");
const ExcelJS = require("exceljs");

const transformString = require("../utils/transformString");
const dataImportQueue = require("../bull/queues/dataImportQueue");

const messages = {
  fileNotFound: {
    code: 400,
    message: "File not found",
  },

  invalidFile: {
    code: 400,
    message: "Invalid file model",
  },

  success: {
    message: "File added to processing queue",
  },
};

const dataImportController = async (file) => {
  if (!file) throw messages.fileNotFound;

  const { path } = file;
  const book = new ExcelJS.stream.xlsx.WorkbookReader(path);

  for await (const sheet of book) {
    let pageHeader;

    for await (const row of sheet) {
      const values = row.values.slice(1);
      pageHeader = values.map((value) => transformString(value));

      const documentModel = process.env.DOCUMENT_MODEL.split(",");
      let documentIsValid = true;

      documentModel.forEach((column) => {
        if (!pageHeader.includes(column)) {
          documentIsValid = false;
        }
      });

      const columnsDiff = documentModel.length - pageHeader.length;
      if (!documentIsValid || columnsDiff !== 0) {
        unlink(path, (err) => {
          if (err) console.log(err.message);
        });

        throw messages.invalidFile;
      }

      break;
    }
  }

  await dataImportQueue.add(file);
  return messages.success;
};

module.exports = dataImportController;
