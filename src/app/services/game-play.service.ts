import { Injectable } from '@angular/core';

import { GameOption, GameMode } from '@app/enums/game';

@Injectable({
  providedIn: 'root'
})
export class GamePlayService {

  //Strip GameOption enum values for use in template
  choices = Object.values(GameOption);

  constructor() { }

  /**
   * Determines the result of a game round between two players based on their choices.
   *
   * @param {GameOption} player1 - The game option chosen by player 1 (Rock, Paper, or Scissors).
   * @param {GameOption} player2 - The game option chosen by player 2 (Rock, Paper, or Scissors).
   * @returns A string indicating the result of the game: 'It's a tie!', 'Player 1 Wins!', or 'Player 2 Wins!'.
   */
  calculateResult(player1: GameOption | null, player2: GameOption | null): string {
    if (player1 === player2) {
      return 'It\'s a tie!';
    }
    if (
      (player1 === GameOption.Rock && player2 === GameOption.Scissors) ||
      (player1 === GameOption.Scissors && player2 === GameOption.Paper) ||
      (player1 === GameOption.Paper && player2 === GameOption.Rock)
    ) {
      return 'Player 1 Wins!';
    }
    return 'Player 2 Wins!';
  }

  
  /**
   * Gets a random game option.
   *
   * @returns A random value from the GameOption enum.
   */
  getRandomChoice(): GameOption {
    const randomIndex = Math.floor(Math.random() * this.choices.length);
    return this.choices[randomIndex];
  }
}
