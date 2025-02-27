# Weather App

This project is a simple weather application that fetches and displays real-time weather data using the Visual Crossing Weather API. Users can enter a location to retrieve the current weather conditions, toggle between Celsius and Fahrenheit, and see weather-related icons and background changes.

## Features
- Fetches real-time weather data based on user input.
- Displays temperature in both Celsius and Fahrenheit.
- Shows weather conditions with relevant icons.
- Changes background based on weather conditions.
- Handles loading states and errors gracefully.

## Installation & Setup
1. Clone this repository.
2. Open the project directory.
3. Replace `YOUR_API_KEY` in the script with your actual Visual Crossing API key.
4. Run the project in a browser.

## Usage
1. Enter a location in the input field.
2. Click the submit button to fetch weather data.
3. View the temperature, weather conditions, and appropriate icon.
4. Use the unit toggle to switch between Celsius and Fahrenheit.

## Code Overview
### Fetching Weather Data
The function `getWeather(location)` fetches weather data from the Visual Crossing API and extracts the location, temperature, and condition:
```javascript
async function getWeather(location) {
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=${apiKey}&contentType=json`);
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();
    return {
        location: data.resolvedAddress,
        temperatureC: data.currentConditions.temp,
        temperatureF: (data.currentConditions.temp * 9 / 5) + 32,
        condition: data.currentConditions.conditions
    };
}
```

### Displaying Weather Data
The function `displayWeather()` updates the webpage with the retrieved weather data:
```javascript
function displayWeather() {
    if (!currentWeatherData) return;
    const unitToggle = document.getElementById("unitToggle");
    const temperature = unitToggle.checked
        ? `${currentWeatherData.temperatureF.toFixed(1)} °F`
        : `${currentWeatherData.temperatureC.toFixed(1)} °C`;
    document.getElementById("weatherDisplay").innerHTML = `
        <h2>${currentWeatherData.location}</h2>
        <p class="temp">${temperature}</p>
        <div class="weather-info">
            <img src="../img/${getWeatherIcon(currentWeatherData.condition)}" alt="${currentWeatherData.condition}">
            <p>${currentWeatherData.condition}</p>
        </div>
    `;
    changeBackground(currentWeatherData.condition);
}
```

### `getWeatherIcon(condition)`
Returns the corresponding weather icon filename based on the weather condition.

### Setting the Background
The function `changeBackground(condition)` modifies the webpage's background dynamically based on the weather condition:
```javascript
function changeBackground(condition) {
    let bgColor;
    if (condition.includes("Clear")) bgColor = "linear-gradient(to right, #FFD700, #FF4500)";
    else if (condition.includes("Cloudy")) bgColor = "linear-gradient(to right, #B0C4DE, #708090)";
    else if (condition.includes("Rain")) bgColor = "linear-gradient(to right, #4682B4, #1E90FF)";
    else if (condition.includes("Snow")) bgColor = "linear-gradient(to right, #E0FFFF, #ADD8E6)";
    else bgColor = "linear-gradient(to right, #87CEFA, #4682B4)";
    document.body.style.background = bgColor;
}
```

## Dependencies
- Visual Crossing Weather API
- Basic HTML, CSS, and JavaScript

## Notes
- Ensure you have a valid API key before running the script.
- Weather icons should be placed in the `img` directory with the appropriate filenames.

## License
This project is open-source and available for modification and distribution under the MIT License.