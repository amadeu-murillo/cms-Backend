module.exports = {
    // Verifica se o usuario inserido condiz com o registrado no arquivo .env
    isUser: function(usuario) {
        return usuario.email == process.env.USER && usuario.senha  == process.env.PASSWORD;
    }
};
