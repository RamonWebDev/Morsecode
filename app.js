let clipboardIcon = document.querySelector('.bx-clipboard');

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
    let inputMsg = document.getElementById('msg').value.trim(); 
    if(inputMsg){
        let encode = MorseCode.encode.call(this, inputMsg);
        if(encode){
            document.getElementById('encodeResult').innerHTML = encode;
        }  
    }else{
        alert('Invalid Text')
    }

}

//Decode messages from Morse code
function decodeMsg(){
    let inputMsg = document.getElementById('msg').value.trim();
    if(inputMsg){
        let decode = MorseCode.decode.call(this, inputMsg);
        if(decode){
            document.getElementById('decodeResult').innerHTML = decode;
        }   
    }else{
        alert('Invalid Code')
    }

}


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