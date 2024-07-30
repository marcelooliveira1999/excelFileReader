const errorHandling = (app) => {
  app.use((error, req, res, next) => {
    console.error(error.stack); // Log do erro no console

    // Configura o status do erro
    const statusCode = error.status || 500;
    res.status(statusCode).json({ message: error.message });
  });
};

module.exports = errorHandling;
