const middlewares = require("./middleware");
const routes = require("./routes");

const app = require("express")();

// start middlewares
middlewares(app);

// Routes mapping
app.use("/api/services", routes.dataImportRoute);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log("Server is running..."));
