import { TestBed } from '@angular/core/testing';

import { GameScoreService } from './game-score.service';

describe('GameScoreService', () => {
  let service: GameScoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameScoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get the user score from session storage', () => {
    sessionStorage.setItem('userScore', '10');
    expect(service.getUserScore()).toBe(10);
  });

  it('should get the computer score from session storage', () => {
    sessionStorage.setItem('computerScore', '5');
    expect(service.getComputerScore()).toBe(5);
  });

  it('should get the games played from session storage', () => {
    sessionStorage.setItem('gamesPlayed', '20');
    expect(service.getGamesPlayed()).toBe(20);
  });

  it('should save the game progress to session storage', () => {
    service.saveGameProgress(10, 5, 20);
    expect(sessionStorage.getItem('userScore')).toBe('10');
    expect(sessionStorage.getItem('computerScore')).toBe('5');
    expect(sessionStorage.getItem('gamesPlayed')).toBe('20');
  });

  it('should get the default score when no score is found in session storage', () => {
    sessionStorage.removeItem('userScore');
    expect(service.getUserScore()).toBe(0);
  });

  it('should get the default computer score when no score is found in session storage', () => {
    sessionStorage.removeItem('computerScore');
    expect(service.getComputerScore()).toBe(0);
  });

  it('should get the default games played when no value is found in session storage', () => {
    sessionStorage.removeItem('gamesPlayed');
    expect(service.getGamesPlayed()).toBe(0);
  });
});
