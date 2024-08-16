$(document).ready(()=>{

let date = new Date("2023-06-01");
let currentDate = new Date();
let days = Math.round((currentDate.getTime()-date.getTime())/86400000); 
let years = Math.floor(days/365)
let months = Math.floor((days-365*years)/30.4167)
days = Math.round(days-(months*30.4167 + years*365))

function plural(n,str1,str2,str5){return n + ' ' + ((((n%10)==1)&&((n%100)!=11))?(str1):(((((n%10)>=2)&&((n%10)<=4))&&(((n%100)<10)||((n%100)>=20)))?(str2):(str5)))}

$(".data").text(
    plural(years,' год ',' года ',' лет ') +
    plural(months,' месяц ',' месяца ',' месяцев ') +
    plural(days,' день',' дня',' дней')
);

strings=['Настюша, ^1000 спасибо тебе за каждую минуту,^1000 проведенную вместе','Продолжай как можно чаще радовать всех своей прекрасной улыбкой!','Ты просто замечательная!','Я тебя очень сильно люблю','❤️ ^2000'];


const typed = new Typed('.type', 
{
    strings: strings,
    typeSpeed: 50,
    fadeOut: true,
    fadeOutDelay: 500,
    loop: true,
    loopCount: Infinity,
    showCursor: false,
});
});