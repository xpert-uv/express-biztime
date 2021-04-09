/** BizTime express application. */
const express = require('express');
const expressError = require('./expressError');
const app = express();

app.use(express.json());

const cRoutes = require("./routes/companies");
app.use("/companies", cRoutes);

const iRoutes = require("./routes/invoices");
app.use("/invoices", iRoutes);



//404 handler
app.use((req, res, next) => {
  const err = new expressError("Not found", 404);
  return next(err);
});

app.use((err, req, res, next) => {
  let status = err.staus || 500;

  return res.status(status).json({
    error: {
      messag: err.message,
      status: status
    }
  });
});


module.exports = app;
