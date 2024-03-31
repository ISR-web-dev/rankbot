const copyButton = document.getElementById('copy-button');
const genButton = document.getElementById('generate');
let textToCopy = `Hi [Client Name],
I hope you're happy with the [project/service]! If you have a moment, I'd really appreciate it if you could leave a review on the Following Link
[Link Text]
Thanks,
[Your Name]`;
let encodedText = encodeURIComponent(textToCopy);
let link = `https://api.whatsapp.com/send?phone=923204108963&text=`;

genButton.addEventListener('click', () => {


    let cCode = document.querySelector('.c-code').value;
    let waNum = document.querySelector('.wa-number').value;

    document.getElementById('generate').innerHTML = 'Generated';

    
    textToCopy = `Hi ${document.querySelector('.client-name').value},
I hope you're happy with the ${document.querySelector('.p-s').value}! If you have a moment, I'd really appreciate it if you could leave a review on the Following Link
${document.querySelector('.link').value}
Thanks,
${document.querySelector('.name').value}`;

    encodedText = encodeURIComponent(textToCopy);

    link = `https://api.whatsapp.com/send?phone=${cCode}${waNum}&text=${encodedText}`;

    document.querySelector('.wa-link').setAttribute('href', link);

    document.querySelector('.slider').classList.add('active');
    document.querySelector('.closer').classList.add('active');

    closer('slider')
});




function closer(elementClass) {
  document.querySelector('.closer').classList.add('active');

  document.querySelector('.closer').addEventListener('click', () => {
    document.querySelector(`.${elementClass}`).classList.remove('active');
    document.querySelector('.closer').classList.remove('active');
});

}


document.querySelector('.setting-button').addEventListener('click', () => {
  document.querySelector('.menu').classList.add('active');

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
  document.querySelector('.country-codes').classList.add('active');
  closer('country-codes');
});



document.querySelector('.pakistan').addEventListener('click', () => {
  const element = document.querySelector('.c-code');
  element.value = 92;

  document.querySelector(`.country-codes`).classList.remove('active');
  document.querySelector('.closer').classList.remove('active');

  saveInputValue('c-code');
});

document.querySelector('.uae').addEventListener('click', () => {
  const element = document.querySelector('.c-code');
  element.value = 971;

  document.querySelector(`.country-codes`).classList.remove('active');
  document.querySelector('.closer').classList.remove('active');

  
  saveInputValue('c-code');
});

document.querySelector('.india').addEventListener('click', () => {
  const element = document.querySelector('.c-code');
  element.value = 91;

  document.querySelector(`.country-codes`).classList.remove('active');
  document.querySelector('.closer').classList.remove('active');

  
  saveInputValue('c-code');
});








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
