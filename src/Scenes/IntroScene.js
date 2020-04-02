import 'phaser';
import { introScene } from '../Config/style';
import introText from '../Content/Text/introText';
import GameButton from '../Objects/GameButton';

export default class IntroScene extends Phaser.Scene {
    constructor() {
        super('Intro');
        this.user;
    }

    init(data) {
        this.user = data.user;
    }

    create() {
        let i = 0;
        const data = { user: this.user }
        this.cameras.main.setBackgroundColor(introScene.cameras.main.backgroundColor);
        this.introText = this.add.text(0, 0, introText[0], introScene.text);
        this.skipButton = new GameButton(this, 'Game', 700, 500, 'SKIP', introScene.text, data);

        this.time.addEvent({
            delay: 7000,
            callback: () => {
                if (i < introText.length - 1) {
                    this.introText.destroy();
                    this.introText = this.add.text(0, 0, introText[i + 1], introScene.text);
                    i++;
                } else {
                    this.scene.start('Game', data);
                }
            },
            loop: true
        })
    }

};