document.getElementById('contato-form').addEventListener('submit', function(event) {
  event.preventDefault();

  emailjs.sendForm('service_ytlon5b', 'template_y8n5dpm', this, 'q4j1pFvw0tVq9E4jp')
    .then(function() {
      alert('Mensagem enviada com sucesso! 🍰');
      document.getElementById('contato-form').reset();
    }, function(error) {
      alert('Erro ao enviar mensagem 😞');
      console.error('Erro:', error);
    });
});
