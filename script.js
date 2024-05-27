const copyButton = document.getElementById('copy-button');
const genButton = document.getElementById('generate');

restoreCustomMessage();
let selectionCount = 0;
restoreSelectionCount();


let selectedMessage = {title:messagesData[selectionCount].title, message:messagesData[selectionCount].message};
let textToCopy = selectedMessage.message;


function updateMessage() {
  selectedMessage = {title:messagesData[selectionCount].title, message:messagesData[selectionCount].message}
  textToCopy = selectedMessage.message;
}



let encodedText = encodeURIComponent(textToCopy);
let link = `https://api.whatsapp.com/send?phone=923204108963&text=`;
let sms = `sms:+923204108963?&body=`;



genButton.addEventListener('click', () => {


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
    sms = `sms:+${cCode}${waNum}?&body=${encodedText}`;

    document.querySelector('.wa-link').setAttribute('href', link);
    document.querySelector('.sms-link').setAttribute('href', sms);

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



createCountryCode('afghanistan', '93');
createCountryCode('albania', '355');
createCountryCode('algeria', '213');
createCountryCode('american-samoa', '1-684');
createCountryCode('andorra', '376');
createCountryCode('angola', '244');
createCountryCode('anguilla', '1-264');
createCountryCode('antarctica', '672');
createCountryCode('antigua-and-barbuda', '1-268');
createCountryCode('argentina', '54');
createCountryCode('armenia', '374');
createCountryCode('aruba', '297');
createCountryCode('australia', '61');
createCountryCode('austria', '43');
createCountryCode('azerbaijan', '994');
createCountryCode('bahamas', '1-242');
createCountryCode('bahrain', '973');
createCountryCode('bangladesh', '880');
createCountryCode('barbados', '1-246');
createCountryCode('belarus', '375');
createCountryCode('belgium', '32');
createCountryCode('belize', '501');
createCountryCode('benin', '229');
createCountryCode('bermuda', '1-441');
createCountryCode('bhutan', '975');
createCountryCode('bolivia', '591');
createCountryCode('bosnia-and-herzegovina', '387');
createCountryCode('botswana', '267');
createCountryCode('brazil', '55');
createCountryCode('british-indian-ocean-territory', '246');
createCountryCode('british-virgin-islands', '1-284');
createCountryCode('brunei', '673');
createCountryCode('bulgaria', '359');
createCountryCode('burkina-faso', '226');
createCountryCode('burundi', '257');
createCountryCode('cambodia', '855');
createCountryCode('cameroon', '237');
createCountryCode('canada', '1');
createCountryCode('cape-verde', '238');
createCountryCode('cayman-islands', '1-345');
createCountryCode('central-african-republic', '236');
createCountryCode('chad', '235');
createCountryCode('chile', '56');
createCountryCode('china', '86');
createCountryCode('christmas-island', '61');
createCountryCode('cocos-islands', '61');
createCountryCode('colombia', '57');
createCountryCode('comoros', '269');
createCountryCode('cook-islands', '682');
createCountryCode('costa-rica', '506');
createCountryCode('croatia', '385');
createCountryCode('cuba', '53');
createCountryCode('curacao', '599');
createCountryCode('cyprus', '357');
createCountryCode('czech-republic', '420');
createCountryCode('democratic-republic-of-the-congo', '243');
createCountryCode('denmark', '45');
createCountryCode('djibouti', '253');
createCountryCode('dominica', '1-767');
createCountryCode('dominican-republic', '1-809, 1-829, 1-849');
createCountryCode('east-timor', '670');
createCountryCode('ecuador', '593');
createCountryCode('egypt', '20');
createCountryCode('el-salvador', '503');
createCountryCode('equatorial-guinea', '240');
createCountryCode('eritrea', '291');
createCountryCode('estonia', '372');
createCountryCode('ethiopia', '251');
createCountryCode('falkland-islands', '500');
createCountryCode('faroe-islands', '298');
createCountryCode('fiji', '679');
createCountryCode('finland', '358');
createCountryCode('france', '33');
createCountryCode('french-polynesia', '689');
createCountryCode('gabon', '241');
createCountryCode('gambia', '220');
createCountryCode('georgia', '995');
createCountryCode('germany', '49');
createCountryCode('ghana', '233');
createCountryCode('gibraltar', '350');
createCountryCode('greece', '30');
createCountryCode('greenland', '299');
createCountryCode('grenada', '1-473');
createCountryCode('guam', '1-671');
createCountryCode('guatemala', '502');
createCountryCode('guernsey', '44-1481');
createCountryCode('guinea', '224');
createCountryCode('guinea-bissau', '245');
createCountryCode('guyana', '592');
createCountryCode('haiti', '509');
createCountryCode('honduras', '504');
createCountryCode('hong-kong', '852');
createCountryCode('hungary', '36');
createCountryCode('iceland', '354');
createCountryCode('india', '91');
createCountryCode('indonesia', '62');
createCountryCode('iran', '98');
createCountryCode('iraq', '964');
createCountryCode('ireland', '353');
createCountryCode('isle-of-man', '44-1624');
createCountryCode('italy', '39');
createCountryCode('ivory-coast', '225');
createCountryCode('jamaica', '1-876');
createCountryCode('japan', '81');
createCountryCode('jersey', '44-1534');
createCountryCode('jordan', '962');
createCountryCode('kazakhstan', '7');
createCountryCode('kenya', '254');
createCountryCode('kiribati', '686');
createCountryCode('kosovo', '383');
createCountryCode('kuwait', '965');
createCountryCode('kyrgyzstan', '996');
createCountryCode('laos', '856');
createCountryCode('latvia', '371');
createCountryCode('lebanon', '961');
createCountryCode('lesotho', '266');
createCountryCode('liberia', '231');
createCountryCode('libya', '218');
createCountryCode('liechtenstein', '423');
createCountryCode('lithuania', '370');
createCountryCode('luxembourg', '352');
createCountryCode('macau', '853');
createCountryCode('macedonia', '389');
createCountryCode('madagascar', '261');
createCountryCode('malawi', '265');
createCountryCode('malaysia', '60');
createCountryCode('maldives', '960');
createCountryCode('mali', '223');
createCountryCode('malta', '356');
createCountryCode('marshall-islands', '692');
createCountryCode('mauritania', '222');
createCountryCode('mauritius', '230');
createCountryCode('mayotte', '262');
createCountryCode('mexico', '52');
createCountryCode('micronesia', '691');
createCountryCode('moldova', '373');
createCountryCode('monaco', '377');
createCountryCode('mongolia', '976');
createCountryCode('montenegro', '382');
createCountryCode('montserrat', '1-664');
createCountryCode('morocco', '212');
createCountryCode('mozambique', '258');
createCountryCode('myanmar', '95');
createCountryCode('namibia', '264');
createCountryCode('nauru', '674');
createCountryCode('nepal', '977');
createCountryCode('netherlands', '31');
createCountryCode('netherlands-antilles', '599');
createCountryCode('new-caledonia', '687');
createCountryCode('new-zealand', '64');
createCountryCode('nicaragua', '505');
createCountryCode('niger', '227');
createCountryCode('nigeria', '234');
createCountryCode('niue', '683');
createCountryCode('north-korea', '850');
createCountryCode('northern-mariana-islands', '1-670');
createCountryCode('norway', '47');
createCountryCode('oman', '968');
createCountryCode('pakistan', '92');
createCountryCode('palau', '680');
createCountryCode('palestine', '970');
createCountryCode('panama', '507');
createCountryCode('papua-new-guinea', '675');
createCountryCode('paraguay', '595');
createCountryCode('peru', '51');
createCountryCode('philippines', '63');
createCountryCode('pitcairn', '64');
createCountryCode('poland', '48');
createCountryCode('portugal', '351');
createCountryCode('puerto-rico', '1-787, 1-939');
createCountryCode('qatar', '974');
createCountryCode('republic-of-the-congo', '242');
createCountryCode('reunion', '262');
createCountryCode('romania', '40');
createCountryCode('russia', '7');
createCountryCode('rwanda', '250');
createCountryCode('saint-barthelemy', '590');
createCountryCode('saint-helena', '290');
createCountryCode('saint-kitts-and-nevis', '1-869');
createCountryCode('saint-lucia', '1-758');
createCountryCode('saint-martin', '590');
createCountryCode('saint-pierre-and-miquelon', '508');
createCountryCode('saint-vincent-and-the-grenadines', '1-784');
createCountryCode('samoa', '685');
createCountryCode('san-marino', '378');
createCountryCode('sao-tome-and-principe', '239');
createCountryCode('saudi-arabia', '966');
createCountryCode('senegal', '221');
createCountryCode('serbia', '381');
createCountryCode('seychelles', '248');
createCountryCode('sierra-leone', '232');
createCountryCode('singapore', '65');
createCountryCode('sint-maarten', '1-721');
createCountryCode('slovakia', '421');
createCountryCode('slovenia', '386');
createCountryCode('solomon-islands', '677');
createCountryCode('somalia', '252');
createCountryCode('south-africa', '27');
createCountryCode('south-korea', '82');
createCountryCode('south-sudan', '211');
createCountryCode('spain', '34');
createCountryCode('sri-lanka', '94');
createCountryCode('sudan', '249');
createCountryCode('suriname', '597');
createCountryCode('svalbard-and-jan-mayen', '47');
createCountryCode('swaziland', '268');
createCountryCode('sweden', '46');
createCountryCode('switzerland', '41');
createCountryCode('syria', '963');
createCountryCode('taiwan', '886');
createCountryCode('tajikistan', '992');
createCountryCode('tanzania', '255');
createCountryCode('thailand', '66');
createCountryCode('togo', '228');
createCountryCode('tokelau', '690');
createCountryCode('tonga', '676');
createCountryCode('trinidad-and-tobago', '1-868');
createCountryCode('tunisia', '216');
createCountryCode('turkey', '90');
createCountryCode('turkmenistan', '993');
createCountryCode('turks-and-caicos-islands', '1-649');
createCountryCode('tuvalu', '688');
createCountryCode('us-virgin-islands', '1-340');
createCountryCode('uganda', '256');
createCountryCode('ukraine', '380');
createCountryCode('united-arab-emirates', '971');
createCountryCode('united-kingdom', '44');
createCountryCode('united-states', '1');
createCountryCode('uruguay', '598');
createCountryCode('uzbekistan', '998');
createCountryCode('vanuatu', '678');
createCountryCode('vatican', '379');
createCountryCode('venezuela', '58');
createCountryCode('vietnam', '84');
createCountryCode('wallis-and-futuna', '681');
createCountryCode('western-sahara', '212');
createCountryCode('yemen', '967');
createCountryCode('zambia', '260');
createCountryCode('zimbabwe', '263');










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
    document.querySelector('.custom').value = selectedMessage.message;
    
    document.querySelector('.message-name').innerHTML = selectedMessage.title;
    document.querySelector('.message').innerHTML = selectedMessage.message;
  });

  document.querySelector('.next').addEventListener('click', () => {
    selection('add');
    updateMessage();
    document.querySelector('.custom').value = selectedMessage.message;

    
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

  document.querySelector('.reset-message').addEventListener('click', () => {
    if(document.querySelector('.reset-message').innerHTML === 'Reset'){
      document.querySelector('.custom').value = messagesData[0].message;
    } else {
    document.querySelector('.custom').value = selectedMessage.message;
    }
    document.querySelector('.submit-message').removeAttribute('disabled', '');
    document.querySelector('.custom').removeAttribute('readonly', '');
    document.querySelector('.reset-message').innerHTML = 'Reset';

    if (messagesData[messagesData.length-1].title === 'Custom') {
      messagesData.splice(messagesData.length-1, 1);
    }
  });

  document.querySelector('.submit-message').addEventListener('click', () => {
    if(document.querySelector('.custom').value) {

      document.querySelector('.submit-message').setAttribute('disabled', '');
      document.querySelector('.custom').setAttribute('readonly', '');
      document.querySelector('.reset-message').innerHTML = 'Unlock';

      messagesData.push({title:'Custom', message:document.querySelector('.custom').value});
      selectionCount = messagesData.length-1;
      selectionCountSave();
      updateMessage();
      storeCustomMessage();
    close('custom-message');


    }
  });
  
  function storeCustomMessage() {
    localStorage.setItem("customMessageName", selectedMessage.title);
    localStorage.setItem("customMessage", selectedMessage.message);
  }

  
  function restoreCustomMessage() {
    // Get the saved value from local storage (if it exists)
    const savedName = localStorage.getItem("customMessageName");
    const savedMessage = localStorage.getItem("customMessage");
  
    // If a saved value exists, set it back into the input field
    if (savedName && savedMessage) {
      document.querySelector('.submit-message').setAttribute('disabled', '');
      document.querySelector('.custom').setAttribute('readonly', '');
      document.querySelector('.reset-message').innerHTML = 'Unlock';
      messagesData.push({title:savedName, message:savedMessage});
    }
  }


  function selectionCountSave() {
    localStorage.setItem("selectionCount", selectionCount);
  }
  function restoreSelectionCount() {
    selectionCount = Math.floor(localStorage.getItem("selectionCount"));
  }



  document.querySelector('.custom').value = selectedMessage.message;