let currentDate = moment().format('l');
let historyArray = [];

function appendHistory() {
    $(".historyRow").empty();
    
    for (var property in historyArray) {
        $(".historyRow").append(`<button type="button" value=${historyArray[property]} class="btn btn-outline-secondary histBtn">${historyArray[property]}</button>`);
    }
}

function getData() {
    let cityName = $("#cityInput").val();

    
    $.ajax({
        url: "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + ",US&units=imperial&APPID=abcd9257d5733a460d1691720d4f7b99",
        method: "GET"
    }).then(function(response) {
        // console.log(response);
        let iconCode = response.weather[0].icon;
        let iconURL = "http://openweathermap.org/img/w/" + iconCode + ".png";
       
        $('#wicon').attr('src', iconURL);
        
        $("#searchedCityInfo").html(response.name + " (" + currentDate + ")");

        $("#temperature").html("Temperature: " + Math.floor(response.main.temp) + " °F");
        
        $("#humidity").html("Humidity: " + response.main.humidity + "%");
        
        $("#windSpeed").html("Wind Speed: " + response.wind.speed + " MPH");
        
        let lat = response.coord.lat;
        
        let lon = response.coord.lon;

        let cityCode = response.id;
        
        
        $.ajax({
            url: "http://api.openweathermap.org/data/2.5/uvi?appid=abcd9257d5733a460d1691720d4f7b99&lat=" + lat + "&" + "lon=" + lon,
            method: "GET"
        }).then(function(response) {
            // console.log(response);
        
            let uvIndex = response.value;

            $("#uv").append(`UV Index: <span class="uvSpan"> ${uvIndex} </span>`);

            if (uvIndex < 3) {
                $(".uvSpan").addClass("favorable");
            } else if (uvIndex > 2 && uvIndex < 8) {
                $(".uvSpan").addClass("moderate");
            } else {
                $(".uvSpan").addClass("severe");
            }


        })

        $.ajax({
            url: "http://api.openweathermap.org/data/2.5/forecast?id=" + cityCode + "&units=imperial&appid=abcd9257d5733a460d1691720d4f7b99",
            method: "GET"
        }).then(function(response) {
            // console.log(response);
       
            let day1IconCode = response.list[5].weather[0].icon;
            let day1IconURL = "http://openweathermap.org/img/w/" + day1IconCode + ".png";
            
            let day2IconCode = response.list[13].weather[0].icon;
            let day2IconURL = "http://openweathermap.org/img/w/" + day2IconCode + ".png";

            let day3IconCode = response.list[21].weather[0].icon;
            let day3IconURL = "http://openweathermap.org/img/w/" + day3IconCode + ".png";

            let day4IconCode = response.list[29].weather[0].icon;
            let day4IconURL = "http://openweathermap.org/img/w/" + day4IconCode + ".png";

            let day5IconCode = response.list[37].weather[0].icon;
            let day5IconURL = "http://openweathermap.org/img/w/" + day5IconCode + ".png";

            
            $("#day1Date").html(response.list[5].dt_txt.slice(5,10));
            $("#day1Icon").html(response.list[5].weather.icon);
            $("#day1Icon").attr('src', day1IconURL);
            $("#day1Temp").html("Temp: " + Math.floor(response.list[5].main.temp) + " °F");
            $("#day1Hum").html("Humidity: " + response.list[5].main.humidity + "%");
            
            $("#day2Date").html(response.list[13].dt_txt.slice(5,10));
            $("#day2Icon").html(response.list[13].weather.icon);
            $("#day2Icon").attr('src', day2IconURL);
            $("#day2Temp").html("Temp: " + Math.floor(response.list[13].main.temp) + " °F");
            $("#day2Hum").html("Humidity: " + response.list[13].main.humidity + "%");

            $("#day3Date").html(response.list[21].dt_txt.slice(5,10));
            $("#day3Icon").html(response.list[21].weather.icon);
            $("#day3Icon").attr('src', day3IconURL);
            $("#day3Temp").html("Temp: " + Math.floor(response.list[21].main.temp) + " °F");
            $("#day3Hum").html("Humidity: " + response.list[21].main.humidity + "%");

            $("#day4Date").html(response.list[29].dt_txt.slice(5,10));
            $("#day4Icon").html(response.list[29].weather.icon);
            $("#day4Icon").attr('src', day4IconURL);
            $("#day4Temp").html("Temp: " + Math.floor(response.list[29].main.temp) + " °F");
            $("#day4Hum").html("Humidity: " + response.list[29].main.humidity + "%");

            $("#day5Date").html(response.list[37].dt_txt.slice(5,10));
            $("#day5Icon").html(response.list[37].weather.icon);
            $("#day5Icon").attr('src', day5IconURL);
            $("#day5Temp").html("Temp: " + Math.floor(response.list[37].main.temp) + " °F");
            $("#day5Hum").html("Humidity: " + response.list[37].main.humidity + "%");
            
            
        });
    });
};


if (localStorage.getItem("historyArray") === null) {
    localStorage.setItem("historyArray", historyArray);
    
} else {
    historyList = localStorage.getItem("historyArray");

    appendHistory();
}

function clearData() {
    $("#searchedCityInfo").empty();

    $("#temperature").empty();
        
    $("#humidity").empty();
        
    $("#windSpeed").empty();

    $("#uv").empty();
}


$("#cityInput").keyup(function(event){
    if(event.keyCode == 13){
        $("#button-addon2").click();
    }
});

$(".searchBtn").on("click", function() {
    clearData();   

    let hist = $("#cityInput").val();

    historyArray.push(hist);
    
    localStorage.setItem("historyArray", historyArray);
    
    historyList = localStorage.getItem("historyArray");
    
    appendHistory();
    
    getData();
})


$(document).on("click", ".histBtn", function () {
    clearData(); 

    let input = $(this).val();

    $.ajax({
        url: "http://api.openweathermap.org/data/2.5/weather?q=" + input + ",US&units=imperial&APPID=abcd9257d5733a460d1691720d4f7b99",
        method: "GET"
    }).then(function(response) {
        let iconCode = response.weather[0].icon;
        let iconURL = "http://openweathermap.org/img/w/" + iconCode + ".png";
        
        $('#wicon').attr('src', iconURL);
        
        $("#searchedCityInfo").html(response.name + " (" + currentDate + ")");

        $("#temperature").html("Temperature: " + Math.floor(response.main.temp) + " °F");
        
        $("#humidity").html("Humidity: " + response.main.humidity + "%");
        
        $("#windSpeed").html("Wind Speed: " + response.wind.speed + " MPH");
        
        let lat = response.coord.lat;
        
        let lon = response.coord.lon;

        let cityCode = response.id;
        
        
        $.ajax({
            url: "http://api.openweathermap.org/data/2.5/uvi?appid=abcd9257d5733a460d1691720d4f7b99&lat=" + lat + "&" + "lon=" + lon,
            method: "GET"
        }).then(function(response) {
            // console.log(response);
        
            let uvIndex = response.value;

            $("#uv").append(`UV Index: <span class="uvSpan"> ${uvIndex} </span>`);

            if (uvIndex < 3) {
                $(".uvSpan").addClass("favorable");
            } else if (uvIndex > 2 && uvIndex < 8) {
                $(".uvSpan").addClass("moderate");
            } else {
                $(".uvSpan").addClass("severe");
            }


        })

        $.ajax({
            url: "http://api.openweathermap.org/data/2.5/forecast?id=" + cityCode + "&units=imperial&appid=abcd9257d5733a460d1691720d4f7b99",
            method: "GET"
        }).then(function(response) {
         
        
            let day1IconCode = response.list[5].weather[0].icon;
            let day1IconURL = "http://openweathermap.org/img/w/" + day1IconCode + ".png";
            
            let day2IconCode = response.list[13].weather[0].icon;
            let day2IconURL = "http://openweathermap.org/img/w/" + day2IconCode + ".png";

            let day3IconCode = response.list[21].weather[0].icon;
            let day3IconURL = "http://openweathermap.org/img/w/" + day3IconCode + ".png";

            let day4IconCode = response.list[29].weather[0].icon;
            let day4IconURL = "http://openweathermap.org/img/w/" + day4IconCode + ".png";

            let day5IconCode = response.list[37].weather[0].icon;
            let day5IconURL = "http://openweathermap.org/img/w/" + day5IconCode + ".png";

            
            $("#day1Date").html(response.list[5].dt_txt.slice(5,10));
            $("#day1Icon").html(response.list[5].weather.icon);
            $("#day1Icon").attr('src', day1IconURL);
            $("#day1Temp").html("Temp: " + Math.floor(response.list[5].main.temp) + " °F");
            $("#day1Hum").html("Humidity: " + response.list[5].main.humidity + "%");
            
            $("#day2Date").html(response.list[13].dt_txt.slice(5,10));
            $("#day2Icon").html(response.list[13].weather.icon);
            $("#day2Icon").attr('src', day2IconURL);
            $("#day2Temp").html("Temp: " + Math.floor(response.list[13].main.temp) + " °F");
            $("#day2Hum").html("Humidity: " + response.list[13].main.humidity + "%");

            $("#day3Date").html(response.list[21].dt_txt.slice(5,10));
            $("#day3Icon").html(response.list[21].weather.icon);
            $("#day3Icon").attr('src', day3IconURL);
            $("#day3Temp").html("Temp: " + Math.floor(response.list[21].main.temp) + " °F");
            $("#day3Hum").html("Humidity: " + response.list[21].main.humidity + "%");

            $("#day4Date").html(response.list[29].dt_txt.slice(5,10));
            $("#day4Icon").html(response.list[29].weather.icon);
            $("#day4Icon").attr('src', day4IconURL);
            $("#day4Temp").html("Temp: " + Math.floor(response.list[29].main.temp) + " °F");
            $("#day4Hum").html("Humidity: " + response.list[29].main.humidity + "%");

            $("#day5Date").html(response.list[37].dt_txt.slice(5,10));
            $("#day5Icon").html(response.list[37].weather.icon);
            $("#day5Icon").attr('src', day5IconURL);
            $("#day5Temp").html("Temp: " + Math.floor(response.list[37].main.temp) + " °F");
            $("#day5Hum").html("Humidity: " + response.list[37].main.humidity + "%");
            
            
        });
    });
    
})



