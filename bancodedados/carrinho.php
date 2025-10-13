<?php
session_start();
include 'db_connect.php';

if (!isset($_SESSION['usuario_id'])) {
  header("Location: login.php");
  exit;
}

$usuario_id = $_SESSION['usuario_id'];
$sql = "SELECT p.nome, p.preco, c.quantidade
        FROM carrinho c
        JOIN produtos p ON c.produto_id = p.id
        WHERE c.usuario_id = $usuario_id";
$result = $conn->query($sql);

$total = 0;
?>
<h2>Seu Carrinho</h2>
<table>
  <tr><th>Produto</th><th>Preço</th><th>Qtd</th><th>Subtotal</th></tr>
  <?php while ($row = $result->fetch_assoc()) {
    $subtotal = $row['preco'] * $row['quantidade'];
    $total += $subtotal;
    echo "<tr>
            <td>{$row['nome']}</td>
            <td>R$ {$row['preco']}</td>
            <td>{$row['quantidade']}</td>
            <td>R$ $subtotal</td>
          </tr>";
  } ?>
</table>
<h3>Total: R$ <?php echo $total; ?></h3>
