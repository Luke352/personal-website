const body = document.querySelector("body");
const checkbox = document.querySelector("input[type='checkbox']");

body.style.backgroundImage = "url('assets/bgimage1.jpg')";

checkbox.addEventListener("change", (event) => {
if (event.target.checked) {
body.style.backgroundImage = "url('assets/bgimage.jpg')";
} else {
body.style.backgroundImage = "url('assets/bgimage1.jpg')";
}
});

const textDisplay = document.getElementById('text')
const phrases = ["Hi I'm: IT Specialist", "Hi I'm: Superdad?", "Hi I'm: Freelance Developer", "Hi I'm: Luke Alexander"]
let i = 0
let j = 0 
let currentPhrase = []
let isDeleting = false
let isEnd = false

function loop () {
  isEnd = false
  textDisplay.innerHTML = currentPhrase.join('')

  if (i < phrases.length) {

    if (!isDeleting && j <= phrases[i].length) {
      currentPhrase.push(phrases[i][j])
      j++
      textDisplay.innerHTML = currentPhrase.join('')
    }

    if(isDeleting && j > phrases[i].indexOf(':') + 2) {
      currentPhrase.pop()
      j--
      textDisplay.innerHTML = currentPhrase.join('')
    }

    if (j == phrases[i].length) {
      isEnd = true
      isDeleting = true
    }

    if (isDeleting && j === phrases[i].indexOf(':') + 2) {
      currentPhrase = currentPhrase.slice(0, phrases[i].indexOf(':') + 2)
      isDeleting = false
      i++
      if (i === phrases.length) {
        i = 0
      }
    }
  }
  const spedUp = Math.random() * (70 -40) + 40
  const normalSpeed = Math.random() * (250 -150) + 150
  const time = isEnd ? 1700 : isDeleting ? spedUp : normalSpeed
  setTimeout(loop, time)
}

loop()


