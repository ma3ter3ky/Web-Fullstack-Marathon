class Forecast {
    constructor() {
        this.forecastContainer = document.getElementById('weather-container');
        this.cityName = "Kharkiv";

        this.apiKey = '968f03b407cdea8ff8a552db8bb20da9';
        this.url = `https://api.openweathermap.org/data/2.5/forecast?q=${this.cityName}&appid=${this.apiKey}&units=metric`;
    }

    getWeather() {
        return fetch(this.url)
            .then(response => response.json());
    }

    processWeatherData(data) {
        const dailyData = {};

        data.list.forEach(dataItem => {
            const date = new Date(dataItem.dt * 1000);
            const hours = date.getHours();
            if (hours >= 11 && hours < 14) {
                console.log(hours);
                const dateStr = date.toLocaleDateString();
                dailyData[dateStr] = {
                    temp: Math.round(dataItem.main.temp) > 0 ? `+${Math.round(dataItem.main.temp)}` : `${Math.round(dataItem.main.temp)}`,
                    main: dataItem.weather[0].main,
                    description: dataItem.weather[0].description,
                    iconUrl: `https://openweathermap.org/img/wn/${dataItem.weather[0].icon}@2x.png`
                };
            }
        });
        return dailyData;
    }

    renderWeather(dailyData) {
        this.forecastContainer.innerHTML = `<h2 id="city-name">${this.cityName}</h2>`;

        Object.entries(dailyData).forEach(([date, info]) => {
            const card = document.createElement('div');
            card.classList.add('forecast-card');
            card.id = date;
            card.innerHTML = `
            <p class="card date">${date}</p>
            <img class="card icon" src="${info.iconUrl}" alt="${info.description}">
            <p class="card temp">${info.temp}°C</p>
            <p class="card description">${info.main} - ${info.description}</p>
        `;
            this.forecastContainer.appendChild(card);
        });
    }

    runForecast() {
        this.getWeather()
            .then(data => {
                if (!data || !data.list) {
                    throw new Error('Missing data.list');
                }
                return this.processWeatherData(data);
            })
            .then(dailyData => this.renderWeather(dailyData))
            .catch(error => console.error('Error in processing or rendering:', error));
    }

}

function main() {
    const forecast = new Forecast();
    forecast.runForecast();
}

main();