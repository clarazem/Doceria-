// Alternar visualização da senha no cadastro
function togglePassword() {
    const senhaInput = document.getElementById("senha");
    if (senhaInput) {
      senhaInput.type = senhaInput.type === "password" ? "text" : "password";
    }
  }
  
  // Alternar entre login e cadastro
  document.getElementById('showRegister').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('loginForm').style.display = 'none';
    document.querySelector('.link-cadastro').style.display = 'none';
    document.getElementById('registerForm').style.display = 'block';
  });
  
  // Evento do login
  document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
  
    const message = document.getElementById('loginMessage');
  
    console.log('Login - Username:', username, 'Password:', password); // Debug
  
    if (!username || !password) {
      message.style.color = 'red';
      message.textContent = 'Preencha todos os campos!';
      return;
    }
  
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ username, password })
      });
  
      const data = await response.json();
      if(data.success){
        message.style.color = 'green';
        message.textContent = 'Login realizado com sucesso!';
      } else {
        message.style.color = 'red';
        message.textContent = data.error || 'Usuário ou senha incorretos!';
      }
    } catch (err) {
      message.style.color = 'red';
      message.textContent = 'Erro de conexão com o servidor!';
      console.error(err);
    }
  });
  
  // Evento do cadastro
  document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
  
      const nome = document.getElementById('nome').value.trim();
      const telefone = document.getElementById('telefone').value.trim();
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('senha').value.trim();
  
    const message = document.getElementById('registerMessage');
  
    console.log('Cadastro - Nome:', nome, 'Telefone:', telefone, 'Email:', email, 'Password:', password); // Debug
  
    if (!nome || !email || !password || !telefone) {
      message.style.color = 'red';
      message.textContent = 'Preencha todos os campos!';
      return;
    }
  
    try {
      const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ nome, telefone, email, password })
      });
  
      const data = await response.json();
  
      if(data.success){
        message.style.color = 'green';
        message.textContent = 'Conta criada com sucesso!';
      } else {
        message.style.color = 'red';
        message.textContent = data.error || 'Erro ao cadastrar!';
      }
    } catch(err) {
      message.style.color = 'red';
      message.textContent = 'Erro de conexão com o servidor!';
      console.error(err);
    }
  });