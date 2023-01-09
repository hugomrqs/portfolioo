import nodemon from 'nodemon';
import test from '../data/users.json'
console.log(test)

fetch("/users.json")
.then(res => res.json())
.then(data => console.log(name))
const holder = document.querySelector('#parent')
dataUser.forEach(element => {
    const div = document.createElement('div')
    div.classList.add('img-container')
    const img = document.createElement('img')
    img.src=element.img
    div.appendChild(img)  
    const titre = document.createElement('H2')
    div.classList.add('nom')
    holder.appendChild(div)
});

const userInnerHTML = `
<div class="img-container">
    <img src="${img}" alt="${name}">
</div>
<div class="info">
    <span class="number">#${id}</span>
    <h3 class="name">${name}</h3>
    <small class="type">Type: <span>${type}</span> </small>
</div>
`
ScrollReveal().reveal('.test');