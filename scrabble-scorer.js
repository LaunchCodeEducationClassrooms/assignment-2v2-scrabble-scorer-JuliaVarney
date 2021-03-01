// inspired by https://exercism.io/tracks/javascript/exercises/etl/solutions/91f99a3cca9548cebe5975d7ebca6a85
// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //


const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
  word = word.toUpperCase();
  let letterPoints = "";
  for (let i = 0; i < word.length; i++) {

    for (const pointValue in oldPointStructure) {

      if (oldPointStructure[pointValue].includes(word[i])) {
        letterPoints += `Points for '${word[i]}': ${pointValue}\n`
      }
    }
  }
  return letterPoints;
}

function transform(oldPoints) {
  let newPointStructure = {};
  for (item in oldPoints) {
    for (let i = 0; i < oldPoints[item].length; i++) {
      let key = oldPoints[item][i].toLowerCase();
      newPointStructure[key] = Number(item);
    }
  }
  return newPointStructure;
};

let newPointStructure = transform(oldPointStructure);
function scrabbleScore(word) {
  word = word.toLowerCase().split('');
  let pointValue = 0;
  for (let i = 0; i < word.length; i++) {
    pointValue += newPointStructure[word[i]]
  }
  return Number(pointValue);
}

function simpleScore(word) {
  word = word.toUpperCase();
  let pointValue = 0;
  for (let i = 0; i < word.length; i++) {
    pointValue++;
  }
  return pointValue;
}

function vowelBonusScore(word) {
  word = word.toUpperCase();
  let pointValue = 0;
  let letterPoint = 0;
  for (let i = 0; i < word.length; i++) {
    if (word[i] == 'A' || word[i] == 'E' || word[i] == 'I' || word[i] == 'O' || word[i] == 'U') {
      pointValue = 3;
    } else {
      pointValue = 1;
    }
    letterPoint += pointValue;

  }
  return letterPoint;
}

const scoringAlgorithms = [
  Object (
 {name: 'Simple Score',
  description: 'Each letter is worth 1 point.',
  scoreFunction: simpleScore
}),
Object (
 {name: 'Vowel Bonus',
  description: 'Vowels are 3pts, constants are 1 pt.',
  scoreFunction: vowelBonusScore
}),
Object (
 {name: 'Scrabble',
  description: 'The traditional scoring algorithm.',
  scoreFunction: scrabbleScore
})
]

function initialPrompt() {
  return input.question("Let's play some Scrabble! \n\nEnter a word to score: ");
};

function scorerPrompt(word) {
  let chosenAlg = input.question(`Which scoring algorithm would you like to use? \n \n0 - ${scoringAlgorithms[0].name}: ${scoringAlgorithms[0].description} \n1 - ${scoringAlgorithms[1].name}: ${scoringAlgorithms[1].description} \n2 - ${scoringAlgorithms[2].name}: ${scoringAlgorithms[2].description} \nEnter 0, 1, or 2: `);

  if (chosenAlg === '0') {
    return (`Score for '${word}': ${scoringAlgorithms[0].scoreFunction(word)}`)
  } else if (chosenAlg === '1') {
    return (`Score for '${word}': ${scoringAlgorithms[1].scoreFunction(word)}`)
  } else if (chosenAlg === '2') {
    return (`Score for '${word}': ${scoringAlgorithms[2].scoreFunction(word)}`)
  } else {
    return scorerPrompt(word);
  }
}

function runProgram() {
  let word = initialPrompt();
  console.log(scorerPrompt(word));
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
  initialPrompt: initialPrompt,
  transform: transform,
  oldPointStructure: oldPointStructure,
  simpleScore: simpleScore,
  vowelBonusScore: vowelBonusScore,
  scrabbleScore: scrabbleScore,
  scoringAlgorithms: scoringAlgorithms,
  newPointStructure: newPointStructure,
  runProgram: runProgram,
  scorerPrompt: scorerPrompt
};

