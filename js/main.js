document.addEventListener("DOMContentLoaded", function() {

    // SCROLL ANIMATION

const scrollElements = document.querySelectorAll(".js-scroll");

const elementInView = (el, dividend = 1) => {
    const elementTop = el.getBoundingClientRect().top;

    return (
        elementTop <=
        (window.innerHeight || document.documentElement.clientHeight) / dividend
    );
};

const elementOutofView = (el) => {
    const elementTop = el.getBoundingClientRect().top;

    return (
        elementTop > (window.innerHeight || document.documentElement.clientHeight)
    );
};

const displayScrollElement = (element) => {
    element.classList.add("scrolled");
};

const hideScrollElement = (element) => {
    element.classList.remove("scrolled");
};

const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
        if (elementInView(el, 1.25)) {
            displayScrollElement(el);
        } else if (elementOutofView(el)) {
            hideScrollElement(el)
        }
    })
}

window.addEventListener("scroll", () => {
    handleScrollAnimation();
});

// Initialisation

const newSelect = document.querySelectorAll('.question__custom-select__dropdown');
const newSelected = document.querySelectorAll('.question__custom-select__selected');
const customSel = document.querySelectorAll('.question__custom-select');
const daysList = document.querySelector('.days-list');
const monthList = document.querySelector('.month-list');
const yearList = document.querySelector('.year-list');
const nextBtn = document.getElementById('nextBtn');
const yearVal = document.getElementById('yearValue');
const yesbtn = document.getElementById('yesBtn');
const output = document.getElementById('api-output');
const callBtn = document.getElementById('callBtn');
const dataList = document.querySelector('.data__list');
const tomorrow = document.querySelector('.tomorrow');

let selectedYear = null;
let res = null;
let newOptions = document.querySelectorAll('.question__custom-select__dropdown__item');
let days = getDaysInMonth(0,2021);

        // FUNCTIONS

        function getDaysInMonth(month,year) {
            // Here January is 1 based
            //Day 0 is the last day in the previous month
            return new Date(year, month, 0).getDate();
            // Here January is 0 based
            // return new Date(year, month+1, 0).getDate();
        }

    function generateOptions(length,element) {
            element.innerHTML = null;
        for(let i = 0;i<length+1;i++) {
            let li = document.createElement('li');
            li.classList.add('question__custom-select__dropdown__item');
            let value = null;
            if(i < 10) {
                li.innerHTML = '0'+i;
                value = '0'+i;
            }else {
                li.innerHTML = i;
                value = i;
            }
            li.setAttribute('data-value',value);

            if(i){
                element.appendChild(li);
            }
            newOptions = document.querySelectorAll('.question__custom-select__dropdown__item');
        }
    }

    function generateYear(number,element) {
            element.innerHTML = null;
         for(let i = number;i < 2003;i++) {
             let li = document.createElement('li');
             li.classList.add('question__custom-select__dropdown__item');
             let value = i;
             li.innerHTML = i;
             li.setAttribute('data-value',value);
             element.appendChild(li);
         }
    }

    function onSelect(index,monthIndex) {
        days = getDaysInMonth(monthIndex+1,2021);
        generateOptions(days,daysList);
        openDropdown(index)
    }

    function openDropdown(index) {
        if(newSelect[index].classList.contains('opened')) {
            newSelect[index].classList.remove('opened')
        }else {
            newSelect[index].classList.add('opened')
        }
    }

    function preload() {
        setTimeout(function (){
            document.querySelector('.loader__wrapper')
                .classList.add('hide')
        },2000)
        document.querySelector('.loader__wrapper')
            .classList.remove('hide')
    }

    function recordAudio() {
        document.getElementById('audio-recording').classList.remove('hide');
        const progressInner = document.querySelector('.progress__inner');
        const percent = document.querySelector('.progress-percent');
        let width = 0;
        let popup = false;
        setInterval(()=> {
            if(width < 100) {
                width +=1;
                progressInner.style.width=+width + '%';
                percent.innerText =+width + '%';
            }else {
                document.getElementById('audio-recording').classList.add('hide');
                document.getElementById('show-result').classList.remove('hide');
                popup = true;
            }
        },100)
    }

    function showPopup() {
            document.querySelectorAll('.popup-message')
                .forEach((item) => {
                    if(item.classList.contains('showup')){
                        item.classList.remove('showup')
                    }else {
                        item.classList.add('showup')
                    }
                })
    }

        // FUNCTIONS END

        // EVENT LISTENERS

            customSel.forEach((item,index)=>{
                item.addEventListener('click',function () {
                    customSel[index].classList.remove('error');
                    openDropdown(index);
                    console.log(newSelect[index].children);
                    Array.from(newSelect[index].children).forEach((item,i)=>{
                        item.addEventListener('click',function (event) {
                           let newValue = this.dataset.value;
                           newSelected[index].innerHTML = newValue;
                           newSelected[index].setAttribute('data-selected',newValue);
                            customSel[index].classList.remove('error');
                            setTimeout(()=>{
                                document.querySelector('.notification')
                                    .classList.add('hide');
                            },6000)
                            document.querySelector('.notification')
                                .classList.remove('hide');
                           console.log(newSelected[index]);
                           onSelect(index,i,2021);
                        })
                    })
                })
            })

    nextBtn.addEventListener('click',function (){
        newSelected.forEach((item,index)=> {
            if(item.dataset.selected == null) {
                customSel[index].classList.add('error');
            }
        })
        console.log(Array.from(newSelected))
        if(Array.from(newSelected).every((item)=> item.dataset.selected)){
            console.log(Array.from(newSelected).every((item)=> item.dataset.selected))
            selectedYear = parseInt(yearVal.dataset.selected);
            console.log(selectedYear)
            res = 2021 - selectedYear;
            document.getElementById('q-2').classList.add('hide');
            document.getElementById('q-3').classList.remove('hide');
            preload();
        }
    })


    yesbtn.addEventListener('click',()=> {
        document.getElementById('home').classList.add('hide');
        document.getElementById('q-1').classList.remove('hide');
        preload();
    })

    document.querySelectorAll('#q-1 .button__gold').forEach((item)=> {
        item.addEventListener('click',function (){
            document.getElementById('q-1').classList.add('hide');
            document.getElementById('q-2').classList.remove('hide');
            preload();
        })
    })
    document.querySelectorAll('#q-3 .button__gold').forEach((item)=> {
        item.addEventListener('click',function (){
            if (res >= 18 && res <= 35) {
                document.getElementById('q-3').classList.add('hide');
                document.getElementById('q-4').classList.remove('hide');
                preload();
                setTimeout(showPopup,2500)
            }else if(res >= 36 && res <= 45) {
                document.getElementById('q-3').classList.add('hide');
                document.getElementById('q-5').classList.remove('hide');
                preload();
                setTimeout(showPopup,2500)
            }else if(res >= 46) {
                document.getElementById('q-3').classList.add('hide');
                document.getElementById('q-6').classList.remove('hide');
                preload();
                setTimeout(showPopup,2500)
            }
        })
    })

    document.querySelectorAll('.play-record').forEach((item)=>{
        item.addEventListener('click',function () {
            document.getElementById('q-4').classList.add('hide');
            document.getElementById('q-5').classList.add('hide');
            document.getElementById('q-6').classList.add('hide');
            recordAudio();
        })
    })
    generateOptions(days,daysList);
    generateOptions(12,monthList);
    generateYear(1970,yearList);

    // API CALL

    callBtn.addEventListener('click',()=>{
        fetch('https://swapi.dev/api/people/1/')
            .then(response => response.json())
            .then((data)=> {
                output.style.display = 'block';
                for(i in data) {
                    let li = document.createElement('li');
                    li.classList.add('data__list__item');
                    li.innerHTML = `${i}: ${data[i]}`;
                    dataList.appendChild(li);
                }
                console.log(JSON.stringify(data),output);
            })
    })

    const today = new Date();
    const tomorrowDay = new Date(today);
    tomorrowDay.setDate(tomorrowDay.getDate() + 1);
    tomorrow.innerHTML = `${tomorrowDay.getDate()}.${tomorrowDay.getMonth()+1}.${tomorrowDay.getFullYear()}`;

    setTimeout(()=>{
        document.querySelector('.developers-intro').classList.add('hide');
    },10000)

    setTimeout(()=>{
        document.querySelector('.click-here').classList.add('hide');
    },18000)
});