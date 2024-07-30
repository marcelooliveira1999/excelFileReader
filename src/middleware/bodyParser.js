const bodyParser = require("body-parser");

const bodyParserConfig = (app) => {
  app.use(
    bodyParser.json({
      limit: "10mb",
      strict: true,
      type: "application/json",
    })
  );

  app.use(
    bodyParser.urlencoded({
      extended: true,
      limit: "10mb",
      parameterLimit: 1000,
    })
  );
};

module.exports = bodyParserConfig;
