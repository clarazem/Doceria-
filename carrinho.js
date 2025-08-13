// carrinho.js

// Função para atualizar o carrinho na interface
function atualizarCarrinho() {
  const carrinhoContainer = document.getElementById('produtos-carrinho');
  const subtotalElement = document.getElementById('subtotal');
  const totalElement = document.getElementById('total');
  
  // Obtém o carrinho do localStorage
  const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

  carrinhoContainer.innerHTML = ''; // Limpa a lista de produtos

  let subtotal = 0;

  carrinho.forEach(item => {
    const produtoElement = document.createElement('div');
    produtoElement.classList.add('produto');

    produtoElement.innerHTML = `
      <img src="${item.imagem}" alt="${item.nome}">
      <div class="produto-info">
        <h2>${item.nome}</h2>
      </div>
      <div class="produto-valores">
        <span>R$ ${item.preco.toFixed(2)}</span>
        <input type="number" value="${item.quantidade}" min="1" onchange="atualizarQuantidade(${item.id}, this.value)">
        <span>R$ ${(item.preco * item.quantidade).toFixed(2)}</span>
      </div>
    `;
    carrinhoContainer.appendChild(produtoElement);
    subtotal += item.preco * item.quantidade;
  });

  subtotalElement.textContent = subtotal.toFixed(2);
  totalElement.textContent = subtotal.toFixed(2);
}

// Função para atualizar a quantidade de um item no carrinho

