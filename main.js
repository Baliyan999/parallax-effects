// parallax header start

const fantasy = document.querySelector('.fantasy'),
      clouds = document.querySelectorAll('.cloud'),
      boat = document.querySelector('.boat');

window.addEventListener('scroll', () => {
    fantasy.style.objectPosition = `0 ${window.scrollY / 10}%`;
    clouds.forEach(item => {
        const speed = item.getAttribute('data-speed');
        item.style.transform = `translateX(${window.scrollY * speed}px)`;
        boat.style.transform = `translateX(${window.scrollY * -0.5}px)`
    })

})

// parallax header end

// section parallax start

const section = document.querySelector('.section__box'),
      layers = document.querySelectorAll('.layer');
section.addEventListener('mousemove', (e) => {
    layers.forEach(item => {
        const speed = item.getAttribute('data-speed');
        const x = e.clientX * speed / 30; //100
        const y = e.clientY * speed / 30; //100
        item.style.transform = `translate(${x}px, ${y}px)`;
    })
})

// section parallax end

// timer count nums start

const timer = document.querySelector('.timer'),
    timerNums = document.querySelectorAll('.timer__num');
function scrollCount(dur = 2000){
    timerNums.forEach(item => {
        const count = item.getAttribute('data-num');
        item.innerHTML = 0;
        item.parentElement.classList.add('active');
        plus(0, item, count);
        //i - с какого числа нужно начать
        //elem - куда именно выводить
        //num - до какого числа вести отчет на сайте
    });
    function plus(i, elem, num){
        //если начальное число, то есть 0 меньше задуманного числа, то начальное число будет увеличиваться и передавать свое значение elem
        if(i < num){
            i++;
            elem.innerHTML = i;
            //используем таймер для функции подсчета. Если мы разделим dur = 2000 на цифру до которой нужно досчитать, то мы получим скорость подсчета таймера
            setTimeout(plus, dur/num, i, elem, num);

            // второй способ написать таймер для скорости подсчета.

            // setTimeout(() => {
            //     plus(i, elem, num); 
            // }, dur/num);
        }
    }
}
window.addEventListener('scroll', function onScroll(){
    if(window.scrollY > timer.offsetTop - window.innerHeight / 1.5){
        scrollCount(3000);
        removeEventListener('scroll', onScroll);
    }
});
 

// timer count nums end

// to do list start

const form = document.querySelector('.box'),
    formInput = document.querySelector('.box__inp'),
    list = document.querySelector('.list');
form.addEventListener('submit', function(e){
    e.preventDefault();
    let li = document.createElement('li');
    li.classList.add('list__item');
    li.innerHTML = `${formInput.value} <button class="list__btn remove">X</button>`;
    list.append(li);
    rmList();
    this.reset();
});
function rmList(){
    let rm = document.querySelectorAll('.remove');
    rm.forEach(item => {
        item.addEventListener('click', function(e){
            e.preventDefault();
            this.parentElement.remove();
        });
    });
}
rmList();

// to do list end

// accordion start

const accordName = [...document.querySelectorAll('.accord__name')];
let finActive = accordName.findIndex(item => item.classList.contains('active'))
accordName[finActive].nextElementSibling.style.height = accordName[finActive].nextElementSibling.scrollHeight + 'px';
accordName.forEach(item => {
    item.addEventListener('click', function(e){
        e.preventDefault();
        if(!this.classList.contains('active')){
            accordName.forEach(item => {
                item.classList.remove('active');
                item.nextElementSibling.style.height = '0px';
            });
            this.classList.add('active');
            this.nextElementSibling.style.height = `${this.nextElementSibling.scrollHeight}px`;
        }
        else{
            this.classList.remove('active');
            this.nextElementSibling.style.height = '0px';
        }
    });
});



// accordion end

// hover images rotate start

const hoverImg = document.querySelectorAll('.hover__item img');
hoverImg.forEach(item => {
    item.addEventListener('mousemove', function(e){
        let bound = this.getBoundingClientRect();
        let x = (e.clientX - bound.x - this.clientWidth / 2) * -1;
        let y = (e.clientY - bound.y - this.clientHeight / 2);
        this.style.transform = `perspective(${this.clientWidth}px) rotateX(${x/20}deg) rotateY(${y/10}deg)`;
    });
    item.addEventListener('mouseout', function(){
        this.style.transform = '';
    });
})

// hover images rotate end
function some(entries){
    if(entries[0].isIntersecting){
        entries[0].target.classList.add('active');
    }
}
hoverImg.forEach(item => {
    let elem = new IntersectionObserver(some);
    elem.observe(item.parentElement);
});

