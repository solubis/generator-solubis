import './scss/app.scss';

let a = 'World';

console.log(`Hello ${a}`);

let element = document.querySelector('h1');
let subtitle = document.createElement('small');

subtitle.innerHTML = 'ES6 with SCSS';

element.appendChild(document.createTextNode(`Hello ${a}`));
element.appendChild(subtitle);

