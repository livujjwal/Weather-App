const btn = document.getElementById("action");
//position fn
async function getUserLoction() {
  try {
    await navigator.geolocation.getCurrentPosition(userLoction);
  } catch (error) {
    console.log(error);
    alert(error);
  }
  const position = {};
  function userLoction(p) {
    position["lat"] = p.coords.latitude;
    position["long"] = p.coords.longitude;
    const location = document.getElementById("position");
    location.innerHTML = `
    <div class="box">Lat : ${position["lat"]}</div>
    <div class="box">Long : ${position["long"]}</div>`;
    googleMap(position);
    getweather(position);
  }
}

// google map
function googleMap(position) {
  try {
    let map = document.getElementById("google_map");
    map.innerHTML = `<iframe id="map" src="https://maps.google.com/maps?q=${position["lat"]}, ${position["long"]}&z=15&output=embed" frameborder="0" style="border:0"></iframe>
    `;
  } catch (error) {
    console.log(error);
    alert(error);
  }
}

// weather fn
async function getweather(position) {
  try {
    const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${position["lat"]}&lon=${position["long"]}&units=metric&exclude=hourly,daily,minutely&appid=58fe30705cbb33da7d4a8e25dc22e206`;

    let response = await fetch(url);
    let weather = await response.json();
    console.log(weather);

    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${position["lat"]}&lon=${position["long"]}&appid=58fe30705cbb33da7d4a8e25dc22e206`
    );
    let w = await res.json();
    const userWeather = document.getElementById("user_data");
    userWeather.innerHTML = `<div>
<div id="user_location" class="box-1">Location : ${w.name}</div>
<div id="wind_speed" class="box-1">Wind Speed : ${
      weather.current.wind_speed
    }kmph</div>
<div id="humidity" class="box-1">Humidity : ${weather.current.humidity}</div>
</div>
<div>
<div id="time_zone" class="box-1">Time Zone : ${weather.timezone}</div>
<div id="pressure" class="box-1">Pressure : ${Math.ceil(
      weather.current.pressure * 0.000987
    )}atm</div>
<div id="wind_dir" class="box-1">Wind Direction : ${
      weather.current.wind_deg
    }<sup>o</sup></div>
</div>
<div>
<div id="uv_index" class="box-1">UV Index : ${weather.current.uvi}</div>
<div id="feel_like" class="box-1">Feels like : ${
      weather.current.feels_like
    }<sup>o</sup>C</div>
</div>`;
  } catch (error) {
    console.log(error);
    alert(error);
  }
}

//main fn
async function main() {
  await getUserLoction();
}
main();
// btn.addEventListener("click", main());
