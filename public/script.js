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
function showPopup(element, showGithubIcon = false, githubLink = "") {
  const popup = document.getElementById("popup");
  const popupText = document.getElementById("popup-text");
  const githubPopUp = document.querySelector(".github-popup-btn");
  const githubIcon = document.querySelector(".fa-brands.fa-github");

  // Get the hidden content from the clicked box
  const content = element.querySelector(".hidden-content").innerHTML;

  // Set the content inside the popup
  popupText.innerHTML = content;

  // Show or hide the GitHub icon based on the parameter
  if (showGithubIcon) {
    githubPopUp.style.display = "inline-block";
    githubIcon.parentElement.href = githubLink; // Set the GitHub link if provided
  } else {
    githubPopUp.style.display = "none";
  }

  // Show the popup with animation
  popup.style.display = "flex";
  setTimeout(() => {
    document.querySelector(".popup-content").classList.add('show');
  }, 10);

  // Prevent scrolling
  disableScroll();
}

function closePopup() {
  const popup = document.getElementById("popup");

  // Remove the animation and hide the popup
  document.querySelector(".popup-content").classList.remove('show');
  setTimeout(() => {
    popup.style.display = "none";
  }, 500); // Delay matches animation duration

  enableScroll();
}

function disableScroll() {
  document.body.addEventListener('wheel', preventDefault, { passive: false });
}

function enableScroll() {
  document.body.removeEventListener('wheel', preventDefault);
}

function preventDefault(e) {
  e.preventDefault();
}