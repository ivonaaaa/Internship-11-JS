let employees = [];
let sectors = {};
let totalSalary = 0;

while (true) {
  let firstName = prompt("Unesite ime zaposlenika (ili 'stop' za kraj):");
  if (firstName.toLowerCase() === "stop") break;

  let lastName = prompt("Unesite prezime zaposlenika:");
  let sector = prompt("Unesite sektor rada zaposlenika:");

  let salary = parseFloat(prompt("Unesite plaću zaposlenika:"));
  if (isNaN(salary) || salary <= 0) {
    alert("Neispravan unos plaće! Mora biti pozitivan broj.");
    continue;
  }

  employees.push({ firstName, lastName, sector, salary });
  totalSalary += salary;

  if (!sectors[sector]) sectors[sector] = { totalSalary: 0, employees: [] };
  sectors[sector].totalSalary += salary;
  sectors[sector].employees.push({ firstName, lastName, salary });
}

let sortedSectors = Object.entries(sectors).sort(
  (a, b) => b[1].totalSalary - a[1].totalSalary
);

if (sortedSectors.length === 0) {
  console.log("Nema unesenih sektora.");
} else {
  console.log(
    "Ukupna plaća svih zaposlenika: " + totalSalary.toFixed(2) + " EUR"
  );

  console.log("Doprinosi sektora ukupnoj plaći:");
  sortedSectors.forEach(([sector, data]) => {
    let sectorContribution = (data.totalSalary / totalSalary) * 100;
    console.log(
      sector + ": " + sectorContribution.toFixed(2) + "% ukupne plaće"
    );

    console.log("Zaposlenici i njihov doprinos tom sektoru:");
    data.employees.forEach((emp) => {
      let employeeContribution = (emp.salary / data.totalSalary) * 100;
      console.log(
        "- " +
          emp.firstName +
          " " +
          emp.lastName +
          ": " +
          employeeContribution.toFixed(2) +
          "% sektora"
      );
    });
  });
}
