const multer = require('multer');
const path = require('path');

// Configuração do multer para armazenar arquivos na pasta "Arquivos"
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '..', 'Arquivos'));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

// Filtro para aceitar apenas arquivos .html
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'text/html') {
    cb(null, true);
  } else {
    cb(new Error('Apenas arquivos .html são permitidos'), false);
  }
};

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
});

module.exports = upload;