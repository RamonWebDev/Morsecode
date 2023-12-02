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

function codeMsg(){
    let inputMsg = document.getElementById('encodeMsg').value.trim(); 
    if(inputMsg){
        let encode = MorseCode.encode.call(this, inputMsg);
        if(encode){
            document.getElementById('encodeResult').innerHTML = encode;
        }  
    }else{
        alert('Invalid Text')
    }

}

function decodeMsg(){
    let inputMsg = document.getElementById('decodeMsg').value.trim();
    if(inputMsg){
        let decode = MorseCode.decode.call(this, inputMsg);
        if(decode){
            document.getElementById('decodeResult').innerHTML = decode;
        }   
    }else{
        alert('Invalid Code')
    }

}
// Function to generate Morse code audio
function generateMorseCodeAudio(message) {
    // Check if the AudioContext is available
    const AudioContext = window.AudioContext || window.webkitAudioContext;
  
    if (AudioContext) {
      const audioContext = new AudioContext();
  
      // Set up gain node and connect it to the audio context
      const gainNode = audioContext.createGain();
      gainNode.gain.setValueAtTime(0.5, audioContext.currentTime);
      gainNode.connect(audioContext.destination);
  
      // Convert text to Morse code
      const morseCode = MorseCode.encode(message);
  
      // Play Morse code audio within a user-initiated event
      document.getElementById('playButton').addEventListener('click', () => {
        morseCode.split('').forEach((symbol, index) => {
          const oscillator = audioContext.createOscillator();
          oscillator.type = 'sine';
          oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
  
          if (symbol === '.') {
            oscillator.frequency.setValueAtTime(600, audioContext.currentTime + index * 0.3);
          } else if (symbol === '-') {
            oscillator.frequency.setValueAtTime(600, audioContext.currentTime + index * 0.3);
          } else if (symbol === ' ') {
            // Add space between Morse code symbols
            oscillator.frequency.setValueAtTime(0, audioContext.currentTime + index * 0.3);
          }
  
          // Connect oscillator to gain node and start/stop it
          oscillator.connect(gainNode);
          oscillator.start(audioContext.currentTime + index * 0.3);
          oscillator.stop(audioContext.currentTime + (index + 1) * 0.3);
        });
      });
    } else {
      console.error('AudioContext is not supported in this environment.');
    }
  }
  
  // Example usage
  generateMorseCodeAudio("HELLO");