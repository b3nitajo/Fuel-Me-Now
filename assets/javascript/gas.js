var username = "";
var userEmail = "";
var addr1 = "14408 St Andrews Dr";
var addr2 = "";
var city = "Grandview";
var ST = "MO";
var zip = "64030";

//YELP API INFO
// Client ID
// _Ab0Mz00pqhCEi0ufqGDCg

// API Key
var authorizationToken = "YJEO2r4XR6bEMe3EtY7vocZwiK7bSo-k5Ai5E0ntorU0D0e3ux0xyq83F7iSg-7bbhTV6HsfGDxWN8O-5ep4TFIVJkYHC7sBtVPXr9LccXwlchupZXXT9yT7DvSrXHYx";

 // This .on("click") function will trigger the AJAX Call
 $("#submitButton").on("click", function(event) {

    // Preventing the submit button from trying to submit the form
    // We're optionally using a form so the user may hit Enter to search instead of clicking the button
    event.preventDefault();

    // Here we grab the text from the input box
    var address = $("#address").val().trim();
    var city = $("#city").val().trim();
    var st = $("#state").val().trim();
    var zip = $("#zip").val().trim();

    var fullAddress = address + ", " + city + ", " + "MO" + " " + zip;

    // Here we construct our URL
    var queryURL = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=gas&location=" + fullAddress;



  $.ajax({
    url: queryURL,
    headers:{'Authorization':'Bearer YJEO2r4XR6bEMe3EtY7vocZwiK7bSo-k5Ai5E0ntorU0D0e3ux0xyq83F7iSg-7bbhTV6HsfGDxWN8O-5ep4TFIVJkYHC7sBtVPXr9LccXwlchupZXXT9yT7DvSrXHYx', 'X-Requested-With': queryURL},
    method: "GET",
    
    }).then(function(response) {
        console.log(response.businesses);
         var results = response;
        console.log(results);
    })
});
