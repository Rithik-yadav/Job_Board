// Hide the message after 5 seconds
document.addEventListener("DOMContentLoaded", function () {
  const alert = document.getElementById("alert");
  if (alert) {
    setTimeout(() => {
      alert.style.display = "none";
    }, 5000); // 5000 milliseconds = 5 seconds
  }
});
