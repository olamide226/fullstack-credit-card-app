const express = require("express");
const cors = require("cors");
const HttpException = require('./utils/HttpException.utils');
const errorMiddleware = require('./middleware/error.middleware');
const cardsRouter = require('./routes/cards.route');

// Init express
const app = express();


app.use((req, res, next)=> {
    // little hack for my browser
    req.headers['content-type'] = 'application/json';
    next();
})
// parse requests of content-type: application/json
// parses incoming requests with JSON payloads
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

// enabling cors for all requests by using cors middleware
app.use(cors());
// Enable pre-flight
app.options("*", cors());

app.use(`/api/cards`, cardsRouter);

// 404 error
app.all('*', (req, res, next) => {
    const err = new HttpException(404, 'Endpoint Not Found');
    next(err);
});

// Error middleware
app.use(errorMiddleware);

module.exports = app;
