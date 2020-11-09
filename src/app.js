const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

console.log(__dirname);
console.log(path.join(__dirname, "../public"));

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
    res.render("index", {
        title: "Weather App",
        name: "JY",
    });
});

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About Me",
        name: "JY",
    });
});

app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help Page",
        helptext: "this is helpful text.",
        name: "JY",
    });
});

app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "Address must be provided.",
        });
    }

    geocode(
        req.query.address,
        (error, { latitude, longitude, location } = {}) => {
            if (error) {
                return res.send({
                    error: "Geocode error",
                });
            }
            console.log("Data", { latitude, longitude, location });
            forecast(longitude, latitude, (forecasterror, forecastdata) => {
                if (forecasterror) {
                    return res.send({
                        error: "Forecast error",
                    });
                }
                res.send({
                    forecast:
                        forecastdata.weather_descriptions +
                        ". It is " +
                        forecastdata.temperature +
                        " degrees out. The humidity is " +
                        forecastdata.humidity +
                        "%.",
                    location,
                    address: forecastdata,
                });
                // res.send(forecastdata);
                console.log(location);
            });
        }
    );
});

app.get("/products", (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "You must provide a search term.",
        });
    }
    console.log(req.query.search);
    res.send({
        products: [],
    });
});

app.get("/help/*", (req, res) => {
    res.render("404Page", {
        title: "Help artical not found.",
        name: "JY",
    });
});

app.get("*", (req, res) => {
    res.render("404Page", {
        title: "404 Page Not Found.",
        name: "JY",
    });
});

app.listen(3000, () => {
    console.log("Server is up on port 3000.");
});
