// Recupera usuários e usuário atual do LocalStorage
let users = JSON.parse(localStorage.getItem('users')) || [];
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;

// Se já estiver logado, mostra o painel
window.onload = () => {
  if(currentUser){
    showAccountPanel(currentUser);
  }
};

// Cadastro
document.getElementById('register-form').addEventListener('submit', function(e){
  e.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password-register').value;

  if(users.some(u => u.email === email)){
    alert("E-mail já cadastrado!");
    return;
  }

  const user = { name, email, password, purchases: ["Nenhuma compra realizada"], payments: ["Nenhum pagamento registrado"] };
  users.push(user);
  localStorage.setItem('users', JSON.stringify(users));

  currentUser = user;
  localStorage.setItem('currentUser', JSON.stringify(currentUser));
  showAccountPanel(user);
});

// Login
document.getElementById('login-form').addEventListener('submit', function(e){
  e.preventDefault();
  const emailOrName = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const user = users.find(u => (u.email === emailOrName || u.name === emailOrName) && u.password === password);
  if(!user){
    alert("Usuário ou senha inválidos!");
    return;
  }

  currentUser = user;
  localStorage.setItem('currentUser', JSON.stringify(currentUser));
  showAccountPanel(user);
});

// Mostrar painel da conta
function showAccountPanel(user){
  document.getElementById('auth-container').style.display = 'none';
  const panel = document.getElementById('account-panel');
  panel.style.display = 'flex';
  document.getElementById('user-name').innerText = user.name;

  const purchaseEl = document.getElementById('purchase-history');
  purchaseEl.innerHTML = '';
  user.purchases.forEach(p => {
    const li = document.createElement('li');
    li.textContent = p;
    purchaseEl.appendChild(li);
  });

  const paymentEl = document.getElementById('payments-history');
  paymentEl.innerHTML = '';
  user.payments.forEach(p => {
    const li = document.createElement('li');
    li.textContent = p;
    paymentEl.appendChild(li);
  });
}

// Logout
function logout(){
  localStorage.removeItem('currentUser');
  currentUser = null;
  document.getElementById('account-panel').style.display = 'none';
  document.getElementById('auth-container').style.display = 'flex';
}
