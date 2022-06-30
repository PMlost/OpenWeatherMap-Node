const express = require("express");
const https = require("https"); //https module
const bodyParser = require("body-parser")

const app = express();
app.use(bodyParser.urlencoded({
    extended: true
}))





app.get("/", function (req, res) {

    res.sendFile(__dirname + "/index.html");

})

app.post("/", function (req, res) {

    const location = req.body.cityName;
    const apiKey = "01c4992d1eeaf2ec3f3b1744ab151180"
    const unit = "metric"
    const weatherserver = "https://api.openweathermap.org/data/2.5/weather?q=" + location + "&appid=" + apiKey + "&units=" + unit;

    //  connecting to openweather server


    https.get(weatherserver, function (response) {
        console.log(response.statusCode);

        response.on("data", function (data) { //getting data through on method
            const weatherdata = JSON.parse(data) // jason object 

            const temp = weatherdata.main.temp //temperature in location
            const weatherdesc = weatherdata.weather[0].description //weather description of  location

            const icon = weatherdata.weather[0].icon
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
            const weathericon = "<img src=" + imageURL + ">"



            res.write("<p></p>weather is currently " + weatherdesc);
            res.write("<h1> temperature in "+location+" : " +temp + " degree celcius </h1>") //sending respoonse to our server from data we fetch.
            res.write(weathericon)
            res.send()
        })



    })



})




app.listen(3000, function () {
    console.log("server is running on port 3000");
})
// unique id : a343f2455b
