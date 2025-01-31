function calculateMedian(array) {
  let length = array.length;
  let middle = Math.floor(length / 2);

  if (length % 2 === 1) {
    return array[middle];
  } else return (array[middle - 1] + array[middle]) / 2;
}

let input = prompt("Unesite neki broj n:");
let n = parseInt(input);

if (isNaN(n) || n <= 0) {
  alert("Molim vas unesite pozitivni broj.");
} else {
  let squares = Array.from({ length: n }, (element, i) => (i + 1) ** 2);

  let sum = squares.reduce((acc, num) => acc + num, 0);
  let average = sum / n;
  let median = calculateMedian(squares);

  console.log(
    "Prvih " + n + " kvadrata prirodnih brojeva: " + squares.join(", ")
  );
  console.log("Ukupni zbroj: " + sum);
  console.log("Prosjecna vrijednost: " + average);
  console.log("Medijan: " + median);

  alert("Izračun završen! Pogledajte konzolu za rezultate.");
}
