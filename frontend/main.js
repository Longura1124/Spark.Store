let allProducts = [];
let cart = [];

const container = document.getElementById('product-list');
const categorySelect = document.getElementById('category-select');
const cartIcon = document.getElementById('cart-icon');
const cartSidebar = document.getElementById('cart-sidebar');
const closeCartBtn = document.getElementById('close-cart');
const cartCount = document.getElementById('cart-count');
const cartTotal = document.getElementById('cart-total');
const cartItemsList = document.getElementById('cart-items');


fetch('http://localhost:3000/api/products')
  .then(res => res.json())
  .then(products => {
    console.log('Fetched products:', products); 
    allProducts = products;
    renderProducts(allProducts);
  });

function renderProducts(products) {
  container.innerHTML = '';
  products.forEach(product => {
    const imageUrl = product.image && product.image.trim() !== '' ? product.image : 'https://via.placeholder.com/150?text=No+Image';
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${imageUrl}" alt="${product.name}" style="width:100%">
      <h3>${product.name}</h3>
      <p>$${product.price.toFixed(2)}</p>
      <button>Add to Cart</button>
    `;
    const button = card.querySelector('button');
    button.addEventListener('click', () => {
      cart.push(product);
      updateCartDisplay();
    });
    container.appendChild(card);
  });
}
categorySelect.addEventListener('change', () => {
  const selectedCategory = categorySelect.value;
  if (selectedCategory === 'all') {
    renderProducts(allProducts);
  } else {
    const filtered = allProducts.filter(p => p.category === selectedCategory);
    renderProducts(filtered);
  }
});


function updateCartDisplay() {
  cartCount.textContent = cart.length;
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  cartTotal.textContent = total.toFixed(2);

  cartItemsList.innerHTML = '';
  cart.forEach((item, index) => {
    const li = document.createElement('li');
    li.textContent = `${item.name} - $${item.price.toFixed(2)}`;

    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.style.marginLeft = '10px';
    removeBtn.style.background = 'crimson';
    removeBtn.style.color = 'white';
    removeBtn.style.border = 'none';
    removeBtn.style.cursor = 'pointer';
    removeBtn.style.padding = '2px 6px';
    removeBtn.style.fontSize = '0.8em';

    removeBtn.addEventListener('click', () => {
      cart.splice(index, 1);
      updateCartDisplay();
    });

    li.appendChild(removeBtn);
    cartItemsList.appendChild(li);
  });
}


cartIcon.addEventListener('click', () => {
  cartSidebar.classList.add('open');
  cartIcon.style.display = 'none';  
});

closeCartBtn.addEventListener('click', () => {
  cartSidebar.classList.remove('open');
  cartIcon.style.display = 'block';  
});
