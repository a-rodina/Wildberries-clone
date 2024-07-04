import {sliderObject} from './objects.js';

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
        const newSearch = search.value;
        findProductCard(newSearch);
    })

    headerWrap.append(search);

    const basket = createElements('a', 'header__basket', null, null);
    basket.setAttribute('href', '#')
    headerWrap.append(basket);

    const icon = createElements('i', 'fa-solid', null, null);
    icon.classList.add('fa-cart-shopping');
    basket.append(icon);
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
        
        let randomNumber = getRandomInt(1, 200) 
        let randomImage = `${objects[i].pictures}?random=${randomNumber}`

        let image = document.createElement('img');
        image.setAttribute('src', randomImage);
        image.setAttribute('alt', 'image');
        image.setAttribute('id', 'card-image');
        firstCardBlock.append(image);

        let discount = createElements('p', 'product-cards__discount', '-10%', null);
        firstCardBlock.append(discount);

        let secondCardBlock = createElements('div', 'product-cards__second-bock', null, null);
        card.append(secondCardBlock);

        let priceCardBlock = createElements('div', 'product-cards__price-block', null, null);
        secondCardBlock.append(priceCardBlock);

        let price = createElements('p', 'product-cards__price', objects[i].price, null);

        priceCardBlock.append(price);
        
        let oldPrice = createElements('p', 'product-cards__old-price', '1000 р', null);
        priceCardBlock.append(oldPrice);

        let productName = createElements('h2', 'product-cards__product-name', objects[i].title, null);
        secondCardBlock.append(productName);

        let buttonBasket = createElements('button', 'product-cards__basket', 'В корзину', 'button');
        card.append(buttonBasket);

        result.push(card);
    }
    return result;
}