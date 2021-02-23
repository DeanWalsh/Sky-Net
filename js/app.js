window.addEventListener("load", () => {
    let long;
    let lat;

    let air_temps = document.querySelector(".air_temp");
    let location = document.querySelector(".location");

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            var weatherApi =  `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${lat}&lon=${long}`;
            var locationApi = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${long}&localityLanguage=en`;

            fetch(locationApi)
            .then((response) => response.json())
            .then((ldata) => {
                console.log(ldata);
                let city = ldata.city;
                let country = ldata.countryName;
                let locality = ldata.locality;
                console.log(city);
                console.log(country);
                console.log(locality);
            })

            fetch(weatherApi)
            .then((response) => response.json())
            .then((wdata) => {
                console.log(wdata);
                let temperature = wdata.properties.timeseries[0].data.instant.details.air_temperature;
                let humidity = wdata.properties.timeseries[0].data.instant.details.relative_humidity;
                let winddirection = wdata.properties.timeseries[0].data.instant.details.wind_from_direction;
                let windspeed = wdata.properties.timeseries[0].data.instant.details.wind_speed;
                console.log(temperature+"°C");
                console.log(humidity+"%");
                console.log(winddirection+"°");
                console.log(windspeed+"m/s");
            })

        });
    }
});