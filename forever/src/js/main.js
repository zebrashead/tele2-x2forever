import $ from 'jquery';
import { WOW } from './vendor/wow.min';
import detectDevice from './components/detectDevice';

import { closeModal, openModal } from './components/modal';
import {
  fieldListener, validateFields, keyField, prepField,
} from './components/inputs';
import { generateId, getCurrentYear } from './components/utils';
import GTMEvents from './components/gtmEvents';
import videoTeaser from './components/videoTeaser';

const GTM = new GTMEvents();

/// /////// DocReady //////////
document.addEventListener('DOMContentLoaded', () => {
  detectDevice(); // videoTeaser();
  new WOW().init();
  GTM.addEventListeners();
  getCurrentYear();
  goNextSection();
  scrollTeaser(document.querySelector('.section-gradient'));
  videoTeaser();
});

function goNextSection() {
  const goNextBtns = document.querySelectorAll('.js-go-next');
  const sectionsList = document.querySelectorAll('section');

  goNextBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const btnParentNode = btn.closest('section');
      let sectionToScrollTo;
      sectionsList.forEach((el, index) => {
        if (el === btnParentNode) {
          sectionToScrollTo = sectionsList[index + 1];
          scrollToElement(sectionToScrollTo);
        }
      });
    });
  });
}

function scrollToElement(el) {
  const offs = 0;
  const y = el.getBoundingClientRect().top + window.scrollY + offs;
  window.scrollTo({ top: y, behavior: 'smooth' }); // element.scrollIntoView();
}

// scroll to next if URL contains #about

function scrollTeaser(el) {
  if (window.location.hash === '#about') {
    scrollToElement(el);
  }
}

const batteryEnergyList = document.getElementsByClassName('battery__logo-small');
const monthGbList = document.querySelectorAll('.battery__list-link');

monthGbList.forEach((item, index) => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    clearClass();
    item.classList.add('active');
    for (let j = 0; j <= index; j++) {
      batteryEnergyList[j].classList.add('battery--fulfilled');
    }
  });
});

function clearClass() {
  monthGbList.forEach((item, index) => {
    item.classList.remove('active');
    batteryEnergyList[index].classList.remove('battery--fulfilled');
  });
}

const getFooterYear = document.querySelectorAll('.current-year');
const currentYear = new Date().getFullYear();
getFooterYear.forEach((item) => {
  item.innerHTML = currentYear.toString();
});
