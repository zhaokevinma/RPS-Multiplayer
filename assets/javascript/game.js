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

// Main

// Player 1 and 2 login functionality
$("#play1SignInButton").on("click", function(){
    event.preventDefault();

    var name = $("#inlineFormInputName1").val().trim();

    database.ref("/players/player1/playerName/").push({
        name: name
    })
})

$("#play2SignInButton").on("click", function(){
    event.preventDefault();

    var name = $("#inlineFormInputName2").val().trim();

    database.ref("/players/player2/playerName/").push({
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

database.ref("/players/player1/playerName/").on("child_added", function(snapshot) {
    $(".playerOne").empty();
    $(".playerOne").html("<span>" + snapshot.val().name + "<button class='btn' id='play1LogOutButton'>Log out</button>" + "</span>");
})

database.ref("/players/player2/playerName/").on("child_added", function(snapshot) {
    $(".playerTwo").empty();
    $(".playerTwo").html("<span>" + snapshot.val().name + "<button class='btn' id='play2LogOutButton'>Log out</button>" + "</span>");
})

// Score in database

database.ref("/players/player1/Score/").set({
    Wins: 0,
    Losses: 0,
    Ties: 0
})

database.ref("/players/player1/Score/").set({
    Wins: 0,
    Losses: 0,
    Ties: 0
})

// Rock Paper Scissors comparison
var p1Choose;
var p2Choose;
var p1HasChosen = false;
var p2HasChosen = false;

var p1Wins = 0;
var p1Losses = 0;
var p1Ties = 0;

var p2Wins = 0;
var p2Losses = 0;
var p2Ties = 0;

$("#player1Wins").text(p1Wins);
$("#player1Losses").text(p1Losses);
$("#player1Ties").text(p1Ties);
$("#player2Wins").text(p2Wins);
$("#player2Losses").text(p2Losses);
$("#player2Ties").text(p2Ties);

var compare = function () {
    if (p1Choose == p2Choose) {
        p1Ties++;
        p2Ties++;
    } else if (p1Choose == 'rock') {
        if (p2Choose == 'paper') {
            p1Losses++;
            p2Wins++;
        } else if (p2Choose == 'scissors') {
            p1Wins++;
            p2Losses++;
        }
    } else if (p1Choose == 'paper') {
        if (p2Choose == 'rock') {
            p1Losses++;
            p2Wins++;
        } else if (p2Choose == 'scissors') 
        if (p2Choose == 'scissors') {
            p1Wins++;
            p2Losses++;
        }
    } else if (p1Choose == 'scissors') {
        if (p2Choose == 'rocks') {
            p1Losses++;
            p2Wins++;
        } else if (p2Choose == 'paper') {
            p1Wins++;
            p2Losses++;
        }
    }
}

$(".playerChoices1").on("click", function(){
    event.preventDefault();

    p1Choose = $(this).val();
    p1HasChosen = true;

    database.ref("/players/player1/").child("hand").set({
        p1Choose: p1Choose
    })

    $("#p1Col").empty();
    $("#p1Col").html("<img src='assets/images/questionMark.png' class='questionMark'>'");

    if (p1HasChosen && p2HasChosen) {
        compare();
        window.location.reload();
    }
})

$(".playerChoices2").on("click", function(){
    event.preventDefault();

    p2Choose = $(this).val();
    p2HasChosen = true;

    database.ref("/players/player2/").child("hand").set({
        p2Choose: p2Choose
    })

    $("#p2Col").empty();
    $("#p2Col").html("<img src='assets/images/questionMark.png' class='questionMark'>'");

    if (p1HasChosen && p2HasChosen) {
        compare();
        window.location.reload();
    }
})

database.ref("/players/player1/hand/").on("value", function(snapshot) {
    if (snapshot.exists()) {
        p1HasChosen = true;
    }
})

database.ref("/players/player2/hand/").on("value", function(snapshot) {
    if (snapshot.exists()) {
        p2HasChosen = true;
    }
})


