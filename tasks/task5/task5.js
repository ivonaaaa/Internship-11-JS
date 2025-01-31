let students = [];
let continueAdding = true;

while (continueAdding) {
  let firstName = prompt("Unesite ime studenta:");
  if (!firstName) {
    alert("Ime ne može biti prazno!");
    continue;
  }

  let lastName = prompt("Unesite prezime studenta:");
  if (!lastName) {
    alert("Prezime ne može biti prazno!");
    continue;
  }

  let score = prompt("Unesite broj bodova (0-100):");
  if (!score || isNaN(score) || parseInt(score) < 0 || parseInt(score) > 100) {
    alert("Molimo unesite ispravan broj bodova (0-100)!");
    continue;
  }

  students.push({ firstName, lastName, score: parseInt(score) });
  continueAdding = confirm("Želite li unijeti još studenata?");
}

let scoreGroups = groupByScore(students);

Object.keys(scoreGroups).forEach((category) => {
  scoreGroups[category].students.sort((a, b) =>
    a.lastName.localeCompare(b.lastName)
  );
});

displayResults(scoreGroups);

function groupByScore(students) {
  let groups = {
    "0-25%": { students: [], totalScore: 0 },
    "25-50%": { students: [], totalScore: 0 },
    "50-75%": { students: [], totalScore: 0 },
    "75-100%": { students: [], totalScore: 0 },
  };

  students.forEach((student) => {
    let percentage = (student.score / 100) * 100;
    let category = "";

    if (percentage <= 25) category = "0-25%";
    else if (percentage <= 50) category = "25-50%";
    else if (percentage <= 75) category = "50-75%";
    else category = "75-100%";

    groups[category].students.push(student);
    groups[category].totalScore += student.score;
  });

  return groups;
}

function displayResults(scoreGroups) {
  let results = "Rezultati grupiranja studenata po bodovima:\n";

  Object.keys(scoreGroups).forEach((category) => {
    let group = scoreGroups[category];
    let avgScore =
      group.students.length > 0
        ? (group.totalScore / group.students.length).toFixed(2)
        : 0;

    results += "\n" + category + " (Prosječni bodovi: " + avgScore + "):\n";

    if (group.students.length === 0) {
      results += "Nema studenata u ovoj kategoriji.\n";
    } else {
      group.students.forEach((student) => {
        results +=
          "- " +
          student.lastName +
          ", " +
          student.firstName +
          " (" +
          student.score +
          " bodova)\n";
      });
    }
  });

  console.log(results);
  alert("Unos završen! Pogledajte konzolu za rezultate.");
}
