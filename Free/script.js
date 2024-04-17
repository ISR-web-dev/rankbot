const copyButton = document.getElementById('copy-button');
const genButton = document.getElementById('generate');

let genCount = 0;
let selectionCount = 0;
if(localStorage.getItem("selectionCount")) {
restoreSelectionCount();
}
genCountRestore();


let selectedMessage = {title:messagesData[selectionCount].title, message:messagesData[selectionCount].message};
let textToCopy = selectedMessage.message;


function updateMessage() {
  selectedMessage = {title:messagesData[selectionCount].title, message:messagesData[selectionCount].message}
  textToCopy = selectedMessage.message;
}



let encodedText = encodeURIComponent(textToCopy);
let link = `https://api.whatsapp.com/send?phone=923204108963&text=`;



genButton.addEventListener('click', () => {

    if (genCount < 80) {
      let cCode = document.querySelector('.c-code').value;
      let waNum = document.querySelector('.wa-number').value;

      const clientName = document.querySelector('.client-name').value;
      const service = document.querySelector('.p-s').value;
      const linkInputed = document.querySelector('.link').value;
      const author = document.querySelector('.name').value;

      document.getElementById('generate').innerHTML = 'Generated';


      textToCopy = textToCopy.replace(/\[client_name\]/, clientName);
      textToCopy = textToCopy.replace(/\[service\]/, service); // Replace with project/service name
      textToCopy = textToCopy.replace(/\[link\]/, linkInputed); // Replace with actual link URL
      textToCopy = textToCopy.replace(/\[author\]/, author);

      encodedText = encodeURIComponent(textToCopy);

      link = `https://api.whatsapp.com/send?phone=${cCode}${waNum}&text=${encodedText}`;

      document.querySelector('.wa-link').setAttribute('href', link);

      genCount++;
      genCountSave();
      updateGenCount();

    } else {
      document.querySelector('.slider').innerHTML = `<h2>Limit Reached</h2>`;
    }
    activate('slider');
    activate('closer');

    closer('slider');


});

function activate(elementClass) {
  document.querySelector(`.${elementClass}`).classList.add('active');
}
function close(elementClass) {
  document.querySelector(`.${elementClass}`).classList.remove('active');
  document.querySelector('.closer').classList.remove('active');
}

function closer(elementClass) {
  activate('closer');

  document.querySelector('.closer').addEventListener('click', () => {
    close(elementClass);
});

}


document.querySelector('.setting-button').addEventListener('click', () => {
  activate('menu');

  closer('menu');

});

document.querySelector('.toggle').addEventListener('click', () => {
  document.querySelector('.circle').classList.toggle('active');
  document.querySelector('.wa-container').classList.toggle('closed');
  document.querySelector('.wa-button').classList.toggle('closed');
});



copyButton.addEventListener('click', () => {


  // Use Clipboard API for modern browsers
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(textToCopy).then(() => {
        document.getElementById('copy-button').innerHTML = 'Copied to Clipboard &#x2713;';
    }, () => {
      alert('Failed to copy text!');
    });
  } else {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = textToCopy;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    textArea.remove();
    alert('Text copied to clipboard (fallback method)');
  }
});





function saveLink() {
  // Get the input element and its value
  const linkElement = document.querySelector('.link');
  const linkValue = linkElement.value;

  // Store the value in local storage
  if (linkValue) {
    localStorage.setItem("savedLinkValue", linkValue);
  
    document.querySelector('.link').setAttribute('disabled', '');
    document.querySelector('.lock-btn').classList.add('locked');
  }    
  }

function restoreValue() {
  // Get the saved value from local storage (if it exists)
  const savedValue = localStorage.getItem("savedLinkValue");

  // If a saved value exists, set it back into the input field
  if (savedValue) {
      const inputElement = document.querySelector('.link');
      inputElement.value = savedValue;

      document.querySelector('.lock-btn').classList.add('locked');
      document.querySelector('.link').setAttribute('disabled', '');
  }
}

function reset() {
  localStorage.setItem("savedLinkValue", '');
  const inputElement = document.querySelector('.link');
  inputElement.value = '';
  document.querySelector('.link').removeAttribute('disabled', '');
  document.querySelector('.lock-btn').classList.remove('locked');
}

document.querySelector('.lock-btn').addEventListener('click', () => {
  const savedValue = localStorage.getItem("savedLinkValue");

  if (savedValue) {
    reset();
  } else {
    saveLink();
  }
});


window.onload = restoreValue;




document.querySelector('.change-country-btn').addEventListener('click', () => {
  activate('country-codes');
  closer('country-codes');
});


function createCountryCode(elementClass, cCode) {
  document.querySelector(`.${elementClass}`).addEventListener('click', () => {
    const element = document.querySelector('.c-code');
    element.value = cCode;
  
    document.querySelector(`.country-codes`).classList.remove('active');
    document.querySelector('.closer').classList.remove('active');
  
    
    saveInputValue('c-code');
  });
}



createCountryCode('india', 91);
createCountryCode('pakistan', 92);
createCountryCode('uae', 971);










function saveInputValue(className) {
  // Get all input elements with the specified class
  const input = document.querySelector(`.${className}`);

    const value = input.value;
    localStorage.setItem(`countryCode`, value);
}

// Function to restore saved values on page load
function restoreInputValue(className) {
  const inputs = document.querySelectorAll(`.${className}`);
  inputs.forEach(input => {
    const savedValue = localStorage.getItem(`countryCode`);
    if (savedValue) {
      input.value = savedValue;
    }
  });
}

  restoreInputValue('c-code');




  document.querySelector('.view-message').addEventListener('click', () => {
    close('menu');
    activate('message-container');
    closer('message-container');
    document.querySelector('.message-name').innerHTML = selectedMessage.title;
    document.querySelector('.message').innerHTML = selectedMessage.message;
  });

  function selection(fun) {
    if (!fun) {
      
    } else if(fun === 'add') {
      if(selectionCount < messagesData.length-1) {
        selectionCount++;
        selectionCountSave();
      }
      else {
        selectionCount = 0;
      }
    } else if(fun === 'remove') {
      if(selectionCount > 0) {
        selectionCount--;
        selectionCountSave();
      }
      else {
        selectionCount = messagesData.length-1;
      }
    } else {

    }
  }

  document.querySelector('.previous').addEventListener('click', () => {
    selection('remove');
    updateMessage();

    
    document.querySelector('.message-name').innerHTML = selectedMessage.title;
    document.querySelector('.message').innerHTML = selectedMessage.message;
  });

  document.querySelector('.next').addEventListener('click', () => {
    selection('add');
    updateMessage();

    
    document.querySelector('.message-name').innerHTML = selectedMessage.title;
    document.querySelector('.message').innerHTML = selectedMessage.message;
  });

  document.querySelector('.done').addEventListener('click', () => {
    close('message-container');
  });

  document.querySelector('.edit-message').addEventListener('click', () => {
    close('message-container');
    activate('custom-message');
    closer('custom-message');
  });


  


  function selectionCountSave() {
    localStorage.setItem("selectionCount", selectionCount);
  }
  function restoreSelectionCount() {
    selectionCount = Math.floor(localStorage.getItem("selectionCount"));
  }

  function genCountSave() {
    localStorage.setItem("genCount", genCount);
  }
  function genCountRestore() {
    genCount = Math.floor(localStorage.getItem("genCount", genCount));
  }
  function updateGenCount() {
    document.querySelector('.left').innerHTML = genCount;
    document.querySelector('.remaining').innerHTML = genCount;
  }

  updateGenCount();

  document.querySelector('.upgrade').addEventListener('click', () => {
    window.open('https://forms.gle/WP2W71EF5qrE3Y1PA');
  });