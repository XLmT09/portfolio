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

  // Get the hidden content from the clicked box
  const content = element.querySelector(".hidden-content").innerHTML;

  // Set the content inside the popup
  popupText.innerHTML = content;

  // Show the popup with animation
  popup.style.display = "flex";
  setTimeout(() => {
    document.querySelector(".popup-content").classList.add('show');
  }, 10);

  // Prevent scrolling
  document.body.classList.add("no-scroll");
}

function closePopup() {
  const popup = document.getElementById("popup");

  // Remove the animation and hide the popup
  document.querySelector(".popup-content").classList.remove('show');
  setTimeout(() => {
    popup.style.display = "none";
  }, 500); // Delay matches animation duration

  // Enable scrolling
  document.body.classList.remove("no-scroll");
}
