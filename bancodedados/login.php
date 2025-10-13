<?php
include 'db_connect.php';
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $email = $_POST['email'];
  $senha = $_POST['senha'];

  $sql = "SELECT * FROM usuarios WHERE email='$email'";
  $result = $conn->query($sql);

  if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();
    if (password_verify($senha, $user['senha'])) {
      $_SESSION['usuario_id'] = $user['id'];
      header("Location: index.php");
      exit;
    } else {
      echo "Senha incorreta!";
    }
  } else {
    echo "Usuário não encontrado!";
  }
}
?>
