var express = require('express');
var router = express.Router();
const path = require('path');
const fs = require('fs');
const acesso = require('../middlewares/middlewares');
const loginController = require('../controllers/loginController')

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.session.logado) {
    res.render('index', { usuario: req.session.user });
  }
  else {
    res.render('index');
  }
});

router.get('/login', loginController.index);

router.get('/logout',loginController.logout)

router.post('/login', loginController.login);

//Renderiza a página com os arquivos já criados disponíveis
router.get('/arquivos', (req, res) => {

  const diretorioArquivos = path.resolve(__dirname, "..", "Arquivos");

  fs.readdir(diretorioArquivos, (erro, files) => {
    if(erro) {
      res.render('paginas', {error: "Arquivos não encontrados"});
      return;
    };
    console.log(files);
    res.render("paginas", {files: files});
  });
});

//Renderiza conteudo de arquivos
router.get("/arquivos/:file", acesso.autentica, (req, res) => {
  const { file } = req.params;
  console.log(file);
  const dirPath = path.resolve(__dirname, "..", "Arquivos");
  const filePath = path.join(dirPath, file);

  if(!fs.existsSync(filePath)){
    res.render("conteudo", {error: "Erro ao encontrar arquivo: arquivo não existe."});
    return;
  };

  //Renderiza o conteúdo do arquivo na página de edição
    fs.readFile(filePath, 'utf-8', (erro, data) => {
      if (erro) {
        console.error('Erro ao ler o arquivo:', erro);
        res.status(500).send('Erro interno do servidor');
        return;
      }
      return res.render("editor", {titulo: file.replace(".html", ""), conteudo: data});
    });
  }
);

router.get("/conteudo/:file", (req, res) => {
  const { file } = req.params;
  console.log(file);
  const dirPath = path.resolve(__dirname, "..", "Arquivos");
  const filePath = path.join(dirPath, file);

  if(!fs.existsSync(filePath)){
    res.render("conteudo", {error: "Erro ao encontrar arquivo: arquivo não existe."});
    return;
  };

  //Renderiza o conteúdo do arquivo na página de edição
    fs.readFile(filePath, 'utf-8', (erro, data) => {
      if (erro) {
        console.error('Erro ao ler o arquivo:', erro);
        res.status(500).send('Erro interno do servidor');
        return;
      }
      return res.render("conteudo", {titulo: file.replace(".html", ""), conteudo: data});
    });
  }
);
module.exports = router;
