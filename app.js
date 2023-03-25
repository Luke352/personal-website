// DAY MODE / NIGHT MODE SWITCH 

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

/* TYPE WRITER HOME PAGE */

const textDisplay = document.getElementById('text')
const phrases = ["Hi I'm: IT SysAdmin", "Hi I'm: Cat Dad", "Hi I'm: Freelance WebDev", "Hi I'm: Luke Alexander", "Hi I'm: Nerd", "Hi I'm: Hiking Enthusiast", "Hi I'm: Your new hire?"]
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

/* PRE LOADER LOGIC */

// Array of assets to preload
const assets = [
  "assets/android-chrome-192x192.png",
  "assets/android-chrome-512x512.png",
  "assets/apple-touch-icon.png",
  "assets/bgimage.jpg",
  "assets/favicon-16x16.png",
  "assets/favicon-32x32.png",
  "assets/favicon.ico",
  "assets/github-icon.png",
  "assets/gmail-icon.png",
  "assets/headshot.jpg",
  "assets/headshot.png",
  "assets/html-icon.png",
  "assets/LA-project-banner.png",
  "assets/pdf-icon.png",
  "assets/png-icon.png",
  "assets/sample1.jpeg",
  "assets/sample2.jpeg",
  "assets/sample3.jpg",
  "assets/sample4.png",
  "assets/sample5.png",
  "assets/text-icon.png",
  "assets/under-construction.png"
  // Add additional assets here...
];

// Create a new Image object for each asset and preload it
assets.forEach((src) => {
  const image = new Image();
  image.src = src;
});

// Get all script tags
const scriptTags = document.querySelectorAll('script');

// Create an array to hold all the script URLs
const scriptURLs = [];

// Loop through all the script tags and add their URLs to the scriptURLs array
scriptTags.forEach(scriptTag => {
  const scriptURL = scriptTag.getAttribute('src');
  if (scriptURL) {
    scriptURLs.push(scriptURL);
  }
});

// Preload and cache all the scripts
scriptURLs.forEach(scriptURL => {
  const script = document.createElement('script');
  script.src = scriptURL;
  script.async = false;
  const targetElement = document.querySelector('main'); // replace with your desired element identifier
  targetElement.appendChild(script);
});



/* INDEX PAGE PRE LOADER */

var questions = [
  {question:"First Name"},
  {question:"Last Name"},
]

;(function(){

  var tTime = 100  // transition transform time from #register in ms
  var wTime = 200  // transition width time from #register in ms
  var eTime = 1000 // transition width time from inputLabel in ms

  // init
  // --------------
  var position = 0

  putQuestion()

  progressButton.addEventListener('click', validate)
  inputField.addEventListener('keyup', function(e){
    transform(0, 0) // ie hack to redraw
    if(e.keyCode == 13) validate()
  })

  // functions
  // --------------

  // load the next question
  function putQuestion() {
    inputLabel.innerHTML = questions[position].question
    inputField.value = ''
    inputField.type = questions[position].type || 'text'  
    inputField.focus()
    showCurrent()
  }
  
  // when all the questions have been answered
function done() {
    
  // remove the box if there is no next question
  register.className = 'close'
    
  // add the h1 at the end with the welcome text
  var h1 = document.createElement('h1')
  h1.appendChild(document.createTextNode('Welcome to my corner of the internet, ' + questions[0].value + ' ' + questions[1].value))
  setTimeout(function() {
    register.parentElement.appendChild(h1)     
    setTimeout(function() {h1.style.opacity = 1}, 50)
    
    // hide and remove the preloader after 5 seconds
    setTimeout(function() {
      const preloader = document.querySelector(".preloader");
      preloader.classList.add("hide");
      setTimeout(function() {
        preloader.remove();
      }, 1000); // delay for 1 second after adding "hide" class before removing the preloader
    }, 5000); // delay for 5 seconds after the welcome message is displayed
  }, eTime)
}
  // when submitting the current question
  function validate() {

    // set the value of the field into the array
    questions[position].value = inputField.value
  
    // check if the pattern matches
    if (!inputField.value.match(questions[position].pattern || /.+/)) wrong()
    else ok(function() {
      
      // set the progress of the background
      progress.style.width = ++position * 100 / questions.length + 'vw'
  
      // if there is a new question, hide current and load next
      if (questions[position]) hideCurrent(putQuestion)
      else {
        // if all questions have been answered correctly, call done() and hide/remove the preloader
        done();
  
        // hide and remove the preloader after 5 seconds
        setTimeout(function() {
          const preloader = document.querySelector(".preloader-wrapper");
          preloader.classList.add("hide");
          setTimeout(function() {
            preloader.remove();
          }, 1000); // delay for 1 second after adding "hide" class before removing the preloader
        }, 5000); // delay for 5 seconds after the welcome message is displayed
      }
    })
  
  }
  

  // helper
  // --------------

  function hideCurrent(callback) {
    inputContainer.style.opacity = 0
    inputProgress.style.transition = 'none'
    inputProgress.style.width = 0
    setTimeout(callback, wTime)
  }

  function showCurrent(callback) {
    inputContainer.style.opacity = 1
    inputProgress.style.transition = ''
    inputProgress.style.width = '100%'
    setTimeout(callback, wTime)
  }

  function transform(x, y) {
    register.style.transform = 'translate(' + x + 'px ,  ' + y + 'px)'
  }

  function ok(callback) {
    register.className = ''
    setTimeout(transform, tTime * 0, 0, 10)
    setTimeout(transform, tTime * 1, 0, 0)
    setTimeout(callback,  tTime * 2)
  }
}())