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

let vreme
let upit
let woeid

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
        })
}

getWeather("638242")

searchButton.addEventListener("click", function () {
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



