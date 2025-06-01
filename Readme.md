# Helpdesk Ticketing System Setup 🚀

## **Project Initialization**
1. Created a new project folder and initialized `npm`:
    ```bash
    mkdir helpdesk-ticketing-system
    cd helpdesk-ticketing-system
    npm init -y
    ```

2. Installed necessary dependencies:
    ```bash
    npm install express ejs dotenv passport passport-local express-session pg sequelize bcryptjs
    ```

3. Set up folder structure:
    ```
    helpdesk-ticketing-system/
    │── views/ (EJS templates)
    │── public/ (Static assets: CSS, JS, Images)
    │── models/ (Database models)
    │── routes/ (Express routes)
    │── controllers/ (Handling request logic)
    │── config/ (Database configuration)
    │── .env (Environment variables)
    │── server.js (Main application file)
    ```

---

## **Express & EJS Setup**
1. Configured Express inside `server.js`:
    ```js
    require('dotenv').config();
    const express = require('express');
    const session = require('express-session');
    const passport = require('passport');

    const app = express();

    app.set('view engine', 'ejs');
    app.use(express.static('public'));
    app.use(express.urlencoded({ extended: true }));

    app.use(session({ secret: 'secretkey', resave: false, saveUninitialized: true }));
    app.use(passport.initialize());
    app.use(passport.session());

    app.get('/', (req, res) => {
        res.render('index', { title: 'Helpdesk Ticketing System' });
    });

    app.listen(process.env.PORT || 5000, () => console.log('Server running'));
    ```

---

## **Database Connection (PostgreSQL)**
1. Configured PostgreSQL connection in `config/db.js`:
    ```js
    require('dotenv').config();
    const { Sequelize } = require('sequelize');

    const databaseUrl = process.env.DATABASE_URL;

    if (!databaseUrl) {
        throw new Error('DATABASE_URL is missing in environment variables');
    }

    const sequelize = new Sequelize(databaseUrl, {
        dialect: 'postgres',
        logging: false
    });

    sequelize.authenticate()
        .then(() => console.log('PostgreSQL connected'))
        .catch(err => console.error('Database connection error:', err));

    module.exports = sequelize;
    ```

2. Added `.env` file:
    ```
    PORT=5000
    DATABASE_URL=postgres://username:password@localhost:5432/helpdeskdb
    SESSION_SECRET=your_secret_key
    ```

---

## **User Model & Authentication**
1. Defined `User` model inside `models/user.js`:
    ```js
    const { Sequelize, DataTypes } = require('sequelize');
    const sequelize = require('../config/db');
    const bcrypt = require('bcryptjs');

    const User = sequelize.define('User', {
        username: { type: DataTypes.STRING, allowNull: false, unique: true },
        password: { type: DataTypes.STRING, allowNull: false }
    });

    User.beforeCreate(async (user) => {
        user.password = await bcrypt.hash(user.password, 10);
    });

    sequelize.sync()
        .then(() => console.log('User table created or already exists'))
        .catch(err => console.error('Error syncing database:', err));

    module.exports = User;
    ```

---

## **Passport.js Authentication**
1. Set up Passport.js inside `config/passport.js`:
    ```js
    const passport = require('passport');
    const LocalStrategy = require('passport-local').Strategy;
    const bcrypt = require('bcryptjs');
    const { User } = require('../models/user');

    passport.use(new LocalStrategy(async (username, password, done) => {
        try {
            const user = await User.findOne({ where: { username } });
            if (!user) return done(null, false, { message: 'User not found' });

            const isValid = await bcrypt.compare(password, user.password);
            if (!isValid) return done(null, false, { message: 'Incorrect password' });

            return done(null, user);
        } catch (error) {
            return done(error);
        }
    }));

    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findByPk(id);
            done(null, user);
        } catch (error) {
            done(error);
        }
    });

    module.exports = passport;
    ```

---

## **Auth Routes (Register & Login)**
1. Created `routes/auth.js`:
    ```js
    const express = require('express');
    const passport = require('passport');
    const { User } = require('../models/user');

    const router = express.Router();

    router.get('/login', (req, res) => res.render('login', { title: 'Login' }));

    router.post('/login', passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    }));

    router.get('/register', (req, res) => res.render('register', { title: 'Register' }));

    router.post('/register', async (req, res) => {
        try {
            await User.create({ username: req.body.username, password: req.body.password });
            res.redirect('/login');
        } catch (error) {
            console.error("Registration error:", error);
            res.redirect('/register');
        }
    });

    router.get('/logout', (req, res) => {
        req.logout(() => res.redirect('/'));
    });

    module.exports = router;
    ```

2. Integrated Auth Routes in `server.js`:
    ```js
    const authRoutes = require('./routes/auth');
    app.use(authRoutes);
    ```

---

## **Views (Login & Register Pages)**
1. `views/login.ejs`:
    ```html
    <h1>Login</h1>
    <form method="POST" action="/login">
        <label>Username:</label>
        <input type="text" name="username" required>
        <label>Password:</label>
        <input type="password" name="password" required>
        <button type="submit">Login</button>
    </form>
    ```

2. `views/register.ejs`:
    ```html
    <h1>Register</h1>
    <form method="POST" action="/register">
        <label>Username:</label>
        <input type="text" name="username" required>
        <label>Password:</label>
        <input type="password" name="password" required>
        <button type="submit">Register</button>
    </form>
    ```

---

## **Debugging Setup**
1. Created `launch.json` for VS Code debugging:
    ```json
    {
        "version": "0.2.0",
        "configurations": [
            {
                "name": "Debug Node.js",
                "type": "node",
                "request": "launch",
                "program": "${workspaceFolder}/server.js",
                "envFile": "${workspaceFolder}/.env",
                "console": "integratedTerminal"
            }
        ]
    }
    ```

---

### **Next Steps**
✔️ Setting up **dashboard & ticketing functionality**  
✔️ Implementing **authorization (user roles & access control)**  
✔️ Deploying the project on **Render.com**