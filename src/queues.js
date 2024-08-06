const dataImportQueue = require("./bull/queues/dataImportQueue");

dataImportQueue.on("failed", (job, error) => {
  console.log("JOB FAILED - dataImportQueue");
  console.log("JOB DATA :", job.data);
  console.log("ERROR MESSAGE :", error.message);
});
