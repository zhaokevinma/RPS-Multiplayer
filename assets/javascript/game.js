// Firebase config and initialization
var firebaseConfig = {
apiKey: "AIzaSyDyuqD3d8bpYoX8g9TqkZ9G3_XZmY6kDVs",
authDomain: "rps-multiplayer-302af.firebaseapp.com",
databaseURL: "https://rps-multiplayer-302af.firebaseio.com",
projectId: "rps-multiplayer-302af",
storageBucket: "",
messagingSenderId: "143158181419",
appId: "1:143158181419:web:22362ea90dda5239"
};

firebase.initializeApp(firebaseConfig);

var database = firebase.database();

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

database.ref("/players/player1/playerName/").on("child_added", function(snapshot) {
    $(".playerOne").empty();
    $(".playerOne").html("<span>" + snapshot.val().name + "<button class='btn' id='play1LogOutButton'>Log out</button>" + "</span>");
})

database.ref("/players/player2/playerName/").on("child_added", function(snapshot) {
    $(".playerTwo").empty();
    $(".playerTwo").html("<span>" + snapshot.val().name + "<button class='btn' id='play2LogOutButton'>Log out</button>" + "</span>");
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

// Game
// database.ref("/players/player1/playerScore/").on("value", function(snapshot) {
//     var p1Wins = snapshot.val().Wins;
//     var p1Losses = snapshot.val().Losses;
//     var p1Ties = snapshot.val().Ties;

//     $("#player1Wins").text(p1Wins);
//     $("#player1Losses").text(p1Losses);
//     $("#player1Ties").text(p1Ties);
// })

// database.ref("/players/player2/playerScore/").on("value", function(snapshot) {
//     var p2Wins = snapshot.val().Wins;
//     var p2Losses = snapshot.val().Losses;
//     var p2Ties = snapshot.val().Ties;

//     $("#player2Wins").text(p2Wins);
//     $("#player2Losses").text(p2Losses);
//     $("#player2Ties").text(p2Ties);
// })

var p1HasChosen = false;
var p2HasChosen = false;

$(".playerChoices1").on("click", function(){
    event.preventDefault();

    var p1Choose = $(this).val();

    database.ref("/players/player1/playerhand/").push({
        p1Choose: p1Choose
    })

    p1HasChosen = true;
})

$(".playerChoices2").on("click", function(){
    event.preventDefault();

    var p2Choose = $(this).val();

    database.ref("/players/player2/playerhand/").push({
        p2Choose: p2Choose
    })

    p2HasChosen = true;
})

database.ref("/players/player1/playerhand/").on("child_added", function() {
    $("#p1Col").empty();
    $("#p1Col").html("<img src='assets/images/questionMark.png' class='questionMark'>")
})

database.ref("/players/player2/playerhand/").on("child_added", function() {
    $("#p2Col").empty();
    $("#p2Col").html("<img src='assets/images/questionMark.png' class='questionMark'>")
})

var tie = false;
var p1Win = false;
var p2Win = false;

var compare = function () {
    var p1Choose;
    var p2Choose;

    var ref1 = database.ref("/players/player1/playerhand/");
    var ref2 = database.ref("/players/player2/playerhand/")

    ref1.on("value", function (snapshot) {
        p1Choose = snapshot.val().p1Choose;
    })
    ref2.on("value", function (snapshot) {
        p2Choose = snapshot.val().p2Choose;
    })

    if (p1Choose == p2Choose) {
        tie = true;
    } else if (p1Choose == 'rock') {
        if (p2Choose == 'paper') {
            p2Win = true;
        } else if (p2Choose == 'scissors') {
            p1Win = true;
        }
    } else if (p1Choose == 'paper') {
        if (p2Choose == 'rock') {
            p1Win = true
        } else if (p2Choose == 'scissors') {
            p2Win = true;
        }
    } else if (p1Choose == 'scissors') {
        if (p2Choose == 'rocks') {
            p2Win = true;
        } else if (p2Choose == 'paper') {
            p1Win = true;
        }
    }
}

// Chat
$("#inlineFormTextSubmit").on("click", function() {
    event.preventDefault();
    var message = $("#inlineFormTextArea").val().trim();
    var time = moment().format("DD/MM/YY hh:mm A")
    var messageLine = "<p>Anonymous said: " + message + " on " + time + "</p>";
    $(".chatWall").append(messageLine);
})




