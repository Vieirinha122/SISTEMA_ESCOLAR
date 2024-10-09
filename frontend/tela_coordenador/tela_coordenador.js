async function carregarCoordenador() {
    try {
        // Faz a requisição para a API e obtém os dados do coordenador
        const resposta = await fetch('https://sistema-escolar-two.vercel.app/api/coordenadores/'); // Substitua pela URL correta da sua API
        const dadosCoordenador = await resposta.json();

        // Pega o nome do coordenador e exibe na página
        const nomeCoordenador = dadosCoordenador[0].nome; // Considerando que os dados estão dentro de um array
        document.getElementById('nome-coordenador').textContent = nomeCoordenador;

    } catch (error) {
        console.error('Erro ao carregar coordenador:', error);
    }
}

// Chama a função ao carregar a página
window.onload = carregarCoordenador;