// Initialize Firebase
var config = {
  apiKey: "AIzaSyD6i9sXtbQF3nanM4Zfel4n1rvtX_DbQ-M",
  authDomain: "fuel-me-now.firebaseapp.com",
  databaseURL: "https://fuel-me-now.firebaseio.com",
  projectId: "fuel-me-now",
  storageBucket: "fuel-me-now.appspot.com",
  messagingSenderId: "523223148867"
    // apiKey: "AIzaSyD6i9sXtbQF3nanM4Zfel4n1rvtX_DbQ-M",
    // authDomain: "fuel-me-now.firebaseapp.com",
    // databaseURL: "https://fuel-me-now.firebaseio.com",
    // projectId: "fuel-me-now",
    // storageBucket: "fuel-me-now.appspot.com",
    // messagingSenderId: "523223148867"
};

firebase.initializeApp(config);

var database = firebase.database();

$('#myForm').validate({
  rules: {
      name: "required",
      email: {
          email: true,
          required: true
      },
      phone: {
          // phone: true,
          required: true,
      },
      city: {
          // city: true,
          required: true,
      },
      state: {
          // state: true,
          required: true,
      },
      zip: {
          // zip: true,
          required: true,
      },
      make: {
          // make: true,
          required: true,
      },
      model: {
          // model: true,
          required: true,
      },
      year: {
          // year: true,
          required: true,
      }
  },
  messages: {
      name: 'Please enter a name',
      email: {
          required: 'Please enter an email',
          email: 'Please enter a valild email'
      },
      phone: {
          required: 'please enter a phone number'
      },
      city: {
          required: 'please enter your city'
      },
      state: {
          required: 'please enter your state'
      },
      zip: {
          required: 'please enter your zip'
      },
      make: {
          required: 'please enter the make of your vehicle'
      },
      model: {
          required: 'please enter the model of your vehicle'
      },
      year: {
          required: 'please enter the year your vehicle was made'
      }
      
  },
  submitHandler: function () {
      var name = $("#name").val().trim();
      var email = $("#email").val().trim();
      var phone = $("#phoneNumber").val().trim();
      var address = $("#address").val().trim();
      var addressTwo = $("#address2").val().trim();
      var city = $("#city").val().trim();
      var state = $("#state").val().trim();
      var zip = $("#zip").val().trim();
      var make = $("#make").val().trim();
      var model = $("#model").val().trim();
      var year = $("#year").val().trim();
      var comments = $("#comments").val().trim();
      
      
      var newUser = {
          
          name: name,
          email: email,
          phone: phone,
          address: address,
          addressTwo: addressTwo,
          city: city,
          state: state,
          zip: zip,
          make: make,
          model: model,
          year: year,
          comments: comments
          
      };

      // database.ref().push(newUser);

      // $("#name").val("");
      // $("#email").val("");
      // $("#phoneNumber").val("");
      // $("#address").val("");
      // $("#address2").val("");
      // $("#city").val("");
      // $("#state").val("");
      // $("#zip").val("");
      // $("#make").val("");
      // $("#model").val("");
      // $("#year").val("");
      // $("#comments").val("");
      
      var fullAddress = newUser.address + ", " + newUser.city + ", " + newUser.state + " " + newUser.zip;
      
      var queryURL = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=gas&location=" + fullAddress + "&limit=3";
      
      $.ajax({
          url: queryURL,
          headers: { 'Authorization': 'Bearer YJEO2r4XR6bEMe3EtY7vocZwiK7bSo-k5Ai5E0ntorU0D0e3ux0xyq83F7iSg-7bbhTV6HsfGDxWN8O-5ep4TFIVJkYHC7sBtVPXr9LccXwlchupZXXT9yT7DvSrXHYx', 'X-Requested-With': queryURL },
          method: "GET",
      
        }).then(function(response) {
          // console.log(response.businesses);
            var results = response.businesses;
            console.log(results);
            console.log(fullAddress);
            // window.location = './results.html';
            
            // results Header
            var resultsHeader = $("<h1>").text("Select an option below to order service");
            resultsHeader.addClass("resultsHeader");
           $(".resultContainer").append(resultsHeader);
  
            for (var i = 0; i < results.length; i++) {
  
              //create result section
              var companyDiv = $("<div>");
              //companyDiv.id = ("results_" + i);
              companyDiv.attr("id", "results_" + i ).addClass("allResults");
              companyDiv.css({"border":"2px solid #d16d1d",
              "border-radius" : "2px",
              "margin-bottom" :"10px", "background-color" : "#FFF"});
  
              //create company name header
              var companyName = $("<h2>").text("Company Name: " + results[i].name);

              //create company Address header
              var companyStAddress = $("<h2>").text("Street Address: " + results[i].location.address1);
  
              // create rating header
              var companyRating = $("<h3>").text("Rating: " + results[i].rating);
  
              // create price range header
              var companyPriceRange = $("<h3>");
              
              //do not want undefined to show as not all gas stations have price ranges
              if(results[i].price === undefined){
                companyPriceRange.text("No Price Listed");
              }
              else{ 
                companyPriceRange.text("Price Range: " + results[i].price);
              }
  
              //create image
              var companyImage = $("<img>");
              companyImage.attr("src", results[i].image_url).addClass("resultImages").css({"height" : "200px",
              "width" : "200px"});
  
  
             // resultsHeader.prepend(companyDiv);
              companyDiv.append(companyName).append(companyStAddress).append(companyRating).append(companyPriceRange).append(companyImage);
      
              $(".resultContainer").append(companyDiv);
  
              //create address variables
              //FOR MAP
              var bizAddress1 = results[i].location.address1;
              var bizCity = results[i].location.city;
              var bizST = results[i].location.state;
              var bizZip = results[i].location.zip_code;
             console.log(bizAddress1);
  
              //CREATE MAP MARKER CODE
  
              
            }
            $("form").hide();
            $(".container-2").hide();
      
      })
      
      //});
      // database.ref().push(newUser);

      // $("#name").val("");
      // $("#email").val("");
      // $("#phoneNumber").val("");
      // $("#address").val("");
      // $("#address2").val("");
      // $("#city").val("");
      // $("#state").val("");
      // $("#zip").val("");
      // $("#make").val("");
      // $("#model").val("");
      // $("#year").val("");
      // $("#comments").val("");
  }


});

// get results clicked
$(document).on("click", ".allResults", function () {
  $(".resultsHeader").replaceWith( '<h1 id="resultsHead">Confirm Order</h1>');
 // $(".allResults").click(function(){
  console.log($(this).attr("id"));
  var userChoice = $(this).attr("id");
  console.log("choice" + userChoice);
  if (userChoice === "results_0"){
    $("#results_1").hide();
    $("#results_2").hide();
  }
  else if (userChoice === "results_1") {
    $("#results_0").hide();
    $("#results_2").hide();
  }
  else{
    $("#results_0").hide();
    $("#results_1").hide();
  }

  var confirmButton = $("<button>");
  confirmButton.attr("id", "confirmButton").addClass("btn btn-primary confirmationScreen").text("Confirm Order");

  var cancelButton = $("<button>");
  cancelButton.attr("id", "cancelButton").addClass("btn btn-primary confirmationScreen").text("Cancel Order");
    // rules: {
    //     name: "required",
    //     email: {
    //         email: true,
    //         required: true
    //     },
    //     phone: {
    //         // phone: true,
    //         required: true,
    //     },
    //     city: {
    //         // city: true,
    //         required: true,
    //     },
    //     state: {
    //         // state: true,
    //         required: true,
    //     },
    //     zip: {
    //         // zip: true,
    //         required: true,
    //     },
    //     make: {
    //         // make: true,
    //         required: true,
    //     },
    //     model: {
    //         // model: true,
    //         required: true,
    //     },
    //     year: {
    //         // year: true,
    //         required: true,
    //     }
    // },
    // messages: {
    //     name: 'Please enter a name',
    //     email: {
    //         required: 'Please enter an email',
    //         email: 'Please enter a valild email'
    //     },
    //     phone: {
    //         required: 'please enter a phone number'
    //     },
    //     city: {
    //         required: 'please enter your city'
    //     },
    //     state: {
    //         required: 'please enter your state'
    //     },
    //     zip: {
    //         required: 'please enter your zip'
    //     },
    //     make: {
    //         required: 'please enter the make of your vehicle'
    //     },
    //     model: {
    //         required: 'please enter the model of your vehicle'
    //     },
    //     year: {
    //         required: 'please enter the year your vehicle was made'
    //     }
        
    // },
    // submitHandler: function () {
    //     var name = $("#name").val().trim();
    //     var email = $("#email").val().trim();
    //     var phone = $("#phoneNumber").val().trim();
    //     var address = $("#address").val().trim();
    //     var addressTwo = $("#address2").val().trim();
    //     var city = $("#city").val().trim();
    //     var state = $("#state").val().trim();
    //     var zip = $("#zip").val().trim();
    //     var make = $("#make").val().trim();
    //     var model = $("#model").val().trim();
    //     var year = $("#year").val().trim();
    //     var comments = $("#comments").val().trim();
        
        
    //     var newUser = {
            
    //         name: name,
    //         email: email,
    //         phone: phone,
    //         address: address,
    //         addressTwo: addressTwo,
    //         city: city,
    //         state: state,
    //         zip: zip,
    //         make: make,
    //         model: model,
    //         year: year,
    //         comments: comments
            
    //     };

    //     // database.ref().push(newUser);

    //     // $("#name").val("");
    //     // $("#email").val("");
    //     // $("#phoneNumber").val("");
    //     // $("#address").val("");
    //     // $("#address2").val("");
    //     // $("#city").val("");
    //     // $("#state").val("");
    //     // $("#zip").val("");
    //     // $("#make").val("");
    //     // $("#model").val("");
    //     // $("#year").val("");
    //     // $("#comments").val("");
        
    //     var fullAddress = newUser.address + ", " + newUser.city + ", " + "MO" + " " + newUser.zip;
        
    //     var queryURL = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=gas&location=" + fullAddress + "&limit=3";
        
    //     $.ajax({
    //         url: queryURL,
    //         headers: { 'Authorization': 'Bearer YJEO2r4XR6bEMe3EtY7vocZwiK7bSo-k5Ai5E0ntorU0D0e3ux0xyq83F7iSg-7bbhTV6HsfGDxWN8O-5ep4TFIVJkYHC7sBtVPXr9LccXwlchupZXXT9yT7DvSrXHYx', 'X-Requested-With': queryURL },
    //         method: "GET",
        
    //     }).then(function (response) {
    //         // console.log(response.businesses);
    //         var results = response.businesses;
    //         console.log(results);
    //         console.log(fullAddress);
    //         // window.location = './results.html';
        
    //         // results Header
    //         var resultsHeader = $("<h1>").text("Select an option below to order service");
    //         resultsHeader.addClass("resultsHeader");
    //         $(".resultContainer").append(resultsHeader);
        
    //         for (var i = 0; i < results.length; i++) {
        
    //             //create result section
    //             var companyDiv = $("<div>");
    //             companyDiv.addClass("results_" + i).css({
    //                 "border": "2px solid #d16d1d",
    //                 "border-radius": "2px",
    //                 "margin-bottom": "10px", "background-color": "#FFF"
    //             });
        
    //             //create company name header
    //             var companyName = $("<h2>").text("Company Name: " + results[i].name);
        
    //             // create rating header
    //             var companyRating = $("<h3>").text("Rating: " + results[i].rating);
        
    //             // create price range header
    //             var companyPriceRange = $("<h3>");
        
    //             //do not want undefined to show as not all gas stations have price ranges
    //             if (results[i].price === undefined) {
    //                 companyPriceRange.text("No Price Listed");
    //             }
    //             else {
    //                 companyPriceRange.text("Price Range: " + results[i].price);
    //             }
        
    //             //create image
    //             var companyImage = $("<img>");
    //             companyImage.attr("src", results[i].image_url).addClass("resultImages").css({
    //                 "height": "200px",
    //                 "width": "200px"
    //             });
        
        
    //             // resultsHeader.prepend(companyDiv);
    //             companyDiv.append(companyName).append(companyRating).append(companyPriceRange).append(companyImage);
        
    //             $(".resultContainer").append(companyDiv);
        
    //         }
    //         $("form").hide();
        
    //     })
        
    //     //});
    //     // database.ref().push(newUser);

    //     // $("#name").val("");
    //     // $("#email").val("");
    //     // $("#phoneNumber").val("");
    //     // $("#address").val("");
    //     // $("#address2").val("");
    //     // $("#city").val("");
    //     // $("#state").val("");
    //     // $("#zip").val("");
    //     // $("#make").val("");
    //     // $("#model").val("");
    //     // $("#year").val("");
    //     // $("#comments").val("");
    // }


  $(".resultContainer").append(confirmButton).append(cancelButton);

});

$(document).on("click", ".confirmationScreen", function () {
  var confirmedY_N = $(this).attr("id");
  if(confirmedY_N === "confirmButton"){
    $(".confirmationScreen").hide();
    $("#resultsHead").text('Thank You for your order! We\'re on the way to FUEL YOU NOW!');
  }
  else{
    $(".confirmationScreen").hide();
    $(".resultContainer").empty();
    window.location.reload();
    // var cancelHeader = $("<div>");
    // cancelHeader.attr("id", "canceledOrderHeader").text('Sorry, Maybe Next Time!');
    // $(".confirmContainer").append(cancelHeader);
  }
});
// database.ref().on("child_added", function (childSnapshot) {
//     console.log(childSnapshot.val());

//     var name = childSnapshot.val().name;
//     var email = childSnapshot.val().email;
//     var phone = childSnapshot.val().phone;
//     var address = childSnapshot.val().address;
//     var addressTwo = childSnapshot.val().addressTwo;
//     var city = childSnapshot.val().city;
//     var state = childSnapshot.val().state;
//     var zip = childSnapshot.val().zip;
//     var make = childSnapshot.val().make;
//     var model = childSnapshot.val().model;
//     var year = childSnapshot.val().year;
//     var comments = childSnapshot.val().comments;




// database.ref().on("child_added", function (childSnapshot) {
//     console.log(childSnapshot.val());

//     var name = childSnapshot.val().name;
//     var email = childSnapshot.val().email;
//     var phone = childSnapshot.val().phone;
//     var address = childSnapshot.val().address;
//     var addressTwo = childSnapshot.val().addressTwo;
//     var city = childSnapshot.val().city;
//     var state = childSnapshot.val().state;
//     var zip = childSnapshot.val().zip;
//     var make = childSnapshot.val().make;
//     var model = childSnapshot.val().model;
//     var year = childSnapshot.val().year;
//     var comments = childSnapshot.val().comments;

    // console.log(name);
    // console.log(email);
    // console.log(phone);
    // console.log(address);
    // console.log(addressTwo);
    // console.log(city);
    // console.log(state);
    // console.log(zip);
    // console.log(make);
    // console.log(model);
    // console.log(year);
    // console.log(comments);
// });
