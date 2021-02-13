window.addEventListener("load", () => {
    let long;
    let lat;
    let air_temps = document.querySelector(".air_temp");

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            const api =  `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${lat}&lon=${long}`;
            
            fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data => {
                const {air_temperature} = data.properties.timeseries[0].data.instant.details;
                console.log(data);
                console.log(air_temperature);

                air_temps.textContent = air_temperature;

            });
        });
    }



});