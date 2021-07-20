document.addEventListener('DOMContentLoaded', () => {
  //Прокрутка боковых панелей ===============================================
  const trigger = document.querySelectorAll('.sidebar__item-bottom');
  const sidebarList = document.querySelectorAll('.sidebar__list-wrap');
  let offset = 0;
  function scrollSidebar() {
    let height = sidebarList[0].clientHeight;
    offset = offset + height / 4;
    if (offset > height) {
      offset = 0;
    }
    this.previousElementSibling.firstElementChild.style.top = `${-offset}px`;
  }
  trigger.forEach(item => {
    item.addEventListener('click', scrollSidebar);
  });
  //Показать скрыть расширеннную боковую панель(вправо-влево)===================
  const closedPanel = document.querySelector('.sidebar-panel-closed__inner');
  const openPanel = document.querySelector('.sidebar-panel-open__inner');
  const triggerOpenPanel = document.querySelectorAll('.sidebar__item-top');
  function showOpenPanel() {
    closedPanel.classList.toggle('sidebar--hidden');
    openPanel.classList.toggle('sidebar--hidden');
  }
  triggerOpenPanel.forEach(item => {
    item.addEventListener('click', showOpenPanel);
  });
  //Кастомный select====================================================
  const select = function () {
    const selectHeader = document.querySelectorAll('.select__header-inner');
    const selectItem = document.querySelectorAll('.select__item');
    selectHeader.forEach(item => {
      item.addEventListener('click', selectToggle);
    });
    selectItem.forEach(item => {
      item.addEventListener('click', selectSubject);
    });
    function selectToggle() {
      this.parentElement.classList.toggle('select--active');
      document.querySelector('#special-pet').classList.add('popup-donate-head__info-btn--active');
    }
    function selectSubject() {
      const text = this.innerText;
      const select = this.closest('.select');
      currentText = this.closest('.select').querySelector('.select__current');
      currentText.innerText = text;
      currentText.setAttribute('data-name', text);
      select.classList.remove('select--active');
    }
  };
  select();
  //Показать скрыть мобильное меню=================================
  const mobileBtnOpen = document.querySelectorAll('.menu-mobile__open');
  const mobileBtnClose = document.querySelectorAll('.menu-mobile__close');
  const mobileMenu = document.querySelectorAll('.menu-mobile');
  function openMenu() {
    mobileMenu.forEach(menu => {
      menu.classList.add('menu-mobile--active');
      document.body.style.overflow = 'hidden';
    })
  }
  function closeMenu() {
    mobileMenu.forEach(menu => {
      menu.classList.remove('menu-mobile--active');
      document.body.style.overflow = '';
    })
  }
  mobileBtnOpen.forEach(btnOpen => {
    btnOpen.addEventListener('click', openMenu);
  })
  mobileBtnClose.forEach(btnClose => {
    btnClose.addEventListener('click', closeMenu);
  })
  //Показать попап по нажатию кнопки=================================
  const openPopupTrigger = document.querySelectorAll('.donate-btn');
  openPopupTrigger.forEach(item => {
    item.addEventListener('click', showPopup)
  })
  //Показать попап по таймеру=================================
  const popup = document.querySelector('.popup__wrap');
  const closeBtnPopup = document.querySelector('.popup__close-btn');
  function showPopup() {
    if (innerWidth > 639) {
      popup.classList.add('popup__wrap--active');
      document.body.classList.add('body--noscroll');
    }
  }
  // const popupAction = setTimeout(showPopup, 3000);
  //Cкрыть попап=================================
  function closePopup() {
    popup.classList.remove('popup__wrap--active');
    document.body.classList.remove('body--noscroll');
  }
  closeBtnPopup.addEventListener('click', closePopup);
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('popup__wrap--active'))
      closePopup();
  });
  //фокус на inut other amount================================
  function focus() {
    const f1 = () => {
      otherAmount.lastElementChild.focus()
    }
    setTimeout(f1, 300)
  }
  //======================================================
  document.querySelector('#btn-other').addEventListener('click', focus)
  //показать скрыть попап donate=================================
  const popups = document.querySelectorAll('.popup-donate__wrap');
  const parentBtn = document.querySelector('.popup__donate-list');
  const nextBtn = document.querySelectorAll('.popup-donate__info-footer__btn');
  const prevBtn = document.querySelectorAll('.popup-donate__footer-link');
  function showPopupCreateDonate(trigger, popups, name) {
    trigger.addEventListener('click', (e) => {
      if (e.target.classList.contains('popup__donate-btn')) {
        if (!isNaN(e.target.value)) {
          document.querySelectorAll('.popup-donate__info-btn').forEach(itemBtn => {
            if (e.target.value === itemBtn.value) {
              itemBtn.classList.add('popup-donate-head__info-btn--active');
            }
          })
          otherAmount.lastElementChild.disabled = true;
        } else {
          otherAmount.firstElementChild.classList.add('popup-donate-head__info-btn--active');
        }
        closePopup();
        popups.forEach(item => {
          if (item.dataset.name === name) {
            item.classList.add('popup__wrap--active');
            document.body.classList.add('body--noscroll');
          }
        })
      }
    })
  }
  showPopupCreateDonate(parentBtn, popups, 'head');
  function closePopupCreateDonate() {
    popups.forEach(item => {
      if (item.classList.contains('popup__wrap--active')) {
        item.classList.remove('popup__wrap--active');
        document.body.classList.remove('body--noscroll');
      }
    })
  }
  function showPopupDonate(name) {
    popups.forEach(item => {
      if (item.dataset.name === name) {
        item.classList.add('popup__wrap--active');
        document.body.classList.add('body--noscroll');
      }
    })
  }
  //Показать попап через нажатие кнопок quick-donate===============
  const popupDonateBtn = document.querySelector('.donate__btn');
  const donateInput = document.querySelector('.donate__input');
  const firstElement = document.querySelector('.popup-donate__info-btn');
  const otherAmount = document.querySelector('#other-amount');
  if (popupDonateBtn) {
    popupDonateBtn.addEventListener('click', () => {
      popups.forEach(item => {
        if (item.dataset.name === 'head') {
          item.classList.add('popup__wrap--active');
          document.body.classList.add('body--noscroll');
        }
      })
      if (donateInput.value !== '') {
        otherAmount.firstElementChild.classList.add('popup-donate-head__info-btn--active');
        otherAmount.lastElementChild.value = donateInput.value;
      } else {
        firstElement.classList.add('popup-donate-head__info-btn--active');
        otherAmount.lastElementChild.disabled = true;
      }
    })
  }
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('popup__wrap--active'))
      closePopupCreateDonate();
  });
  //Показать следующий попап donate============================
  nextBtn.forEach(btn => {
    btn.addEventListener('click', () => {
      closePopupCreateDonate();
      showPopupDonate(btn.dataset.name);
    })
  })
  //Показать предыдущий попап donate============================
  prevBtn.forEach(btn => {
    btn.addEventListener('click', () => {
      closePopupCreateDonate();
      showPopupDonate(btn.dataset.name);
    })
  })
  document.addEventListener('click', (e) => {
    if (e.target.parentNode.closest('popup-donate'))
      closePopupCreateDonate();
  });
  //==================================================================
  const resultInputsObj = {};
  const completeBtn = document.querySelector('#complete-btn');
  const completeBtnBox = document.querySelector('.complet-button-box');
  function checkFields() {
    const donateListItem = document.querySelectorAll('.popup-donate__info-btn');
    function checkInputs() {
      donateListItem.forEach(item => {
        if (item.classList.contains('popup-donate-head__info-btn--active') && Number(item.value)) { //если в первом окне выбрана кнопка с суммой
          resultInputsObj.amount = item.value;
        }
        if (item.classList.contains('popup-donate-head__info-btn--active') && item.nextElementSibling) { //если в other amount не пустая строка
          if (item.nextElementSibling.value !== undefined) {
            resultInputsObj.otherAmount = item.nextElementSibling.value;
          }
        }
      })
    }
    function checkSelect() {
      const selectCurrent = document.querySelector('.select__current');
      if (selectCurrent.dataset.name !== undefined) {
        resultInputsObj.animal = selectCurrent.dataset.name;
      }
    }
    function checkCheckbox() {
      const checkbox = document.querySelector('input[type=checkbox]');
      if (checkbox.checked) {
        resultInputsObj.monthlyDonations = true;
      } else {
        resultInputsObj.monthlyDonations = false;
      }
    }
    function checkForm() {
      const formName = document.querySelector('.popup-donate__form-input-name');
      const formEmail = document.querySelector('.popup-donate__form-input-email');
      if (formName.value !== '') {
        resultInputsObj.name = formName.value;
      }
      if (formEmail.value !== '') {
        resultInputsObj.email = formEmail.value;
      }
    }
    function checkCard() {
      const cardNumber = document.querySelector('.popup-donate__form-input-number');
      const cardCVV = document.querySelector('.popup-donate__form-input-cvv');
      if (cardNumber.value !== '') {
        resultInputsObj.cardNumber = cardNumber.value;
      }
      if (cardCVV.value !== '') {
        resultInputsObj.cvv = cardCVV.value;
      }
      const selectCurrentMonth = document.querySelector('.select__current-month');
      const selectCurrentYear = document.querySelector('.select__current-year');
      if (selectCurrentMonth.dataset.name !== undefined) {
        resultInputsObj.expirationMonth = selectCurrentMonth.dataset.name;
      }
      if (selectCurrentYear.dataset.name !== undefined) {
        resultInputsObj.expirationYear = selectCurrentYear.dataset.name;
      }
    }
    checkInputs();
    checkSelect();
    checkCheckbox();
    checkForm();
    checkCard();
    let counter = 0;
    for (let key in resultInputsObj) {
      counter++
    }
    if (counter === 9) {
      completeBtn.style.pointerEvents = 'all';
    }
  }
  completeBtnBox.addEventListener('mouseover', checkFields)
  function createMessage() {
    let message = document.createElement('div');
    message.classList.add('message--active');
    let text = document.createElement('p')
    let messageText = document.createTextNode('Thank you for your donation !');
    text.appendChild(messageText);
    message.appendChild(text)
    document.body.appendChild(message);
    const removeMessage = () => {
      message.parentNode.removeChild(message);
    }
    const reload = () => {
      document.location.reload();
    }
    setTimeout(removeMessage, 3000);
    setTimeout(reload, 3500);
  }
  completeBtn.addEventListener('click', createMessage)
  //формирование элемента а и переход по нужной ссылке со страницы map

  const pathObj = {
    'eagles': './eagle.html',
    'panda': './zoos.html',
    'gorilla': './gorilla.html',
    'lemur': './lemur.html',
  }
  const map = document.querySelector('.full-map-image');
  const parentsLink = document.querySelectorAll('.marker')
  function createLink() {
    parentsLink.forEach(parent => {
      let id = parent.id;
      for (const key in pathObj) {
        if (key === id) {
          const path = pathObj[key]
          let linkWrap = document.createElement('a');
          linkWrap.href = `${path}`;
          linkWrap.setAttribute('class', 'svg-link');
          parent.appendChild(linkWrap);
        }
      }
    })
    parentsLink.forEach(item => {
      item.addEventListener('click', (e) => {
        const isLink = e.target.parentNode.lastElementChild.classList.contains('svg-link');
        if (isLink) {
          const linkElement = item.querySelector('.svg-link');
          const href = linkElement.getAttribute('href')
          document.location.href = href;
        };
      })
    })
  }
  createLink()
  //Слайдер MEET SOME OUR PETS===============================================
  const sliderLine = document.querySelector('.slider__container');
  const sliderBtnPrev = document.querySelector('.slider__btn-prev');
  const sliderBtnNext = document.querySelector('.slider__btn-next');
  if (sliderLine) {
    let offsetSliderFriends = 0;
    sliderBtnPrev.style.opacity = '.2'
    sliderBtnNext.addEventListener('click', () => {
      offsetSliderFriends += 480;
      sliderBtnPrev.disabled = false;
      sliderBtnPrev.style.opacity = '1'
      if (offsetSliderFriends > 2080) {
        document.querySelectorAll('.slider__item-gradient')[0].style.display = 'none';
        document.querySelectorAll('.slider__item-gradient')[1].style.display = 'none';
        sliderBtnNext.disabled = true;
        sliderBtnNext.style.opacity = '.2'
      }
      sliderLine.style.left = `${-offsetSliderFriends}px`;
    });
    sliderBtnPrev.addEventListener('click', () => {
      offsetSliderFriends -= 480;
      sliderBtnNext.disabled = false;
      sliderBtnNext.style.opacity = '1'
      if (offsetSliderFriends === 0) {
        sliderBtnPrev.disabled = true;
        sliderBtnPrev.style.opacity = '.2'
        sliderBtnNext.disabled = false;
        sliderBtnNext.style.opacity = '1'
      }
      sliderLine.style.left = `${-offsetSliderFriends}px`;
    });
  }
  //Слайдер oтзывы пользователей===================
  sliderUsersLine = document.querySelector('.slider-users__container');
  const sliderUserBtnPrev = document.querySelector('.slider-users__btn-prev');
  const sliderUserBtnNext = document.querySelector('.slider-users__btn-next');
  if (sliderUsersLine) {
    let offsetSliderUser = 0;
    let interval = 15000;
    let timerId = setTimeout(function showSlides() {
      offsetSliderUser += 545;
      if (offsetSliderUser > 2150) {
        offsetSliderUser = 0;
      }
      sliderUsersLine.style.left = `${-offsetSliderUser}px`;
      timerId = setTimeout(showSlides, interval);
      sliderUsersLine.addEventListener('click', (e) => {
        if (e.target.classList.contains('slider-users__card')) {
          clearTimeout(timerId);
        }
        timerId = setTimeout(showSlides, interval * 4)
      });
      sliderUserBtnNext.addEventListener('click', () => {
        clearTimeout(timerId);
        offsetSliderUser += 545;
        if (offsetSliderUser > 2150) {
          offsetSliderUser = 0;
        }
        sliderUsersLine.style.left = `${-offsetSliderUser}px`;
        timerId = setTimeout(showSlides, interval * 4)
      });
      sliderUserBtnPrev.addEventListener('click', () => {
        clearTimeout(timerId);
        offsetSliderUser -= 545;
        if (offsetSliderUser < 0) {
          offsetSliderUser = 1635;
        }
        sliderUsersLine.style.left = `${-offsetSliderUser}px`;
        timerId = setTimeout(showSlides, interval * 4)
      })
    }, interval);
  }
  //Live slider=================================
  const liveSliderLine = document.querySelector('.live-slider__container');
  const sliderLiveBtnPrev = document.querySelector('.live-slider__btn-prev');
  const sliderLiveBtnNext = document.querySelector('.live-slider__btn-next');
  if (liveSliderLine) {
    let offsetSliderLive = 0;
    sliderLiveBtnNext.addEventListener('click', () => {
      offsetSliderLive += 360;
      if (offsetSliderLive > 1440) {
        offsetSliderLive = 0;
      }
      liveSliderLine.style.left = `${-offsetSliderLive}px`;
    });
    sliderLiveBtnPrev.addEventListener('click', () => {
      offsetSliderLive -= 360;
      if (offsetSliderLive < 0) {
        offsetSliderLive = 1440;
      }
      liveSliderLine.style.left = `${-offsetSliderLive}px`;
    });
    //Перестановка элементов=================================
    liveSliderLine.addEventListener('click', (e) => {
      if (e.target.closest('.live-shadow')) {
        const liveVideoBox = document.querySelector('.live__video'); //получаем div-родитель с большим видео
        const videoSmallBox = e.target.parentNode; //получаем div-родитель с маленьким видео
        const labelItem = videoSmallBox.querySelector('.live-slider__label'); //получаем метку с маленького видео
        const text = labelItem.innerText; //получаем метку с маленького видео
        const videoSmall = e.target.nextElementSibling; //Само маленькое видео
        const videoLarge = liveVideoBox.firstElementChild; //Само большое видео
        let srcVideoLarge = videoLarge.src; //Src большого видео
        let srcVideoSmall = videoSmall.src; //Src малого видео
        videoSmall.src = srcVideoLarge; //замена src малого видео на src большого
        videoLarge.src = srcVideoSmall; //замена src большого видео на src малого
        labelItem.classList.toggle('live-slider__label--hidden');
        e.target.classList.toggle('live-slider__item--active');
      }
    })
  }
})