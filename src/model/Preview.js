const path = require('path');
const fs = require('fs');

function formatDate(date) {
    const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: 'America/Sao_Paulo' // Optional: specify time zone
    };
    return new Date(date).toLocaleString('pt-BR', options);
}

module.exports = {
    getPreviews: function getPreviews() {
        const dirPosts = path.resolve(__dirname, "..", "Arquivos");
        const arqPosts = fs.readdirSync(dirPosts);
        return arqPosts.map(arquivo => {
            const pathArq = path.join(dirPosts, arquivo);
            const conteudo = fs.readFileSync(pathArq, 'utf-8');
            const stats = fs.statSync(pathArq); // Get file stats
            const creationDate = stats.birthtime; // Get creation date
            preview = conteudo.split('\n').slice(0, 3). join(' ');
            return {
                titulo: arquivo.replace('.html', ''),
                preview,
                nomeArq: arquivo,
                data: stats.mtime,
                dataForm: formatDate(creationDate)
            };
        });
    },

    ordenar: function ordenar(previews, opcao) {
        switch (opcao) {
            case 'data':
                return previews.sort((a, b) => new Date(a.data) - new Date(b.data));
            case 'titulo':
                return previews.sort((a, b) => a.titulo.localeCompare(b.titulo));
            default:
                return previews;
        }
    }
    
    
}