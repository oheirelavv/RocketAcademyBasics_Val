// declare global variables
var mode = "rollDice";
var numberOfRounds = 0;
var currentPlayer = 1;
var playerOneRolls = [];
var playerTwoRolls = [];
var playerOneScore = 0;
var playerTwoScore = 0;
var playerOneTotalScore = 0;
var playerTwoTotalScore = 0;

var rollDice = function () {
  // Generate a decimal from 0 through 6, inclusive of 0 and exclusive of 6.
  var randomDecimal = Math.random() * 6;
  // Remove the decimal with the floor operation.
  // This will be an integer from 0 to 5 inclusive.
  var randomInteger = Math.floor(randomDecimal);
  // Add 1 to get valid dice rolls of 1 through 6 inclusive.
  var diceNumber = randomInteger + 1;
  return diceNumber;
};

var roll2Dice = function () {
  //roll 2 dice
  var diceOne = rollDice();
  var diceTwo = rollDice();
  var diceRolls = [diceOne, diceTwo];
  // push dice numbers into respective arrays
  if (currentPlayer == 1) {
    playerOneRolls = diceRolls;
  } else {
    playerTwoRolls = diceRolls;
  }
  // Return new dice rolls to parent function
  return diceRolls;
};

// main function
var main = function (input) {
  var myOutputValue = "";

  if (input.toLowerCase() == "end") {
    mode = "end";
  }
  // player to roll dice
  if (mode == "rollDice") {
    var diceRolls = roll2Dice();
    //var diceOne = rollDice();
    //var diceTwo = rollDice();
    console.log(`current mode: ${mode},
    Player ${currentPlayer} rolled: ${diceRolls[0]}, ${diceRolls[1]}`);

    // if dice 1 and dice 2 are the same
    if (diceRolls[0] == diceRolls[1]) {
      if (currentPlayer == 1) {
        playerOneScore = Number(String(diceRolls[0]) + String(diceRolls[1]));
        myOutputValue = `As both 🎲🎲 show the same digit ${diceRolls[0]}, your number is ${playerOneScore}. <br>Click <b>Roll Dice</b> to continue.`;
        console.log(`Player 1's score: ${playerOneScore}`);
        currentPlayer = 2;
        mode = "rollDice";
      } else {
        playerTwoScore = Number(String(diceRolls[0]) + String(diceRolls[1]));
        myOutputValue = `As both 🎲🎲 show the same digit ${diceRolls[0]}, your number is ${playerTwoScore}. <br>Click <b>Roll Dice</b> to continue.`;
        console.log(`Player 2's score: ${playerTwoScore}`);
        mode = "compare";
        //add curent scores to Total Score variable
        playerOneTotalScore += playerOneScore;
        playerTwoTotalScore += playerTwoScore;
      }
    } else {
      myOutputValue = `<b>Player ${currentPlayer}</b>, you have rolled <br><b>1st 🎲:</b> ${diceRolls[0]}  <br><b>2nd 🎲:</b> ${diceRolls[1]} <br><br>Choose a dice to be in the <u>first digit</u>: <br> Enter <b>1</b> to select ${diceRolls[0]} <br>Enter <b>2</b> to select ${diceRolls[1]}`;
      mode = "selectOrder";
    }
  } else if (mode == "selectOrder") {
    // first check if input is a number
    if (Number.isNaN(Number(input)) == true) {
      myOutputValue = `You keyed in a non-numeric value! Kindly enter <b>1</b> or <b>2</b> only.`;
      return myOutputValue;
    }

    // then check if input is 1 or 2
    if (input != 1 && input != 2) {
      myOutputValue = `You keyed in an invalid input! Kindly enter <b>1</b> or <b>2</b> only.`;
      return myOutputValue;
    } else if (input == 1) {
      if (currentPlayer == 1) {
        // Add Player 1's score to the Player 1 score array.
        playerOneScore = Number(
          String(playerOneRolls[0]) + String(playerOneRolls[1])
        );
        myOutputValue = `Player 1, your number is ${playerOneScore}. <br><br>Click <b>Roll Dice</b> for Player 2's turn.`;
        console.log(`current mode: ${mode} 
      Player 1's score: ${playerOneScore}`);
        //change mode to roll dice for player 2
        mode = "rollDice";
        currentPlayer = 2;
      } else {
        // Add Player 2's score to the Player 1 score array.
        playerTwoScore = Number(
          String(playerTwoRolls[0]) + String(playerTwoRolls[1])
        );
        myOutputValue = `Player 2, your number is ${playerTwoScore}. <br><br>Click <b>Roll Dice</b> to view results!`;
        console.log(`current mode: ${mode} 
      Player 2's score: ${playerTwoScore}`);
        //change mode to roll dice for player 2
        mode = "compare";
        //add curent scores to Total Score variable
        playerOneTotalScore += playerOneScore;
        playerTwoTotalScore += playerTwoScore;
      }
    } else if (input == 2) {
      if (currentPlayer == 1) {
        // Add Player 1's score to the Player 1 score array.
        playerOneScore = Number(
          String(playerOneRolls[1]) + String(playerOneRolls[0])
        );
        myOutputValue = `Player 1, your number is ${playerOneScore}. <br><br>Click <b>Roll Dice</b> for Player 2's turn.`;
        console.log(`current mode: ${mode} 
      Player1's score: ${playerOneScore}`);
        //change mode to roll dice for player 2
        mode = "rollDice";
        currentPlayer = 2;
      } else {
        // Add Player 2's score to the Player 1 score array.
        playerTwoScore = Number(
          String(playerTwoRolls[1]) + String(playerTwoRolls[0])
        );
        myOutputValue = `Player 2, your number is ${playerTwoScore}. <br><br>Click <b>Roll Dice</b> to view results!`;
        console.log(`current mode: ${mode} 
      Player 2's score: ${playerTwoScore}`);
        //change mode to roll dice for player 2
        mode = "compare";
        //add curent scores to Total Score variable
        playerOneTotalScore += playerOneScore;
        playerTwoTotalScore += playerTwoScore;
      }
    }
  } else if (mode == "compare") {
    // compare player 1 and player 2's scores
    if (playerOneTotalScore > playerTwoTotalScore) {
      numberOfRounds += 1;
      myOutputValue = `<b>Player 1</b>, you're in the lead!🎉 <br><br> <b>Leaderboard 👑</b> <br>Player 1: ${playerOneTotalScore} <br>Player 2: ${playerTwoTotalScore} <br>Number of Games played: ${numberOfRounds}<br><br>Click <b>Roll Dice</b> to continue playing.<br> Enter <b>End</b> to end game.`;
      console.log(`current mode: ${mode}, game #${numberOfRounds}
      Player1's score: ${playerOneScore}
      Player2's score: ${playerTwoScore}`);

      mode = "rollDice";
      currentPlayer = 1;
    } else if (playerOneTotalScore < playerTwoTotalScore) {
      numberOfRounds += 1;
      myOutputValue = `<b>Player 2</b>, you're in the lead!🎉 <br><br> <b>Leaderboard 👑</b> <br>Player 1: ${playerOneTotalScore} <br>Player 2: ${playerTwoTotalScore} <br>Number of Games played: ${numberOfRounds}<br><br>Click <b>Roll Dice</b> to continue playing.<br> Enter <b>End</b> to end game.`;
      console.log(`current mode: ${mode}, game #${numberOfRounds}
      Player1's score: ${playerOneScore}
      Player2's score: ${playerTwoScore}`);

      mode = "rollDice";
      currentPlayer = 1;
    } else if (playerOneTotalScore === playerTwoTotalScore) {
      numberOfRounds += 1;
      myOutputValue = `It's a tie!🤝 <br><br> <b>Leaderboard 👑</b> <br>Player 1: ${playerOneTotalScore} <br>Player 2: ${playerTwoTotalScore} <br>Number of Games played: ${numberOfRounds}<br><br>Click <b>Roll Dice</b> to continue playing.<br> Enter <b>End</b> to end game.`;
      console.log(`current mode: ${mode}, game #${numberOfRounds}
      Player1's score: ${playerOneScore}
      Player2's score: ${playerTwoScore}`);

      mode = "rollDice";
      currentPlayer = 1;
    }
  } else if (mode == "end") {
    if (playerOneTotalScore == playerTwoTotalScore) {
      myOutputValue = `<b>--- GAME ENDED ---</b> <br><br> <b>It's a tie!</b> Both players scored a total of ${playerOneTotalScore}!🎉🥳 <br>Refresh the browser to restart playing the game!`;
    } else if (playerOneTotalScore > playerTwoTotalScore) {
      myOutputValue = `<b>--- GAME ENDED ---</b> <br><br> Congratulations <b>Player 1</b>, you won with a score of ${playerOneTotalScore}!🎉🥳 <br>Refresh the browser to restart playing the game!`;
    } else if (playerOneTotalScore < playerTwoTotalScore) {
      myOutputValue = `<b>--- GAME ENDED ---</b> <br><br> Congratulations <b>Player 2</b>, you won with a score of ${playerTwoTotalScore}!🎉🥳 <br>Refresh the browser to restart playing the game!`;
    }
    console.log(`new mode: ${mode}`);
  } else {
    mode = "rollDice";
    currentPlayer = 1;
    console.log(`new mode: ${mode}`);
  }
  // change user's inputs to lowercase
  // input = input.toLowerCase();

  return myOutputValue;
};
