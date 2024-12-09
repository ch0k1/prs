import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameComponent } from '@app/components/game/game.component';
import { GamePlayService } from '@app/services/game-play.service';
import { GameScoreService } from '@app/services/game-score.service';
import { GameMode, GameOption } from '@app/enums/game';

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameComponent],
      providers: [GamePlayService, GameScoreService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    component.restartGame();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize game state', () => {
    expect(component.userChoice).toBeNull();
    expect(component.computerChoice).toBeNull();
    expect(component.computerChoice2).toBeNull();
    expect(component.result).toBeNull();
    expect(component.gameMode).toBeNull();
    expect(component.userScore).toBe(0);
    expect(component.computerScore).toBe(0);
    expect(component.gamesPlayed).toBe(0);
  });

  it('should start game in Player Vs Computer mode', () => {
    component.startGame(GameMode.PlayerVsComputer);
    expect(component.gameMode).toBe(GameMode.PlayerVsComputer);
    expect(component.userChoice).toBeNull();
    expect(component.computerChoice).toBeNull();
    expect(component.computerChoice2).toBeNull();
    expect(component.result).toBeNull();
  });

  it('should start game in Computer Vs Computer mode', () => {
    component.startGame(GameMode.ComputerVsComputer);
    expect(component.gameMode).toBe(GameMode.ComputerVsComputer);
    expect(component.userChoice).toBeNull();
    expect(component.computerChoice).toBeNull();
    expect(component.computerChoice2).toBeNull();
    expect(component.result).toBeNull();
  });

  it('should play Player Vs Computer game', () => {
    component.startGame(GameMode.PlayerVsComputer);
    component.playPlayerVsComputer(GameOption.Rock);
    expect(component.userChoice).toBe(GameOption.Rock);
    expect(component.computerChoice).not.toBeNull();
    expect(component.result).not.toBeNull();
  });

  it('should play Computer Vs Computer game', () => {
    component.startGame(GameMode.ComputerVsComputer);
    component.playComputerVsComputer();
    expect(component.computerChoice).not.toBeNull();
    expect(component.computerChoice2).not.toBeNull();
    expect(component.result).not.toBeNull();
  });

  it('should update score correctly', () => {
    component.userScore = 0;
    component.computerScore = 0;
    component.gamesPlayed = 0;
    component.updateScore('Player 1 Wins!');
    expect(component.userScore).toBe(1);
    expect(component.computerScore).toBe(0);
    expect(component.gamesPlayed).toBe(1);
    component.updateScore('Player 2 Wins!');
    expect(component.userScore).toBe(1);
    expect(component.computerScore).toBe(1);
    expect(component.gamesPlayed).toBe(2);
  });

  it('should restart game correctly', () => {
    component.userScore = 1;
    component.computerScore = 1;
    component.gamesPlayed = 1;
    component.restartGame();
    expect(component.userScore).toBe(0);
    expect(component.computerScore).toBe(0);
    expect(component.gamesPlayed).toBe(0);
    expect(component.gameMode).toBeNull();
  });
});
