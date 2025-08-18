function adicionarCarrinho(nome, preco, imagem) {
  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
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
  if(confirm("Deseja realmente limpar o carrinho?")){
    localStorage.removeItem("carrinho");
    renderCarrinho();
    atualizarContadorCarrinho();
  }
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

function finalizarCompra() {
  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  if(carrinho.length === 0){
    alert("O carrinho está vazio!");
    return;
  }
  // Aqui você pode adicionar integração com pagamento real ou checkout
  alert("Compra finalizada com sucesso!\nTotal: R$ " + carrinho.reduce((acc, item) => acc + item.preco * item.quantidade, 0).toFixed(2));
  localStorage.removeItem("carrinho");
  renderCarrinho();
  atualizarContadorCarrinho();
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

  const btnFinalizar = document.querySelector(".btn-finalizar");
  if(btnFinalizar) btnFinalizar.addEventListener("click", finalizarCompra);

  atualizarContadorCarrinho();
  renderCarrinho();
});
// Função para gerar QR Code PIX (simulação)
function gerarPix(valorTotal) {
  const chavePix = "123e4567-e89b-12d3-a456-426614174000"; // sua chave PIX de teste
  const qrCodeURL = `https://api.qrserver.com/v1/create-qr-code/?data=PIX%20CHAVE:${chavePix}%20VALOR:${valorTotal.toFixed(2)}&size=150x150`;
  return { chavePix, qrCodeURL };
}
function finalizarCompra() {
  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  if (carrinho.length === 0) {
    alert("Seu carrinho está vazio!");
    return;
  }

  const total = carrinho.reduce((sum, item) => sum + item.preco * item.quantidade, 0);
  const chavePix = "123e4567-e89b-12d3-a456-426614174000";
  const qrCodeURL = `https://api.qrserver.com/v1/create-qr-code/?data=PIX%20CHAVE:${chavePix}%20VALOR:${total.toFixed(2)}&size=150x150`;

  // Preencher modal
  document.getElementById("valor-total-pix").textContent = total.toFixed(2);
  document.getElementById("chave-pix").textContent = chavePix;
  document.getElementById("qrcode-pix").src = qrCodeURL;

  const modal = document.getElementById("modal-pix");
  modal.style.display = "flex";

  // Fechar modal ao clicar no X
  modal.querySelector(".fechar").onclick = () => modal.style.display = "none";

  // Cancelar pagamento
  document.getElementById("cancelar-pagamento").onclick = () => modal.style.display = "none";

  // Confirmar pagamento
  document.getElementById("confirmar-pagamento").onclick = () => {
    registrarCompra(carrinho, total); // Registra no histórico do usuário
    localStorage.removeItem("carrinho");
    renderCarrinho();
    atualizarContadorCarrinho();
    modal.style.display = "none";
    alert("Pagamento confirmado! Compra registrada com sucesso.");
  };
}
