import api from './src/Config/api';

const submit = document.querySelector('#submit');

const submitName = (e) => {
    const input = document.querySelector('#input');
    api.config.body.userName = input.value;
};


submit.addEventListener('click', () => {
    const container = document.querySelector('#inputContainer');
    container.style.display = 'none';
})