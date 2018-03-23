


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
    var apiKeyG = "AIzaSyBvUORzXVi9vPlOAOl3N4kmruWeQ52VZk0";
    var placeLoc = "-33.8670522,151.1957362";
    var placeType = ""; // Optional for now
    var api_url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?radius=500&location=" + placeLoc + "&type=" + placeType + "&key=" + apiKeyG;
    var cors_anywhere_url = 'https://cors-anywhere.herokuapp.com/';
    var request_url = cors_anywhere_url + api_url;
    $.ajax({
        url: request_url,
        context: document.body
    })
        // This doesn't seem to work
        // .error(function(error) {
        //     console.log('error!');
        //     console.log(error);
        // })
        .done(function(data) {
            console.log(data.results);
        });

    // This part doesn't work because of CORS
    // var apiKey = "AIzaSyBvUORzXVi9vPlOAOl3N4kmruWeQ52VZk0";
    // $.ajax({
    //     url: "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=500&type=restaurant&key=" + apiKey,
    //     method: "GET"
    // }).then(function(response) {
    //     console.log(response);
    // });

    // Capture user input
    function getInput() {
        city = $("#City-Name").val().trim();
        state = $("#State").val().trim();
        console.log("CITY: " + city + ", STATE: " + state); 
    }
    
    // Submit button to add new City/State
    $("#submit-button").on("click", function(event) {
        event.preventDefault();
        getInput();
    });

    // On load, set focus on City input box
    $("#City-Name").focus();

});

