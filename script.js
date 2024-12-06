// bills input (the top one)

let billValue = "";

let billAmount = document.getElementById("numericInput");
billAmount.addEventListener("input", (event) => {
  let value = event.target.value;

  // Allow only digits and a single decimal point
  value = value.replace(/[^0-9.]/g, "");

  // Prevent more than one decimal point
  const parts = value.split(".");
  if (parts.length > 2) {
    value = parts[0] + "." + parts.slice(1).join("");
  }

  // Prevent leading zero unless followed by a decimal point
  if (value.length > 1 && value.startsWith("0") && value[1] !== ".") {
    value = value.replace(/^0+/, ""); // Remove all leading zeros
  }

  // Update the input value
  event.target.value = value;

  // Save the value to the global variable
  billValue = value;
  console.log(`Stored Value: ${billValue}`); // Log the updated value
});

// ________________________________________________________________________________________
// ________________________________________________________________________________________

// buttons 5% 15% 15% 50% and costum (it fits both) (in the center )

let buttonPercent = document.querySelectorAll(".tip-btn");

buttonPercent.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Remove "active" class from all buttons
    buttonPercent.forEach((btn) => btn.classList.remove("active"));
    costumValue = "";
    tipCostume.value = "";

    // Add "active" class to the clicked button
    btn.classList.add("active");

    // Get the text and number from the active button
    // Trigger calculation
    calculateAndDisplayResults();
  });
});

// ___________________________________________________________________________
// ___________________________________________________________________________

// only botom persents 5% 10% 15%
let number = 0; // Holds the numeric value from the active button
let text = ""; // Holds the text content from the active button

let btnValue = document.querySelectorAll(".btn_value");
btnValue.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Remove "active" class from all buttons

    // Get the text and number from the active button
    text = btn.textContent; // Get the text content, e.g., "5%"
    number = parseFloat(text); // Convert to a number, ignoring the "%"

    // Log the values to verify
    console.log(`Active Button Text: ${text}`);
    console.log(`Parsed Number: ${number}`);
  });
});

// ________________________________________________________________________________
// ________________________________________________________________________________

// only  costum input

let costumValue = "";

let tipCostume = document.getElementById("custom_tip");
tipCostume.addEventListener("input", (event) => {
  let value = event.target.value;

  // Allow only digits and a single decimal point
  value = value.replace(/[^0-9.]/g, "");

  // Prevent more than one decimal point
  const parts = value.split(".");
  if (parts.length > 2) {
    value = parts[0] + "." + parts.slice(1).join("");
  }

  // Prevent leading zero unless followed by a decimal point
  if (value.length > 1 && value.startsWith("0") && value[1] !== ".") {
    value = value.replace(/^0+/, ""); // Remove all leading zeros
  }

  // Update the input value
  event.target.value = value;
  costumValue = value;

  buttonPercent.forEach((btn) => btn.classList.remove("active"));
  number = 0; // Reset the button percentage

  console.log(`Custom Tip Value: ${costumValue}`);

  // Trigger calculation
  calculateAndDisplayResults();

  // Save the value to the global variable
});

// ____________________________________________________________________________________
// ____________________________________________________________________________________

// people input (how many people)

let people = document.getElementById("people");
let peopleAmount = ""; // Global variable to store the value

// Event listener for the "people" input
people.addEventListener("input", (event) => {
  let value = event.target.value;

  // Allow only digits and a single decimal point
  value = value.replace(/[^0-9.]/g, "");

  // Prevent starting with 0 unless it's followed by a decimal point
  if (value.length > 1 && value.startsWith("0")) {
    value = value.replace(/^0+/, ""); // Remove leading zeros
  }

  // Prevent input like ". " (dot followed by space)
  if (value.includes(". ")) {
    value = value.replace(". ", ".");
  }

  // Prevent standalone "." or trailing "."
  if (value === "." || value.endsWith(".")) {
    value = value.replace(".", "");
  }

  // Update the input value
  event.target.value = value;

  // Save the value to the global variable
  peopleAmount = value;
  console.log(`Stored Value for People: ${peopleAmount}`); // Log the updated value
});

// _____________________________________________________________________________________
// _____________________________________________________________________________________

// peopleAmount - how many people
// costumValue - costume tip
// number - button percent
// billValue - how much money
// tipCostume.value = "";  to change value
// people != 0
//

function calculateAndDisplayResults() {
  const bill = parseFloat(billValue) || 0; // Convert billValue to a number
  const people = parseInt(peopleAmount) || 1; // Ensure at least 1 person
  const tipPercentage = parseFloat(costumValue || number) || 0; // Use custom tip or button tip

  // Validate inputs
  if (people <= 0) {
    alert("Number of people cannot be zero or negative.");
    return;
  }

  // Calculate tip amount and total per person
  const tipAmount = (bill * (tipPercentage / 100)) / people;
  const totalPerPerson = bill / people + tipAmount;

  // Update the output
  const outputSections = document.querySelectorAll(
    ".output-section .output h2"
  );
  if (outputSections.length >= 2) {
    outputSections[0].textContent = `$${tipAmount.toFixed(2)}`; // Tip Amount
    outputSections[1].textContent = `$${totalPerPerson.toFixed(2)}`; // Total Amount
  }
}

// Attach event listeners (outside of calculateAndDisplayResults)
document.querySelectorAll("input, .tip-btn").forEach((input) => {
  input.addEventListener("input", calculateAndDisplayResults);
  input.addEventListener("click", calculateAndDisplayResults);
});

// Initial call to ensure outputs are calculated on page load
// calculateAndDisplayResults();

// ______________________________________________________________________________
// ______________________________________________________________________________

// reset

let reset = document.querySelector(".reset");

reset.addEventListener("click", () => {
  document.querySelectorAll("input").forEach((input) => {
    input.value = "";
  });

  peopleAmount = "";
  costumValue = "";
  number = 0;
  billValue = "";

  document.querySelectorAll(".tip-btn").forEach((btn) => {
    btn.classList.remove("active");
  });

  // Reset output values
  const outputSections = document.querySelectorAll(
    ".output-section .output h2"
  );
  if (outputSections.length >= 2) {
    outputSections[0].textContent = "$0.00"; // Tip Amount
    outputSections[1].textContent = "$0.00"; // Total Amount
  }
});
