function openConfig() {
  document.getElementById('carrinho').style.display = 'block';
}

function closeConfig() {
  document.getElementById('carrinho').style.display = 'none';
}


function openMenu() {
  document.getElementById('login').style.display = 'block';
}

function closeMenu() {
  document.getElementById('login').style.display = 'none';
}

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