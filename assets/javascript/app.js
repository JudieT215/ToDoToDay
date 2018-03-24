jQuery(document).ready(function($) {
  //global var
  var stateList = [
    "AK",
    "AL",
    "AR",
    "AZ",
    "CA",
    "CO",
    "CT",
    "DC",
    "DE",
    "FL",
    "GA",
    "GU",
    "HI",
    "IA",
    "ID",
    "IL",
    "IN",
    "KS",
    "KY",
    "LA",
    "MA",
    "MD",
    "ME",
    "MH",
    "MI",
    "MN",
    "MO",
    "MS",
    "MT",
    "NC",
    "ND",
    "NE",
    "NH",
    "NJ",
    "NM",
    "NV",
    "NY",
    "OH",
    "OK",
    "OR",
    "PA",
    "PR",
    "PW",
    "RI",
    "SC",
    "SD",
    "TN",
    "TX",
    "UT",
    "VA",
    "VI",
    "VT",
    "WA",
    "WI",
    "WV",
    "WY"
  ];
  var apiKeyG = "AIzaSyBvUORzXVi9vPlOAOl3N4kmruWeQ52VZk0";
  var address = "1650+Market+Street";
  // var placeLoc = "-33.8670522,151.1957362"; // Dummy placeholder
  var placeLoc = "";
  var placeType = ""; // Optional for now

  //This is our API Key
  var APIKeyW = "2a101c3a4d1a6ce9";
  var state = "PA";
  var city = "Philadelphia";
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
    success: function(parsed_json) {
      console.log(parsed_json);
      console.log(parsed_json.current_observation.temperature_string);
      var location = parsed_json["location"]["city"];
      var temp_f = parsed_json["current_observation"]["temp_f"];
      var currTemp = parsed_json["current_observation"]["temperature_string"];
      console.log("Current temperature in " + location + " is: " + temp_f);
    }
  });

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
      "https://maps.googleapis.com/maps/api/place/nearbysearch/json?radius=500&location=" +
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
  }
  //Validating Function
    function validate() {
      if (document.formName.city.value == "") {
        $("#noCity").text("Please provide a City!");
        document.formName.city.focus();
        return false;
      }

    //   if (document.formName.state.value == "") {
    //     $("#noState").html("Please provide a State!");
    //     document.formName.state.focus();
    //     return false;
    //   }

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

  searchResults.text("test of display")

  $("#results-card").prepend(searchResults);

  }


  // Submit button to add new City/State and run queries
  $("#submit-button").on("click", function(event) {
    event.preventDefault();
    getInput();
    geoCode();
    gPlace();
    validate();
    displayResults();
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
}); // NO JAVASCRIPT BELOW THIS LINE
