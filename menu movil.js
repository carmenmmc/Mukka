const menuIcon = document.querySelector('.menu-icon');
const myMenu = document.querySelector('#myMenu');
const header = document.querySelector('header');
const menuItems = document.querySelectorAll('.menu-item');

if (menuIcon) {
  menuIcon.addEventListener('click', () => {
    myMenu.style.display = myMenu.style.display === 'inline' ? 'none' : 'inline';
    header.classList.toggle('menu-open');

    if (myMenu.style.display === 'inline') {
      menuIcon.innerHTML = '<i class="fas fa-times"></i>';
    } else {
      menuIcon.innerHTML = '<i class="fas fa-bars"></i>';
    }

    menuItems.forEach(item => {
      item.addEventListener('click', () => {
        myMenu.style.display = 'none';
        menuIcon.innerHTML = '<i class="fas fa-bars"></i>';
        header.classList.remove('menu-open');
      });
    });
  });
}
