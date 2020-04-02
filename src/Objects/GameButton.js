import Phaser from 'phaser';
import { titleScene } from '../Config/style';

export default class GameButton extends Phaser.GameObjects.Container {
  constructor(scene, targetScene, x, y, text, textConfig, options) {
    super(scene);

    this.scene = scene;
    this.x = x;
    this.y = y;

    this.text = this.scene.add.text(0, 0, text, textConfig).setInteractive();
    this.add(this.text);
    this.text.on('pointerdown', () => {
      this.scene.scene.start(targetScene, options);
    });

    this.text.on('pointerover', () => {
      this.text.setStyle(titleScene.menuHover);
    });

    this.text.on('pointerout', () => {
      this.text.setStyle(titleScene.menu);
    });

    this.scene.add.existing(this);
  }
}
