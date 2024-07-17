import {sliderObject} from './objects.js';
import {addItem, deleteAll, getItem} from './storage.js';

export function makeHeader(root) {
    const header = createElements('header', 'header', null, null);
    root.append(header);

    const container = createElements('div', 'container', null, null);
    header.append(container);

    const headerWrap = createElements('div', 'header__wrap', null, null);
    container.append(headerWrap);

    const logo = createElements('span', 'header__logo', 'wildberries', null);
    headerWrap.append(logo);
    
    const search = createElements('input', 'header__search', null, 'text');
    search.setAttribute('placeholder', 'Найти на Wildberries');
    
    search.addEventListener('keyup', function() {
        const newSearch = search.value.toLowerCase();
        findProductCard(newSearch);
    });

    headerWrap.append(search);

    const cart = createElements('a', 'header__cart', null, null);
    cart.setAttribute('href', '#');
    headerWrap.append(cart);

    cart.addEventListener("click", function() {
        let sectionCart = document.querySelector('.cart');
        sectionCart.classList.toggle("cart-active");
    })

    const icon = createElements('i', 'fa-solid', null, null);
    icon.classList.add('fa-cart-shopping');
    cart.append(icon);
}

function createElements(tagName, className, text, type) {
    const element = document.createElement(tagName);
    element.innerHTML = text;
    element.classList.add(className);
    if (type !== null) {
        element.setAttribute('type', type)
    }
    return element;
}

function findProductCard(name) {
    const cardsWrap = document.querySelector('#cards-wrap');
    for (let child of cardsWrap.childNodes) {
        const cardElement = child.childNodes[1].querySelector('.product-cards__product-name');
        const cardName = cardElement.textContent.toLowerCase();
        if (cardName.includes(name) == false) {
            child.classList.add('product-card__inactive');
        } else {
            child.classList.remove('product-card__inactive');
        }
    }
}

function createItemsForSlider() {
    let result = [];
    for (let i = 1; i <= 5; i++) {
        let item = document.createElement('div');
        item.classList.add('swiper-slide');
        let image = document.createElement('img');
        image.setAttribute('src', sliderObject[i]);
        image.setAttribute('alt', 'image');
        image.setAttribute('id', 'slider-image');
        item.append(image);
        result.push(item);
    }
    return result;
}

export function makeSlider(root) {
    const sectionSlider = createElements('section', 'section-slider', null, null);
    root.append(sectionSlider);

    const container = createElements('div', 'container', null, null);
    sectionSlider.append(container);

    const swiper = createElements('div', 'swiper', null, null);
    swiper.classList.add('slider-wrap');
    container.append(swiper);

    const swiperWrap = createElements('div', 'swiper-wrapper', null, null);
    swiper.append(swiperWrap);
    
    swiperWrap.append(...createItemsForSlider());

    const pagination = createElements('div', 'swiper-pagination', null, null);
    swiper.append(pagination);

    const buttonPrev = createElements('div', 'swiper-button-prev', null, null);
    swiper.append(buttonPrev);

    const buttonNext = createElements('div', 'swiper-button-next', null, null);
    swiper.append(buttonNext);
}

export function makeSectionProductCards(root) {
    const sectionProductCards = createElements('section', 'product-cards', null, null);
    root.append(sectionProductCards);

    const container = createElements('div', 'container', null, null);
    sectionProductCards.append(container);

    const title = createElements('h1', 'product-cards__title', 'Хиты продаж', null);
    container.append(title);

    const cardsWrap = createElements('div', 'product-cards__wrap', null, null);
    cardsWrap.setAttribute('id', 'cards-wrap')
    container.append(cardsWrap);
    getContentCards().then(response => arrayTransform(response, cardsWrap));
}

async function getContentCards() {
    let response = await fetch('https://6683ed6956e7503d1adeb3f7.mockapi.io/Wildberries');
    return response.json();
}

function arrayTransform(array, cardsWrap) {
    cardsWrap.append(...createProductCards(array))
}

function createProductCards(objects) {
    let result = [];
    for (let i = 0; i < objects.length; i++) {
        let card = createElements('div', 'product-card', null, null);

        let firstCardBlock = createElements('div', 'product-cards__first-bock', null, null);
        card.append(firstCardBlock);

        function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min) + min);
        }
        
        let randomNumber = getRandomInt(1, 300);
        let randomImage = `${objects[i].pictures}?random=${randomNumber}`;

        let image = document.createElement('img');
        image.setAttribute('src', randomImage);
        image.setAttribute('alt', 'image');
        image.setAttribute('id', 'card-image');
        firstCardBlock.append(image);

        let randomDiscount = getRandomInt(1, 100);
        let discount = createElements('p', 'product-cards__discount', `${randomDiscount}%`, null);
        firstCardBlock.append(discount);

        let secondCardBlock = createElements('div', 'product-cards__second-bock', null, null);
        card.append(secondCardBlock);

        let priceCardBlock = createElements('div', 'product-cards__price-block', null, null);
        secondCardBlock.append(priceCardBlock);

        let price = createElements('p', 'product-cards__price', objects[i].price, null);
        priceCardBlock.append(price);
        
        let culcPrice = (objects[i].price * 100) / (100 - randomDiscount);
        let oldPrice = createElements('p', 'product-cards__old-price', culcPrice.toFixed(2), null);
        priceCardBlock.append(oldPrice);

        let productName = createElements('h2', 'product-cards__product-name', objects[i].title, null);
        secondCardBlock.append(productName);

        let buttonCart = createElements('button', 'product-cards__cart', 'В корзину', 'button');
        card.append(buttonCart);

        buttonCart.addEventListener('click', function() {
            addProductInCart(objects[i]);
            addItem(objects[i]);
        });

        result.push(card);
    }
    return result;
}

export function createCart(root) {
    const sectionCart = createElements('section', 'cart', null, null);
    root.append(sectionCart);

    const container = createElements('div', 'container', null, null);
    sectionCart.append(container);

    const cartWrap = createElements('div', 'cart__wrap', null, null);
    sectionCart.append(cartWrap);

    const cartHeader = createElements('div', 'cart__header', null, null);
    cartWrap.append(cartHeader);
    
    const cartTitle = createElements('h2', 'cart__header-title', 'Корзина', null);
    cartHeader.append(cartTitle);

    const cartClear = createElements('button', 'cart__header-button', 'Очистить корзину', null);
    cartClear.addEventListener('click', function() {
        let delChild = cartProducts.lastChild;
        while (delChild) {
            delChild.remove();
            delChild = cartProducts.lastChild;
        }
        countCart(cartProducts);
        deleteAll();
    })

    cartHeader.append(cartClear);

    let cartProducts = createElements('div', 'cart__products', null, null);
    cartProducts.setAttribute('id', 'block-cart-product');
    cartWrap.append(cartProducts);

    const cartTotal = createElements('div', 'cart__total', null, null);
    cartWrap.append(cartTotal);

    const cartTotalText = createElements('span', 'cart__total-text', 'Итого: 0.00', null);
    cartTotal.append(cartTotalText);

    makeCartProducts();
}

function makeCartProducts() {    
    let arrayCartWrap = getItem();
    for (let i = 0; i < arrayCartWrap.length; i++) {
        addProductInCart(arrayCartWrap[i]);
    }
}

function addProductInCart(object) {
    let cartProducts = document.querySelector('#block-cart-product');

    let isExistingProduct = false;

    for (let product of cartProducts.childNodes) {
        
        if (product.id == object.id) {
            product.count += 1;
            isExistingProduct = true;
            product.childNodes[0].innerHTML = product.name + ' x' + product.count;
            product.childNodes[1].innerHTML = (product.price * product.count).toFixed(2);
        }
    }
    if (!isExistingProduct) {
        const product = createElements('div', 'cart__product-item', null, null);

        product.id = object.id;
        product.price = object.price;
        product.name = object.title;
        product.count = 1;
        cartProducts.append(product);
        
        const cartProductName = createElements('p', 'cart__product-name', product.name + ' x' + product.count, null);
        product.append(cartProductName);

        const cartProductPrice = createElements('p', 'cart__product-price', object.price, null);
        product.append(cartProductPrice);
    }

    countCart(cartProducts);
}

function countCart(cartProducts) {
    let totalAmount = 0;

    for (let product of cartProducts.childNodes) {
        totalAmount += product.count * product.price;
    }
    
    let cartTotalText = document.querySelector('.cart__total-text');
    cartTotalText.innerHTML = 'Итого: ' + totalAmount.toFixed(2);
}