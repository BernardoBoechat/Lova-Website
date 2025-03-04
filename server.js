const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

// Para permitir o envio de JSON no corpo das requisições
app.use(express.json());

// Caminho para o arquivo onde o carrinho será salvo
const cartFilePath = path.join(__dirname, 'cart.json');

// Função para carregar o carrinho do arquivo JSON
function loadCart() {
  if (fs.existsSync(cartFilePath)) {
    const data = fs.readFileSync(cartFilePath, 'utf8');
    return JSON.parse(data);
  }
  return [];
}

// Função para salvar o carrinho no arquivo JSON
function saveCart(cart) {
  fs.writeFileSync(cartFilePath, JSON.stringify(cart), 'utf8');
}

// Rota para adicionar um item ao carrinho
app.post('/add-to-cart', (req, res) => {
  const { name, price } = req.body;
  
  // Verificar se os dados estão completos
  if (!name || !price) {
    return res.status(400).json({ message: 'Dados inválidos' });
  }

  // Carregar o carrinho existente
  let cart = loadCart();

  // Adicionar o item ao carrinho
  cart.push({ name, price });

  // Salvar o carrinho no arquivo
  saveCart(cart);

  // Retornar a confirmação de sucesso
  res.status(200).json({ message: 'Item adicionado ao carrinho', cart });
});

// Rota para visualizar o carrinho
app.get('/view-cart', (req, res) => {
  // Carregar o carrinho
  const cart = loadCart();
  res.json(cart);
});

// Servir arquivos estáticos (como CSS, imagens e scripts)
app.use(express.static('public')); // ou 'assets' dependendo da sua estrutura

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
