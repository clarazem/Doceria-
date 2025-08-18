function adicionarCarrinho(nome, preco, imagem) {
  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  // Inicializar quantidade como 1
  carrinho.push({ nome, preco, imagem, quantidade: 1 });
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  atualizarContadorCarrinho();
  renderCarrinho();
  alert(`${nome} foi adicionado ao carrinho!`);
}

function renderCarrinho() {
  const carrinhoDiv = document.getElementById("produtos-carrinho");
  const subtotalEl = document.getElementById("subtotal");
  const totalEl = document.getElementById("total");
  if (!carrinhoDiv || !subtotalEl || !totalEl) return;

  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  carrinhoDiv.innerHTML = "";

  let total = 0;

  carrinho.forEach((item, index) => {
    // Calcular subtotal do item
    const subtotalItem = item.preco * item.quantidade;
    total += subtotalItem;

    const produtoDiv = document.createElement("div");
    produtoDiv.classList.add("produto");

    produtoDiv.innerHTML = `
      <img src="${item.imagem}" alt="${item.nome}">
      <div class="produto-info">
        <h2>${item.nome}</h2>
      </div>
      <div class="produto-valores">
        <span>R$ ${item.preco.toFixed(2)}</span>
        <input type="number" min="1" value="${item.quantidade}" onchange="atualizarQuantidade(${index}, this.value)">
        <span>R$ ${subtotalItem.toFixed(2)}</span>
        <button onclick="removerItem(${index})">X</button>
      </div>
    `;
    carrinhoDiv.appendChild(produtoDiv);
  });

  subtotalEl.textContent = total.toFixed(2);
  totalEl.textContent = total.toFixed(2);
}

function removerItem(index) {
  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  carrinho.splice(index, 1);
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  renderCarrinho();
  atualizarContadorCarrinho();
}

function limparCarrinho() {
  localStorage.removeItem("carrinho");
  renderCarrinho();
  atualizarContadorCarrinho();
}

function atualizarContadorCarrinho() {
  const contador = document.getElementById("contador");
  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  if (contador) contador.textContent = carrinho.length;
}

function atualizarQuantidade(index, novaQuantidade) {
  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  carrinho[index].quantidade = parseInt(novaQuantidade) || 1;
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  renderCarrinho();
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".adicionar").forEach(botao => {
    botao.addEventListener("click", () => {
      const produtoCard = botao.closest(".produto-card");
      const nome = botao.getAttribute("data-nome");
      const imagem = produtoCard.querySelector("img").src;
      const preco = 15;
      adicionarCarrinho(nome, preco, imagem);
    });
  });

  atualizarContadorCarrinho();
  renderCarrinho();
});
