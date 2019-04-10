$("#submitButton").on("click", function(event) {
    
    event.preventDefault();
    var userInput = $("#city").val().trim();
    console.log(event);
    //GeoCode API
    var queryURL = "https://geocoder.api.here.com/6.2/geocode.json?app_id=kRgp6J6JfP2JWtkctlpU&app_code=CWwYEU_2q-DuRUcRwSc16Q&searchtext=" + userInput;
    console.log(queryURL)
    //AJAX GET
    $.ajax({
        url: queryURL,
        method: "GET"
      })

      .then(function(response){
        console.log(response);

        var lat = response.Response.View[0].Result[0].Location.DisplayPosition.Latitude
        var long = response.Response.View[0].Result[0].Location.DisplayPosition.Longitude
        console.log(lat);
        console.log(long);
       
       

                
    

  
    var mymap = L.map('mapid').setView([lat, long], 13);
 
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiamRob3VzZTI3IiwiYSI6ImNqdWFqNWsycjAzYWszeW5wdzZzbjdnYnQifQ.JfuL7pKOzZskrqctWDsrBA', {
                
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1IjoiamRob3VzZTI3IiwiYSI6ImNqdWFqNWsycjAzYWszeW5wdzZzbjdnYnQifQ.JfuL7pKOzZskrqctWDsrBA'
            
            }).addTo(mymap);
    })

});
