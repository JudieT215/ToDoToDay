jQuery(document).ready(function($) {
    

  //global var
  var stateList = ["AK", "ak", "AL", "al", "AR", "ar", "AZ", "az", "CA", "ca", "CO", "co", "CT", "ct", "DC", "dc", "DE", "de", "FL", "fl", "GA", "ga", "GU", "gu", "HI", "hi", "IA", "ia", "ID", "id", "IL", "il", "IN", "in", "KS", "ks", "KY", "ku", "LA", "la", "MA", "ma", "MD", "md", "ME", "MH", "mh", "MI", "mi", "MN", "mn", "MO", "mo", "MS", "ms", "MT", "mt", "NC", "nc", "ND", "nd", "NE", "ne", "NH", "nh", "NJ", "nj", "NM", "nm", "NV", "nv", "NY", "ny", "OH", "oh", "OK", "ok", "OR", "or", "PA", "pa", "PR", "pr", "PW", "pw", "RI", "ri", "SC", "sc", "SD", "sd", "TN", "tn", "TX", "tx", "UT", "ut", "VA", "va", "VI", "vi", "VT", "vt", "WA", "wa", "WI", "wi", "WV", "wv", "WY", "wy"];
  var apiKeyG = "AIzaSyBvUORzXVi9vPlOAOl3N4kmruWeQ52VZk0";
  var address = "";
  // var placeLoc = "-33.8670522,151.1957362"; // Dummy placeholder
  var placeLoc = "";
  var placeType = "restaurant"; // Optional for now
  var arrayOfPlaces = [];

  //This is our API Key
  var APIKeyW = "2a101c3a4d1a6ce9";
  var state = "PA";
  var city = "Philadelphia";
  
  function getWeather() {
    //Here we are building the URL we need to query the database
    var queryURL =
      "https://api.wunderground.com/api/" +
      APIKeyW +
      "/geolookup/conditions/q/" +
      state +
      "/" +
      city +
      ".json";
    console.log(queryURL);
    // Here we run our AJAX call to the WeatherUndergound API

    console.log(state);


    $.ajax({
      url: queryURL,
      method: "GET",
      dataType: "jsonp",
      success: function (parsed_json) {
        console.log(parsed_json);
        console.log(parsed_json.current_observation.temperature_string);
        var location = parsed_json["location"]["city"];
        var temp_f = parsed_json["current_observation"]["temp_f"];
        var currTemp = parsed_json["current_observation"]["temperature_string"];
        console.log("Current temperature in " + location + " is: " + temp_f);
        $("#currentTemp").text(currTemp);
        var conditionPic = parsed_json["current_observation"]["icon_url"];
        console.log("Condition Picture" + conditionPic);
        $("#picture").html("<img src = " + conditionPic + ">");
        {/* $('#theDiv').prepend('<img id="theImg" src="theImg.png" />') */ }
        var weather = parsed_json["current_observation"]["weather"];      
        console.log("Weather" + weather);
        $("#Temp").text(weather);
        placeLoc = parsed_json["location"]["lat"]+","+parsed_json["location"]["lon"];
        console.log (placeLoc);
    }
  })
  }

  // console.log(response);




  // Google Maps Geocode API request
  function geoCode() {
    var api_url =
      "https://maps.googleapis.com/maps/api/geocode/json?address=" +
      address +
      "," +
      city +
      "," +
      state +
      "&key=" +
      apiKeyG;
    var cors_anywhere_url = "https://cors-anywhere.herokuapp.com/";
    var request_url = cors_anywhere_url + api_url;
    $.ajax({
      url: request_url,
      context: document.body
    }).then(function(data) {
      console.log(request_url);
      console.log(data.results);
      placeLoc =
        data.results[0].geometry.location.lat +
        "," +
        data.results[0].geometry.location.lng;
      console.log("PLACE COORD: " + placeLoc);
      gPlace();
    });
  }

  // Google Places API request
  function gPlace() {
    var api_url =
      "https://maps.googleapis.com/maps/api/place/nearbysearch/json?radius=50000&location=" +
      placeLoc +
      "&type=" +
      placeType +
      "&key=" +
      apiKeyG;
    var cors_anywhere_url = "https://cors-anywhere.herokuapp.com/";
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
        console.log(request_url);
        console.log(data.results);
        arrayOfPlaces = [];
        for (i = 0; i < 5; i++) {
          arrayOfPlaces.push(data.results[i].name);
          console.log(arrayOfPlaces);
        }
      });
  }

  //Validating Function
    function validate() {
      if (document.formName.city.value == "") {
        $("#noCity").text("*Please provide a City!");
        document.formName.city.focus();
        return false;
      }

    //   if (document.formName.state.value == "") {
    //     $("#noState").html("Please provide a State!");
    //     document.formName.state.focus();
    //     return false;
    //   }

    }
 function stateValidate() {
   if (stateList.indexOf(state) > -1) {
     console.log("State is in the array");
   } else {
     $("content").append("<br>", " *This is not a state, please enter in this format (NJ)");
     console.log("State NOT in array");
   }
 }

  // Capture user input
  function getInput() {
    city = $("#City-Name")
      .val()
      .trim();
    state = $("#State")
      .val();
    console.log("CITY: " + city + ", STATE: " + state);
  }

  // creating function to display API search results to HTML
  function displayResults() {
    var searchResults = $("<div>");
    for (i = 0; i < arrayOfPlaces.length; i++) {

      var searchItem = $("<p>");
      searchItem.text(arrayOfPlaces[i]);
      searchResults.prepend(searchItem);

      $("#Things-card").prepend(searchResults);
    }
  }


  // Submit button to add new City/State and run queries
  $("#submit-button").on("click", function(event) {
    event.preventDefault();
    getInput();
    validate();
    stateValidate();
    getWeather();
    // geoCode();
    setTimeout(gPlace, 1000); // Wait for Weather Underground to be done
    setTimeout(displayResults, 2000); // Wait for gPlaces to be done

  });

  // On load, set focus on City input box
  $("#City-Name").focus();

  // Initializing Firebase

  var config = {
    apiKey: "AIzaSyBCbkDNIF7u4qh46J23Cx8uy1fXUkM_gAM",
    authDomain: "todotoday-c8a4f.firebaseapp.com",
    databaseURL: "https://todotoday-c8a4f.firebaseio.com",
    projectId: "todotoday-c8a4f",
    storageBucket: "",
    messagingSenderId: "33820231165"
  };

  firebase.initializeApp(config);

  var database = firebase.database();
  
    function dropdownNav() {
      $(".dropdown-trigger").dropdown();

  }
  dropdownNav();
}); // NO JAVASCRIPT BELOW THIS LINE
