import axios from 'axios';
import api from '../Config/api';

export const postToLeaderboard = (user = 'anon', score = 0) => {
    const { url, body, headers } = api.config;
    api.config.body.userScore = score;
    api.config.body.userName = user;
    axios.post(url, body, headers)
        .then(res => console.log(res))
        .catch(err => console.log(err));
};

