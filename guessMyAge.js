document.getElementById('restart').style.display = 'none';
document.getElementById('msg').style.display = 'none';
var inputText = document.getElementById("inputText");
inputText.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("submitGuess").click();
    }
});
var maxAge = 100;
var trueAge = Math.floor((Math.random() * maxAge) + 1);
count = 0;

function check() {
    document.getElementById('msg').style.display = 'block';
    var msg = document.getElementById("msg");
    guessedAge = Number(inputText.value);
    // check the correctness of the input. It has to be a number between 1 and 100
    if (isNaN(guessedAge)) {
        msg.innerHTML = "That's a wrong input! Please enter a number between 1 and 100.";
        inputText.select();
    } else {
        count += 1;
        if (guessedAge > trueAge) {
            msg.innerHTML = `Guess ${count}... <span style="color: red">Wrong!</span><br><br>I am not that old... Try again!`;
            inputText.select();
        } else if (guessedAge < trueAge) {
            msg.innerHTML = `Guess ${count}... <span style="color: red">Wrong!</span><br><br>I am not that young... Try again!`;
            inputText.select();
        } else {
            inputText.value = "";
            document.getElementById('instruction').style.display = 'none';
            document.getElementById('inputText').style.display = 'none';
            document.getElementById('submitGuess').style.display = 'none';
            document.getElementById('restart').style.display = 'block';
            msg.innerHTML = `Guess ${count}... <span style="color: blue">Good job!</span><br><br>I am <span style="color: blue">${guessedAge}</span> years old...`;

        }
    }
}
function restart() {
    count = 0;
    trueAge = Math.floor((Math.random() * maxAge) + 1);
    document.getElementById('instruction').style.display = 'block';
    document.getElementById('inputText').style.display = 'block';
    document.getElementById('submitGuess').style.display = 'block';
    document.getElementById('restart').style.display = 'none';
    document.getElementById('msg').style.display = 'none';
    inputText.select();
}
