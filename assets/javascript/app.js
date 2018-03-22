


jQuery(document).ready(function($) {
 
  //This is our API Key
  var APIKeyW = "2a101c3a4d1a6ce9"
 var state = "NJ";
  var city = "Camden";
  //Here we are building the URL we need to query the database
  var queryURL = "http://api.wunderground.com/api/" + APIKeyW + "/geolookup/conditions/q/" +state+ "/" +city+ ".json";
console.log(queryURL);
  // Here we run our AJAX call to the WeatherUndergound API

  
  console.log(state);

  $.ajax({

    url: queryURL,
    method: "GET",
    dataType: "jsonp",
    success: function(parsed_json) {
      var location = parsed_json["location"]["city"];
      var temp_f = parsed_json["current_observation"]["temp_f"];
      alert("Current temperature in " + location + " is: " + temp_f);
    }
  });
  // console.log(response);



// if "current_observation" = "sunny"




    // Google Places code
    var apiKey = "AIzaSyBvUORzXVi9vPlOAOl3N4kmruWeQ52VZk0";
    $.ajax({
        url: "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=500&type=restaurant&key=" + apiKey,
        method: "GET"
    }).then(function(response) {
        console.log(response);
    });

});

