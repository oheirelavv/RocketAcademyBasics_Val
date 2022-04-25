// declare global variables
var cardDeck = [];
var computerDrawnCards = [];
var playerDrawnCards = [];
var computerSum = 0;
var playerSum = 0;
var mode = "start";

//player can only click on SUBMIT button at the start
var submitButton = (document.querySelector("#submit-button").disabled = false);
var hitButton = (document.querySelector("#hit-button").disabled = true);
var standButton = (document.querySelector("#stand-button").disabled = true);
var restartButton = (document.querySelector("#restart-button").disabled = true);

// GIFs for game
var dealerWin =
  '<img src="https://c.tenor.com/GEP7e6U2uqgAAAAC/spongebob-happy.gif"/>';
var playerWin =
  '<img src="https://c.tenor.com/0g3SZVUVISUAAAAi/spongebob-squarepants-patrick.gif"/>';
var bustedGif =
  '<img src="https://c.tenor.com/mUXqG0h_G70AAAAC/spongebob-patrick-star.gif"/>';
var tieGif =
  '<img src="https://c.tenor.com/KTVBV8LRrCMAAAAC/spongebob-squarepants-spongebob.gif"/>';
var playAgainGif =
  '<img src="https://c.tenor.com/J0xpUToSHCgAAAAC/yay-roadtrip.gif"/>';
var playerBJGif =
  '<img src="https://c.tenor.com/y_qDvEaALjMAAAAC/spongebob-patrick-star.gif"/>';
var computerBJGif =
  '<img src="https://c.tenor.com/STcTDEpZKZUAAAAM/sweet-victory-spongebob.gif"/>';

// creating a card deck
var createCardDeck = function () {
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ["♥️", "♦️", "♣️", "♠️"];

  // Loop over the suits array
  for (var i = 1; i < suits.length; i += 1) {
    // Store the current suit in a variable
    var currentSuit = suits[i];

    // Loop from 1 to 13 to create all cards for a given suit
    for (var rankCounter = 1; rankCounter <= 13; rankCounter += 1) {
      // By default, the card name is the same as rankCounter
      var cardName = rankCounter;

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName === 1) {
        cardName = "A";
      } else if (cardName === 11) {
        cardName = "J";
      } else if (cardName === 12) {
        cardName = "Q";
      } else if (cardName === 13) {
        cardName = "K";
      }

      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter
      };

      // Add the new card to the deck
      cardDeck.push(card);
    }
    //console.log(cardDeck);
  }
  // Return the completed card deck
  return cardDeck;
};

// Get a random index ranging from 0 (inclusive) to max (exclusive).
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

// shuffle cards
var shuffleCardDeck = function (cardDeck) {
  // Loop over the card deck array once
  var currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    // Select a random index in the deck
    var randomIndex = getRandomIndex(cardDeck.length);
    // Select the card that corresponds to randomIndex
    var randomCard = cardDeck[randomIndex];
    // Select the card that corresponds to currentIndex
    var currentCard = cardDeck[currentIndex];
    // Swap positions of randomCard and currentCard in the deck
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
    // Increment currentIndex
    currentIndex = currentIndex + 1;
  }
  // Return the shuffled deck
  return cardDeck;
};

//calculate sum of cards
var calculateCardValues = function (cardsDrawn) {
  var totalSumOfCardsDrawn = 0;
  var numberOfAces = 0;
  for (var i = 0; i < cardsDrawn.length; i += 1) {
    if (cardsDrawn[i]["name"] === "A") {
      cardsDrawn[i]["rank"] = 11;
      numberOfAces += 1;
    } else if (
      cardsDrawn[i]["name"] === "J" ||
      cardsDrawn[i]["name"] === "Q" ||
      cardsDrawn[i]["name"] === "K"
    ) {
      cardsDrawn[i]["rank"] = 10;
    }
    totalSumOfCardsDrawn += cardsDrawn[i]["rank"];
  }
  // if total score is > 21 and there's more than 1 ace
  if (totalSumOfCardsDrawn > 21 && numberOfAces >= 1) {
    totalSumOfCardsDrawn -= 10;
  } else if (totalSumOfCardsDrawn < 21 && numberOfAces >= 1) {
    totalSumOfCardsDrawn;
  }
  //return sum of cards drawn
  return totalSumOfCardsDrawn;
};

//new deck of shuffled cards
var cardDeck = shuffleCardDeck(createCardDeck());

var drawCard = function (player) {
  player.push(cardDeck.pop());
};

//create default output
var getDefaultOutput = function (cardsDrawn) {
  var myOutputValue = "";
  for (var j = 0; j < cardsDrawn.length; j += 1) {
    myOutputValue += `${cardsDrawn[j].name} ${cardsDrawn[j].suit}<br>`;
  }
  myOutputValue += `<b><u>Total points: ${calculateCardValues(
    cardsDrawn
  )}</b></u>`;
  return myOutputValue;
};

// MAIN FUNCTION
var main = function (input) {
  if (input == "hit") {
    mode = "hit";
  } else if (input == "stand") {
    mode = "stand";
  } else if (input == "restart") {
    mode = "restart";
  }

  if (mode == "start") {
    //player can only click HIT or STAND button
    submitButton = document.getElementById("submit-button").disabled = true;
    hitButton = document.getElementById("hit-button").disabled = false;
    standButton = document.getElementById("stand-button").disabled = false;
    restartButton = document.getElementById("restart-button").disabled = true;
    console.log(`current mode: ${mode}`);
    // Draw 2 cards from the top of the deck for each player
    drawCard(computerDrawnCards);
    drawCard(playerDrawnCards);
    drawCard(computerDrawnCards);
    drawCard(playerDrawnCards);

    console.log(computerDrawnCards, playerDrawnCards);

    // Construct an output string to communicate which cards were drawn
    var myOutputValue = "";

    //calculate sum of cards
    computerSum = calculateCardValues(computerDrawnCards);
    console.log(`computer's total score: ${computerSum}`);
    playerSum = calculateCardValues(playerDrawnCards);
    console.log(`player's total score: ${playerSum}`);

    //myoutputvalue to show players' cards + 1 of dealer's cards
    myOutputValue = `<b>Your cards:</b><br>${getDefaultOutput(
      playerDrawnCards
    )} <br><br><b>SpongeBob just wants to show you 1 card:</b><br>${
      computerDrawnCards[0].name
    } ${
      computerDrawnCards[0].suit
    } <br><br> Click <b>HIT</b> to get another card or <b>STAND</b> to see the results.`;

    if (playerDrawnCards.length == 2 && playerSum == 21) {
      submitButton = document.getElementById("submit-button").disabled = true;
      hitButton = document.getElementById("hit-button").disabled = true;
      standButton = document.getElementById("stand-button").disabled = true;
      restartButton = document.getElementById(
        "restart-button"
      ).disabled = false;
      myOutputValue =
        `<b>Your cards:</b><br>${getDefaultOutput(
          playerDrawnCards
        )}<br><br><b>You won blackjack & a Krabby Patty🍔!</b><br>` +
        playerBJGif;
    } else if (computerDrawnCards.length == 2 && computerSum == 21) {
      submitButton = document.getElementById("submit-button").disabled = true;
      hitButton = document.getElementById("hit-button").disabled = true;
      standButton = document.getElementById("stand-button").disabled = true;
      restartButton = document.getElementById(
        "restart-button"
      ).disabled = false;
      myOutputValue =
        `<b>Your cards:</b><br>${getDefaultOutput(
          playerDrawnCards
        )} <br><br><b>SpongeBob's cards:</b><br>${getDefaultOutput(
          computerDrawnCards
        )}<br><br><b>You lose! SpongeBob won blackjack!</b><br>` +
        computerBJGif;
    }
  } else if (mode == "hit") {
    submitButton = document.getElementById("submit-button").disabled = true;
    hitButton = document.getElementById("hit-button").disabled = false;
    standButton = document.getElementById("stand-button").disabled = false;
    restartButton = document.getElementById("restart-button").disabled = true;
    console.log(`current mode: ${mode}`);
    drawCard(playerDrawnCards);
    playerSum = calculateCardValues(playerDrawnCards);
    console.log(playerDrawnCards);
    if (playerSum > 21) {
      //player can only click on RESTART button
      submitButton = document.getElementById("submit-button").disabled = true;
      hitButton = document.getElementById("hit-button").disabled = true;
      standButton = document.getElementById("stand-button").disabled = true;
      restartButton = document.getElementById(
        "restart-button"
      ).disabled = false;
      myOutputValue =
        `<b>Your cards:</b><br>${getDefaultOutput(
          playerDrawnCards
        )}<br><br>You busted!<br>Click the <b>Restart</b> button to play again!<br>` +
        bustedGif;
      mode = "restart";
    } else {
      myOutputValue = `<b>Your cards:</b><br>${getDefaultOutput(
        playerDrawnCards
      )}<br><br> Click <b>HIT</b> to get another card or <b>STAND</b> to see the results.`;
    }
  } else if (mode == "stand") {
    // player can only choose to press RESTART button
    submitButton = document.getElementById("submit-button").disabled = true;
    hitButton = document.getElementById("hit-button").disabled = true;
    standButton = document.getElementById("stand-button").disabled = true;
    restartButton = document.getElementById("restart-button").disabled = false;
    console.log(`current mode: ${mode}`);

    //draw card for computer if total sum is < 17
    while (computerSum < 17) {
      drawCard(computerDrawnCards);
      computerSum = calculateCardValues(computerDrawnCards);
      console.log(computerDrawnCards, computerSum);
    }

    if (computerSum <= 21 && computerSum > playerSum) {
      myOutputValue =
        `<b>Your cards:</b><br>${getDefaultOutput(
          playerDrawnCards
        )}<br><br><b>SpongeBob's cards:</b><br>${getDefaultOutput(
          computerDrawnCards
        )} <br><br>You lose! <br>No Krabby Patty🍔 for you, but you can play again by clicking on <b>Restart!</b>` +
        dealerWin;
    } else if (playerSum <= 21 && playerSum > computerSum) {
      myOutputValue =
        `<b>Your cards:</b><br>${getDefaultOutput(
          playerDrawnCards
        )}<br><br><b>SpongeBob's cards:</b><br>${getDefaultOutput(
          computerDrawnCards
        )} <br><br>You won a Krabby Patty🍔!<br><br>` + playerWin;
    } else if (computerSum > 21) {
      myOutputValue =
        `<b>Your cards:</b><br>${getDefaultOutput(
          playerDrawnCards
        )}<br><br><b>SpongeBob's cards:</b><br>${getDefaultOutput(
          computerDrawnCards
        )} <br><br>SpongeBob busted! You won a Krabby Patty🍔!<br><br>` +
        playerWin;
    } else if (playerSum == computerSum) {
      myOutputValue =
        `<b>Your cards:</b><br>${getDefaultOutput(
          playerDrawnCards
        )}<br><br><b>SpongeBob's cards:</b><br>${getDefaultOutput(
          computerDrawnCards
        )} <br><br><b>it's a tie!</b><br> Click the <b>Restart</b> button to play again!<br>` +
        tieGif;
    }
  } else if (mode == "restart") {
    console.log(`current mode: ${mode}`);
    // player can only choose to press RESTART button
    submitButton = document.getElementById("submit-button").disabled = false;
    hitButton = document.getElementById("hit-button").disabled = true;
    standButton = document.getElementById("stand-button").disabled = true;
    restartButton = document.getElementById("restart-button").disabled = true;

    mode = "start";
    playerDrawnCards = [];
    computerDrawnCards = [];
    cardDeck = shuffleCardDeck(createCardDeck());
    myOutputValue =
      "Click on the <b>Start</b> button to play again!" + playAgainGif;
    console.log(`new mode: ${mode}`);
  }
  return myOutputValue;
};
