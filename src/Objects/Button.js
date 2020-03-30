import 'phaser';

export default class Button extends Phaser.GameObjects.Container {
  constructor(scene, x, y, key1, key2, text, targetScene) {
    super(scene);
    this.scene = scene;
    this.x = x;
    this.y = y;

    this.button = this.scene.add.sprite(0, 0, key1).setInteractive();
    this.text = this.scene.add.text(0, 0, text, { fontSize: '20px', fill: '#fff' }).setInteractive();
    Phaser.Display.Align.In.Center(this.text);

    this.add(this.button);
    this.add(this.text);
    /*
        this.text.on('pointerdown', function () {
          this.scene.scene.start(targetScene);
        }.bind(this));
    
        this.text.on('pointerover', function () {
          this.text.setTexture(key2);
        }.bind(this));
    
        this.text.on('pointerout', function () {
          this.button.setTexture(key1);
        }.bind(this));
    */
    this.scene.add.existing(this);
  }
}