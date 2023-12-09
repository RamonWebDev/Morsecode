//Creator of Morse Code https://github.com/Syncthetic/MorseCode/tree/master
const MorseCode = {

    // Encode method that calls the internal 'morse' method with the provided data
    encode: (data) => {
      return MorseCode.morse.call(this, data);
    },
    
    // Decode method that calls the internal 'morse' method with the provided data and decode flag set to true
    decode: (data) => {
      return MorseCode.morse.call(this, data, true);
    },
  
    // Internal 'morse' method that performs encoding or decoding based on the 'decode' flag
    morse: (data, decode=false) => {
        // Morse code mapping for letters, numbers, and some punctuation  
      this.map = {
          a: '.-',      b: '-...',    c: '-.-.',    d: '-..',
          e: '.',       f: '..-.',    g: '--.',     h: '....',
          i: '..',      j: '.---',    k: '-.-',     l: '.-..',
          m: '--',      n: '-.',      o: '---',     p: '.--.',
          q: '--.-',    r: '.-.',     s: '...',     t: '-',
          u: '..-',     v: '...-',    w: '.--',     x: '-..-',
          y: '-.--',    z: '--..',    1: '.----',   2: '..---',
          3: '...--',   4: '....-',   5: '.....',   6: '-....',
          7: '--...',   8: '---..',   9: '----.',   0: '-----',
  
          '.': '.-.-.-',    ',': '--..--',    '?': '..--..',
          "'": '.----.',    '/': '-..-.',     '(': '-.--.',
          ')': '-.--.-',    '&': '.-...',     ':': '---...',
          ';': '-.-.-.',    '=': '-...-',     '+': '.-.-.',
          '-': '-....-',    '_': '..--.-',    '"': '.-..-.',
          '$': '...-..-',   '!': '-.-.--',    '@': '.--.-.',
          ' ': '/',
      };
      // If decoding is requested
      if(decode) {
        // Create a reverse mapping of Morse code to characters
        this.map = (
          () => {
            var tmp = {};
            var k;
            for(k in this.map) {
              if(!this.map.hasOwnProperty(k)) continue;
              tmp[this.map[k]] = k;
            }
            return tmp;
          }
        )();
        // Decode Morse code by splitting the input data, filtering valid codes, mapping to characters, and joining  
        return data.split(' ').filter( (v) => {
          return this.map.hasOwnProperty(v.toLowerCase());
        }).map( (v) => {
          return this.map[v.toLowerCase()].toUpperCase();
        }).join('');
  
      } else {
        // Encode text by splitting the input data, filtering valid characters, mapping to Morse code, and joining with spaces
        return data.split('').filter( (v) => {
          return this.map.hasOwnProperty(v.toLowerCase());
        }).map( (v) => {
          return this.map[v.toLowerCase()].toUpperCase();
        }).join(' ').replace(/,\/,/g, '/');// Replace spaces between words with '/'
      }
    },
  
  };

//Encode messages to Morse code
function codeMsg(){
    let inputMsg = document.getElementById('msg').value.trim(); //Remove white spaces 
    handleMorseCode(inputMsg)//calling function to encode
}

//Handles encoding messages
function handleMorseCode(inputMsg){
  if(inputMsg){//Checks if inputMsg is empty
    let encode = MorseCode.encode.call(this, inputMsg);//encode message
    if(encode){//if message is encoded
        document.getElementById('encodeResult').innerHTML = encode;//replace text with coded message
    }  
  }else{
      alert('Invalid Text')//triggers if inputMsg is empty
}
}

//Decode messages from Morse code
function decodeMsg(){
    let inputMsg = document.getElementById('msg').value.trim();//Remove white spaces 
    handleMorseDecode(inputMsg); //calling function to decode
}

function handleMorseDecode(inputMsg){
    if(inputMsg){//Checks if inputMsg is empty
      let decode = MorseCode.decode.call(this, inputMsg);//encode message
      if(decode){//if message is decoded
          document.getElementById('decodeResult').innerHTML = decode;//replace text with coded message
      }   
  }else{
      alert('Invalid Code') //triggers if inputMsg is empty
  }
}

//Event listener for copying code
document.addEventListener('DOMContentLoaded', function(){
  //get Icon
  let encodeIcon = document.querySelector('.encode')
  let decodeIcon = document.querySelector('.decode')
  
  //Call function if Icon clicked
  if(encodeIcon){
    encodeIcon.addEventListener('click', function(){
      copyEncode();
    })
  }
  //Call function if Icon clicked
  if(decodeIcon){
    decodeIcon.addEventListener('click', function(){
      copyDecode();
    })
  }
})


//Function to copy Encoded text
function copyEncode(){
  let encode = document.getElementById('encodeResult').innerHTML;
      // Copy the text
      navigator.clipboard.writeText(encode)
      .then(() => {
        console.log('Text copied to clipboard:', encode);
      })
      .catch(err => {
        console.error('Unable to copy text to clipboard', err);
      });
}

//Function to copy Decoded text
function copyDecode(){
  let decode = document.getElementById('decodeResult').innerHTML;
    // Copy the other text
    navigator.clipboard.writeText(decode)
      .then(() => {
        console.log('Text copied to clipboard:', decode);
      })
      .catch(err => {
        console.error('Unable to copy text to clipboard', err);
      });
}


function changeStylesheet() {
  // Get the selected value from the dropdown
  const selectedStylesheet = document.getElementById('stylesheetSelector').value;

  // Reset background for all styles except 'summer.css'
  if (selectedStylesheet !== 'summer.css') {
    document.body.style.backgroundImage = 'none';
  }

  // Check if the selected stylesheet is 'kimi.css'
  if (selectedStylesheet === 'kimi.css') {
    // If 'Kimi' is selected, change the kimi background
    changeKimiBackground();
  }

  // Check if the selected stylesheet is 'summer.css'
  if (selectedStylesheet === 'summer.css') {
    // If 'Summer' is selected, set the body background for summer
    document.body.style.backgroundImage = 'url("img/summer.jpg")';
    // Adjust the path to the actual image for the 'Summer' background
  }

  if (selectedStylesheet === 'fall.css') {
    document.body.style.backgroundImage = 'url("img/fall.avif")';
  }

  if (selectedStylesheet === 'spring.css') {
    document.body.style.backgroundImage = 'url("img/spring.jpg")';
  }

  // Save the selected value to localStorage
  localStorage.setItem('selectedStylesheet', selectedStylesheet);

  // Apply the selected stylesheet
  const stylesheetElement = document.getElementById("stylesheet");
  if (stylesheetElement) {
    stylesheetElement.setAttribute("href", selectedStylesheet);
  } else {
    console.error("Element with ID 'stylesheet' not found");
  }
}

// Apply the saved stylesheet on page load
const savedStylesheet = localStorage.getItem('selectedStylesheet') || 'style.css';
const stylesheetElement = document.getElementById("stylesheet");
if (stylesheetElement) {
  stylesheetElement.setAttribute("href", savedStylesheet);
} else {
  console.error("Element with ID 'stylesheet' not found");
}

function changeKimiBackground() {
  const kimiImages = [
      'img/kimi1.jpg',
      'img/kimi2.jpg',
      'img/kimi3.jpg',
      'img/kimi4.jpg',
      'img/kimi5.jpg',
      'img/kimi6.jpg',
      'img/kimi7.jpg',
      'img/kimi8.jpg',
      'img/kimi9.jpg',
      'img/kimi10.jpg',
  ];

  // Get a random kimi image URL
  const randomKimiImage = kimiImages[Math.floor(Math.random() * kimiImages.length)];

  // Set the background of the kimi section to the random kimi image
  document.body.style.backgroundImage = `url(${randomKimiImage})`;
}