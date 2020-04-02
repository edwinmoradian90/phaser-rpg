import 'phaser';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
    this.player;
    this.cursors;
    this.user = 'testing';
    this.score = 0;
  }

  init(data) {
    console.log(data);
    this.user = data.user;
    this.score = data.score || 0;
  };

  preload() {
    this.load.image('tiles', '../assets/tilesets/terrain_atlas.png');
    this.load.tilemapTiledJSON('map', '../assets/tilemaps/game_map.json');
    this.sys.game.globals.bgMusic.stop();
  }

  create() {
    this.cameras.main.fadeIn(2000);

    const map = this.make.tilemap({ key: 'map' });
    const tileset = map.addTilesetImage('world_tiles', 'tiles');
    const base = map.createStaticLayer('base', tileset, 0, 0);
    const top = map.createStaticLayer('top', tileset, 0, 0);
    const objects = map.createStaticLayer('objects', tileset, 0, 0).setDepth(2);
    const objectsTop = map.createStaticLayer('objectsTop', tileset, 0, 0);

    this.player = this.physics.add.sprite(200, 450, 'mileud');
    this.enemy = this.physics.add.sprite(735, 380, 'jack').setFrame(18).setDepth(2);
    this.player.setCollideWorldBounds(true);
    this.enemy.body.setImmovable(true);
    this.physics.add.overlap(this.player, this.enemy, () => {
      this.levelOneMusic.stop();
      this.scene.start('Battle', { user: this.user, score: this.score });
    });

    objects.setCollisionByProperty({ collides: true });

    this.physics.world.bounds.width = map.widthInPixels;
    this.physics.world.bounds.height = map.heightInPixels;

    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(this.player);
    this.cameras.main.roundPixels = true;

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('mileud', { start: 9, end: 17 }),
      frameRate: 8,
      repeat: -1,
    });

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('mileud', { start: 27, end: 35 }),
      frameRate: 8,
      repeat: -1,
    });

    this.anims.create({
      key: 'up',
      frames: this.anims.generateFrameNumbers('mileud', { start: 0, end: 8 }),
      frameRate: 8,
      repeat: -1
    });

    this.anims.create({
      key: 'down',
      frames: this.anims.generateFrameNumbers('mileud', { start: 18, end: 25 }),
      frameRate: 8,
      repeat: -1
    });

    this.levelOneMusic = this.sound.add('levelOneMusic', { volume: 0.4, loop: true });
    this.levelOneMusic.play();

    this.scoreText = this.add.text(10, 10, `Score: ${this.score}`, { fontSize: '28px', color: 'white', fontFamily: 'Arial' }).setDepth(3).setScrollFactor(0);
  }

  update() {
    this.cursors = this.input.keyboard.createCursorKeys()
    if (this.cursors.left.isDown) {
      this.player.body.stop();
      this.player.body.setVelocityX(-160);
      this.player.anims.play('left', true);
    }
    else if (this.cursors.right.isDown) {
      this.player.body.stop();
      this.player.body.setVelocityX(160);
      this.player.anims.play('right', true);
    }
    else if (this.cursors.up.isDown) {
      this.player.body.stop();
      this.player.body.setVelocityY(-160);
      this.player.anims.play('up', true);
    }
    else if (this.cursors.down.isDown) {
      this.player.body.stop();
      this.player.body.setVelocityY(160);
      this.player.anims.play('down', true);
    }
    else {
      this.player.body.stop();
      this.player.anims.stop();
      this.player.setFrame(19);
    }

  }
};
