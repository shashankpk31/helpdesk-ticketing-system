const express = require('express');
const passport = require('passport');
const User = require('../models/user');

const router = express.Router();

router.get('/login', (req, res) => {
    res.render('login', { title: 'Login' });
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}));


router.get('/register', (req, res) => {
    res.render('register', { title: 'Register' });
});

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
