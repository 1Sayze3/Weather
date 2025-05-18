async function getWeather() {
  const city = document.getElementById("cityInput").value;
  const apiKey = "e1af6e6f88873ef3da6ddbce8af767e0"; // <- Replace this with your actual key

  if (!city) {
    alert("Please enter a city name.");
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (data.cod === "404") {
      document.getElementById("weatherBox").innerHTML = `<p>City not found.</p>`;
      return;
    }

    const icon = data.weather[0].icon;
    const description = data.weather[0].description;
    const temp = data.main.temp;
    const humidity = data.main.humidity;
    const name = data.name;

    document.getElementById("weatherBox").innerHTML = `
      <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="icon" />
      <h2>${name}</h2>
      <p><strong>${description}</strong></p>
      <p>🌡 Temperature: ${temp}°C</p>
      <p>💧 Humidity: ${humidity}%</p>
    `;
  } catch (err) {
    document.getElementById("weatherBox").innerHTML = `<p>Error fetching data.</p>`;
  }
}