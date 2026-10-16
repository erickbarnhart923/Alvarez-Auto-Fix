const quoteForm = document.querySelector("#quote-form");
const formStatus = document.querySelector("#form-status");

function createQuoteMailto(form) {
  const formData = new FormData(form);
  const service = form.querySelector("#service-category");
  const urgency = form.querySelector("#urgency-level");
  const details = [
    ["Name", formData.get("name")],
    ["Phone", formData.get("phone")],
    ["Vehicle", formData.get("vehicle")],
    ["Location", formData.get("location")],
    ["Service needed", service.selectedOptions[0].textContent],
    ["Urgency", urgency.selectedOptions[0].textContent],
    ["Description", formData.get("description") || "Not provided"],
    ["Senior or military discount", formData.has("discount") ? "Yes" : "No"],
  ];
  const body = details.map(([label, value]) => `${label}: ${value}`).join("\n");
  const subject = `Mobile mechanic quote request - ${formData.get("name")}`;

  return `mailto:alvarezautofix@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

quoteForm.addEventListener("submit", (event) => {
  event.preventDefault();

  formStatus.textContent =
    "Opening an email draft with your request. If it doesn't open, email alvarezautofix@gmail.com.";
  window.location.href = createQuoteMailto(quoteForm);
});
