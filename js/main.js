const s = selektor => document.getElementById(selektor)

const weatherIcon = s("wl-right")
const locationName = s("location-name")
const weatherCondition = s("weather-cond")
const temperature = s("temperature")
const datum = s("date")
const search = s("search")
const searchButton = s("weather-search")
const maxTemp = s("max-temp")
const humidity = s("humidity")
const wind = s("wind")
const pressure = s("pressure")
const today = s("today")
const weekly = s("weekly")
const infoWeek = s("info-weekly")
const burger = s("weather-burger")
let vreme
let upit
let woeid
let weeklyString = ""

// city woeids

const budapest = "804365"
const london = "44418"
const moscow = "2122265"
const rome = "721943"
const paris = "615702"
const berlin = "638242"

const proxyServer = `https://proxy-requests.herokuapp.com/`
let apiUrl = "https://www.metaweather.com/api/location/"

function getWeather(woeid) {
    fetch(`${proxyServer}${apiUrl}${woeid}/`)
        .then(response => response.json())
        .then(function (response) {
            vreme = response.consolidated_weather
            // console.log(response.consolidated_weather)
            let iconUrl = `https://www.metaweather.com/static/img/weather/${vreme[0].weather_state_abbr}.svg`
            weatherIcon.innerHTML = `<img src="${iconUrl}" width="90">`
            locationName.innerHTML = response.title
            weatherCondition.innerHTML = vreme[0].weather_state_name
            temperature.innerHTML = vreme[0].the_temp.toFixed(0) + "&#176;<h3><sup>C</sup></h3>"
            datum.innerHTML = vreme[0].applicable_date
            maxTemp.innerHTML = vreme[0].max_temp.toFixed(0) + "&#176;<h6><sup>C</sup></h6>"
            humidity.innerHTML = vreme[0].humidity + " %"
            wind.innerHTML = vreme[0].wind_speed.toFixed(0) + " m/s"
            pressure.innerHTML = vreme[0].air_pressure.toFixed(0) + " <small>mBa</small>"
            weeklyString = ""
            for ( let i = 1; i < vreme.length; i++ ) {
                weeklyString += `
                <div class="weekly-row">
                    <div><img src="https://www.metaweather.com/static/img/weather/${vreme[i].weather_state_abbr}.svg" width="40"></div>
                    <div>
                        ${vreme[i].applicable_date}
                    </div>
                    <div class="weekly-temp">
                        ${vreme[i].min_temp.toFixed(0)}&#176;/${vreme[i].max_temp.toFixed(0)}&#176;
                    </div>
                    <div>${vreme[i].weather_state_name}</div>
                </div>
                `
            }
            infoWeek.innerHTML = ""
            infoWeek.innerHTML += weeklyString
        })
}

function hideMenu() {
    $("#burger-menu").slideUp()
    $("#mask").hide()
}

getWeather(budapest)

s("form-weather").addEventListener("submit", function(e) {
    e.preventDefault();
    upit = search.value;
    fetch(`${proxyServer}https://www.metaweather.com/api/location/search/?query=${upit}`)
        .then(response => response.json())
        .then(response => {
            if (response[0] == undefined) {
                locationName.innerHTML = "Location not found"
                weatherIcon.innerHTML = ``
                weatherCondition.innerHTML = ""
                temperature.innerHTML = ""
                datum.innerHTML = ""
            } else {
                woeid = response[0].woeid
                getWeather(woeid)

            }
        })
})

weekly.addEventListener("click", function () {
    s("info-today").classList.add("invisible")
    s("info-weekly").classList.remove("invisible")
    s("today").classList.remove("nav-active")
    s("weekly").classList.add("nav-active")
})

today.addEventListener("click", function () {
    s("info-today").classList.remove("invisible")
    s("info-weekly").classList.add("invisible")
    s("today").classList.add("nav-active")
    s("weekly").classList.remove("nav-active")
})

burger.addEventListener("click", function () {
    $("#burger-menu").slideDown()
    $("#mask").show()
})

s("moscow").addEventListener("click", function () {
    hideMenu()
    getWeather(moscow)
})

s("london").addEventListener("click", function () {
    hideMenu()
    getWeather(london)
})

s("rome").addEventListener("click", function () {
    hideMenu()
    getWeather(rome)
})

s("paris").addEventListener("click", function () {
    hideMenu()
    getWeather(paris)
})
s("berlin").addEventListener("click", function () {
    hideMenu()
    getWeather(berlin)
})

s("mask").addEventListener("click", function () {
    hideMenu()
})

// searchButton.addEventListener("click", function () {
//     upit = search.value;
//     fetch(`${proxyServer}https://www.metaweather.com/api/location/search/?query=${upit}`)
//         .then(response => response.json())
//         .then(response => {
//             if (response[0] == undefined) {
//                 locationName.innerHTML = "Location not found"
//                 weatherIcon.innerHTML = ``
//                 weatherCondition.innerHTML = ""
//                 temperature.innerHTML = ""
//                 datum.innerHTML = ""
//             } else {
//                 woeid = response[0].woeid
//                 getWeather(woeid)

//             }
//         })
// })



