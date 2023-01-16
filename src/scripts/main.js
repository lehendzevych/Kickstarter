'use strict';

class Slider {
  constructor(lists) {
    this.lists = lists;
    this.index = 0;
  }

  get scroll() {
    return this.index * this.lists.children[0].getBoundingClientRect().width;
  }

  prevSlide() {
    this.index--;
    this.setScroll();
  }

  nextSlide() {
    if (this.index !== this.lists.children.length - 1) {
      this.index++;
    } else {
      this.index = 0;
    }

    this.setScroll();
  }

  setScroll() {
    this.lists.style.setProperty('--scroll', `-${this.scroll}px`);
  }
}

const featuresLists = document.getElementById('featuresLists');
const featuresPrevButton = document.getElementById('featuresPrev');
const featuresNextButton = document.getElementById('featuresNext');
const featuresSliderActivePage = document.querySelector(
  '.features__sliderActivePage'
);
const featuresSlider = new Slider(featuresLists);

featuresPrevButton.addEventListener('click', (e) => {
  featuresSlider.prevSlide();

  featuresSliderActivePage.innerHTML = `0${featuresSlider.index + 1}`;

  if (featuresNextButton.disabled === true) {
    featuresNextButton.disabled = false;
  }

  if (featuresSlider.index === 0) {
    e.currentTarget.disabled = true;
  }
});

featuresNextButton.addEventListener('click', (e) => {
  featuresSlider.nextSlide();

  featuresSliderActivePage.innerHTML = `0${featuresSlider.index + 1}`;

  if (featuresPrevButton.disabled === true) {
    featuresPrevButton.disabled = false;
  }

  if (featuresSlider.index === featuresSlider.lists.children.length - 1) {
    e.currentTarget.disabled = true;
  }
});

const benefitsCards = document.querySelector(
  '.benefits__cards'
);
const benefitsDots = document.querySelector(
  '.benefits__dots'
);
const benefitsSlider = new Slider(benefitsCards);

for (let i = 0; i < benefitsCards.children.length; i++) {
  const dot = document.createElement('button');

  dot.className = 'benefits__dot';

  if (i === benefitsSlider.index) {
    dot.classList.add('benefits__dot--active');
  }

  benefitsDots.append(dot);
}

const setActiveDot = () => {
  const activeDot = document.querySelector('.benefits__dot--active');

  activeDot.classList.remove('benefits__dot--active');

  benefitsDots.children[benefitsSlider.index].classList.add(
    'benefits__dot--active'
  );
  benefitsSlider.setScroll();
};

benefitsDots.addEventListener('click', (e) => {
  if (e.target.classList.contains('benefits__dot--active')
    || e.target.contains(e.currentTarget)) {
    return;
  }

  benefitsSlider.index = [...e.currentTarget.children].indexOf(e.target);
  setActiveDot();
});

setInterval(() => {
  benefitsSlider.nextSlide();

  setActiveDot();
}, 5000);

window.addEventListener('resize', () => {
  featuresSlider.setScroll();
  benefitsSlider.setScroll();
});
