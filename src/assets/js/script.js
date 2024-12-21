const navbarToggle = document.getElementById('navbar-toggle');
const navbarMenu = document.querySelector('.navbar-menu');

navbarToggle.addEventListener('click', () => {
    navbarMenu.classList.toggle('active');
});

// Close the menu when clicking anywhere outside
document.addEventListener('click', (event) => {
    if (!navbarMenu.contains(event.target) && !navbarToggle.contains(event.target)) {
        navbarMenu.classList.remove('active');
    }
});

function showPopup(element) {
  const popup = document.getElementById("popup");
  const popupText = document.getElementById("popup-text");

  // Get the hidden content and show it in the popup
  const content = element.querySelector(".hidden-content").innerHTML;
  popupText.innerHTML = content; // Display the content in popup
  popup.style.display = "flex";  // Show the popup
  document.body.classList.add(popupContent);  // Disable scrolling
  document.body.classList.add("no-scroll");  // Disable scrolling
}

function closePopup() {
  const popup = document.getElementById("popup");
  popup.style.display = "none";  // Hide the popup
  document.body.classList.remove("no-scroll");  // Enable scrolling
}

window.addEventListener("resize", function() {
  location.reload();
});