const express = require('express');

const homeRouter = express.Router();

homeRouter.route('/')
  .get((req, res) => {
    res.render('home', { title: 'Home' });
  });

homeRouter.route('/home')
  .get((req, res) => {
    res.render('user', { title: 'User' });
  });


module.exports = homeRouter;
