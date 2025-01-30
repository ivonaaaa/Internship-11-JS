let books = [];
let totalPrice = 0;

while (true) {
  let title = prompt("Unesite naslov knjige (ili 'stop' za kraj):");
  if (title.toLowerCase() === "stop") break;

  let price = parseFloat(prompt("Unesite cijenu knjige:"));
  if (isNaN(price) || price <= 0) {
    alert("Neispravan unos cijene! Mora biti pozitivan broj.");
    continue;
  }
  let genre = prompt("Unesite žanr knjige:");

  books.push({ title, price, genre });
  totalPrice += price;
}

if (books.length === 0) {
  console.log("Nema unesenih knjiga.");
} else {
  let avgPrice = totalPrice / books.length;
  console.log("Prosječna cijena knjiga:");
  console.log(avgPrice.toFixed(2));

  books.forEach((book) => (book.deviation = Math.abs(book.price - avgPrice)));
  let mostDeviatedBook = books.reduce(
    (max, book) => (book.deviation > max.deviation ? book : max),
    books[0]
  );
  console.log("Knjiga koja najviše odstupa:");
  if (books.length < 3) {
    console.log("Trebaju biti unesene barem 3 knjige za ovaj podatak.");
  } else {
    console.log(
      mostDeviatedBook.title + " - cijena: " + mostDeviatedBook.price
    );
  }

  books.sort((a, b) => b.deviation - a.deviation);
  console.log("Knjige sortirane prema odstupanju od prosjeka:");
  if (books.length < 3) {
    console.log("Trebaju biti unesene barem 3 knjige za ovaj podatak.");
  } else {
    books.forEach((book) =>
      console.log(book.title + " - cijena: " + book.price)
    );
  }
}
