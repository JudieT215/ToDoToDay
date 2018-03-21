


jQuery(document).ready(function($) {
  $.ajax({
  url : "http://api.wunderground.com/api/2a101c3a4d1a6ce9/geolookup/conditions/q/ " + state + " IA/Cedar_Rapids.json",
  dataType : "jsonp",
  success : function(parsed_json) {
  var location = parsed_json['location']['city'];
  var temp_f = parsed_json['current_observation']['temp_f'];
  alert("Current temperature in " + location + " is: " + temp_f);
  }
  });
});

var url;
var state;
state = "NJ";
console.log (url);




    // Google Places code
    var apiKey = "AIzaSyBvUORzXVi9vPlOAOl3N4kmruWeQ52VZk0";
    $.ajax({
        url: "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=500&type=restaurant&key=" + apiKey,
        method: "GET"
    }).then(function(response) {
        console.log(response);
    });

});

