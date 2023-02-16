// Select the body and checkbox elements
const body = document.querySelector("body");
const checkbox = document.querySelector("input[type='checkbox']");

// Set the initial background image for the body
body.style.backgroundImage = "url('assets/bgimage1.jpg')";

// Add an event listener to the checkbox
checkbox.addEventListener("change", (event) => {
// If the checkbox is checked, set the background image to "image2.jpeg"
if (event.target.checked) {
body.style.backgroundImage = "url('assets/bgimage.jpg')";
} else {
// If the checkbox is not checked, set the background image to "image1.jpeg"
body.style.backgroundImage = "url('assets/bgimage1.jpg')";
}
});

const textDisplay = document.getElementById('text')
const phrases = ["hi i'm: IT specialist", "hi i'm: superdad?", "hi i'm: freelance developer", "hi i'm: luke alexander"]
//const typingSound = document.getElementById('typingSound')
//const backspaceSound = document.getElementById('backspaceSound')
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

  /*function playSound(sound) {
    typingSound.pause();
    typingSound.currentTime = 0;
    backspaceSound.pause();
    backspaceSound.currentTime = 0;
    sound.play();
  }
  
  // Call the playSound function with the appropriate sound when typing or backspacing
  if (!isDeleting) {
    playSound(typingSound);
  } else {
    playSound(backspaceSound);
  }*/
}

loop()


