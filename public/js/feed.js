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
    .trim();
  var jobCards = document.querySelectorAll(".job-card");

  jobCards.forEach(function (card) {
    var combinedText = [
      card.querySelector(".bold-heading")?.innerText,
      card.querySelector(".job-company")?.innerText,
      card.querySelector(".job-location")?.innerText,
      card.querySelector(".job-type")?.innerText,
      card.querySelector(".job-education")?.innerText,
      card.querySelector(".job-industry")?.innerText,
      card.querySelector(".job-salary")?.innerText,
      card.querySelector(".job-status")?.innerText,
      card.querySelector(".job-skills")?.innerText,
      card.querySelector(".job-benefits")?.innerText,
      card.querySelector(".job-company-website")?.innerText,
      card.querySelector(".job-contact-email")?.innerText,
    ]
      .join(" ")
      .toLowerCase();

    if (combinedText.includes(query)) {
      card.style.display = "";
    } else {
      card.style.display = "none";
    }
  });
});
document.getElementById("search-button").addEventListener("click", function () {
  filterJobs();
});

document.getElementById("filter-title").addEventListener("input", function () {
  filterJobs();
});

document
  .getElementById("filter-company")
  .addEventListener("input", function () {
    filterJobs();
  });

document.getElementById("filter-status").addEventListener("input", function () {
  filterJobs();
});

document.getElementById("filter-type").addEventListener("change", function () {
  filterJobs();
});

document
  .getElementById("filter-location")
  .addEventListener("input", function () {
    filterJobs();
  });

document
  .getElementById("filter-industry")
  .addEventListener("input", function () {
    filterJobs();
  });

function filterJobs() {
  var query = document
    .getElementById("search-input")
    .value.toLowerCase()
    .trim();
  var titleFilter = document
    .getElementById("filter-title")
    .value.toLowerCase()
    .trim();
  var companyFilter = document
    .getElementById("filter-company")
    .value.toLowerCase()
    .trim();
  var statusFilter = document
    .getElementById("filter-status")
    .value.toLowerCase()
    .trim();
  var typeFilter = document
    .getElementById("filter-type")
    .value.toLowerCase()
    .trim();
  var locationFilter = document
    .getElementById("filter-location")
    .value.toLowerCase()
    .trim();
  var industryFilter = document
    .getElementById("filter-industry")
    .value.toLowerCase()
    .trim();

  var jobCards = document.querySelectorAll(".job-card");

  jobCards.forEach(function (card) {
    var combinedText = [
      card.querySelector(".bold-heading")?.innerText,
      card.querySelector(".job-company")?.innerText,
      card.querySelector(".job-location")?.innerText,
      card.querySelector(".job-type")?.innerText,
      card.querySelector(".job-education")?.innerText,
      card.querySelector(".job-industry")?.innerText,
      card.querySelector(".job-salary")?.innerText,
      card.querySelector(".job-status")?.innerText,
      card.querySelector(".job-skills")?.innerText,
      card.querySelector(".job-benefits")?.innerText,
      card.querySelector(".job-company-website")?.innerText,
      card.querySelector(".job-contact-email")?.innerText,
    ]
      .join(" ")
      .toLowerCase();

    var jobTitle = card
      .querySelector(".bold-heading")
      ?.innerText.toLowerCase()
      .trim();
    var jobCompany = card
      .querySelector(".job-company")
      ?.innerText.toLowerCase()
      .trim();
    var jobStatus = card
      .querySelector(".job-status")
      ?.innerText.toLowerCase()
      .trim();
    var jobType = card
      .querySelector(".job-type")
      ?.innerText.toLowerCase()
      .trim();
    var jobLocation = card
      .querySelector(".job-location")
      ?.innerText.toLowerCase()
      .trim();
    var jobIndustry = card
      .querySelector(".job-industry")
      ?.innerText.toLowerCase()
      .trim();

    if (
      (query === "" || combinedText.includes(query)) &&
      (titleFilter === "" || jobTitle.includes(titleFilter)) &&
      (companyFilter === "" || jobCompany.includes(companyFilter)) &&
      (statusFilter === "" || jobStatus.includes(statusFilter)) &&
      (typeFilter === "" || jobType.includes(typeFilter)) &&
      (locationFilter === "" || jobLocation.includes(locationFilter)) &&
      (industryFilter === "" || jobIndustry.includes(industryFilter))
    ) {
      card.style.display = "";
    } else {
      card.style.display = "none";
    }
  });
}
// feed.js

document.addEventListener("DOMContentLoaded", function () {
  const filterBox = document.getElementById("filter-box");
  const toggleButton = document.getElementById("toggle-filters");

  toggleButton.addEventListener("click", function () {
    filterBox.classList.toggle("show");
    toggleButton.textContent = filterBox.classList.contains("show")
      ? "Hide Filters"
      : "Show Filters";
  });
});
