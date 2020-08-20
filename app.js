const gameContainer = document.getElementById("game");
let noClicking = false;
let cardsFlipped = 0;
let card1 = null;
let card2 = null;

const COLORS = [
  "#7393C2",
  "#404654",
  "#73303C",
  "#A66249",
  "#DDB247",
  "#457373",
  "#7393C2",
  "#404654",
  "#73303C",
  "#A66249",
  "#DDB247",
  "#457373",
];

// shuffle cards based on Fisher Yates
function shuffle(array) {
  let counter = array.length;
  while (counter > 0) {
    let index = Math.floor(Math.random() * counter);
    counter--;
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors, creates new div with color class
// and adds event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    const newDiv = document.createElement("div");
    newDiv.classList.add(color);
    newDiv.addEventListener("click", handleCardClick);
    gameContainer.append(newDiv);
  }
}

// When a card is clicked -> compare cards, add to counter, update class to flipped
function handleCardClick(e) {
  if (noClicking) return;
  if (e.target.classList.contains("flipped")) return;

  let currentCard = e.target;
  currentCard.classList.add("flip");
  currentCard.style.backgroundColor = currentCard.classList[0];

  if (!card1 || !card2) {
    currentCard.classList.add("flipped");
    card1 = card1 || currentCard;
    card2 = currentCard === card1 ? null : currentCard;
  }

if (card1 && card2) {
    noClicking = true;
    let back1 = card1.classList[0];
    let back2 = card2.classList[0];

    if (back1 === back2) {
      cardsFlipped += 2;
      card1.removeEventListener("click", handleCardClick);
      card2.removeEventListener("click", handleCardClick);
      card1 = null;
      card2 = null;
      noClicking = false;
  } else {
      setTimeout(function() {
          card1.classList.remove("flipped");
          card2.classList.remove("flipped");
          card1.classList.add("flip-back");
          card2.classList.add("flip-back");
          card1.style.backgroundColor = "#BCAFBD";
          card2.style.backgroundColor = "#BCAFBD";
          card1 = null;
          card2 = null;
          noClicking = false;
      }, 1000)
  }
}
if (cardsFlipped === COLORS.length) {
  setTimeout(function () {
    alert("Game over! Click restart to play again!");} , 1000)
}
}



// when the DOM loads
createDivsForColors(shuffledColors);
console.log(shuffledColors);


// TODO when I have more time: 
//    Add start game button
//    Add restart button
//    update CSS to make more responsive for diff screen sizes

