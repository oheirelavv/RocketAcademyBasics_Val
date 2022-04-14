// define global variable
var numberOfGames = 0;
var userName = "";
var mode = "input username";
var numberOfWins = 0;
var numberOfLosses = 0;
var numberOfDraws = 0;
var myOutputValue = "Hi! What's your name?";

console.log(`current mode: ${mode}. ${myOutputValue}`);
// generate a random number 1-3 to indicate s,p or s
var generateSPS = function () {
  var randomNumber = Math.floor(Math.random() * 3) + 1;

  //assign random number with s,p,s
  if (randomNumber == 1) {
    var randomSPS = "scissors";
  } else if (randomNumber == 2) {
    var randomSPS = "paper";
  } else if (randomNumber == 3) {
    var randomSPS = "stone";
  }
  return randomSPS;
};

// calculate draw % (# of draws/total number of games user played)
var getDrawRate = function () {
  var drawRate = Math.floor((numberOfDraws / numberOfGames) * 100);
  console.log(`draw rate = ${drawRate}%`);
  return drawRate;
};
// calculate losing % (# of losses/total number of games user played)
var getLosingRate = function () {
  var losingRate = Math.floor((numberOfLosses / numberOfGames) * 100);
  console.log(`losting rate = ${losingRate}%`);
  return losingRate;
};
// calculate winning % (# of wins/total number of games user played)
var getWinningRate = function () {
  var winRate = Math.floor((numberOfWins / numberOfGames) * 100);
  console.log(`winning rate = ${winRate}%`);
  return winRate;
};

// output result to users
var main = function (input) {
  console.log("input:", input);
  console.log("mode:", mode);
  //default output
  var myOutputValue = "Hi! What's your name?";
  if (mode == "ask for username") {
    var myOutputValue = "Hi! Enter your name to start the game!";
    mode = "input username";
  }
  //user to input username
  else if (mode == "input username") {
    userName = input;

    myOutputValue = `Hi ${userName}! Welcome to a game of scissors✂️ paper📝 stone🗿! <br>Type in "scissors" "paper" or "stone" to start the game! <br><br> p.s. type 'reverse' if you want to play it with a twist!`;
    //update mode to according to user's input
    //if user input reverse, change mode = reverse
    if (input == "reverse") {
      mode = "reverse";
      //if user input regular, change mode = play SPS
    } else if (input == "regular") {
      mode = "play SPS";
      //default mode = play SPS
    } else {
      mode = "play SPS";
      console.log(`mode: ${mode}`);
    }
  } else if (mode == "play SPS") {
    //now in SPS game mode
    console.log("SPS Game,", input);
    // create new inputs
    if (input == "scissors") {
      var newInput = "scissors ✂️";
    } else if (input == "paper") {
      var newInput = "paper 📝";
    } else if (input == "stone") {
      var newInput = "stone 🗿";
    }
    //console.log("new input,", newInput);

    //computer generated SPS input
    var computerSPS = generateSPS();
    console.log(`computer plays ${computerSPS}`);

    // create new computer generated outputs
    if (computerSPS == "scissors") {
      var newComputerSPS = "scissors ✂️";
    } else if (computerSPS == "paper") {
      var newComputerSPS = "paper 📝";
    } else if (computerSPS == "stone") {
      var newComputerSPS = "stone 🗿";
    }
    // change user's inputs to lowercase
    input = input.toLowerCase();

    // validate user inputs
    if (input == "reverse") {
      mode = "reverse";
      console.log(`mode: ${mode}`);
      var myOutputValue =
        "Type scissors, paper or stone to start the reverse game!";
      // input validation
    } else if (input != "scissors" && input != "paper" && input != "stone") {
      var myOutputValue =
        "Your input is invalid. Please input scissors, paper or stone only!";
    }
    // use if-else to determine who won
    else if (input == computerSPS) {
      // +1 to number of games played
      numberOfGames = numberOfGames + 1;
      // +1 to number of Draws
      numberOfDraws = numberOfDraws + 1;
      console.log(
        `Game Number: #${numberOfGames}, Wins: ${numberOfWins}, Losses: ${numberOfLosses}, Draws: ${numberOfDraws}`
      );
      //get draw %
      var drawRateInfo = getDrawRate();
      //get losing %
      var loseRateInfo = getLosingRate();
      //get winning %
      var winRateInfo = getWinningRate();
      //update mode to 'play SPS' to continue playing
      mode = "play SPS";
      console.log(`new mode: ${mode}`);
      // if user and computer play the same sign
      var myOutputValue = `Oh no! It's a Draw - we both played ${newInput}! <br> Give it another try! Type "scissors", "paper" or "stone" to play another round! <br><br> ${userName}, you've played ${numberOfGames} times so far! Below is your game record: <br><br> Wins 🏆: ${numberOfWins} (${winRateInfo}%) <br> Losses 😢: ${numberOfLosses} (${loseRateInfo}%)<br> Draws🌓: ${numberOfDraws} (${drawRateInfo}%)<br><br> p.s. Type reverse for a scissors✂️ paper📝 stone🗿 game with a twist!`;
    }
    // scenarios user lose
    else if (
      (input == "scissors" && computerSPS == "stone") ||
      (input == "stone" && computerSPS == "paper") ||
      (input == "paper" && computerSPS == "scissors")
    ) {
      // +1 to number of games played
      numberOfGames = numberOfGames + 1;
      // +1 to number of losses
      numberOfLosses = numberOfLosses + 1;
      console.log(
        `Game Number: #${numberOfGames}, Wins: ${numberOfWins}, Losses: ${numberOfLosses}, Draws: ${numberOfDraws}`
      );
      //get draw %
      var drawRateInfo = getDrawRate();
      //get losing %
      var loseRateInfo = getLosingRate();
      //get winning %
      var winRateInfo = getWinningRate();
      //update mode to 'play SPS' to continue playing
      mode = "play SPS";
      console.log(`new mode: ${mode}`);
      //output = user lose
      var myOutputValue = `You lose! You played ${newInput} and I played ${newComputerSPS}. <br> Give it another try! Type "scissors", "paper" or "stone" to play another round!<br><br> ${userName}, you've played ${numberOfGames} times so far! Below is your game record: <br><br> Wins 🏆: ${numberOfWins} (${winRateInfo}%)<br> Losses 😢: ${numberOfLosses} (${loseRateInfo}%)<br> Draws🌓: ${numberOfDraws} (${drawRateInfo}%)<br><br> p.s. Type reverse for a scissors✂️ paper📝 stone🗿 game with a twist!`;

      // scenarios user win
    } else if (
      (input == "scissors" && computerSPS == "paper") ||
      (input == "stone" && computerSPS == "scissors") ||
      (input == "paper" && computerSPS == "stone")
    ) {
      // +1 to number of games played
      numberOfGames = numberOfGames + 1;
      // +1 to number of wins
      numberOfWins = numberOfWins + 1;
      console.log(
        `Game Number: #${numberOfGames}, Wins: ${numberOfWins}, Losses: ${numberOfLosses}, Draws: ${numberOfDraws}`
      );
      //get draw %
      var drawRateInfo = getDrawRate();
      //get losing %
      var loseRateInfo = getLosingRate();
      //get winning %
      var winRateInfo = getWinningRate();
      //update mode to 'play SPS' to continue playing
      mode = "play SPS";
      console.log(`new mode: ${mode}`);
      //output = user lose
      var myOutputValue = `You win! You played ${newInput} and I played ${newComputerSPS}. <br> Give me another chance! Type "scissors", "paper" or "stone" to play another round! <br><br> ${userName}, you've played ${numberOfGames} times so far! Below is your game record: <br><br> Wins 🏆: ${numberOfWins} (${winRateInfo}%)<br> Losses 😢: ${numberOfLosses} (${loseRateInfo}%)<br> Draws🌓: ${numberOfDraws} (${drawRateInfo}%)<br><br> p.s. Type reverse for a scissors✂️ paper📝 stone🗿 game with a twist!`;
    }
  } else if (mode == "reverse") {
    //now in reverse mode
    console.log("reverse mode,", input);
    myOutputValue = "Type scissors, paper or stone to play the reverse mode!";
    // create new inputs
    if (input == "scissors") {
      var newInput = "scissors ✂️";
    } else if (input == "paper") {
      var newInput = "paper 📝";
    } else if (input == "stone") {
      var newInput = "stone 🗿";
    }
    //computer generated SPS input
    var computerSPS = generateSPS();
    console.log(`computer plays ${computerSPS}`);

    // create new computer generated outputs
    if (computerSPS == "scissors") {
      var newComputerSPS = "scissors ✂️";
    } else if (computerSPS == "paper") {
      var newComputerSPS = "paper 📝";
    } else if (computerSPS == "stone") {
      var newComputerSPS = "stone 🗿";
    }
    // change user's inputs to lowercase
    input = input.toLowerCase();
    // validate user inputs
    if (input == "regular") {
      mode = "play SPS";
      console.log(`mode: ${mode}`);
      var myOutputValue =
        "Type scissors, paper or stone to play the normal mode!";
    } else if (input != "scissors" && input != "paper" && input != "stone") {
      var myOutputValue =
        "Your input is invalid. Please input scissors, paper or stone only!";
    } // use if-else to determine who won
    else if (input == computerSPS) {
      // +1 to number of games played
      numberOfGames = numberOfGames + 1;
      // +1 to number of Draws
      numberOfDraws = numberOfDraws + 1;
      console.log(
        `Game Number: #${numberOfGames}, Wins: ${numberOfWins}, Losses: ${numberOfLosses}, Draws: ${numberOfDraws}`
      );
      //get draw %
      var drawRateInfo = getDrawRate();
      //get losing %
      var loseRateInfo = getLosingRate();
      //get winning %
      var winRateInfo = getWinningRate();
      //update mode to 'reverse' to continue playing reverse mode
      mode = "reverse";
      console.log(`new mode: ${mode}`);
      // if user and computer play the same sign
      var myOutputValue = `---REVERSE MODE--- <br><br>Oh no! It's a Draw - we both played ${newInput}! <br> Give it another try! Type "scissors", "paper" or "stone" to play another round! <br><br> ${userName}, you've played ${numberOfGames} times so far! Below is your game record: <br><br> Wins 🏆: ${numberOfWins} (${winRateInfo}%) <br> Losses 😢: ${numberOfLosses} (${loseRateInfo}%)<br> Draws🌓: ${numberOfDraws} (${drawRateInfo}%) <br><br> Type regular if you want to play the normal scissors✂️ paper📝 stone🗿!`;
    }
    // scenarios user win
    else if (
      (input == "scissors" && computerSPS == "stone") ||
      (input == "stone" && computerSPS == "paper") ||
      (input == "paper" && computerSPS == "scissors")
    ) {
      // +1 to number of games played
      numberOfGames = numberOfGames + 1;
      // +1 to number of losses
      numberOfWins = numberOfWins + 1;
      console.log(
        `Game Number: #${numberOfGames}, Wins: ${numberOfWins}, Losses: ${numberOfLosses}, Draws: ${numberOfDraws}`
      );
      //get draw %
      var drawRateInfo = getDrawRate();
      //get losing %
      var loseRateInfo = getLosingRate();
      //get winning %
      var winRateInfo = getWinningRate();
      //update mode to 'reverse' to continue playing reverse mode
      mode = "reverse";
      console.log(`new mode: ${mode}`);
      //output = user lose
      var myOutputValue = `---REVERSE MODE--- <br><br>You win! You played ${newInput} and I played ${newComputerSPS}. <br> Give me another chance! Type "scissors", "paper" or "stone" to play another round!<br><br> ${userName}, you've played ${numberOfGames} times so far! Below is your game record: <br><br> Wins 🏆: ${numberOfWins} (${winRateInfo}%)<br> Losses 😢: ${numberOfLosses} (${loseRateInfo}%)<br> Draws🌓: ${numberOfDraws} (${drawRateInfo}%) <br><br> Type regular if you want to play the normal scissors✂️ paper📝 stone🗿!`;

      // scenarios user lose
    } else if (
      (input == "scissors" && computerSPS == "paper") ||
      (input == "stone" && computerSPS == "scissors") ||
      (input == "paper" && computerSPS == "stone")
    ) {
      // +1 to number of games played
      numberOfGames = numberOfGames + 1;
      // +1 to number of wins
      numberOfLosses = numberOfLosses + 1;
      console.log(
        `Game Number: #${numberOfGames}, Wins: ${numberOfWins}, Losses: ${numberOfLosses}, Draws: ${numberOfDraws}`
      );
      //get draw %
      var drawRateInfo = getDrawRate();
      //get losing %
      var loseRateInfo = getLosingRate();
      //get winning %
      var winRateInfo = getWinningRate();
      //update mode to 'reverse' to continue playing reverse mode
      mode = "reverse";
      console.log(`new mode: ${mode}`);
      //output = user lose
      var myOutputValue = `---REVERSE MODE--- <br><br>You lose! You played ${newInput} and I played ${newComputerSPS}. <br> Give it another try! Type "scissors", "paper" or "stone" to play another round! <br><br> ${userName}, you've played ${numberOfGames} times so far! Below is your game record: <br><br> Wins 🏆: ${numberOfWins} (${winRateInfo}%)<br> Losses 😢: ${numberOfLosses} (${loseRateInfo}%)<br> Draws🌓: ${numberOfDraws} (${drawRateInfo}%) <br><br> Type regular if you want to play the normal scissors✂️ paper📝 stone🗿!`;
    }
  }
  return myOutputValue;
};
