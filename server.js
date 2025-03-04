const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Carregar carrinho
function loadCart() {
  if (fs.existsSync('cart.json')) {
    return JSON.parse(fs.readFileSync('cart.json', 'utf-8'));
  }
  return [];  // Retorna carrinho vazio caso o arquivo não exista
}

// Salvar carrinho
function saveCart(cart) {
  fs.writeFileSync('cart.json', JSON.stringify(cart, null, 2));
}

// Rota para ver carrinho
app.get('/view-cart', (req, res) => {
  const cart = loadCart();
  res.json(cart);
});

// Rota para adicionar item ao carrinho
app.post('/add-to-cart', (req, res) => {
  const { name, price } = req.body;
  const cart = loadCart();
  cart.push({ name, price });
  saveCart(cart);
  res.status(200).json({ message: 'Item adicionado ao carrinho' });
});

// Rota para remover item do carrinho
app.delete('/remove-from-cart/:index', (req, res) => {
  const index = parseInt(req.params.index);
  const cart = loadCart();

  if (index >= 0 && index < cart.length) {
    cart.splice(index, 1);  // Remove o item pelo índice
    saveCart(cart);
    res.status(200).json({ message: 'Item removido do carrinho' });
  } else {
    res.status(400).json({ message: 'Índice inválido' });
  }
});

// Rota para inicializar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
