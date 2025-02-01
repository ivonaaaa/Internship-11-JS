const cityForm = document.getElementById("cityForm");
const downloadButton = document.getElementById("downloadButton");

let cities = [];

function getCityList() {
  let cityInput = prompt("Unesite popis gradova:");

  if (!cityInput || !cityInput.includes(",")) {
    const retry = confirm("Morate odvojit gradove zarezom!");
    if (retry) getCityList();
    else return;
  }
  cities = cityInput.split(",").map((city) => city.trim());

  if (cities.some((city) => city === "")) {
    alert("Neki gradovi su prazni, unesite ispravan popis.");
    return;
  }

  cities.sort();
  cities = cities.filter((city) => city.length > 5);

  const csv = cities.join(", ");
  console.log("CSV format gradova:\n" + csv);
}

function downloadCSV() {
  if (cities.length === 0) {
    alert("Nema gradova za preuzimanje.");
    return;
  }
  const csvContent = cities.join(", ");
  const blob = new Blob([csvContent], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "gradovi.txt";
  link.click();
}

cityForm.addEventListener("submit", function (event) {
  event.preventDefault();
  console.log("Unos gradova aktiviran");
  getCityList();
});

downloadButton.addEventListener("click", downloadCSV);
