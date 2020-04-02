// let id = InhJtVWxBftuCrz5KBcL;
export default {
  config: {
    headers: {
      json: {
        'Content-Type': 'application/json',
      },
    },
    body: {
      user: '',
      score: 0,
      set userName(user) {
        this.user = user;
      },
      set userScore(score) {
        this.score = score;
      },
    },
    id: 'InhJtVWxBftuCrz5KBcL',
    url: 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/InhJtVWxBftuCrz5KBcL/scores',
  },
};
