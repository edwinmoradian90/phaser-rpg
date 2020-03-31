import 'phaser';
import { introScene } from '../Config/style';
import introText from '../Content/Text/introText';
import GameButton from '../Objects/GameButton';

export default class IntroScene extends Phaser.Scene {
    constructor() {
        super('Intro');
    }

    preload() {
    }

    create() {
        console.log(introText.partOne)
        let i = 0;
        this.cameras.main.setBackgroundColor(introScene.cameras.main.backgroundColor);
        this.introText = this.add.text(0, 0, introText[0], introScene.text);
        this.skipButton = new GameButton(this, 'Game', 700, 500, 'SKIP', introScene.text);

        this.time.addEvent({
            delay: 10000,
            callback: () => {
                if (i < introText.length) {
                    this.introText.destroy();
                    this.introText = this.add.text(0, 0, introText[i + 1], introScene.text);
                    i++;
                } else {
                    this.scene.start('Game');
                }
            },
            loop: true
        })
    }

};