import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameScoreService {

  constructor() { }

  /**
   * Retrieves the user's score from session storage.
   * If no score is found, defaults to 0.
   * @returns {number} The user's score.
   */
  getUserScore(): number {
    const userScore = parseInt(sessionStorage.getItem('userScore') || '0');
    return userScore;
  }

  /**
   * Retrieves the computer's score from session storage.
   * If no score is found, defaults to 0.
   * @returns {number} The computer's score.
   */
  getComputerScore(): number {
    const computerScore = parseInt(sessionStorage.getItem('computerScore') || '0');
    return computerScore;
  }

  /**
   * Retrieves the number of games played from session storage.
   * If no value is found, defaults to 0.
   * @returns {number} The number of games played.
   */
  getGamesPlayed(): number {
    const gamesPlayed = parseInt(sessionStorage.getItem('gamesPlayed') || '0');
    return gamesPlayed;
  }

  /**
   * Saves the current game state to session storage.
   * @param {number} userScore The user's score.
   * @param {number} computerScore The computer's score.
   * @param {number} gamesPlayed The number of games played.
   */
  saveGameProgress(userScore: number, computerScore: number, gamesPlayed: number): void {
    sessionStorage.setItem('userScore', userScore.toString());
    sessionStorage.setItem('computerScore', computerScore.toString());
    sessionStorage.setItem('gamesPlayed', gamesPlayed.toString());
  }
}
