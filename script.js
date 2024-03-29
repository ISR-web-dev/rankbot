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


    let waNum = document.querySelector('.wa-number').value;

    document.getElementById('generate').innerHTML = 'Generated';

    encodedText = encodeURIComponent(textToCopy);
    
    textToCopy = `Hi ${document.querySelector('.client-name').value},
I hope you're happy with the ${document.querySelector('.p-s').value}! If you have a moment, I'd really appreciate it if you could leave a review on the Following Link
${document.querySelector('.link').value}
Thanks,
${document.querySelector('.name').value}`;

    link = `https://api.whatsapp.com/send?phone=92${waNum}&text=${encodedText}`;

    document.querySelector('.wa-link').setAttribute('href', link);

});


document.querySelector('.setting-button').addEventListener('click', () => {
  document.querySelector('.menu').classList.toggle('active');
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
