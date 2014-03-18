/**
 * Created by safrankov on 17.03.14.
 */

jQuery(document).ready(function ($) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;
            console.log(latitude + ' ' + longitude);

            function getWeather(){
                var weatherUrl = "http://api.wunderground.com/api/29c251a00f892e4b/conditions/lang:RU/q/" + latitude + "," + longitude + ".json";
                console.log(weatherUrl);
                $.ajax({
                    url: weatherUrl,
                    dataType: "jsonp",
                    success: function (parsed_json) {
                        var location = parsed_json['current_observation']['display_location']['city'];
                        var temp_c = parsed_json['current_observation']['temp_c'];
                        $('.result').html("В " + location + " сейчас: <span class='weather-number'>" + temp_c + " °С</span>");
                    }
                });
            }

            var result = getWeather();

            $('h1').html(result);

        }, function(){
            console.log("Вы запретили доступ к GPS");
        });

    } else {
        console.log("Ваш браузер сраное говно");
    }
});