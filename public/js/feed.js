function toggleDetails(button) {
  const jobCard = button.closest(".job-card");
  const additionalInfo = jobCard.querySelector(".job-additional-info");

  if (
    additionalInfo.style.display === "none" ||
    additionalInfo.style.display === ""
  ) {
    additionalInfo.style.display = "block";
    button.textContent = "Less Info";
  } else {
    additionalInfo.style.display = "none";
    button.textContent = "More Info";
  }
}
document.getElementById("search-button").addEventListener("click", function () {
  var query = document
    .getElementById("search-input")
    .value.toLowerCase()
    .replace(/-/g, " ");
  var jobCards = document.querySelectorAll(".job-card");

  jobCards.forEach(function (card) {
    var title = card.querySelector(".bold-heading").innerText.toLowerCase();
    var company = card.querySelector(".job-company").innerText.toLowerCase();
    var location = card.querySelector(".job-location").innerText.toLowerCase();
    var type = card.querySelector(".job-type").innerText.toLowerCase();
    var education = card
      .querySelector(".job-education")
      .innerText.toLowerCase();
    var industry = card.querySelector(".job-industry").innerText.toLowerCase();

    // Check salary range
    var salaryRange =
      card.querySelector(".job-salary")?.innerText.toLowerCase() || "";

    // Check additional info details
    var description =
      card.querySelector(".job-description")?.innerText.toLowerCase() || "";
    var experience =
      card.querySelector(".job-experience")?.innerText.toLowerCase() || "";
    var status =
      card.querySelector(".job-status")?.innerText.toLowerCase() || "";
    var skills =
      card.querySelector(".job-skills")?.innerText.toLowerCase() || "";
    var benefits =
      card.querySelector(".job-benefits")?.innerText.toLowerCase() || "";
    var companyWebsite =
      card.querySelector(".job-company-website")?.innerText.toLowerCase() || "";
    var contactEmail =
      card.querySelector(".job-contact-email")?.innerText.toLowerCase() || "";

    if (
      title.includes(query) ||
      company.includes(query) ||
      location.includes(query) ||
      type.includes(query) ||
      education.includes(query) ||
      industry.includes(query) ||
      salaryRange.includes(query) ||
      description.includes(query) ||
      experience.includes(query) ||
      status.includes(query) ||
      skills.includes(query) ||
      benefits.includes(query) ||
      companyWebsite.includes(query) ||
      contactEmail.includes(query)
    ) {
      card.style.display = "";
    } else {
      card.style.display = "none";
    }
  });
});
