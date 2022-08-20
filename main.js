var url = `api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}`
let apikey = "176ec5e1926748ee54eea47b99a97178"

async function getweather() {
    weekdata();
    try {
        let city = document.getElementById("city").value;
        let res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=176ec5e1926748ee54eea47b99a97178&units=metric`)
        let data = await res.json();

        console.log(data)
        appenddata(data);

        document.getElementById("city").value = "";
    } catch (error) {
        console.log("not updated")
    }
}

function appenddata(data) {
    document.getElementById('map').innerHTML = null;
    document.getElementById("info").innerHTML = "";
    var map = document.createElement("iframe")
    map.src = `https://www.google.com/maps/embed/v1/place?key=AIzaSyA4c_4bZmjp9jVdnluPg1B23ehyEr5gl-w
    &q=${data.name}`
    document.getElementById('map').append(map);
    var box1 = document.createElement("div");
    var box2 = document.createElement("div");
    var box3 = document.createElement("div");
    var name = document.createElement("h1");
    name.textContent = `${data.name}`;
    var country = document.createElement("h4");
    country.textContent = `${data.sys.country}`;
    var feels_like = document.createElement("h3");
    feels_like.textContent = `feels like : ${data.main.feels_like}°`;
    var speed = document.createElement("h3");
    speed.textContent = `wind speed : ${data.wind.speed}`;
    var deg = document.createElement("p");
    deg.textContent = `wind deg : ${data.wind.deg}`;
    var gust = document.createElement("p");
    gust.textContent = `wind gust : ${data.wind.gust}`;
    var temp = document.createElement("h2");
    temp.textContent = `T ${data.main.temp}°c`;
    var temp_max = document.createElement("p");
    temp_max.textContent = `max : ${data.main.temp_max}°c`;
    var temp_min = document.createElement("p");
    temp_min.textContent = `min : ${data.main.temp_min}°c`;
    var humidity = document.createElement("h3");
    humidity.textContent = `humidity : ${data.main.humidity}%`;
    var pressure = document.createElement("h3");
    pressure.textContent = `pressure : ${data.main.pressure}`;
    var sunrise = document.createElement("h4");
    sunrise.textContent = `sunrise : ${data.sys.sunrise}`;
    var sunset = document.createElement("h4");
    sunset.textContent = `sunset : ${data.sys.sunset}`;
    var clouds = document.createElement("h4");
    clouds.textContent = `Clouds : ${data.clouds.all}`;
    box2.append(name, country, humidity, pressure, sunrise, sunset)
    box3.append(temp, feels_like, temp_max, temp_min, speed, gust, deg, clouds)
    box1.append(box3, box2)
    document.getElementById("info").append(box1)


}

async function weekdata() {

    try {
        let city = document.getElementById("city").value
        let responce = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=176ec5e1926748ee54eea47b99a97178&units=metric`)
        let wdata = await responce.json();
        console.log(wdata.list);
        displayweekdata(wdata.list);
        document.getElementById("city").value = "";
    } catch (error) {
        console.log("not updated week data")
    }
}

function displayweekdata(d) {

    document.getElementById("weekdata").innerHTML = "";
    d.map(function (data, i, arr) {
        if (i > 6) {
            return;
        }
        var box1 = document.createElement("div");
        box1.id = "box"
        if (i == 0) {
            var day = document.createElement("h2");
            day.textContent = `MON`;
            box1.append(day);
        }
        if (i == 1) {
            var day = document.createElement("h2");
            day.textContent = `TUE`;
            box1.append(day);
        }
        if (i == 2) {
            var day = document.createElement("h2");
            day.textContent = `WED`;
            box1.append(day);
        }
        if (i == 3) {
            var day = document.createElement("h2");
            day.textContent = `THU`;
            box1.append(day);
        }
        if (i == 4) {
            var day = document.createElement("h2");
            day.textContent = `FRI`;
            box1.append(day);
        }
        if (i == 5) {
            var day = document.createElement("h2");
            day.textContent = `SAT`;
            box1.append(day);
        }
        if (i == 6) {
            var day = document.createElement("h2");
            day.textContent = `SUN`;
            box1.append(day);
        }
        if (data.main.temp > 25) {
            var icon = document.createElement("div");
            icon.innerHTML = `<i class="fa-solid fa-sun"></i>`
            icon.id = "icon"
        }
        if (data.main.temp < 25) {
            var icon = document.createElement("div");
            icon.innerHTML = `<i class="fa-solid fa-cloud-sun"></i>`
            icon.id = "icon"
        }
        if (data.main.temp < 10) {
            var icon = document.createElement("div");
            icon.innerHTML = `<i class="fa-solid fa-snowflake"></i>`
            icon.id = "icon"
        }
        var temp = document.createElement("h1");
        temp.textContent = `${data.main.temp}°c`;

        var temp_max = document.createElement("p");
        temp_max.textContent = ` ${data.main.temp_max}°c`;
        var temp_min = document.createElement("p");
        temp_min.textContent = `${data.main.temp_min}°c`;

        box1.append(temp, icon, temp_max, temp_min)
        document.getElementById("weekdata").append(box1);
    });

}