import 'phaser';

export default class BattleScene extends Phaser.Scene {
    constructor() {
        super('Battle');
        this.turn = null;
        this.mileudHealth;
        this.jackHealth;
        this.mileudHealthStatus;
        this.jackHealthStatus;
    }

    initializeHealth() {
        this.jackHealth = 100;
        this.mileudHealth = 100;
    };

    showHealthStatus() {
        this.mileudHealthStatus = this.add.text(180, 400, this.mileudHealth);
        this.jackHealthStatus = this.add.text(580, 400, this.jackHealth);
    };

    updateHealthStatus() {
        this.mileudHealthStatus.destroy();
        this.jackHealthStatus.destroy();
        this.mileudHealthStatus = this.add.text(180, 400, this.mileudHealth);
        this.jackHealthStatus = this.add.text(580, 400, this.jackHealth);
    };

    mileudDefeated() {
        this.mileud.destroy();
        this.jack.destroy();
        this.mileud = this.physics.add.sprite(200, 300, 'mileudFall').setFrame(2).setDisplaySize(128, 128);
        this.jack = this.physics.add.sprite(600, 300, 'jackFall').setFrame(0).setDisplaySize(128, 128);
        this.mileudTurn.destroy();
        this.jackTurn.destroy();
        this.jackTurn = this.add.text(400, 100, 'Jack wins...');
        this.attackOptions.destroy();
        this.time.addEvent({
            delay: 2000,
            callback: () => {
                this.cameras.main.fadeOut(2000);
                this.scene.start('Game');
                this.battleMusic.stop();
            }
        });
    };

    jackDefeated() {
        this.jack.destroy();
        this.mileud.destroy();
        this.jack = this.physics.add.sprite(600, 300, 'jackFall').setFrame(4).setDisplaySize(128, 128);
        this.mileud = this.physics.add.sprite(200, 300, 'mileudFall').setFrame(0).setDisplaySize(128, 128);
        this.mileudTurn.destroy();
        this.mileudTurn = this.add.text(400, 100, 'You win!');
        this.jackTurn.destroy();
        this.attackOptions.destroy();
        this.time.addEvent({
            delay: 2000,
            callback: () => {
                this.cameras.main.fadeOut(2000);
                this.scene.start('Game');
                this.battleMusic.stop();
            }
        });
    };

    create() {
        this.initializeHealth();
        this.cameras.main.flash(3000);
        this.cameras.main.shake(4000, .001);
        this.mileud = this.physics.add.sprite(200, 300, 'mileud').setFrame(27).setDisplaySize(128, 128);
        this.jack = this.physics.add.sprite(600, 300, 'jack').setFrame(9).setDisplaySize(128, 128);

        this.showHealthStatus();

        this.battleMusic = this.sound.add('battleMusic', { volume: 0.4, loop: true });
        this.battleMusic.play();

        this.turn = true;
        this.mileudTurn = this.add.text(400, 100, 'Your Turn!').setVisible(true);
        this.jackTurn = this.add.text(400, 100, 'Enemy Turn!').setVisible(false);
        this.attackOptions = this.add.text(100, 500, 'Attack', { color: 'white', fontSize: '20px' }).setInteractive();

        this.attackOptions.on('pointerdown', () => {
            this.cameras.main.shake(500, .003);
            this.jackHealth -= 20;
            this.turn = false;
        });
    }

    update() {
        if (this.turn) {
            if (this.mileudHealth <= 0) {
                this.mileudDefeated();
            }
            this.mileudTurn.setVisible(true);
            this.jackTurn.setVisible(false);
            this.attackOptions.setVisible(true);
        } else {
            if (this.jackHealth <= 0) {
                this.jackDefeated();
            }
            this.mileudTurn.setVisible(false);
            this.jackTurn.setVisible(true);
            this.attackOptions.setVisible(false);
            this.cameras.main.shake(500, .003);
            this.mileudHealth -= 15;
            console.log('enemy Attack');
            this.turn = true;
        }

        this.updateHealthStatus();
    }
};