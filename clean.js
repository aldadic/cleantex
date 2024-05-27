// Function that removes the command and its arguments from the input string
// and returns the cleaned string and the number of commands found.

function cleanString(input, command) {
  let counter = 0;

  function clean(text) {
    let cleaned = '';
    let record = false;
    let temp = '';
    let openBraces = 0;

    for (let i = 0; i < text.length; i++) {
      if (text.substring(i, i + command.length) === command && !record) {
        record = true;
        openBraces++;
        i += command.length;
      } else if (text[i] === '{' && record) {
        temp += text[i];
        openBraces++;
      } else if (text[i] === '}' && record) {
        if (openBraces === 1) {
          record = false;
          cleaned += temp;
          temp = '';
          counter++;
        } else {
          temp += text[i];
        }
        openBraces--;
      } else if (record) {
        temp += text[i];
      } else {
        cleaned += text[i];
      }
    }

    return cleaned;
  }

  let output = clean(input);
  let previousOutput = input;
  while (output !== previousOutput) {
    previousOutput = output;
    output = clean(output);
  }

  return [output, counter];
}
