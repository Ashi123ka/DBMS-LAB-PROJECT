'use strict';

/*
  BrewNest Café Frontend
  ---------------------------------------------------------
  This file is frontend-only. For final PHP/MySQL integration,
  replace localStorage/demo handling with requests to PHP endpoints.
  Suggested PHP endpoints:
    - backend/place_order.php
    - backend/contact_message.php
    - backend/get_menu.php
    - backend/admin/update_order_status.php
*/

let menuItems = [
  {
    id: 'latte-classic',
    name: 'Classic Café Latte',
    category: 'coffee',
    price: 520,
    time: '8 min',
    calories: '160 kcal',
    tag: 'Best Seller',
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=900&q=85',
    description: 'Smooth espresso with steamed milk and a soft foam finish.'
  },
  {
    id: 'iced-mocha',
    name: 'Iced Mocha Cloud',
    category: 'coffee',
    price: 620,
    time: '7 min',
    calories: '210 kcal',
    tag: 'Cold Brew',
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=900&q=85',
    description: 'Chocolate espresso over ice with cold milk and cream.'
  },
  {
    id: 'cappuccino',
    name: 'Velvet Cappuccino',
    category: 'coffee',
    price: 560,
    time: '8 min',
    calories: '130 kcal',
    tag: 'Hot',
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=900&q=85',
    description: 'Bold espresso, velvety milk foam and balanced roasted notes.'
  },
  {
    id: 'espresso-shot',
    name: 'Double Espresso',
    category: 'coffee',
    price: 410,
    time: '5 min',
    calories: '10 kcal',
    tag: 'Strong',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=900&q=85',
    description: 'Two intense espresso shots for a quick caffeine boost.'
  },
  {
    id: 'croissant',
    name: 'Butter Croissant',
    category: 'breakfast',
    price: 390,
    time: '6 min',
    calories: '270 kcal',
    tag: 'Fresh Baked',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=900&q=85',
    description: 'Flaky golden croissant baked with rich butter layers.'
  },
  {
    id: 'avocado-toast',
    name: 'Avocado Toast',
    category: 'breakfast',
    price: 780,
    time: '11 min',
    calories: '340 kcal',
    tag: 'Healthy',
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=900&q=85',
    description: 'Sourdough toast topped with avocado, herbs and chili flakes.'
  },
  {
    id: 'pancake-stack',
    name: 'Honey Pancake Stack',
    category: 'breakfast',
    price: 690,
    time: '13 min',
    calories: '430 kcal',
    tag: 'Sweet Morning',
    image: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=900&q=85',
    description: 'Soft pancakes with honey drizzle, butter and fresh fruit.'
  },
  {
    id: 'club-sandwich',
    name: 'Grilled Club Sandwich',
    category: 'meals',
    price: 890,
    time: '14 min',
    calories: '520 kcal',
    tag: 'Lunch',
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=900&q=85',
    description: 'Layered sandwich with grilled chicken, egg, lettuce and sauce.'
  },
  {
    id: 'chicken-bowl',
    name: 'Smoky Chicken Rice Bowl',
    category: 'meals',
    price: 1040,
    time: '16 min',
    calories: '610 kcal',
    tag: 'Filling',
    image: 'https://images.unsplash.com/photo-1543352634-a1c51d9f1fa7?auto=format&fit=crop&w=900&q=85',
    description: 'Rice bowl with grilled chicken, vegetables and signature sauce.'
  },
  {
    id: 'pasta-alfredo',
    name: 'Creamy Alfredo Pasta',
    category: 'meals',
    price: 1150,
    time: '18 min',
    calories: '650 kcal',
    tag: 'Chef Pick',
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=900&q=85',
    description: 'Creamy pasta with mushrooms, parmesan and grilled chicken.'
  },
  {
    id: 'brownie',
    name: 'Chocolate Fudge Brownie',
    category: 'dessert',
    price: 450,
    time: '5 min',
    calories: '310 kcal',
    tag: 'Chocolate',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=900&q=85',
    description: 'Dense chocolate brownie with soft fudge center.'
  },
  {
    id: 'cheesecake',
    name: 'Berry Cheesecake Slice',
    category: 'dessert',
    price: 680,
    time: '5 min',
    calories: '370 kcal',
    tag: 'Chilled',
    image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=900&q=85',
    description: 'Creamy cheesecake topped with berry compote and biscuit base.'
  }
];

const state = {
  activeFilter: 'all',
  search: '',
  cart: JSON.parse(localStorage.getItem('brewnest_cart') || '[]'),
  favorites: JSON.parse(localStorage.getItem('brewnest_favorites') || '[]')
};

const taxRate = 0.08;

const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

const elements = {
  pageLoader: $('#pageLoader'),
  siteHeader: $('#siteHeader'),
  navToggle: $('#navToggle'),
  navLinks: $('#navLinks'),
  themeToggle: $('#themeToggle'),
  themeIcon: $('.theme-icon'),
  menuGrid: $('#menuGrid'),
  filterButtons: $$('.filter-btn'),
  menuSearch: $('#menuSearch'),
  openCart: $('#openCart'),
  closeCart: $('#closeCart'),
  cartDrawer: $('#cartDrawer'),
  cartBackdrop: $('#cartBackdrop'),
  cartItems: $('#cartItems'),
  cartEmpty: $('#cartEmpty'),
  cartCount: $('#cartCount'),
  subtotalText: $('#subtotalText'),
  taxText: $('#taxText'),
  totalText: $('#totalText'),
  formItemCount: $('#formItemCount'),
  formTotal: $('#formTotal'),
  cartJson: $('#cartJson'),
  estimatedTotalInput: $('#estimatedTotalInput'),
  preorderForm: $('#preorderForm'),
  contactForm: $('#contactForm'),
  toastStack: $('#toastStack'),
  scrollTop: $('#scrollTop'),
  addCombo: $('#addCombo'),
  cartCheckout: $('#cartCheckout'),
  pickupDate: $('#pickupDate'),
  dbTodayOrders: $('#dbTodayOrders'),
  dbPendingOrders: $('#dbPendingOrders'),
  dbRevenue: $('#dbRevenue'),
  dbOrdersTable: $('#dbOrdersTable')
};

function formatPrice(value) {
  return `Rs. ${Math.round(value).toLocaleString('en-PK')}`;
}

function persistCart() {
  localStorage.setItem('brewnest_cart', JSON.stringify(state.cart));
}

function persistFavorites() {
  localStorage.setItem('brewnest_favorites', JSON.stringify(state.favorites));
}

function getItemById(id) {
  return menuItems.find(item => item.id === id);
}

function cartTotals() {
  const subtotal = state.cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const tax = subtotal * taxRate;
  const total = subtotal + tax;
  const count = state.cart.reduce((sum, item) => sum + item.qty, 0);
  return { subtotal, tax, total, count };
}

function renderMenu() {
  const searchValue = state.search.trim().toLowerCase();
  const filtered = menuItems.filter(item => {
    const matchesFilter = state.activeFilter === 'all' || item.category === state.activeFilter;
    const matchesSearch = [item.name, item.description, item.category, item.tag]
      .join(' ')
      .toLowerCase()
      .includes(searchValue);
    return matchesFilter && matchesSearch;
  });

  elements.menuGrid.innerHTML = '';

  if (!filtered.length) {
    elements.menuGrid.innerHTML = `
      <div class="no-results">
        <h3>No menu item found</h3>
        <p>Try a different keyword or category filter.</p>
      </div>
    `;
    return;
  }

  const fragment = document.createDocumentFragment();
  filtered.forEach((item, index) => {
    const card = document.createElement('article');
    card.className = `menu-card reveal ${index % 4 === 1 ? 'delay-1' : index % 4 === 2 ? 'delay-2' : index % 4 === 3 ? 'delay-3' : ''}`;
    card.innerHTML = `
      <div class="menu-image">
        <img src="${item.image}" alt="${item.name}" loading="lazy" />
        <span class="menu-badge">${item.tag}</span>
      </div>
      <div class="menu-content">
        <div class="menu-title-row">
          <h3>${item.name}</h3>
          <span class="menu-price">${formatPrice(item.price)}</span>
        </div>
        <p>${item.description}</p>
        <div class="menu-meta">
          <span>${item.category}</span>
          <span>${item.time}</span>
          <span>${item.calories}</span>
        </div>
        <div class="menu-actions">
          <button class="add-btn" data-id="${item.id}" type="button">Add to Order</button>
          <button class="favorite-btn ${state.favorites.includes(item.id) ? 'active' : ''}" data-favorite="${item.id}" type="button" aria-label="Add ${item.name} to favorites">♥</button>
        </div>
      </div>
    `;
    fragment.appendChild(card);
  });

  elements.menuGrid.appendChild(fragment);
  observeReveals();
}

function addToCart(id, qty = 1) {
  const item = getItemById(id);
  if (!item) return;

  const existing = state.cart.find(cartItem => cartItem.id === id);
  if (existing) {
    existing.qty += qty;
  } else {
    state.cart.push({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      qty
    });
  }

  persistCart();
  renderCart();
  showToast('Added to order', `${item.name} has been added to your pre-order.`, 'success');
}

function removeFromCart(id) {
  state.cart = state.cart.filter(item => item.id !== id);
  persistCart();
  renderCart();
}

function updateQty(id, direction) {
  const item = state.cart.find(cartItem => cartItem.id === id);
  if (!item) return;
  item.qty += direction;
  if (item.qty <= 0) removeFromCart(id);
  persistCart();
  renderCart();
}

function renderCart() {
  const totals = cartTotals();
  elements.cartItems.innerHTML = '';
  elements.cartCount.textContent = totals.count;
  elements.formItemCount.textContent = totals.count;
  elements.subtotalText.textContent = formatPrice(totals.subtotal);
  elements.taxText.textContent = formatPrice(totals.tax);
  elements.totalText.textContent = formatPrice(totals.total);
  elements.formTotal.textContent = formatPrice(totals.total);
  elements.cartJson.value = JSON.stringify(state.cart);
  elements.estimatedTotalInput.value = Math.round(totals.total);

  elements.cartEmpty.classList.toggle('show', state.cart.length === 0);

  const fragment = document.createDocumentFragment();
  state.cart.forEach(item => {
    const row = document.createElement('div');
    row.className = 'cart-item';
    row.innerHTML = `
      <img src="${item.image}" alt="${item.name}" />
      <div>
        <h4>${item.name}</h4>
        <p>${formatPrice(item.price)} each</p>
        <div class="qty-row">
          <div class="qty-controls" aria-label="Quantity controls for ${item.name}">
            <button type="button" data-qty="-1" data-id="${item.id}" aria-label="Decrease quantity">−</button>
            <strong>${item.qty}</strong>
            <button type="button" data-qty="1" data-id="${item.id}" aria-label="Increase quantity">+</button>
          </div>
          <button class="remove-btn" type="button" data-remove="${item.id}">Remove</button>
        </div>
      </div>
    `;
    fragment.appendChild(row);
  });
  elements.cartItems.appendChild(fragment);
}

function toggleFavorite(id) {
  if (state.favorites.includes(id)) {
    state.favorites = state.favorites.filter(itemId => itemId !== id);
  } else {
    state.favorites.push(id);
  }
  persistFavorites();
  renderMenu();
}

function openCartDrawer() {
  elements.cartDrawer.classList.add('open');
  elements.cartDrawer.setAttribute('aria-hidden', 'false');
  document.body.classList.add('no-scroll');
}

function closeCartDrawer() {
  elements.cartDrawer.classList.remove('open');
  elements.cartDrawer.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('no-scroll');
}

function showToast(title, message, type = 'success') {
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <span class="toast-symbol">${type === 'success' ? '✓' : '!'}</span>
    <div>
      <strong>${title}</strong>
      <p>${message}</p>
    </div>
  `;
  elements.toastStack.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(16px) scale(0.98)';
    setTimeout(() => toast.remove(), 250);
  }, 3600);
}

function setMinimumDate() {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  elements.pickupDate.min = `${yyyy}-${mm}-${dd}`;
}

function validateField(input) {
  const error = input.parentElement.querySelector('.field-error') || input.closest('.form-row')?.querySelector('.field-error');
  let message = '';

  if (input.validity.valueMissing) {
    message = 'This field is required.';
  } else if (input.validity.typeMismatch) {
    message = 'Please enter a valid value.';
  } else if (input.validity.patternMismatch) {
    message = 'Please enter a valid Pakistani phone number, e.g. 03XX-XXXXXXX.';
  } else if (input.validity.tooShort) {
    message = `Please enter at least ${input.minLength} characters.`;
  }

  input.classList.toggle('is-invalid', Boolean(message));
  if (error) error.textContent = message;
  return !message;
}

function validateForm(form) {
  const fields = $$('input, select, textarea', form).filter(field => field.type !== 'hidden');
  const results = fields.map(validateField);
  return results.every(Boolean);
}

async function handlePreorderSubmit(event) {
  event.preventDefault();
  const hasItems = state.cart.length > 0;
  const isValid = validateForm(elements.preorderForm);

  if (!hasItems) {
    showToast('Cart is empty', 'Please add at least one menu item before submitting.', 'error');
    openCartDrawer();
    return;
  }

  if (!isValid) {
    showToast('Check form details', 'Please correct the highlighted fields.', 'error');
    return;
  }

  const submitButton = elements.preorderForm.querySelector('button[type="submit"]');
  const originalButtonText = submitButton.textContent;
  submitButton.disabled = true;
  submitButton.textContent = 'Submitting Pre-Order...';

  try {
    const formData = new FormData(elements.preorderForm);
    const response = await fetch('backend/place_order.php', {
      method: 'POST',
      body: formData
    });
    const data = await response.json();
    if (data.success) {
      showToast('Pre-order placed!', `Your order #BN-${data.order_id} has been recorded.`, 'success');
      elements.preorderForm.reset();
      state.cart = [];
      persistCart();
      renderCart();
      setMinimumDate();
      loadDashboard();
    } else {
      showToast('Order failed', data.message || 'Check database connection.', 'error');
    }
  } catch (err) {
    showToast('Order failed', 'Connection to database failed.', 'error');
    console.error(err);
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = originalButtonText;
  }
}

async function handleContactSubmit(event) {
  event.preventDefault();
  const isValid = validateForm(elements.contactForm);
  if (!isValid) {
    showToast('Check message form', 'Please complete all required contact fields.', 'error');
    return;
  }

  const submitButton = elements.contactForm.querySelector('button[type="submit"]');
  const originalButtonText = submitButton.textContent;
  submitButton.disabled = true;
  submitButton.textContent = 'Sending Message...';

  try {
    const formData = new FormData(elements.contactForm);
    const response = await fetch('backend/contact_message.php', {
      method: 'POST',
      body: formData
    });
    const data = await response.json();
    if (data.success) {
      showToast('Message sent!', 'Your contact message has been recorded.', 'success');
      elements.contactForm.reset();
    } else {
      showToast('Failed to send', data.message || 'Failed to submit message.', 'error');
    }
  } catch (err) {
    showToast('Failed to send', 'Connection to database failed.', 'error');
    console.error(err);
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = originalButtonText;
  }
}

async function fetchMenu() {
  try {
    const response = await fetch('backend/get_menu.php');
    if (!response.ok) throw new Error('Network response not ok');
    const data = await response.json();
    if (data.success && data.menu && data.menu.length > 0) {
      menuItems.length = 0;
      menuItems.push(...data.menu);
    }
  } catch (err) {
    console.warn('Could not load menu from PHP, using hardcoded fallback:', err);
  }
  renderMenu();
}

async function loadDashboard() {
  if (!elements.dbOrdersTable) return;
  try {
    const response = await fetch('backend/get_orders.php');
    if (!response.ok) throw new Error('Failed to fetch orders');
    const data = await response.json();
    if (data.success) {
      elements.dbTodayOrders.textContent = data.stats.today_count;
      elements.dbPendingOrders.textContent = data.stats.pending_count;
      elements.dbRevenue.textContent = formatPrice(data.stats.total_revenue);

      elements.dbOrdersTable.innerHTML = '';
      if (data.orders.length === 0) {
        elements.dbOrdersTable.innerHTML = `
          <div style="padding: 20px; text-align: center; color: var(--muted); grid-column: 1 / -1;">
            <span>☕</span>
            <p style="margin: 8px 0 0;">No orders placed yet.</p>
          </div>
        `;
        return;
      }

      data.orders.forEach(order => {
        const row = document.createElement('div');
        const itemsSummary = order.items.map(item => `${item.item_name} (x${item.quantity})`).join(', ');

        row.innerHTML = `
          <span>#BN-${order.order_id}</span>
          <div>
            <strong style="display:block;">${order.customer_name}</strong>
            <small style="display:block; color:var(--muted); font-size:0.75rem; margin-top:2px;">${itemsSummary}</small>
          </div>
          <select class="status-select status-${order.order_status}" data-id="${order.order_id}">
            <option value="Pending" ${order.order_status === 'Pending' ? 'selected' : ''}>Pending</option>
            <option value="Preparing" ${order.order_status === 'Preparing' ? 'selected' : ''}>Preparing</option>
            <option value="Ready" ${order.order_status === 'Ready' ? 'selected' : ''}>Ready</option>
            <option value="Completed" ${order.order_status === 'Completed' ? 'selected' : ''}>Completed</option>
          </select>
        `;
        elements.dbOrdersTable.appendChild(row);
      });
    }
  } catch (err) {
    console.warn('Could not load dashboard data from PHP:', err);
  }
}

function initTheme() {
  const savedTheme = localStorage.getItem('brewnest_theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  elements.themeIcon.textContent = savedTheme === 'dark' ? '☾' : '☀';
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
  const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', nextTheme);
  localStorage.setItem('brewnest_theme', nextTheme);
  elements.themeIcon.textContent = nextTheme === 'dark' ? '☾' : '☀';
}

function animateCounters() {
  const counters = $$('[data-counter]');
  const formatter = (target, value) => Number.isInteger(target) ? Math.round(value) : value.toFixed(1);

  const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const counter = entry.target;
      const target = Number(counter.dataset.counter);
      const duration = 1300;
      const start = performance.now();

      function step(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        counter.textContent = formatter(target, target * eased);
        if (progress < 1) requestAnimationFrame(step);
      }

      requestAnimationFrame(step);
      counterObserver.unobserve(counter);
    });
  }, { threshold: 0.6 });

  counters.forEach(counter => counterObserver.observe(counter));
}

let revealObserver;
function observeReveals() {
  if (!revealObserver) {
    revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
  }

  $$('.reveal:not(.in-view)').forEach(element => revealObserver.observe(element));
}

function initTilt() {
  $$('.tilt-card').forEach(card => {
    card.addEventListener('mousemove', event => {
      const bounds = card.getBoundingClientRect();
      const x = event.clientX - bounds.left;
      const y = event.clientY - bounds.top;
      const rotateY = ((x / bounds.width) - 0.5) * 8;
      const rotateX = ((y / bounds.height) - 0.5) * -8;
      card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

function updateActiveNav() {
  const sections = ['home', 'menu', 'preorder', 'process', 'dashboard', 'contact'];
  const offset = window.scrollY + 130;
  let current = 'home';

  sections.forEach(id => {
    const section = document.getElementById(id);
    if (section && section.offsetTop <= offset) current = id;
  });

  $$('.nav-links a').forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
}

function handleScroll() {
  const hasScrolled = window.scrollY > 14;
  elements.siteHeader.classList.toggle('scrolled', hasScrolled);
  elements.scrollTop.classList.toggle('visible', window.scrollY > 600);
  updateActiveNav();
}

function bindEvents() {
  elements.navToggle.addEventListener('click', () => {
    const isOpen = elements.navLinks.classList.toggle('open');
    elements.navToggle.classList.toggle('active', isOpen);
    elements.navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  $$('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      elements.navLinks.classList.remove('open');
      elements.navToggle.classList.remove('active');
      elements.navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  elements.themeToggle.addEventListener('click', toggleTheme);

  elements.filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      elements.filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      state.activeFilter = button.dataset.filter;
      renderMenu();
    });
  });

  elements.menuSearch.addEventListener('input', event => {
    state.search = event.target.value;
    renderMenu();
  });

  elements.menuGrid.addEventListener('click', event => {
    const addButton = event.target.closest('[data-id]');
    const favoriteButton = event.target.closest('[data-favorite]');
    if (addButton) addToCart(addButton.dataset.id);
    if (favoriteButton) toggleFavorite(favoriteButton.dataset.favorite);
  });

  elements.cartItems.addEventListener('click', event => {
    const qtyButton = event.target.closest('[data-qty]');
    const removeButton = event.target.closest('[data-remove]');
    if (qtyButton) updateQty(qtyButton.dataset.id, Number(qtyButton.dataset.qty));
    if (removeButton) removeFromCart(removeButton.dataset.remove);
  });

  elements.openCart.addEventListener('click', openCartDrawer);
  elements.closeCart.addEventListener('click', closeCartDrawer);
  elements.cartBackdrop.addEventListener('click', closeCartDrawer);
  elements.cartCheckout.addEventListener('click', closeCartDrawer);

  elements.addCombo.addEventListener('click', () => {
    addToCart('latte-classic');
    addToCart('croissant');
  });

  elements.preorderForm.addEventListener('submit', handlePreorderSubmit);
  elements.contactForm.addEventListener('submit', handleContactSubmit);

  elements.dbOrdersTable.addEventListener('change', async (event) => {
    const select = event.target.closest('.status-select');
    if (!select) return;

    const orderId = select.dataset.id;
    const newStatus = select.value;

    try {
      const response = await fetch('backend/update_order_status.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ order_id: orderId, status: newStatus })
      });
      const data = await response.json();
      if (data.success) {
        showToast('Status Updated', `Order #BN-${orderId} is now ${newStatus}.`, 'success');
        select.className = `status-select status-${newStatus}`;
        loadDashboard();
      } else {
        showToast('Error', data.message || 'Failed to update status', 'error');
      }
    } catch (err) {
      showToast('Error', 'Connection failed. Status not updated.', 'error');
      console.error(err);
    }
  });

  $$('input, select, textarea').forEach(field => {
    field.addEventListener('blur', () => validateField(field));
    field.addEventListener('input', () => {
      if (field.classList.contains('is-invalid')) validateField(field);
    });
  });

  elements.scrollTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeCartDrawer();
  });

  window.addEventListener('scroll', handleScroll, { passive: true });
}

function init() {
  initTheme();
  setMinimumDate();
  fetchMenu();
  loadDashboard();
  renderCart();
  bindEvents();
  observeReveals();
  animateCounters();
  initTilt();
  handleScroll();

  window.addEventListener('load', () => {
    setTimeout(() => elements.pageLoader.classList.add('hidden'), 450);
  });
}

init();
