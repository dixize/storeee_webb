const TG_TOKEN = '8013834057:AAFgJAmnPutdMRe1p-EVEfvH4RUxlsfy_jM';
const CHAT_ID = '5415190532';

const DB = [
    { id: 1, cat: 'Phones', name: 'iPhone 15 Pro', price: 110000, img: 'https://images.unsplash.com/photo-1696446701796-da61225697cc?w=800', size: '146.6 x 70.6 x 8.3 мм', weight: '187 г', cpu: 'A17 Pro' },
    { id: 2, cat: 'Phones', name: 'iPhone 14 Plus', price: 82000, img: 'https://images.unsplash.com/photo-1663499482523-1c0c1bae4ce1?w=800', size: '160.8 x 78.1 x 7.8 мм', weight: '203 г', cpu: 'A15 Bionic' },
    { id: 3, cat: 'Phones', name: 'Samsung S24 Ultra', price: 115000, img: 'https://images.unsplash.com/photo-1707231401314-239564f26049?w=800', size: '162.3 x 79.0 x 8.6 мм', weight: '232 г', cpu: 'Snapdragon 8 Gen 3' },
    { id: 4, cat: 'Audio', name: 'AirPods Pro 2', price: 23500, img: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=800', size: '45.2 x 60.6 мм', weight: '50 г', cpu: 'H2 Chip' },
    { id: 5, cat: 'Audio', name: 'Sony WH-1000XM5', price: 38000, img: 'https://images.unsplash.com/photo-1648447226217-040248238db4?w=800', size: 'Полноразмерные', weight: '250 г', cpu: 'V1 Processor' },
    { id: 6, cat: 'Tablets', name: 'iPad Pro 11 M2', price: 92000, img: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800', size: '247.6 x 178.5 мм', weight: '466 г', cpu: 'Apple M2' },
    { id: 7, cat: 'Accessories', name: 'MagSafe Charger', price: 4500, img: 'https://images.unsplash.com/photo-1616348436168-de43ad0db179?w=800', size: 'Компактный', weight: '40 г', cpu: 'N/A' }
];

let cart = [];
let discount = 0;

// ПЕРЕКЛЮЧЕНИЕ СТРАНИЦ
function showPage(pageId) {
    // Скрываем все секции
    document.querySelectorAll('.page-section').forEach(p => p.classList.add('hidden'));
    // Показываем нужную
    const target = document.getElementById('page-' + pageId);
    if(target) target.classList.remove('hidden');
    
    // Если переходим в каталог, по дефолту показываем телефоны
    if(pageId === 'catalog') renderProducts('Phones');
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ОТРИСОВКА ТОВАРОВ
function renderProducts(category) {
    const list = document.getElementById('products-list');
    if(!list) return;

    // Подсвечиваем активную категорию
    document.querySelectorAll('.cat-card').forEach(card => {
        card.classList.remove('active-cat');
        if(card.innerText.includes(category === 'Phones' ? 'ТЕЛЕФОНЫ' : 
                                   category === 'Audio' ? 'НАУШНИКИ' : 
                                   category === 'Tablets' ? 'ПЛАНШЕТЫ' : 'АКСЕССУАРЫ')) {
            card.classList.add('active-cat');
        }
    });

    const filtered = DB.filter(p => p.cat === category);
    
    list.innerHTML = filtered.map(p => `
        <div class="bg-white/5 rounded-[30px] p-6 border border-white/5 hover:border-indigo-500 transition-all duration-300 group cursor-pointer" onclick="viewProduct(${p.id})">
            <div class="overflow-hidden rounded-2xl mb-4 h-48 bg-black">
                <img src="${p.img}" class="h-full w-full object-cover group-hover:scale-110 transition duration-500">
            </div>
            <h3 class="font-bold text-lg">${p.name}</h3>
            <div class="flex justify-between items-center mt-4">
                <p class="text-indigo-400 font-black text-xl">${p.price.toLocaleString()} ₽</p>
                <div class="bg-white/10 w-10 h-10 rounded-full flex items-center justify-center group-hover:bg-indigo-600 transition">
                    <i class="fa-solid fa-chevron-right text-xs"></i>
                </div>
            </div>
        </div>
    `).join('');
}

// ДЕТАЛЬНЫЙ ПРОСМОТР
function viewProduct(id) {
    const p = DB.find(x => x.id === id);
    const container = document.getElementById('product-detail-container');
    
    container.innerHTML = `
        <div class="max-w-6xl mx-auto px-6 py-12">
            <button onclick="showPage('catalog')" class="mb-8 text-gray-500 hover:text-white transition">← Вернуться в каталог</button>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div class="bg-white/5 rounded-[40px] p-4 border border-white/5">
                    <img src="${p.img}" class="rounded-[32px] w-full shadow-2xl">
                </div>
                <div class="flex flex-col justify-center">
                    <span class="text-indigo-500 font-bold tracking-widest text-xs uppercase mb-2">${p.cat}</span>
                    <h2 class="text-5xl font-black mb-6">${p.name}</h2>
                    <div class="space-y-4 mb-10 bg-white/5 p-6 rounded-3xl border border-white/5">
                        <div class="flex justify-between border-b border-white/10 pb-2">
                            <span class="text-gray-500">Габариты</span><span class="font-medium">${p.size}</span>
                        </div>
                        <div class="flex justify-between border-b border-white/10 pb-2">
                            <span class="text-gray-500">Вес</span><span class="font-medium">${p.weight}</span>
                        </div>
                        <div class="flex justify-between border-b border-white/10 pb-2">
                            <span class="text-gray-500">Процессор</span><span class="font-medium">${p.cpu}</span>
                        </div>
                    </div>
                    <div class="flex flex-wrap items-center gap-6">
                        <span class="text-4xl font-black">${p.price.toLocaleString()} ₽</span>
                        <button onclick="addToCart(${p.id})" class="flex-grow bg-indigo-600 py-5 rounded-2xl font-black hover:bg-indigo-500 transition shadow-lg shadow-indigo-600/20 active:scale-95">ДОБАВИТЬ В КОРЗИНУ</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    showPage('item');
}

// ЛОГИКА КОРЗИНЫ
function addToCart(id) {
    const p = DB.find(x => x.id === id);
    cart.push({...p, cartId: Date.now()});
    updateCartUI();
    
    // Анимация кнопки
    const btn = event.target;
    const oldText = btn.innerText;
    btn.innerText = 'ДОБАВЛЕНО!';
    btn.classList.replace('bg-indigo-600', 'bg-green-600');
    setTimeout(() => {
        btn.innerText = oldText;
        btn.classList.replace('bg-green-600', 'bg-indigo-600');
    }, 2000);
}

function updateCartUI() {
    document.getElementById('cart-count-badge').innerText = cart.length;
    const list = document.getElementById('cart-full-list');
    
    if(cart.length === 0) {
        list.innerHTML = `
            <div class="text-center py-20 bg-white/5 rounded-[40px] border border-dashed border-white/10">
                <i class="fa-solid fa-box-open text-6xl text-gray-700 mb-4"></i>
                <p class="text-gray-500">Ваша корзина пуста</p>
                <button onclick="showPage('catalog')" class="mt-6 text-indigo-500 font-bold">Начать покупки</button>
            </div>`;
    } else {
        list.innerHTML = cart.map((p, idx) => `
            <div class="bg-white/5 p-6 rounded-3xl flex items-center justify-between border border-white/5">
                <div class="flex items-center gap-6">
                    <img src="${p.img}" class="w-20 h-20 object-cover rounded-2xl">
                    <div>
                        <h4 class="font-bold text-lg">${p.name}</h4>
                        <p class="text-gray-500 text-sm">${p.cat}</p>
                    </div>
                </div>
                <div class="flex items-center gap-8">
                    <span class="font-black text-xl">${p.price.toLocaleString()} ₽</span>
                    <button onclick="removeItem(${idx})" class="w-10 h-10 rounded-full bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition">
                        <i class="fa-solid fa-trash-can text-sm"></i>
                    </button>
                </div>
            </div>
        `).join('');
    }
    calculateTotal();
}

function calculateTotal() {
    let base = cart.reduce((s, p) => s + p.price, 0);
    let final = base - (base * discount);
    document.getElementById('final-price').innerText = final.toLocaleString() + ' ₽';
}

function applyPromo() {
    const code = document.getElementById('promo-input').value;
    if(code === 'Sale2026') {
        discount = 0.10;
        document.getElementById('promo-msg').innerText = '🔥 ПРОМОКОД АКТИВИРОВАН: -10%';
        calculateTotal();
    } else {
        alert('Неверный промокод');
        discount = 0;
        document.getElementById('promo-msg').innerText = '';
        calculateTotal();
    }
}

function removeItem(idx) {
    cart.splice(idx, 1);
    updateCartUI();
}

// ЗАКАЗ
async function checkout() {
    const city = document.getElementById('cart-city').value;
    if(!city) return alert('Пожалуйста, укажите ваш город для доставки');
    if(cart.length === 0) return alert('Корзина пуста');

    const btn = event.target;
    btn.disabled = true;
    btn.innerText = 'ОТПРАВЛЯЕМ...';

    let itemsText = cart.map(p => `▫️ ${p.name} — ${p.price.toLocaleString()} ₽`).join('%0A');
    let total = document.getElementById('final-price').innerText;
    
    let msg = `🚀 **НОВЫЙ ЗАКАЗ**%0A%0A`;
    msg += `📍 **Город:** ${city}%0A`;
    msg += `📦 **Товары:**%0A${itemsText}%0A%0A`;
    msg += `💰 **ИТОГО:** ${total}`;

    try {
        await fetch(`https://api.telegram.org/bot${TG_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${msg}&parse_mode=Markdown`);
        alert('Заказ успешно оформлен! Менеджер свяжется с вами.');
        cart = [];
        updateCartUI();
        showPage('home');
    } catch(e) {
        alert('Ошибка при отправке заказа');
    } finally {
        btn.disabled = false;
        btn.innerText = 'ОФОРМИТЬ';
    }
}

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', () => {
    showPage('home');
    updateCartUI();
});
