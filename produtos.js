// produto.js

// Obtém todos os botões de "Adicionar ao Carrinho"
const botoesAdicionar = document.querySelectorAll('.adicionar');

// Adiciona um evento de clique para cada botão
botoesAdicionar.forEach(botao => {
  botao.addEventListener('click', () => {
    const id = botao.getAttribute('data-id');
    const nome = botao.getAttribute('data-nome');
    const preco = parseFloat(botao.getAttribute('data-preco'));
    const imagem = botao.getAttribute('data-imagem');

    // Cria um objeto do produto
    const produto = { id, nome, preco, imagem, quantidade: 1 };

    // Recupera o carrinho existente do localStorage, se houver
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    // Verifica se o produto já existe no carrinho
    const produtoExistente = carrinho.find(item => item.id === id);
    
    if (produtoExistente) {
      // Se o produto já existir, aumenta a quantidade
      produtoExistente.quantidade++;
    } else {
      // Se o produto não existir, adiciona ao carrinho
      carrinho.push(produto);
    }

    // Armazena o carrinho atualizado no localStorage
    localStorage.setItem('carrinho', JSON.stringify(carrinho));

    // Redireciona para a página do carrinho
    window.location.href = 'carrinho.html';
  });
});
