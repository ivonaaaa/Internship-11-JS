let equipment = [];
let continueAdding = true;

while (continueAdding) {
  let equipmentName = prompt("Unesite naziv opreme:");
  if (!equipmentName) {
    alert("Naziv opreme ne može biti prazan!");
    continue;
  }

  let price = prompt("Unesite cijenu opreme:");
  if (!price || isNaN(price) || parseFloat(price) <= 0) {
    alert("Molimo unesite pozitivan broj!");
    continue;
  }

  let status = prompt(
    "Unesite status opreme (dostupno/nedostupno):"
  ).toLowerCase();
  if (status !== "dostupno" && status !== "nedostupno") {
    alert("Status mora biti 'dostupno' ili 'nedostupno'!");
    continue;
  }

  equipment.push({
    equipmentName,
    price: parseFloat(price),
    status,
  });

  continueAdding = confirm("Želite li unijeti još opreme?");
}

let unavailableEquipment = [];
let availableEquipment = equipment.filter(function (item, index) {
  return item.status === "nedostupno"
    ? (unavailableEquipment.push(index), false)
    : true;
});

availableEquipment.sort((a, b) => {
  if (a.price === b.price) {
    return a.equipmentName.localeCompare(b.equipmentName);
  } else return a.price - b.price;
});

let totalValue = equipment.reduce((total, item) => total + item.price, 0);
let unavailableValue = unavailableEquipment.reduce(
  (total, index) => total + equipment[index].price,
  0
);
let unavailablePercentage = (unavailableValue / totalValue) * 100;

let priceRanges = {
  jeftina: [],
  srednja: [],
  skupa: [],
};
//ja sam stavila neke svoje izmisljene brojeve za ove rangove
//palo mi je napamet izracunat prosjecnu cjenu pa se po njoj ravnat
//al onda mi to nema smisla ako je sve npr preskupo
availableEquipment.forEach((item) => {
  if (item.price <= 20) {
    priceRanges.jeftina.push(item);
  } else if (item.price <= 50) {
    priceRanges.srednja.push(item);
  } else priceRanges.skupa.push(item);
});

let results = "Rezultati stanja opreme u skladištu:\n";
results +=
  "\nIndeksi nedostupne opreme: " + unavailableEquipment.join(", ") + "\n";
results += "\nDostupna oprema (sortirana):\n";
availableEquipment.forEach((item) => {
  results += "- " + item.equipmentName + " (" + item.price + " EUR)\n";
});
results +=
  "\nPostotak vrijednosti nedostupne opreme: " +
  unavailablePercentage.toFixed(2) +
  "%\n";
results += "\nGrupiranje prema cjenovnim rangovima:\n";
["jeftina", "srednja", "skupa"].forEach(function (range) {
  results +=
    "\n" + range.charAt(0).toUpperCase() + range.slice(1) + " oprema:\n";
  priceRanges[range].forEach(function (item) {
    results += "- " + item.equipmentName + " (" + item.price + " EUR)\n";
  });
});

console.log(results);
alert("Unos završen! Pogledajte konzolu za rezultate.");
