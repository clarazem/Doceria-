<?php
session_start();
include 'db_connect.php';

if (isset($_SESSION['usuario_id']) && isset($_GET['produto_id'])) {
  $usuario_id = $_SESSION['usuario_id'];
  $produto_id = $_GET['produto_id'];

  $sql = "INSERT INTO carrinho (usuario_id, produto_id, quantidade)
          VALUES ($usuario_id, $produto_id, 1)
          ON DUPLICATE KEY UPDATE quantidade = quantidade + 1";
  $conn->query($sql);
  header("Location: carrinho.php");
  exit;
} else {
  header("Location: login.php");
  exit;
}
?>
