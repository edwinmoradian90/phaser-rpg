import Phaser from 'phaser';
import config from './Config/config';
import GameScene from './Scenes/GameScene';
import IntroScene from './Scenes/IntroScene';
import BootScene from './Scenes/BootScene';
import BattleScene from './Scenes/BattleScene';
import PreloaderScene from './Scenes/PreloaderScene';
import TitleScene from './Scenes/TitleScene';
import LeaderboardScene from './Scenes/LeaderboardScene';
import Model from './Model';

class Game extends Phaser.Game {
  constructor() {
    super(config);
    const model = new Model();
    this.globals = {
      model, bgMusic: null,
    };
    this.scene.add('Boot', BootScene);
    this.scene.add('Preloader', PreloaderScene);
    this.scene.add('Title', TitleScene);
    this.scene.add('IntroScene', IntroScene);
    this.scene.add('Game', GameScene);
    this.scene.add('Battle', BattleScene);
    this.scene.add('Leaderboard', LeaderboardScene);
    this.scene.start('Boot');
  }
}

window.game = new Game(config);
