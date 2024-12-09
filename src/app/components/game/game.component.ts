import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameOption, GameMode } from '@app/enums/game';
import { GamePlayService } from '@app/services/game-play.service';
import { GameScoreService } from '@app/services/game-score.service';

@Component({
  selector: 'prs-game',
  imports: [CommonModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent implements OnInit {
  /**
   * Expose the available game modes to the template.
   * {@link GameMode}
   */
  GameMode = GameMode;

  /**
   * Expose the available game options to the template.
   * {@link GameOption}
   */
  choices = Object.values(GameOption);
  
  /**
   * The current game mode being played.
   * @type GameMode
   * {@link GameMode}
   */
  gameMode: GameMode | null = null;

  /**
   * The game option chosen by the user.
   * @type GameOption
   * {@link GameOption}
   */
  userChoice: GameOption | null = null;

  /**
   * The game option chosen by the computer.
   * @type GameOption
   * {@link GameOption}
   */
  computerChoice: GameOption | null = null;

  /**
   * The second game option chosen by the computer.
   * @type GameOption
   * {@link GameOption}
   */
  computerChoice2: GameOption | null = null;

  /**
   * The current score for the user.
   * @type number
   */
  userScore: number = 0;

  /**
   * The current score for the computer.
   * @type number
   */
  computerScore: number = 0;

  /**
   * The number of games played.
   * @type number
   */
  gamesPlayed: number = 0;

  /**
   * The result of the current game.
   * @type string
   */
  result: string | null = null;

  /**
   * Initializes the component by injecting the GamePlayService and GameScoreService.
   * @param {GamePlayService} gamePlayService - The GamePlayService used to determine the winner of each round and update the game state.
   * @link GamePlayService
   * @param {GameScoreService} gameScoreService - The GameScoreService used to save and retrieve the game state from session storage.
   * @link GameScoreService
   */
  constructor(
    private gamePlayService: GamePlayService,
    private gameScoreService: GameScoreService
  ) { }
  
  /**
   * Restore game state from Session Storage when component is initialized.
   */
  ngOnInit(): void {
    this.restoreGameProgress();
  }
  
  /**
   * Restores the user's score, computer's score, and number of games played
   * from session storage and updates the component's state accordingly.
   */
  restoreGameProgress(): void {
    this.userScore = this.gameScoreService.getUserScore();
    this.computerScore = this.gameScoreService.getComputerScore();
    this.gamesPlayed = this.gameScoreService.getGamesPlayed();
  }
  
  /**
   * Saves the current game progress, including the user's score, the computer's score,
   * and the number of games played, to session storage via the GameScoreService.
   */
  saveGameProgress(): void {
    this.gameScoreService.saveGameProgress(this.userScore, this.computerScore, this.gamesPlayed);
  }
  
  /**
   * Initializes the game component for a new game round.
   * Sets the game mode, and resets the user and computer choices, and the result.
   * @param {GameMode} mode The game mode to start with.
   */
  startGame(mode: GameMode): void {
    this.gameMode = mode;
    this.userChoice = null;
    this.computerChoice = null;
    this.computerChoice2 = null;
    this.result = null;
  }
  
  /**
   * Plays a round of the game in Player Vs Computer mode.
   * Sets the user's choice, randomly generates the computer's choice,
   * calculates the result, updates the score, and saves the game progress.
   *
   * @param {GameOption} choice - The game option chosen by the player (Rock, Paper, or Scissors).
   */
  playPlayerVsComputer(choice: GameOption): void {
    this.userChoice = choice;
    this.computerChoice = this.gamePlayService.getRandomChoice();
    this.result = this.gamePlayService.calculateResult(this.userChoice, this.computerChoice);

    this.updateScore(this.result);
    this.saveGameProgress();
  }

  
  /**
   * Plays a round of the game in Computer Vs Computer mode.
   * Randomly generates two computer choices, calculates the result,
   * updates the score, and saves the game progress.
   */
  playComputerVsComputer(): void {
    this.computerChoice = this.gamePlayService.getRandomChoice();
    this.computerChoice2 = this.gamePlayService.getRandomChoice();
    this.result = this.gamePlayService.calculateResult(this.computerChoice, this.computerChoice2);

    this.updateScore(this.result, true);
    this.saveGameProgress();
  }
  
  /**
   * Updates the scores and games played based on the result of a game round.
   * If the game is in Computer Vs Computer mode, the score is updated
   * based on the result of the computer's choice.
   * 
   * @param {string} result - The result of the game round (It's a tie!, Player 1 Wins!, or Player 2 Wins!).
   * @param {boolean} [isComputerMode=false] - Whether the game is in Computer Vs Computer mode.
   */
  updateScore(result: string, isComputerMode: boolean = false): void {
    this.gamesPlayed++;
    if (result.includes('Player 1 Wins!')) {
      this.userScore++;
    } else if (result.includes('Player 2 Wins!')) {
      this.computerScore++;
    }
  }
  
  /**
   * Resets the game to its initial state.
   * Clears session storage and sets user score, computer score, 
   * and games played to zero. Sets game mode to null and restarts the game.
   */
  restartGame(): void {
    sessionStorage.clear();
    this.userScore = 0;
    this.computerScore = 0;
    this.gamesPlayed = 0;
    this.gameMode = null;
    this.startGame(this.gameMode!);
  }
}
