const equipmentForm = document.getElementById("equipmentForm");
const equipmentNameInput = document.getElementById("equipmentName");
const priceInput = document.getElementById("price");
const equipmentList = document.getElementById("equipmentList");
const ratio = document.getElementById("ratio");

let equipment = [];

function addEquipment(event) {
  event.preventDefault();

  const name = equipmentNameInput.value;
  const price = parseFloat(priceInput.value);
  const status = document.querySelector('input[name="status"]:checked').value;

  if (!name || isNaN(price) || price <= 0) {
    alert("Molim vas ispravno unesite podatke");
    return;
  }
  equipment.push({ name, price, status });

  equipment.sort((a, b) => {
    if (a.status === b.status) {
      return a.name.localeCompare(b.name);
    }
    return a.status === "dostupno" ? -1 : 1;
  });

  displayEquipment();
  equipmentNameInput.value = "";
  priceInput.value = "";
}

function displayEquipment() {
  equipmentList.innerHTML = "";

  let availableCount = 0;
  let unavailableCount = 0;

  equipment.forEach(function (item) {
    const div = document.createElement("div");
    div.classList.add(item.status === "dostupno" ? "available" : "unavailable");
    div.textContent = item.name + " - " + item.price + " EUR";
    equipmentList.appendChild(div);

    if (item.status === "dostupno") {
      availableCount++;
    } else unavailableCount++;
  });

  const totalCount = availableCount + unavailableCount;
  const availableRatio =
    totalCount > 0 ? ((availableCount / totalCount) * 100).toFixed(2) : 0;
  const unavailableRatio =
    totalCount > 0 ? ((unavailableCount / totalCount) * 100).toFixed(2) : 0;

  ratio.innerHTML =
    "<p>Dostupna oprema: " +
    availableCount +
    " (" +
    availableRatio +
    "%)</p>" +
    "<p>Nedostupna oprema: " +
    unavailableCount +
    " (" +
    unavailableRatio +
    "%)</p>";
}

equipmentForm.addEventListener("submit", addEquipment);
