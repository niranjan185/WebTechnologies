const apiKey = "YOUR_API_KEY"; // replace with your OpenWeatherMap API key

// Get weather by city name
async function getWeatherByCity() {
    const city = document.getElementById("cityInput").value;
    if (!city) {
        alert("Please enter a city name");
        return;
    }
    fetchWeather(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
}

// Get weather using current location
function getWeatherByLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            let lat = position.coords.latitude;
            let lon = position.coords.longitude;
            fetchWeather(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
        }, () => {
            alert("Unable to fetch location. Please allow location access.");
        });
    } else {
        alert("Geolocation is not supported by your browser");
    }
}

// Fetch weather data and update UI
async function fetchWeather(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod !== 200) {
            alert("City not found!");
            return;
        }

        document.getElementById("city").textContent = `City: ${data.name}`;
        document.getElementById("temperature").textContent = `Temperature: ${data.main.temp}°C`;
        document.getElementById("condition").textContent = `Condition: ${data.weather[0].description}`;

        // Weather Icon
        const iconCode = data.weather[0].icon; // e.g. "01d"
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        document.getElementById("icon").src = iconUrl;

    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}

// Auto-detect location & show weather on page load
window.onload = getWeatherByLocation;
