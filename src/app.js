const middlewares = require("./middleware");
const app = require("express")();

// start middlewares
middlewares(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log("Server is running..."));
