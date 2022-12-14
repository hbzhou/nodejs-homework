const { stdin, stdout } = require("process");

stdin.on("data", (buf) => {
  const input = buf.toString();
  stdout.write(`${reverse(input)}\n`);
});

function reverse(input) {
  const charArr = input.split("");
  return charArr.reverse().join("");
}
