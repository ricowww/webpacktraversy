import generateJoke  from "./generateJoke";
import './styles/main.scss'
import laughing from './assets/laughing.svg'

const laugImg = document.getElementById('laughImg') //anchor point for image
    laughImg.src = laughing //set the source of the img element, set to the imported element

const jokeBtn = document.getElementById('jokeBtn') //button as object

jokeBtn.addEventListener('click', generateJoke) //trigger

generateJoke()


//console.log(generateJoke()); /* call joke module */


//console.log(123);