// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  const filterLocation = document.getElementById("filter-location");
  const filterCategory = document.getElementById("filter-category");
  const jobCards = document.querySelectorAll(".job-card");

  // Function to handle filtering
  function filterJobs() {
    const selectedLocation = filterLocation.value.toLowerCase();
    const selectedCategory = filterCategory.value.toLowerCase();

    jobCards.forEach((card) => {
      const location = card
        .querySelector(".job-location")
        .textContent.toLowerCase();
      const category = card
        .querySelector(".job-category")
        .textContent.toLowerCase();

      if (
        (selectedLocation === "" || location.includes(selectedLocation)) &&
        (selectedCategory === "" || category.includes(selectedCategory))
      ) {
        card.style.display = "block"; // Show the card if it matches the filter
      } else {
        card.style.display = "none"; // Hide the card if it doesn't match the filter
      }
    });
  }

  // Event listeners for filter changes
  filterLocation.addEventListener("change", filterJobs);
  filterCategory.addEventListener("change", filterJobs);
});
