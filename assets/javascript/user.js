// Initialize Firebase
var config = {
    apiKey: "AIzaSyD6i9sXtbQF3nanM4Zfel4n1rvtX_DbQ-M",
    authDomain: "fuel-me-now.firebaseapp.com",
    databaseURL: "https://fuel-me-now.firebaseio.com",
    projectId: "fuel-me-now",
    storageBucket: "fuel-me-now.appspot.com",
    messagingSenderId: "523223148867"
  };
  
  firebase.initializeApp(config);
  
  var database = firebase.database();
  
  $('#myForm').validate({
    rules: {
      name: "required",
      email: {
        email: true,
        required: true
      }
    },
    messages: {
      name: 'Please enter a name',
      email: {
        required: 'Please enter an email',
        email: 'Please enter a valild email'
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
  
    }
  });
  
  database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());
  
    var name = childSnapshot.val().name;
    var email = childSnapshot.val().email;
    var phone = childSnapshot.val().phone;
    var address = childSnapshot.val().address;
    var addressTwo = childSnapshot.val().addressTwo;
    var city = childSnapshot.val().city;
    var state = childSnapshot.val().state;
    var zip = childSnapshot.val().zip;
    var make = childSnapshot.val().make;
    var model = childSnapshot.val().model;
    var year = childSnapshot.val().year;
    var comments = childSnapshot.val().comments;
  
    console.log(name);
    console.log(email);
    console.log(phone);
    console.log(address);
    console.log(addressTwo);
    console.log(city);
    console.log(state);
    console.log(zip);
    console.log(make);
    console.log(model);
    console.log(year);
    console.log(comments);
  });
