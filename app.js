const ejs = require('ejs');
const express = require('express');
const app = express();
const PORT = 3000;
const morgan = require('morgan');
const session = require('express-session');



app.use(
     session({
          secret: 'my-secret',
          resave: false,
          saveUninitialized: true,
     })
);

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static('public'));

app.use(morgan('dev'));

app.use((req, res, next) => {
     console.log('Time', Date.now());
     next();
});

const authRouter = require('./routes/auth');
app.use('/auth', authRouter);

const route = require('./routes/route');
app.use('/route', route);

app.use((err, req, res, next) => {
     res.status(500).json({
          status: 'fail',
          error: err.message,
     });
});

app.get('/', (req, res) => {
     res.render('index');
});

app.get('/game', (req, res) => {
     res.render('game');
});

app.get('/login', (req, res) => {
     res.render('login');
});

app.get('/register', (req, res) => {
     res.render('register');
});

// 404
app.use('/', (req, res) => {
     res.status(404);
     res.send('<h1>404</h1>');
});

app.listen(PORT, () => {
     console.log(`App listening on port ${PORT}`);
});
