let currentDate = moment().format('l');

function getData() {
    let cityName = $("#cityInput").val();

    
    $.ajax({
        url: "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + ",US&units=imperial&APPID=abcd9257d5733a460d1691720d4f7b99",
        method: "GET"
    }).then(function(response) {
        // console.log(response);
        $("#searchedCityInfo").html(response.name + " (" + currentDate + ")");

        $("#temperature").html("Temperature: " + response.main.temp + " °F");
        
        $("#humidity").html("Humidity: " + response.main.humidity + "%");
        
        $("#windSpeed").html("Wind Speed: " + response.wind.speed + " MPH");
        
        let lat = response.coord.lat;
        
        let lon = response.coord.lon;
        
        
        $.ajax({
            url: "http://api.openweathermap.org/data/2.5/uvi?appid=abcd9257d5733a460d1691720d4f7b99&lat=" + lat + "&" + "lon=" + lon,
            method: "GET"
        }).then(function(response) {
            // console.log(response);
            //trying to get the value inside of the box, while keeping the text outside of it
            uvIndex = $("#uvIndexNum").html(response.value);
            $("#uvIndexEl").html(`UV Index: ${uvIndex}`);

        })


        $.ajax({
            url: "http://api.openweathermap.org/data/2.5/forecast?q=" + cityName + ",US&units=imperial&APPID=abcd9257d5733a460d1691720d4f7b99",
            method: "GET"
        }).then(function(response) {
            console.log(response);
        })
        









    })



}




$(".searchBtn").on("click", function() {
    event.preventDefault();

    getData();

})

$("#cityInput").keyup(function(event){
    if(event.keyCode == 13){
        $("#button-addon2").click();
    }
});