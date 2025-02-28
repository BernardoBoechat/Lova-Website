let currentIndex = 0; // Índice atual da imagem
const sliderContainer = document.getElementById('sliderContainer');
const totalImages = sliderContainer.children.length; // Número total de imagens no slider

// Função para mover o slider
function moveSlider() {
  currentIndex++; // Próxima imagem
  if (currentIndex >= totalImages) {
    currentIndex = 0; // Volta para a primeira imagem
  }
  const translateValue = `-${currentIndex * 100}%`; // Move o slider
  sliderContainer.style.transform = `translateX(${translateValue})`;
}

// Intervalo para mudar a imagem automaticamente (a cada 5 segundos)
setInterval(moveSlider, 5000);







let numItensCarrinho = 0;
const LIMITE_CARRINHO = 5;  // Definindo um limite de 5 itens no carrinho

// Função para adicionar item ao carrinho
function addcart(nome, preco) {
  // Verificando o limite de itens no carrinho
  if (numItensCarrinho >= LIMITE_CARRINHO) {
    alert('Limite de itens no carrinho atingido!');
    return;
  }
  
  // Criando o conteúdo do item do carrinho
  const cartContent = document.getElementById('cart-content');
  const cartItem = document.createElement('div');
  cartItem.classList.add('cart-item');
  
  // Criando o botão de remover
  const removeButton = document.createElement('button');
  removeButton.innerText = 'Remover';
  removeButton.classList.add('remove-btn');
  removeButton.onclick = function() { removerItem(removeButton); };

  // Adicionando o nome e preço do produto no item do carrinho
  cartItem.innerHTML = `<p>${nome} <br> R$ ${preco.toFixed(2)}</p>`;
  cartItem.appendChild(removeButton);
  
  // Adicionando o item no carrinho
  cartContent.appendChild(cartItem);
  
  // Atualizando a quantidade de itens no carrinho
  numItensCarrinho++;
  
  // Exibindo o carrinho se estiver oculto
  cartContent.style.display = 'block';
}

// Função para remover item do carrinho
function removerItem(button){
  const cartItem = button.parentElement;
  cartItem.remove();
  
  // Decrementando a quantidade de itens
  numItensCarrinho--;
  
  // Se não houver mais itens no carrinho, esconder o carrinho
  const cartContent = document.getElementById('cart-content');
  if (cartContent.children.length === 0) {
    cartContent.style.display = 'none';
  }
}





function compras() {
  // Obtém o elemento com id 'cart-content'
  const cartContent = document.getElementById('cart-content');
  if (cartContent.style.display === 'none') {
    cartContent.style.display = 'block';
  }else {
    cartContent.style.display = 'none';
  }
}
