const copyButton = document.getElementById('copy-button');
const genButton = document.getElementById('generate');


genButton.addEventListener('click', () => {
    document.querySelector('.client-name-text').innerHTML = document.querySelector('.client-name').value;
    document.querySelector('.p-s-text').innerHTML = document.querySelector('.p-s').value;
    document.querySelector('.link-text').innerHTML = document.querySelector('.link').value;
    document.querySelector('.name-text').innerHTML = document.querySelector('.client-name').value;

    document.getElementById('generate').innerHTML = 'Generated';
});






copyButton.addEventListener('click', () => {
  const textToCopy = document.querySelector('.output').textContent;

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
