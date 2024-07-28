const LoginValidator = require('../validator/LoginValidator');
const Usuario = require('../model/Usuario');

exports.homePage = (req, res) => {
  if (req.session.logado) {
    res.render('index', { login: true });
  }
  else {
    res.render('index', {login: false});
  }
}

exports.index = (req, res) => {
  const {error, value} = {};
  res.render('login', {error, value});
}

exports.login = (req, res) => {
  const {error, value} = LoginValidator.validate(req.body);
  console.log('usuario: ' + value.usuario + ' senha: ' + value.senha);
  if (error) {
    res.render('login', {error: error.details[0].message, value: req.body});
  }
  else {
    // Checando dados do usuário
    if (Usuario.isUser(value)) {
      req.session.user = value;
      res.render('index', {login: true, success: true});
    } 
    else {
        res.render('login', {error: 'Invalid username or password', value: req.body});
    }
  }
}

exports.logout = (req, res) => {
  // atribui um valor indefinido para o usuário na sessão
  req.session.logado = false;
  req.session.user = undefined;
  res.redirect('/');
}