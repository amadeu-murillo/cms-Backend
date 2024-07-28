const path = require('path');
const fs = require('fs');

module.exports = {
    getPreviews: function getPreviews() {
        const dirPosts = path.resolve(__dirname, "..", "Arquivos");
        const arqPosts = fs.readdirSync(dirPosts);
        return arqPosts.map(arquivo => {
            const pathArq = path.join(dirPosts, arquivo);
            const conteudo = fs.readFileSync(pathArq, 'utf-8');
            preview = conteudo.split('\n').slice(0, 5). join(' ');
            return {titulo: arquivo.replace('.html', ' '), preview, filename: arquivo};
        });
    
    }
}