import 'phaser';
import config from '../Config/config';
import Button from '../Objects/Button';

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super('Title');
    this.textConfig = {
      title: {
        color: '#502659',
        fontSize: '80px',
        fontFamily: 'Calibiri',
      },
      menu: {
        color: '#fff',
        fontSize: '30px',
        fontFamily: 'Calibiri'
      }
    }
  }

  preload() {
    this.load.audio('intro', 'assets/Intro.mp3');
    this.load.image('background', 'assets/parallax_mountain_pack/layers/bg.png');
    this.load.image('foregroundTrees', 'assets/parallax_mountain_pack/layers/foreground-trees.png');
    this.load.image('mountain-far', 'assets/parallax_mountain_pack/layers/mountain-far.png');
    this.load.image('mountains', 'assets/parallax_mountain_pack/layers/mountains.png');
    this.load.image('trees', 'assets/parallax_mountain_pack/layers/trees.png');
  }

  create() {
    this.add.image(
      config.width / 2,
      config.height / 2 - 50,
      'background'
    ).setDisplaySize(config.width, config.height / 2 + 200)

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
    this.gameButton = new Button(this, config.width / 2 - 100, config.height / 2 + 50, 'blueButton1', 'blueButton2', 'Play', 'Game');

    // Options
    this.optionsButton = new Button(this, config.width / 2 + 100, config.height / 2 + 50, 'blueButton1', 'blueButton2', 'Options', 'Options');

    this.model = this.sys.game.globals.model;
    if (this.model.musicOn === true && this.model.bgMusicPlaying === false) {
      this.bgMusic = this.sound.add('intro', { volume: 0.4, loop: true });
      this.bgMusic.play();
      this.model.bgMusicPlaying = true;
      this.sys.game.globals.bgMusic = this.bgMusic;
    }
    this.text = this.add.text(250, 200, 'MILEUD', this.textConfig.title);
  }

  update() {
    this.mountains.tilePositionX += .2;
    this.trees.tilePositionX += .4;
    this.foregroundTrees.tilePositionX += .8;
  }
};
