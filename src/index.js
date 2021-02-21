  const digits = new Map([
      [0, "zero"],
      [1, "one"],
      [2, "two"],
      [3, "three"],
      [4, "four"],
      [5, "five"],
      [6, "six"],
      [7, "seven"],
      [8, "eight"],
      [9, "nine"],
  ]);

  const dozens = new Map([
      [10, "ten"],
      [20, "twenty"],
      [30, "thirty"],
      [40, "forty"],
      [50, "fifty"],
      [60, "sixty"],
      [70, "seventy"],
      [80, "eighty"],
      [90, "ninety"],
  ]);

  const fromTenToTwenty = new Map([
      [11, "eleven"],
      [12, "twelve"],
      [13, "thirteen"],
      [14, "fourteen"],
      [15, "fifteen"],
      [16, "sixteen"],
      [17, "seventeen"],
      [18, "eighteen"],
      [19, "nineteen"],
  ]);

module.exports = function toReadable (number) {
  if (digits.has(number)) {
    return digits.get(number);
  } else if(number.toString().length === 2){
    return parseTwoDigits(number, dozens, fromTenToTwenty);
  } else if(number.toString().length === 3){
    return parseThreeDigits(number);
  }
  
}

function parseThreeDigits(number) {
    let firstDigit = Math.floor(number / 100);
    let firstPart = `${digits.get(firstDigit)} hundred`;
    let secondPart = '';
    let secondPartNumber = number % 100;
    if (secondPartNumber > 0) {
        secondPart = digits.has(secondPartNumber)
            ? digits.get(secondPartNumber)
            : parseTwoDigits(secondPartNumber);
    }

    return `${firstPart} ${secondPart}`.trim();
}

function parseTwoDigits(number) {
    if(number === 0){
        return '';
    }

    if (dozens.has(number)) {
        return dozens.get(number);
    } else if (fromTenToTwenty.has(number)) {
        return fromTenToTwenty.get(number);
    }

    let lastDigit = number % 10;
    let firstDigit = number - lastDigit;
    return `${dozens.get(firstDigit)} ${digits.get(lastDigit)}`;
}
