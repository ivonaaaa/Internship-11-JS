let plants = [];
let continueAdding = true;

while (continueAdding) {
  let plantName = prompt("Unesite naziv biljke:");
  if (!plantName) {
    alert("Naziv biljke ne može biti prazan!");
    continue;
  }

  let color = prompt("Unesite boju biljke:");
  if (!color) {
    alert("Boja biljke ne može biti prazna!");
    continue;
  }

  let calories = prompt("Unesite broj kalorija:");
  if (!calories || isNaN(calories) || parseInt(calories) <= 0) {
    alert("Molimo unesite pozitivan cijeli broj!");
    continue;
  }

  plants.push({ plantName, color, calories: parseInt(calories) });
  continueAdding = confirm("Želite li unijeti još jednu biljku?");
}

let colorGroups = groupByColor(plants);
let sortedColors = Object.keys(colorGroups).sort();

displayResults(colorGroups, sortedColors);

function groupByColor(plants) {
  return plants.reduce((groups, plant) => {
    if (!groups[plant.color]) {
      groups[plant.color] = { totalCalories: 0, plants: [] };
    }
    groups[plant.color].totalCalories += plant.calories;
    groups[plant.color].plants.push(plant);
    return groups;
  }, {});
}

function displayResults(colorGroups, sortedColors) {
  let results = "Rezultati grupiranja biljaka po boji:\n";

  sortedColors.forEach((color) => {
    let group = colorGroups[color];
    results += "\n" + color + ":\n";
    results += "Ukupne kalorije: " + group.totalCalories + "\n";
    group.plants.forEach((plant) => {
      results +=
        "- " + plant.plantName + " (" + plant.calories + " kalorija)\n";
    });
  });

  let topColors = sortedColors
    .map((color) => ({
      color,
      totalCalories: colorGroups[color].totalCalories,
    }))
    .sort((a, b) => b.totalCalories - a.totalCalories)
    .slice(0, 3);

  results += "\nTri boje s najvećim kalorijskim doprinosom:\n";
  topColors.forEach((color) => {
    results += color.color + ": " + color.totalCalories + " kalorija\n";
  });

  console.log(results);
  alert("Unos završen! Pogledajte konzolu za rezultate.");
}
