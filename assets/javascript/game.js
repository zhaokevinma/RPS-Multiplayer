// Your web app's Firebase configuration
var firebaseConfig = {
apiKey: "AIzaSyDyuqD3d8bpYoX8g9TqkZ9G3_XZmY6kDVs",
authDomain: "rps-multiplayer-302af.firebaseapp.com",
databaseURL: "https://rps-multiplayer-302af.firebaseio.com",
projectId: "rps-multiplayer-302af",
storageBucket: "",
messagingSenderId: "143158181419",
appId: "1:143158181419:web:22362ea90dda5239"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Define database
var database = firebase.database();

// // Test counter
// var clickCounter = 0;

// // Main
// $("#play1SignInButton").on("click", function() {
//     event.preventDefault();
//     clickCounter++;
//     database.ref().set({
//         clickCounter: clickCounter
//     })
// })

// Main

// Player 1 and 2 login functionality
$("#play1SignInButton").on("click", function(){
    event.preventDefault();

    var name = $("#inlineFormInputName1").val().trim();

    database.ref("/players/player1/").push({
        name: name
    })
})

$("#play2SignInButton").on("click", function(){
    event.preventDefault();

    var name = $("#inlineFormInputName2").val().trim();

    database.ref("/players/player2/").push({
        name: name
    })
})

$(document).on("click", "#play1LogOutButton", function(){
    event.preventDefault();
    database.ref("/players/").child("player1").remove();
    window.location.reload();
})

$(document).on("click", "#play2LogOutButton", function(){
    event.preventDefault();
    database.ref("/players/").child("player2").remove();
    window.location.reload();
})


// Listen to database to monitor player connection to change UI login availability

database.ref("/players/player1/").on("child_added", function(snapshot) {
    $(".playerOne").empty();
    $(".playerOne").html("<span>" + snapshot.val().name + "<button class='btn' id='play1LogOutButton'>Log out</button>" + "</span>");
})

database.ref("/players/player2/").on("child_added", function(snapshot) {
    $(".playerTwo").empty();
    $(".playerTwo").html("<span>" + snapshot.val().name + "<button class='btn' id='play2LogOutButton'>Log out</button>" + "</span>");
})