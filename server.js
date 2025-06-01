require('dotenv').config();
const express = require('express');
const session = require('express-session');
const app = express();

// Middleware
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Session setup
app.use(session({ secret: 'secretkey', resave: false, saveUninitialized: true }));

const passport = require('./config/passport'); 
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
    res.render('index', { title: 'Helpdesk Ticketing System' });
});

const authRoutes = require('./routes/auth');
app.use(authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
