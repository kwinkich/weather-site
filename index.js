const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');


search.addEventListener('click', () => {

    const APIKey = '2188b22cf9c06e9d34b85de3cbb5a6da';
    const city = document.querySelector('.search-box input').value;

    if (city === '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`).then(response => response.json()).then(json => {

        if (json.cod === '404') {
            container.style.height = '400px';
            weatherBox.style.display = 'none';
            weatherDetails.style.display = 'none';
            error404.style.display = 'block';
            error404.classList.add('fadeIn');
            return;
        }

        error404.style.display = 'none';
        error404.classList.remove('fadeIn');

        const image = document.querySelector('.weather-box img');
        const temperature = document.querySelector('.weather-box .temperature');
        const description = document.querySelector('.weather-box .description');
        const humidity = document.querySelector('.weather-details .humidity span');
        const wind = document.querySelector('.weather-details .wind span');

        switch (json.weather[0].main) {
            case 'Clear':
                image.src = 'img/clear.png';
                break;

            case 'Rain':
                image.src = 'img/rain.png';
                break;

            case 'Snow':
                image.src = 'img/snow.png';
                break;

            case 'Clouds':
                image.src = 'img/cloud.png';
                break;

            case 'Haze':
                image.src = 'img/mist.png';
                break;

            default:
                image.src = '';

        }

        temperature.innerHTML = `${parseInt(json.main.temp)}<span>??C</span>`
        description.innerHTML = `${json.weather[0].description}`;
        humidity.innerHTML = `${json.main.humidity}%`;
        wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

        weatherBox.style.display = '';
        weatherDetails.style.display = '';
        weatherBox.classList.add('fadeIn');
        weatherDetails.classList.add('fadeIn');
        container.style.height = '590px';


    });

});


var ua = {
    'Humidity': '??????????????????',
    'Wind Speed': '?????????????????? ??????????',
    'error': '????! ???????????????? ???????????????????????? :('
};

var en = {
    'Humidity': 'Humidity',
    'Wind Speed': 'Wind Speed',
    'error': 'Oops! invalid location :('
};

//$(function () {
//    $('.translate').click(function () {
//        var lang = $(this).attr('id');

//        $('.lang').each(function (index, item) {
//            $(this).text(arrLang[lang][$(this).attr('key')]);
//        });
//    });
//});


function changeLang(lan) {
    lengthObj = Object.getOwnPropertyNames(lan).length;
    for (var i = 0; i <= lengthObj - 1; i++) {
        objKey = Object.getOwnPropertyNames(lan)[i];
        document.getElementById(objKey).innerText = func(objKey);
    }

    function func(a) {
        for (key in lan) {
            if (key == a) {
                return (lan[key]);
            }
        }
    }
}
