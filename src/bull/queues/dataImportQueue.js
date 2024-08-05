const Bull = require("bull");
const redisConfig = require("../../lib/db/redis/config");

const queueName = "dataImportQueue";

const dataImportQueue = new Bull(queueName, {
  redis: redisConfig,
  defaultJobOptions: { removeOnComplete: true },
});

const { unlink } = require("fs");
const ExcelJS = require("exceljs");
const transformString = require("../../utils/transformString");

dataImportQueue.process(async (job) => {
  const { data: file } = job;
  const { path } = file;

  try {
    const book = new ExcelJS.stream.xlsx.WorkbookReader(path);
    for await (const sheet of book) {
      let pageHeader;
      let buffer = [];

      for await (const row of sheet) {
        const values = row.values.slice(1);

        if (row.number === 1) {
          pageHeader = values.map((value) => transformString(value));

          const documentModel = process.env.DOCUMENT_MODEL.split(",");
          const missingColumns = documentModel.filter(
            (column) => !pageHeader.includes(column)
          );

          if (missingColumns.length > 0) throw messages.invalidFile;
        } else {
          const mappedObject = {};

          for (let cellIndex = 0; cellIndex < pageHeader.length; cellIndex++) {
            const cellValue = values[cellIndex];

            mappedObject[pageHeader[cellIndex]] = cellValue;
          }

          buffer.push(mappedObject);
          if (buffer.length === 1000) {
            // process the data

            buffer = [];
          }
        }
      }

      if (buffer.length > 0) {
        // process the remaining
      }
    }
  } catch (error) {
    throw error;
  } finally {
    unlink(path, (err) => {
      if (err) console.log("Error deleting file:", err.message);
    });
  }
});

module.exports = dataImportQueue;
