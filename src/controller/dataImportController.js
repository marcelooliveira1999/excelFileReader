const returns = {
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
  if (!file) throw returns.fileNotFound;

  const { path } = file;
};

module.exports = dataImportController;
