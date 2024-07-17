'use strict'
const root = document.querySelector('#root');

import * as UI from './elements.js';

UI.makeHeader(root);
UI.makeSlider(root);
UI.makeSectionProductCards(root);
UI.createCart(root);

new Swiper('.slider-wrap', {
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true
    },
    loop: true,
    autoplay: {
        delay: 4000
    }
});

