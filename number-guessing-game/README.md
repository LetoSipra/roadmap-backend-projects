# Number Guessing Game (CLI)

A simple command-line number guessing game built with TypeScript. The computer selects a random number between 1 and 100, and the player must guess it within a limited number of attempts based on the selected difficulty level.

## Features

- CLI-based interactive game
- Difficulty levels (Easy, Medium, Hard)
- Limited chances based on difficulty
- Feedback on whether the guess is too high or too low
- Tracks high scores for each difficulty
- Timer to show how long it took to guess
- Option to play multiple rounds

## Difficulty Levels

| Level | Name   | Chances |
| ----- | ------ | ------- |
| 1     | Easy   | 10      |
| 2     | Medium | 5       |
| 3     | Hard   | 3       |

## How to Run

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or later)

### Steps

1. **Clone the Repository:**

   ```bash
   git https://github.com/LetoSipra/roadmap-backend-projects
   cd roadmap-backend-projects/number-guessing-game
   ```

2. **Compile the TypeScript Code:**

   ```bash
   npx tsc number-guessing-game
   ```

3. **Run the Compiled JavaScript File:**
   ```bash
   node number-guessing-game
   ```

## Game Flow Example

```
Welcome to the Number Guessing Game!
I'm thinking of a number between 1 and 100.

Please select the difficulty level:
1. Easy (10 chances)
2. Medium (5 chances)
3. Hard (3 chances)

Enter your choice: 2
Great! You have selected the Medium difficulty level.
Let's start the game!

Enter your guess: 50
Incorrect! The number is less than 50.

Enter your guess: 25
Incorrect! The number is greater than 25.

Enter your guess: 30
🎉 Congratulations! You guessed the correct number in 3 attempts and 12.42 seconds.
🥇 New high score for this difficulty! 🎉
```
