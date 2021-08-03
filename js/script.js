    // let   tabs = document.querySelectorAll('.tabheader__item'),
    //          tabsContent = document.querySelectorAll('.tabcontent'),  
    //       tabsParent = document.querySelectorAll('.tabheader__items');

    // function hideTabsContent () {
    //   tabsContent.forEach( item => {
    //     item.classList.add('hide');
    //     item.classList.remove('show' , 'fade');
    //   });

    //   tabs.forEach( item =>{
    //      item.classList.remove('tabheader__item_active');
    //   });
    // }

    // function showTabsContent (i = 0) {
    //   tabsContent[i].classList.add('show' , 'fade');
    //   tabsContent[i].classList.remove('hide');
    //   tabs[i].classList.add('tabheader__item_active');
    // }

    // hideTabsContent ();
    // showTabsContent ();

    // tabsParent.addEventListener('click', function(event) {
    //        const target = event.target;
    //   if( target && target.classList.contains('tabheader__item')){
    //       tabs.forEach((item, i) =>{
    //          if (target == item){
    //             hideTabsContent ();
    //             showTabsContent (i);
    //          }
    //       });
    //   }
    // });

    // Tabs
    window.addEventListener('DOMContentLoaded', function() {

        let tabs = document.querySelectorAll('.tabheader__item'),
            tabsContent = document.querySelectorAll('.tabcontent'),
            tabsParent = document.querySelector('.tabheader__items');
    
        function hideTabContent() {
            tabsContent.forEach(item => {
                item.classList.add('hide');
                item.classList.remove('show', 'fade');
            });
    
            tabs.forEach(item => {
                item.classList.remove('tabheader__item_active');
            });
        }
    
        function showTabContent(i = 0) {
            tabsContent[i].classList.add('show', 'fade');
            tabsContent[i].classList.remove('hide');
            tabs[i].classList.add('tabheader__item_active');
        }
    
        hideTabContent();
        showTabContent();
    
        tabsParent.addEventListener('click', function (event) {
            const target = event.target;
            if (target && target.classList.contains('tabheader__item')) {
                tabs.forEach((item, i) => {
                    if (target == item) {
                        hideTabContent();
                        showTabContent(i);
                    }
                });
            }
        });
    
        // Timer
        const deadline = '2021-08-08';
    
        function timeRazniza(endtime) {
            const t = Date.parse(endtime) - new Date();
            const days = Math.floor(t / (1000 * 60 * 60 * 24)),
                hours = Math.floor((t / (1000 * 60 * 60)) % 24),
                minutes = Math.floor((t / (1000 * 60)) % 60),
                seconds = Math.floor((t / 1000) % 60);
            return {
                'total': t,
                'days': days,
                'hours': hours,
                'minutes': minutes,
                'seconds': seconds
            };
        }
    
        function getZero(num) {
            if (num >= 0 && num < 10) {
                return '0' + num;
            } else {
                return num;
            }
        }
    
        function setTimer(selector, endtime) {
    
            const timer = document.querySelector(selector),
                days1 = timer.querySelector('#days'),
                hours1 = timer.querySelector('#hours'),
                minutes1 = timer.querySelector('#minutes'),
                seconds1 = timer.querySelector('#seconds'),
                timerPusk = setInterval(updateTimer, 1000);
            updateTimer();
    
            function updateTimer() {
                const t = timeRazniza(endtime);
    
                days1.innerHTML = getZero(t.days);
                hours1.innerHTML = getZero(t.hours);
                minutes1.innerHTML = getZero(t.minutes);
                seconds1.innerHTML = getZero(t.seconds);
                if (t.total <= 0) {
                    clearInterval(timerPusk);
                }
            }
    
        }
        setTimer('.timer', deadline);
    
        // Modal
    
        const modal = document.querySelector('.modal'),
            modalTrigger = document.querySelectorAll('[data-modal]');
           
    
        function openModal (){
            modal.classList.add('show');
            modal.classList.remove('hide');
            document.body.style.overflow = 'hidden';
            clearInterval(modalTimer);
            }   
    
        modalTrigger.forEach(btn => {
            btn.addEventListener('click', openModal);
        });
    
        function closeModal (){
            modal.classList.add('hide');
            modal.classList.remove('show');
            document.body.style.overflow = '';
        }
    
        
    
        modal.addEventListener('click', (e) => {
            if (e.target === modal || e.target.getAttribute('data-close') == ' ') {
                closeModal ();
            }
        });
    
        document.addEventListener('keydown', (e)=>{
          if(e.code === 'Escape' && modal.classList.contains('show')){
            closeModal ();
          }
        });
    
        const modalTimer = setTimeout(openModal,50000);
    
        function showModalWindowOnce (){
            if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight){
                openModal();
                window.removeEventListener('scroll', showModalWindowOnce);
            }
        }
        window.addEventListener('scroll', showModalWindowOnce);
    
        // Используем классы для карточек
         
        class MenuCard{
            constructor(src,alt,title,text,price,parent, ...classes){
                this.src = src;
                this.alt = alt;
                this.title = title;
                this.text = text;
                this.price = price;
                this.transfer = 27;
                this.parent = document.querySelector(parent);
                this.classes = classes;
                this.changeToUAR();
            }
            changeToUAR(){
                this.price = this.price * this.transfer; 
            }
            render(){
                const element = document.createElement('div');
                if(this.classes.length === 0){
                    this.element = 'menu__item';
                    element.classList.add(this.element);
                }else{
                    this.classes.forEach( newClass => element.classList.add(newClass));
                }
               
                element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.text}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
                `;
                this.parent.append(element);
            } 
    
        }
    
       new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        9,
        '.menu .container',
           
       ).render();
    
       new MenuCard(
        "img/tabs/elite.jpg",
        "elite",
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        14,
        '.menu .container',
          
       ).render();
    
       new MenuCard(
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        21,
        '.menu .container',
        
       ).render();
        
    // form
    
    const form = document.querySelectorAll('form');
    
    const messageText ={
       correct: 'всё супер',
       loading: 'img/form/spinner.svg',
       fail: 'Ошибка'
    };
    
    form.forEach( item => {
        postData(item);
    });
    
    function postData(form){
        form.addEventListener('submit', (e)=>{
          e.preventDefault();
          
          let element = document.createElement('img');
          element.src = messageText.loading;
          element.style.cssText = `
           display: block;
           margin: 0 auto;
          `;
          form.insertAdjacentElement('afterend',element);
          
          const request = new XMLHttpRequest();
          request.open('POST', 'server.php');
          request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
          const formData = new FormData(form);
    
          const object = {};
          formData.forEach( function(value,key){
              object[key] = value;
          });
          const json = JSON.stringify(object);
    
          request.send(json);
    
          request.addEventListener('load',() =>{
             if(request.status === 200){
                 console.log(request.response);
                 addThanksMessage(messageText.correct);
                 form.reset();
                 element.remove();
             } else{
                addThanksMessage(messageText.fail);
             }
          });
          
        });
    }
    
    function addThanksMessage(messageText){
        const previwModal = document.querySelector('.modal__dialog');
        previwModal.classList.add('hide');
    
        openModal();
    
        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
         <div class="modal__content">
             <div data-close class="modal__close">&times;</div>
             <div class="modal__title"> ${messageText} </div>
         </div>
        `;
        modal.append(thanksModal);
        setTimeout( ()=> {
            thanksModal.remove();
            previwModal.classList.add('show');
            previwModal.classList.remove('hide');
            closeModal();
        }, 4000);
    }
    
        });
        
    
    