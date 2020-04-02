import 'phaser';
import config from '../Config/config';
import GameButton from '../Objects/GameButton';
import { titleScene } from '../Config/style';
import axios from 'axios';

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super('Title');
    this.user = 'anon';
    this.score = 0;
  }

  postGameInfo() {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const body = {
      'name': this.user,
      'score': this.score
    };

    axios.post(
      'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/InhJtVWxBftuCrz5KBcL/scores',
      body,
      config
    )
      .then(res => console.log(res))
      .catch(err => console.log(err));
    console.log('loaded');
  };

  preload() {
    this.load.image('background', 'assets/parallax_mountain_pack/layers/bg.png');
    this.load.image('foregroundTrees', 'assets/parallax_mountain_pack/layers/foreground-trees.png');
    this.load.image('mountain-far', 'assets/parallax_mountain_pack/layers/mountain-far.png');
    this.load.image('mountains', 'assets/parallax_mountain_pack/layers/mountains.png');
    this.load.image('trees', 'assets/parallax_mountain_pack/layers/trees.png');
    this.load.plugin('rexinputtextplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexinputtextplugin.min.js', true);
  }

  create() {
    const printText = this.add.text(400, 200, '', {
      fontSize: '12px',
      fixedWidth: 100,
      fixedHeight: 100,
    }).setOrigin(0.5);
    const inputText = this.add.rexInputText(400, 220, 200, 40, {
      type: 'text',
      placeholder: 'Name',
      fontSize: '20px',
      borderBottom: `3px solid ${titleScene.title.color}`
    })
      .setOrigin(0.5)
      .on('textchange', function (inputText) {
        printText.text = inputText.text;
      })

    printText.text = inputText.text;


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
    this.submitButton = this.add.text(400, 300, 'Submit Name', titleScene.menu).setInteractive().setOrigin(0.5);
    this.submitButton.on('pointerdown', () => {
      console.log(printText.text)
      if (printText.text.length > 0) {
        this.user = printText.text;
        const data = { user: this.user };
        this.startButton = new GameButton(this, 'Intro', 360, 300, 'START', titleScene.menu, data);
        this.submitButton.destroy();
      }
    });

    this.model = this.sys.game.globals.model;
    if (this.model.musicOn === true && this.model.bgMusicPlaying === false) {
      this.bgMusic = this.sound.add('bgMusic', { volume: 0.4, loop: true });
      this.bgMusic.play();
      this.model.bgMusicPlaying = true;
      this.sys.game.globals.bgMusic = this.bgMusic;
    }
    this.text = this.add.text(250, 70, 'MILEUD', titleScene.title);
  }

  update() {
    this.mountains.tilePositionX += .2;
    this.trees.tilePositionX += .4;
    this.foregroundTrees.tilePositionX += .8;
  }
};
