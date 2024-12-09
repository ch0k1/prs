import { TestBed } from '@angular/core/testing';

import { GamePlayService } from './game-play.service';
import { GameOption } from '../enums/game';

describe('GamePlayService', () => {
  let service: GamePlayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GamePlayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should calculate game result correctly', () => {
    expect(service.calculateResult(GameOption.Rock, GameOption.Scissors)).toBe('Player 1 Wins!');
    expect(service.calculateResult(GameOption.Scissors, GameOption.Paper)).toBe('Player 1 Wins!');
    expect(service.calculateResult(GameOption.Paper, GameOption.Rock)).toBe('Player 1 Wins!');
    expect(service.calculateResult(GameOption.Rock, GameOption.Rock)).toBe('It\'s a tie!');
    expect(service.calculateResult(GameOption.Paper, GameOption.Paper)).toBe('It\'s a tie!');
    expect(service.calculateResult(GameOption.Scissors, GameOption.Scissors)).toBe('It\'s a tie!');
    expect(service.calculateResult(GameOption.Scissors, GameOption.Rock)).toBe('Player 2 Wins!');
    expect(service.calculateResult(GameOption.Paper, GameOption.Scissors)).toBe('Player 2 Wins!');
    expect(service.calculateResult(GameOption.Rock, GameOption.Paper)).toBe('Player 2 Wins!');
  });

  it('should generate a random game option', () => {
    const choices = Object.values(GameOption);
    const randomChoice = service.getRandomChoice();
    expect(choices.includes(randomChoice)).toBe(true);
  });
});
