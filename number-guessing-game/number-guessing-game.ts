import * as readline from "readline";

// Difficulty levels and corresponding number of chances
const difficulties: Record<string, number> = {
  "1": 10, // Easy
  "2": 5, // Medium
  "3": 3, // Hard
};

// Track high scores per difficulty (fewest attempts)
const highScores: Record<string, number | null> = {
  "1": null,
  "2": null,
  "3": null,
};

// Create readline interface for CLI interaction
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Wrap rl.question in a promise for async/await
function question(query: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(query, (answer) => resolve(answer.trim()));
  });
}

// Main game function
async function playGame() {
  console.log("\nWelcome to the Number Guessing Game!");
  console.log("I'm thinking of a number between 1 and 100.");
  console.log("\nPlease select the difficulty level:");
  console.log("1. Easy (10 chances)");
  console.log("2. Medium (5 chances)");
  console.log("3. Hard (3 chances)");

  let difficulty: string;
  while (true) {
    difficulty = await question("Enter your choice (1, 2, or 3): ");
    if (["1", "2", "3"].includes(difficulty)) break;
    console.log("Invalid choice. Please enter 1, 2, or 3.");
  }

  const maxChances = difficulties[difficulty];
  console.log(
    `\nGreat! You have selected level ${difficulty} and have ${maxChances} chances.`
  );
  console.log("Let's start the game!\n");

  const target = Math.floor(Math.random() * 100) + 1;
  let attempts = 0;
  const startTime = Date.now();

  while (attempts < maxChances) {
    const guessStr = await question(
      `Attempt ${attempts + 1}/${maxChances} - Enter your guess: `
    );
    const guess = parseInt(guessStr, 10);
    attempts++;

    if (isNaN(guess) || guess < 1 || guess > 100) {
      console.log("Invalid entry. Please enter a number between 1 and 100.");
      continue;
    }

    if (guess === target) {
      const timeTaken = ((Date.now() - startTime) / 1000).toFixed(2);
      console.log(
        `\n🎉 Congratulations! You guessed the correct number in ${attempts} attempts and ${timeTaken} seconds.`
      );

      // Update high score
      if (
        highScores[difficulty] === null ||
        attempts < highScores[difficulty]!
      ) {
        highScores[difficulty] = attempts;
        console.log("🥇 New high score for this difficulty! 🎉");
      }
      break;
    }

    // Provide feedback
    if (guess < target) {
      console.log("Incorrect! The number is greater than your guess.\n");
    } else {
      console.log("Incorrect! The number is less than your guess.\n");
    }
  }

  if (attempts >= maxChances && attempts !== highScores[difficulty]) {
    console.log(
      `\n☹️ You've run out of chances. The number was ${target}. Better luck next time!`
    );
  }

  console.log(`\nCurrent high scores:`);
  console.log(`Easy (1):    ${highScores["1"] ?? "-"} attempts`);
  console.log(`Medium (2):  ${highScores["2"] ?? "-"} attempts`);
  console.log(`Hard (3):    ${highScores["3"] ?? "-"} attempts`);

  // Ask to play again
  const again = await question("\nDo you want to play again? (y/n): ");
  if (again.toLowerCase() === "y") {
    await playGame();
  } else {
    console.log("\nThanks for playing! Goodbye!");
    rl.close();
  }
}

// Start the game
playGame().catch((err) => {
  console.error("An error occurred:", err);
  rl.close();
});
