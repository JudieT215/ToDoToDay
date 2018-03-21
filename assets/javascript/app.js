
jQuery(document).ready(function($) {
  $.ajax({
    url:
      "http://api.wunderground.com/api/2a101c3a4d1a6ce9/geolookup/conditions/q/IA/Cedar_Rapids.json",
    dataType: "jsonp",
    success: function(parsed_json) {
      var location = parsed_json["location"]["city"];
      var temp_f = parsed_json["current_observation"]["temp_f"];
      alert("Current temperature in " + location + " is: " + temp_f);
    }
  });
});