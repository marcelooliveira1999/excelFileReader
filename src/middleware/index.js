const bodyParserConfig = require("./bodyParser");
const errorHandling = require("./errorHandling");

const middlewares = (app) => {
  bodyParserConfig(app);
  errorHandling(app);
};

module.exports = middlewares;
