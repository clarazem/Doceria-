

document.getElementById('contato-form').addEventListener('submit', function(event){
      event.preventDefault();
      emailjs.sendForm('service_ytlon5b' this)
        .then(function(){
          alert("Mensagem enviada com sucesso!");
          document.getElementById('contato-form').reset();
        }, function(error){
          alert("Erro ao enviar: " + JSON.stringify(error));
        });
    });
