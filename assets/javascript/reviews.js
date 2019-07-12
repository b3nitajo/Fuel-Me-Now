// Initialize Firebase (ADD YOUR OWN DATA)
var config = {
    apiKey: "",
    authDomain: "fuel-me-now-accd9.firebaseapp.com",
    databaseURL: "https://fuel-me-now-accd9.firebaseio.com",
    projectId: "fuel-me-now-accd9",
    storageBucket: "fuel-me-now-accd9.appspot.com",
    messagingSenderId: "757765176964"
};
firebase.initializeApp(config);

// Reference messages collection
var messagesRef = firebase.database().ref('messages');

// Listen for form submit
document.getElementById('contactForm').addEventListener('submit', submitForm);

// Submit form
function submitForm(e) {
    e.preventDefault();

    // Get values
    var name = getInputVal('name');
    var rec = getInputVal('rec');
    var email = getInputVal('email');
    var message = getInputVal('message');

    // Save message
    saveMessage(name, rec, email, message);

    // Show alert
    document.querySelector('.alert').style.display = 'block';

    // Hide alert after 3 seconds
    setTimeout(function () {
        document.querySelector('.alert').style.display = 'none';
    }, 3000);

    // Clear form
    document.getElementById('contactForm').reset();
}

// Function to get get form values
function getInputVal(id) {
    return document.getElementById(id).value;
}

// Save message to firebase
function saveMessage(name, rec, email, message) {
    var newMessageRef = messagesRef.push();
    newMessageRef.set({
        name: name,
        rec: rec,
        email: email,
        message: message
    });
}
// Create a variable to reference the database
var database = firebase.database();

var name = "";
var rec = "";
var message = "";


// Capture Button Click
$("#submit").on("click", function (event) {
    // Don't refresh the page!
    event.preventDefault();



    // Code in the logic for storing and retrieving the most recent user.
    name = $("name").val().trim();
    rec = $("rec").val().trim();
    email = $("email").val().trim();
    message = $("message").val().trim();

    database.ref().set({
        name: name,
        rec: rec,
        email: email,
        message: message
    });


});


// Firebase watcher + initial loader HINT: .on("value")
database.ref().on("value", function (snapshot) {

 

    var messages = snapshot.val().messages;
    for (var key in messages) {
        console.log('message');
        console.log(messages[key]);
        var message = messages[key];
        console.log(message.email)
        var card = $("<div>")
        card.addClass("card")
        var cardbody = $("<div>")
        var h2 = $("<h2>")
        h2.text(message.name);
         cardbody.append(h2)
        cardbody.addClass("card-body")
        //cardbody.append("<div>"+message.email +"</div>")
        cardbody.append("<div>"+message.rec +"</div>")
        cardbody.append("<div>"+message.message +"</div>")
       
         card.append(cardbody)
         $("#reviews").append(card)
         
console.log(h2)
    }



    //$("#name-display").text(snapshot.val().name);
    //$("#rec-display").text(snapshot.val().rec);
  //  $("#message-display").text(snapshot.val().message);

    // Create Error Handling
}, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
});
