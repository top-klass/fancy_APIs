const express = require('express');
const app = express();
const session = require('express-session');
const swaggerUi = require('swagger-ui-express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const albumRouter = require('./routes/album');
const goodsRouter = require('./routes/goods');
const loginRouter = require('./routes/login');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

/* Session Setting */
app.use(session({
    saveUninitialized: false,
    secret: 'klaytnfancy',
    cookie: {
        secure: false,
        maxAge: (60 * 30) * 1000
    },
    resave: false
}))

/* Routing Path */
app.use('/auth', albumRouter);
app.use('/lookup', goodsRouter);
app.use('/login', loginRouter);

app.listen(3000, () => {
    console.log('listening on port 3000');
});

module.exports = app;
