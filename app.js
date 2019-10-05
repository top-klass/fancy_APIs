const express = require('express');
const app = express();
const session = require('express-session');
const swaggerUi = require('swagger-ui-express');

const albumRouter = require('./routes/album');
const goodsRouter = require('./routes/goods');

/* Routing Path */
app.use('/auth', albumRouter);
app.use('/lookup', goodsRouter);

/* Session Setting */
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: 'secret code',
    cookie: {
        httpOnly: true,
        secure: false
    },
}))

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});

module.exports = app;
