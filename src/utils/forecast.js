const request = require("request");

const forecast = (lon, lat, cb) => {
    const url =
        "http://api.weatherstack.com/current?access_key=9996edac1f97a78d5c711972ffb2ba5e&query=" +
        lat.toString() +
        "," +
        lon.toString() +
        "&units=m";
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            console.log("Unable to connect to weather service!", undefined);
        } else if (body.error) {
            console.log("Unable to find location", undefined);
        } else {
            console.log(body);
            cb(undefined, {
                country: body.location.country,
                weather_descriptions: body.current.weather_descriptions[0],
                temperature: body.current.temperature,
                humidity: body.current.humidity,
            });
        }
    });
};

module.exports = forecast;
