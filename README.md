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
### `getWeather(location)`
Fetches weather data from the Visual Crossing API and extracts the location, temperature, and condition.

### `displayWeather()`
Displays the weather data, including temperature, condition, and an appropriate weather icon. It also updates the background based on the weather condition.

### `getWeatherIcon(condition)`
Returns the corresponding weather icon filename based on the weather condition.

### `changeBackground(condition)`
Changes the webpage background dynamically according to the weather condition.

## Dependencies
- Visual Crossing Weather API
- Basic HTML, CSS, and JavaScript

## Notes
- Ensure you have a valid API key before running the script.
- Weather icons should be placed in the `img` directory with the appropriate filenames.

## License
This project is open-source and available for modification and distribution under the MIT License.