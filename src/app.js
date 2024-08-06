const middlewares = require("./middleware");
const models = require("./models");
const routes = require("./routes");

const app = require("express")();

// start middlewares
middlewares(app);

// sync database
for (const key in models) {
  const model = models[key];

  model
    .sync()
    .then(() => {
      console.log(`${key} synchronized...`);
    })
    .catch((reason) => {
      console.log(`Erro when sync ${key}: `, reason);
    });
}

// Routes mapping
app.use("/api/services", routes.dataImportRoute);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log("Server is running..."));
