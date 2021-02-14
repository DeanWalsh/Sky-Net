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
            .then(response => {
                return response.json();
            })
            .then(data => {
                const {city} = data;
                location.textContent = city;
            });
            
            fetch(weatherApi)
            .then(response => {
                return response.json();
            })
            .then(data => {
                const {air_temperature} = data.properties.timeseries[0].data.instant.details;
                air_temps.textContent = air_temperature;
            });
        });
    }
    
});