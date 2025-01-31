let employees = [];
let industries = {};

while (true) {
  let firstName = prompt("Unesite ime zaposlenika (ili 'stop' za kraj):");
  if (firstName.toLowerCase() === "stop") break;

  let lastName = prompt("Unesite prezime zaposlenika:");
  let industry = prompt("Unesite industriju zaposlenika:");
  let salary = parseFloat(prompt("Unesite plaću zaposlenika:"));
  if (isNaN(salary) || salary <= 0) {
    alert("Neispravan unos plaće! Mora biti pozitivan broj.");
    continue;
  }

  employees.push({ firstName, lastName, industry, salary });

  if (!industries[industry]) {
    industries[industry] = { totalSalary: 0, count: 0 };
  }
  industries[industry].totalSalary += salary;
  industries[industry].count++;
}

let sortedIndustries = Object.entries(industries)
  .filter(([_, data]) => data.count >= 2)
  .sort(
    (a, b) => b[1].totalSalary / b[1].count - a[1].totalSalary / a[1].count
  );

if (sortedIndustries.length === 0) {
  console.log("Nema industrija s najmanje dva zaposlenika.");
} else {
  console.log("Industrije poredane po prosječnoj plaći silazno:");
  sortedIndustries.forEach(([industry, data]) => {
    let avgSalary = data.totalSalary / data.count;
    console.log(
      industry +
        ": Prosječna plaća " +
        avgSalary.toFixed(2) +
        ", broj zaposlenih: " +
        data.count
    );
  });
}
