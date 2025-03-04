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

// Função para adicionar item ao carrinho
function addToCart(name, price) {
  const item = { name, price };

  // Enviar o item para o servidor
  fetch('/add-to-cart', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(item),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.message === 'Item adicionado ao carrinho') {
        alert('Item adicionado ao carrinho!');
      } else {
        alert('Erro ao adicionar item ao carrinho');
      }
    })
    .catch((err) => {
      console.error('Erro ao adicionar item ao carrinho:', err);
    });
}

// Função para visualizar o carrinho
function viewCart() {
  fetch('/view-cart')
    .then((response) => response.json())
    .then((cart) => {
      const cartContainer = document.getElementById('cart-items');
      cartContainer.innerHTML = ''; // Limpar o conteúdo existente

      if (cart.length > 0) {
        cart.forEach((item, index) => {
          const itemDiv = document.createElement('div');
          itemDiv.classList.add('cart-item');
          itemDiv.innerHTML = `
            <p>${item.name} - R$ ${item.price}</p>
            <button onclick="removeFromCart(${index})">Remover</button>
          `;
          cartContainer.appendChild(itemDiv);
        });
      } else {
        cartContainer.innerHTML = '<p>Seu carrinho está vazio.</p>';
      }
    })
    .catch((err) => {
      console.error('Erro ao carregar o carrinho:', err);
    });
}

// Exemplo de como usar a função addToCart com os dados de um produto
document.getElementById('add-bag-1').addEventListener('click', () => {
  addToCart('Bolsa 1', 200);
});
document.getElementById('add-bag-2').addEventListener('click', () => {
  addToCart('Bolsa 2', 150);
});
document.getElementById('add-bag-3').addEventListener('click', () => {
  addToCart('Bolsa 3', 300);
});
document.getElementById('add-bag-4').addEventListener('click', () => {
  addToCart('Bolsa 4', 250);
});

// MUDANÇA DE ICONE
document.addEventListener("DOMContentLoaded", function () {
  const produtos = document.querySelectorAll(".pro");

  produtos.forEach((produto) => {
    const icon = produto.querySelector(".bag-icon");

    icon.addEventListener("click", function () {
      if (icon.getAttribute("name") === "bag-handle-outline") {
        icon.setAttribute("name", "bag-handle");
      } else {
        icon.setAttribute("name", "bag-handle-outline");
      }
    });
  });
});

// Função para remover item do carrinho
function removeFromCart(index) {
  fetch(`/remove-from-cart/${index}`, {
    method: 'DELETE',
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.message === 'Item removido do carrinho') {
        alert('Item removido do carrinho!');
        viewCart(); // Atualiza o carrinho na tela
      } else {
        alert('Erro ao remover item do carrinho');
      }
    })
    .catch((err) => {
      console.error('Erro ao remover item do carrinho:', err);
    });
}

// Inicializa o carrinho ao carregar a página
window.onload = function() {
  viewCart();
};

