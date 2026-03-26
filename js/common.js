


// Находим все блоки с инпутами
const formItems = document.querySelectorAll('.item-form');

formItems.forEach(item => {
const input = item.querySelector('input, textarea');

  const checkValue = () => {
    if (input.value.trim() !== '') {
      item.classList.add('filled');
    } else {
      item.classList.remove('filled');
    }
  };

  input.addEventListener('input', checkValue);

  checkValue();
});

document.addEventListener('click', (e) => {
  if (e.target.classList.contains('clear-input')) {
    const parent = e.target.closest('.item-form');
    const input = parent.querySelector('input');

    input.value = '';
    
    parent.classList.remove('filled');
    
    input.focus();
  }
});

const authForm = document.querySelector('.auth__content--main form');
if (authForm) {
const authBtn = document.querySelector('.btn-main--auth');
const authMain = document.querySelector('.auth__content--main');
const authThanks = document.querySelector('.auth__content--thanks');
const errorBlock = document.querySelector('.text-error');
const itemForm = document.querySelector('.item-form');
const emailInput = authForm.querySelector('input[type="text"]');

// Простая функция валидации Email
const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

authForm.addEventListener('submit', (e) => {
    e.preventDefault(); 

    const emailValue = emailInput.value.trim();
    const originalBtnText = authBtn.textContent;

    authBtn.classList.add('loading');
    authBtn.textContent = 'Отправка...';
    authBtn.disabled = true;

    setTimeout(() => {
        authBtn.classList.remove('loading');
        authBtn.textContent = originalBtnText;
        authBtn.disabled = false;

        if (!isValidEmail(emailValue)) {
            itemForm.classList.add('error');
            errorBlock.textContent = 'Введите действительный адрес электронной почты.';
            errorBlock.style.display = 'block'; 
        } else {
            itemForm.classList.remove('error');
            errorBlock.textContent = '';
            errorBlock.style.display = 'none';

            authMain.style.display = 'none';
            authThanks.style.display = 'block';
            
            const thanksEmailSpan = authThanks.querySelector('.text-thanks p');
            if(thanksEmailSpan) {
                thanksEmailSpan.innerHTML = `Мы отправили сообщение на адрес <b>${emailValue}</b>`;
            }
        }
    }, 3000);
});
}

//notifications
const notificationsContainer = document.querySelector('.notifications');

if (notificationsContainer) {
    notificationsContainer.addEventListener('click', (e) => {
        const closeBtn = e.target.closest('.item-notification__close');
        
        if (closeBtn) {
            const item = closeBtn.closest('.item-notification');
            
            item.classList.add('removing');

            setTimeout(() => {
                item.remove();

                const remainingItems = notificationsContainer.querySelectorAll('.item-notification');
                
                if (remainingItems.length === 0) {
                    notificationsContainer.classList.add('is-empty');
                }
            }, 300);
        }
    });
}


//quantity
const catalogList = document.querySelector('.list-catalog');

if (catalogList) {
    const updateQuantityState = (input) => {
        const parent = input.closest('.quantity');
        const value = parseInt(input.value);

        if (value > 0) {
            parent.classList.add('active');
        } else {
            parent.classList.remove('active');
        }
    };

    const allQuantityInputs = catalogList.querySelectorAll('.quantity input');
    allQuantityInputs.forEach(input => updateQuantityState(input));

    catalogList.addEventListener('beforeinput', (e) => {
        if (e.target.closest('.quantity input')) {
            if (e.data !== null && !/^[0-9]*$/.test(e.data)) {
                e.preventDefault();
            }
        }
    });

    catalogList.addEventListener('input', (e) => {
        const input = e.target.closest('.quantity input');
        if (input) {
            input.value = input.value.replace(/\D/g, '');
            
            if (input.value === '') {
            }

            updateQuantityState(input);
        }
    });

    catalogList.addEventListener('click', (e) => {
        const removeBtn = e.target.closest('.quantity__remove');
        if (removeBtn) {
            const input = removeBtn.closest('.quantity').querySelector('input');
            input.value = '0';
            updateQuantityState(input);
        }
    });
}

//quantity buttons
document.addEventListener('click', (e) => {
    // 1. Поиск кнопок + и -
    const btn = e.target.closest('.btn-quantity');
    if (!btn) return;

    const parent = btn.closest('.quanity-action');
    const input = parent.querySelector('input');
    let currentValue = parseInt(input.value) || 0;

    if (btn.textContent === '+') {
        input.value = currentValue + 1;
    } else if (btn.textContent === '-') {
        if (currentValue > 1) { 
            input.value = currentValue - 1;
        }
    }

    input.dispatchEvent(new Event('input', { bubbles: true }));
});

document.addEventListener('input', (e) => {
    const input = e.target.closest('.quanity-action__input input');
    if (!input) return;

    input.value = input.value.replace(/\D/g, '');

    if (input.value === '') {
    }
});

document.addEventListener('keydown', (e) => {
    const input = e.target.closest('.quanity-action__input input');
    if (!input) return;

    const allowedKeys = ['Backspace', 'Delete', 'Tab', 'Escape', 'Enter', 'ArrowLeft', 'ArrowRight'];
    
    if (allowedKeys.includes(e.key)) return;

    if (!/^\d$/.test(e.key)) {
        e.preventDefault();
    }
});

//popup price
document.addEventListener('click', (e) => {
    const openBtn = e.target.closest('.open-popup-price');
    if (openBtn) {
        e.preventDefault(); 
        const popup = document.querySelector('.popup-price');
        
        if (popup) {
            popup.classList.add('is-active');
            popup.querySelector('input')?.focus();
        }
    }

    if (e.target.classList.contains('popup-price__overlay')) {
        const popup = e.target.closest('.popup-price');
        popup.classList.remove('is-active');
    }
});

document.addEventListener('input', (e) => {
    const priceInput = e.target.closest('.popup-price .item-form input');
    
    if (priceInput) {
        let value = priceInput.value.replace(/\D/g, '');
        
        priceInput.value = value;
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const activePopup = document.querySelector('.popup-price.is-active');
        if (activePopup) {
            activePopup.classList.remove('is-active');
        }
    }
});

//list orders

document.addEventListener('click', (e) => {
    const head = e.target.closest('.head-order');
    
    if (head) {
        const currentItem = head.closest('.item-order');
        const allItems = document.querySelectorAll('.item-order');

        allItems.forEach(item => {
            if (item !== currentItem) {
                item.classList.remove('active');
            }
        });

        currentItem.classList.toggle('active');
    }
});