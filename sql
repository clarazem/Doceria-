CREATE TABLE usuarios (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  senha TEXT NOT NULL
);
2. Tabela produtos
Guarda os produtos que você vende.

sql
Copiar código
CREATE TABLE produtos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT NOT NULL,
  descricao TEXT,
  preco REAL NOT NULL,
  imagem TEXT
);
3. Tabela compras
Registra cada pedido feito pelos usuários.

sql
Copiar código
CREATE TABLE compras (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  usuario_id INTEGER,
  data_compra DATETIME DEFAULT CURRENT_TIMESTAMP,
  total REAL,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);
4. Tabela itens_compra
Liga os produtos às compras.

sql
Copiar código
CREATE TABLE itens_compra (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  compra_id INTEGER,
  produto_id INTEGER,
  quantidade INTEGER,
  preco_unitario REAL,
  FOREIGN KEY (compra_id) REFERENCES compras(id),
  FOREIGN KEY (produto_id) REFERENCES produtos(id)
);

/*inserir produtos*/

INSERT INTO produtos (nome, descricao, preco, imagem) VALUES
-- 🟤 Brownies
('Brownie Tradicional', 'Brownie clássico com textura macia e sabor intenso de chocolate meio amargo.', 8.00, 'img/brownie_tradicional.jpg'),
('Brownie com Nozes', 'Brownie artesanal com pedaços crocantes de nozes e chocolate nobre.', 9.50, 'img/brownie_nozes.jpg'),
('Brownie com Doce de Leite', 'Delicioso brownie recheado com doce de leite cremoso.', 9.00, 'img/brownie_doce_leite.jpg'),

-- 🍓 Bolos de Pote
('Bolo de Pote de Morango', 'Camadas de bolo branco, creme e pedaços de morango fresco.', 10.00, 'img/bolo_pote_morango.jpg'),
('Bolo de Pote de Chocolate', 'Bolo de chocolate com brigadeiro cremoso e granulado.', 10.00, 'img/bolo_pote_chocolate.jpg'),
('Bolo de Pote de Ninho com Nutella', 'Camadas de bolo branco com creme de leite Ninho e Nutella.', 12.00, 'img/bolo_pote_ninho_nutella.jpg'),

-- 🍫 Cones Trufados
('Cone Trufado de Chocolate', 'Casquinha crocante recheada com brigadeiro e cobertura de chocolate.', 7.00, 'img/cone_trufado_chocolate.jpg'),
('Cone Trufado de Beijinho', 'Casquinha crocante com recheio de beijinho e cobertura de chocolate branco.', 7.50, 'img/cone_trufado_beijinho.jpg'),
('Cone Trufado de Ninho com Nutella', 'Cone artesanal com recheio cremoso de Ninho e Nutella.', 8.50, 'img/cone_trufado_ninho_nutella.jpg'),

-- 🍬 Brigadeiros
('Brigadeiro Tradicional', 'Clássico brigadeiro feito com chocolate belga e granulado.', 2.50, 'img/brigadeiro_tradicional.jpg'),
('Brigadeiro de Beijinho', 'Brigadeiro branco com coco ralado e toque de leite condensado.', 2.50, 'img/brigadeiro_beijinho.jpg'),
('Brigadeiro Gourmet de Ninho', 'Brigadeiro cremoso de leite Ninho coberto com leite em pó.', 3.00, 'img/brigadeiro_ninho.jpg'),
('Brigadeiro Gourmet de Pistache', 'Brigadeiro sofisticado com creme de pistache e cobertura delicada.', 3.50, 'img/brigadeiro_pistache.jpg'),

-- 🎂 Bolos
('Bolo de Chocolate com Brigadeiro', 'Bolo fofinho de chocolate com recheio e cobertura de brigadeiro.', 45.00, 'img/bolo_chocolate_brigadeiro.jpg'),
('Bolo de Ninho com Morango', 'Camadas de bolo branco com creme de leite Ninho e morangos frescos.', 50.00, 'img/bolo_ninho_morango.jpg'),
('Bolo Red Velvet', 'Bolo aveludado com recheio de cream cheese e toque de cacau.', 55.00, 'img/bolo_red_velvet.jpg'),
('Bolo de Limão', 'Bolo leve com cobertura cremosa e sabor cítrico de limão.', 40.00, 'img/bolo_limao.jpg');
