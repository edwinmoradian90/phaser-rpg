import 'phaser';
import config from '../Config/config';
import GameButton from '../Objects/GameButton';
import { titleScene } from '../Config/style';

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super('Title');
  }

  preload() {
    this.load.image('background', 'assets/parallax_mountain_pack/layers/bg.png');
    this.load.image('foregroundTrees', 'assets/parallax_mountain_pack/layers/foreground-trees.png');
    this.load.image('mountain-far', 'assets/parallax_mountain_pack/layers/mountain-far.png');
    this.load.image('mountains', 'assets/parallax_mountain_pack/layers/mountains.png');
    this.load.image('trees', 'assets/parallax_mountain_pack/layers/trees.png');
  }

  create() {
    this.add.image(
      config.width / 2,
      config.height / 2 - 70,
      'background'
    ).setDisplaySize(config.width, config.height / 2 + 180)

    this.mountains = this.add.tileSprite(
      config.width / 2,
      config.height / 2 + 150,
      config.width,
      200,
      'mountains',
      0
    ).setDisplaySize(config.width, 400)

    this.trees = this.add.tileSprite(
      config.width / 2,
      config.height / 2,
      config.width,
      150,
      'trees'
    ).setDisplaySize(config.width + 200, config.height / 2 + 300)

    this.foregroundTrees = this.add.tileSprite(
      config.width / 2,
      config.height / 2 + 100,
      config.width,
      170,
      'foregroundTrees'
    ).setDisplaySize(config.width + 200, config.height / 2 + 140)

    // Game
    this.startButton = new GameButton(this, 'Intro', 365, 300, 'START', titleScene.menu);
    this.optionsButton = new GameButton(this, 'Options', 352, 350, 'OPTIONS', titleScene.menu)

    this.model = this.sys.game.globals.model;
    if (this.model.musicOn === true && this.model.bgMusicPlaying === false) {
      this.bgMusic = this.sound.add('bgMusic', { volume: 0.4, loop: true });
      this.bgMusic.play();
      this.model.bgMusicPlaying = true;
      this.sys.game.globals.bgMusic = this.bgMusic;
    }
    this.text = this.add.text(250, 200, 'MILEUD', titleScene.title);
  }

  update() {
    this.mountains.tilePositionX += .2;
    this.trees.tilePositionX += .4;
    this.foregroundTrees.tilePositionX += .8;
  }
};
