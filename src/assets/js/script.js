const navbarToggle = document.getElementById('navbar-toggle');
const navbarMenu = document.querySelector('.navbar-menu');

navbarToggle.addEventListener('click', () => {
    navbarMenu.classList.toggle('active');
});

const listItems = document.querySelectorAll('.navbar-menu li');
const navbar = document.querySelector('.navbar-container');
let wrappedSet = false;

function checkTextWrapping() {
    if (window.matchMedia('(min-width: 769px)').matches) {
        if (navbar.clientHeight > 23 && !wrappedSet) {
            listItems.forEach(item => {
                item.classList.add('wrapped'); 
            });
            wrappedSet = true;
        } else if (navbar.clientHeight > 38 && wrappedSet) {
            console.log("Hello");
        } else {
            listItems.forEach(item => {
                item.classList.remove('wrapped'); 
            });
            wrappedSet = false;
        }
    }
}
  
  // Call the function initially
  checkTextWrapping();
  
  // Add an event listener to check when window resizes
  window.addEventListener('resize', checkTextWrapping);