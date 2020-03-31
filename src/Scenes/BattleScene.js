import 'phaser';

export default class BattleScene extends Phaser.Scene {
    constructor() {
        super('Battle');
        this.turn = null;
    }

    create() {
        this.cameras.main.flash(3000);
        this.cameras.main.shake(4000, .001);
        this.player = this.physics.add.sprite(200, 300, 'king').setFrame(27).setDisplaySize(128, 128);
        this.enemy = this.physics.add.sprite(600, 300, 'mage').setFrame(9).setDisplaySize(128, 128);

        this.battleMusic = this.sound.add('battleMusic', { volume: 0.4, loop: true });
        this.battleMusic.play();

        this.turn = true;
        this.playerTurn = this.add.text(400, 100, 'Player Turn!').setVisible(true);
        this.enemyTurn = this.add.text(400, 100, 'Enemy Turn!').setVisible(false);
        this.attackOptions = this.add.text(100, 500, 'Attack', { color: 'white', fontSize: '20px' }).setInteractive();
    }

    update() {
        if (this.turn) {
            this.playerTurn.setVisible(true);
            this.enemyTurn.setVisible(false);
            this.attackOptions.setVisible(true);
        } else {
            this.playerTurn.setVisible(false);
            this.enemyTurn.setVisible(true);
            this.attackOptions.setVisible(false);
            console.log('enemy Attack');
            this.turn = true;
        }
        this.attackOptions.on('pointerdown', () => {
            console.log('attacking, - 15HP');
            this.cameras.main.shake(500, .003);
            this.turn = false;
        })

    }
}