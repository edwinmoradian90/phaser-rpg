import 'phaser';
import GameButton from '../Objects/GameButton';
import { titleScene } from '../Config/style';
import api from '../Config/api';
import { postToLeaderboard } from '../Utils/api';
import axios from 'axios';

export default class LeaderboardScene extends Phaser.Scene {
    constructor() {
        super('Leaderboard');
        this.user = 'anon';
        this.score = 0;
        this.text = [];
    };

    init(data) {
        this.user = data.user;
        this.score = data.score;
    };

    postUserStats() {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const body = {
            'name': this.name,
            'score': this.score
        };

        axios.post(
            api.config.url,
            body,
            config
        )
            .then(res => {
                console.log(res);
            })
            .catch(err => console.log(err));
        console.log('loaded');
    };

    displayLeaderboard(info) {
        info.sort((a, b) => b.score - a.score)
            .filter((game, i) => i < 5)
            .map((game, i) => {
                let text = `Player: ${game.user} | Score: ${game.score}`;
                this.text.push(text)
                this.add.text(400, (60 * (i + 1)), text).setOrigin(0.5);
            });
    };

    getLeaderboard() {
        axios.get(api.config.url)
            .then(api => {
                const { result } = api.data;
                this.displayLeaderboard(result);
            })
            .catch(err => console.log(err));
    };

    create() {
        const data = { user: this.user, score: this.score };
        this.leaderboard = this.add.text(50, 60, 'Leader Board', titleScene.menu);
        this.userNameText = this.add.text(50, 120, `Name: ${this.user}`, titleScene.menu);
        this.userScoreText = this.add.text(50, 180, `Current Score: ${this.score}`, titleScene.menu);
        this.returnToGame = new GameButton(this, 'Game', 50, 240, 'Return to game', titleScene.menu, data);
        this.submitScore = this.add.text(50, 300, 'Submit Score', titleScene.menu).setInteractive();
        this.getLeaderboard();
        this.submitScore.on('pointerdown', () => {
            this.loading = true;
            postToLeaderboard(this.user, this.score);
            this.scene.restart();
        });
    };
};