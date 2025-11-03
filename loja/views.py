from django.shortcuts import render
from .models import Produto

def index(request):
    produtos = Produto.objects.all()  # mostra produtos do banco
    return render(request, 'index.html', {'produtos': produtos})

def produtos(request):
    produtos = Produto.objects.all()
    return render(request, 'produtos.html', {'produtos': produtos})
