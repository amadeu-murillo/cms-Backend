var express = require('express');
var router = express.Router();
const Usuario = require('../model/Usuario');
const LoginValidator = require('../validator/LoginValidator');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
  const {error, value} = {};
  res.render('login', {error, value});
});

router.post('/login', function(req, res, next) {
  const {error, value} = LoginValidator.validate(req.body);

  if (error) {
    res.render('login', {error: error.details[0].message, value: req.body});
  }
  else {
    // Checando dados do usuário
    if (Usuario.isUser(req.body)) {
      req.session.authenticated = true;
      res.redirect('/');
    } 
    else {
        res.render('login', {error: 'Invalid username or password', value: req.body});
    }
  }
});

module.exports = router;
