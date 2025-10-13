<?php
$servername = "localhost";
$username = "root"; // padrão do XAMPP
$password = "";     // sem senha por padrão
$dbname = "doceria";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
  die("Conexão falhou: " . $conn->connect_error);
}
?>