//my API key in openwether 669d02e300e451f5c7dbee8745c67d5c

// api.openweathermap.org/data/2.5/weather?q={city name}&appid={your api key}

// https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={YOUR API KEY}  - To get access to current weather, minute forecast for 1 hour, hourly forecast for 48 hours and daily forecast for 7 days,

// const url = 'https://dog.ceo/api/breeds/image/random' - test API from DOG

// create different function for each one operation like createHTML or getData
// repeat Async and Promises
// write topics that I did not understant exactly for 100%



let btnSearch = document.getElementById('search');
let unitsFormat = 'metric'; //imperial or metric

console.log(btnSearch);
btnSearch.addEventListener('click', () => {

    let inputCity = document.getElementById('city').value;
    console.log('Click', inputCity);

    const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + inputCity + '&units=' + unitsFormat + '&appid=669d02e300e451f5c7dbee8745c67d5c';

    console.log(url);
    
    
    fetch(url)
        //.then(response => console.log(typeOf(response))
        .then(response => response.json())
        .then(data => {
            let lon = data.coord.lon;
            let lat = data.coord.lat;
            let cityName = data.name; //get sity name
            let abbrContry = data.sys.country; //get country abbreviation 
            let currentWeatherDescr = data.weather[0].description; //get current weather description 

            const url2 = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&units=' + unitsFormat + '&exclude=hourly&appid=669d02e300e451f5c7dbee8745c67d5c';
            console.log(url2);

            fetch(url2)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    console.log(data.daily)                    

                    let infoSection = document.getElementById('info');
                    let numberElement = 0;

                    infoSection.innerHTML = '';

                    let currentWeather = document.createElement('div');
                    
                    currentWeather.innerHTML = `<p><strong>City: </strong>${cityName}</p>` +
                                                `<p><strong>Contry: </strong>${abbrContry}</p>` +
                                                `<p><strong>Current weather: </strong>${currentWeatherDescr}</p>`;



                    infoSection.appendChild(currentWeather);


                    let table = document.createElement('table');
                    table.setAttribute('class', 'table table-dark');
                    table.innerHTML = '<thead>' + 
                                        '<tr>' +
                                            '<th>day</th>' +
                                            '<th>min</th>' +
                                            '<th>max</th>' +
                                            '<th>weather</th>' +
                                        '</tr>'
                                        '</thead>';
                    infoSection.appendChild(table);

                    data.daily.forEach(element => {
                        var tr = document.createElement('tr');
                        
                
                        tr.innerHTML =  '<td>' +  numberElement++ + '</td>' + 
                                        '<td>' +  element.temp.min + '</td>' + 
                                        '<td>' +  element.temp.max +'</td>' +
                                        '<td>' +  element.weather[0].description +'</td>' +
                                        '<img src="http://openweathermap.org/img/wn/' +  element.weather[0].icon + '@2x.png"></img>';
                
                        table.appendChild(tr);
                    });
                })

            })
});


