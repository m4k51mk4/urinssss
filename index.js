$(document).ready(()=>{

let date = new Date("2023-06-01");
let currentDate = new Date();
const daysInYear = 365.2425
const daysInMonth = daysInYear/12

let days = Math.floor((currentDate.getTime()-date.getTime())/86400000); 

let years = Math.floor(days/daysInYear)
let months = Math.floor((days-daysInYear*years)/daysInMonth)
days = Math.round(days-(months*daysInMonth + years*daysInYear))

let plural = (n,str1,str2,str5) => {return n + ' ' + ((((n%10)==1)&&((n%100)!=11))?(str1):(((((n%10)>=2)&&((n%10)<=4))&&(((n%100)<10)||((n%100)>=20)))?(str2):(str5)))}

$(".data").text(
    plural(years,' год ',' года ',' лет ') +
    plural(months,' месяц ',' месяца ',' месяцев ') +
    plural(days,' день',' дня',' дней')
);

let next = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate() + 1, 
    0, 0, 0 
);

setTimeout('document.location.refresh()', next.getTime() - currentDate.getTime());


const typed = new Typed('.type', 
{
    strings: ['Настюша, ^1000 спасибо тебе за каждую минуту,^1000 проведенную вместе',
        'Продолжай как можно чаще радовать всех своей прекрасной улыбкой!',
        'Ты просто замечательная!',
        'Я тебя очень сильно люблю',
        '❤️ ^2000'],
    typeSpeed: 50,
    fadeOut: true,
    fadeOutDelay: 500,
    loop: true,
    loopCount: Infinity,
    showCursor: false,
});
});
