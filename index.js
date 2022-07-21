const express = require('express');
const app = express();
const errorHandler = require('./_middlewares/error-handler');

// use request body
app.use(express.json()) 

// api routes
app.use('/v1', require('./_routers/v1/scrap.router'));

// global error handler
app.use(errorHandler);

// start server from developer account
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 8080) : 8080;
app.listen(port, () => {
    console.log('Server listening on port ' + port);
});
