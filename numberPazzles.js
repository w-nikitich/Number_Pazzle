const fileInput = document.getElementsByTagName('input')[0];

fileInput.addEventListener('change', function(event) {
   const file = event.target.files[0];
   const reader = new FileReader();
   reader.onload = function() {
    try {
      const numbers = reader.result;
      const formattedNumberArray = numbers.split(/[ ,;\n]+/);
      numberPazzles(formattedNumberArray);
    } catch (error) {
      alert('Something went wrong. Check if your TXT file contains numbers');
      console.log(error);
    }
   };

   reader.onerror = function() {
    alert('There was an error reading the file.');
   };

    reader.readAsText(file);
})

function numberPazzles(numbers) {
  let maxPazzleLine = '';
  const frontMap = {};
  const backMap = {};
  const usedNumbers = new Set();

  numbers.forEach(number => {
    const strNumber = number.toString();
    const front = strNumber.substring(0, 2);
    const back = strNumber.substring(strNumber.length - 2);

    if (!frontMap[front]) frontMap[front] = [];
    if (!backMap[back]) backMap[back] = [];
    frontMap[front].push(strNumber);
    backMap[back].push(strNumber);
  });
    
  numbers.forEach(number => {
    const strNumber = number.toString();
    const front = strNumber.substring(0, 2);
    const back = strNumber.substring(strNumber.length - 2);

    if (usedNumbers.has(strNumber)) return;

    if (backMap[front] && backMap[front].length > 0) {
      for (let toCheckNumber of backMap[front]) {
        if (toCheckNumber !== strNumber && !usedNumbers.has(toCheckNumber)) {
          usedNumbers.add(strNumber);
          usedNumbers.add(toCheckNumber);
          const removedConnectorFromCur = strNumber.substring(2);
          const removedConnectorFromChecked = toCheckNumber.substring(0, toCheckNumber.length - 2);
          maxPazzleLine += `${removedConnectorFromChecked}${removedConnectorFromCur}`;
          break;
        }
      }
    }
  });
  
  console.log('maxPazzle: '+ maxPazzleLine);
  return maxPazzleLine;
}


