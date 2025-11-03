from django.db import models
from django.contrib.auth.models import User

# ========== PRODUTOS ==========
class Produto(models.Model):
    CATEGORIAS = [
        ('brownie', 'Brownie'),
        ('bolo_pote', 'Bolo de Pote'),
        ('cone_trufado', 'Cone Trufado'),
        ('brigadeiro', 'Brigadeiro'),
        ('bolo', 'Bolo'),
    ]

    nome = models.CharField(max_length=100)
    descricao = models.TextField(blank=True)
    preco = models.DecimalField(max_digits=6, decimal_places=2)
    categoria = models.CharField(max_length=20, choices=CATEGORIAS)
    imagem = models.ImageField(upload_to='produtos/', blank=True, null=True)

    def __str__(self):
        return self.nome


# ========== CARRINHO ==========
class Carrinho(models.Model):
    usuario = models.ForeignKey(User, on_delete=models.CASCADE)
    criado_em = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Carrinho de {self.usuario.username}"

    @property
    def total(self):
        return sum(item.subtotal for item in self.itens.all())


# ========== ITENS DO CARRINHO ==========
class ItemCarrinho(models.Model):
    carrinho = models.ForeignKey(Carrinho, related_name='itens', on_delete=models.CASCADE)
    produto = models.ForeignKey(Produto, on_delete=models.CASCADE)
    quantidade = models.PositiveIntegerField(default=1)

    @property
    def subtotal(self):
        return self.produto.preco * self.quantidade

    def __str__(self):
        return f"{self.quantidade}x {self.produto.nome}"


# ========== PEDIDOS ==========
class Pedido(models.Model):
    usuario = models.ForeignKey(User, on_delete=models.CASCADE)
    criado_em = models.DateTimeField(auto_now_add=True)
    pago = models.BooleanField(default=False)
    total = models.DecimalField(max_digits=8, decimal_places=2, default=0.00)

    def __str__(self):
        return f"Pedido #{self.id} - {self.usuario.username}"
