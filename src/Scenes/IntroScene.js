import 'phaser';
import { introScene } from '../Config/style';
import introText from '../Content/Text/introText';

export default class IntroScene extends Phaser.Scene {
    constructor() {
        super('Intro');
    }

    preload() {
    }

    create() {
        console.log(introText.partOne)
        this.cameras.main.setBackgroundColor(introScene.cameras.main.backgroundColor);
        introText.map((text, i) => {
            if (i < 10) {
                this.introText = this.add.text(0, 300, text, introScene.text);
                this.time.addEvent({
                    delay: 3000,
                    callback: () => {
                        this.introText.destroy();
                    }
                })
            }
        })
    }

    update() {
    }
};