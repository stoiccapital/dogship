document.addEventListener('DOMContentLoaded', async () => {
  try {
    // Load header
    const headerResponse = await fetch('/partials/header.html');
    const headerHtml = await headerResponse.text();
    document.getElementById('header').innerHTML = headerHtml;

    // Load footer
    const footerResponse = await fetch('/partials/footer.html');
    const footerHtml = await footerResponse.text();
    document.getElementById('footer').innerHTML = footerHtml;

    // Initialize navigation after header is loaded
    const hamburger = document.querySelector('.hamburger');
    const navList = document.querySelector('.nav__list');
    const dropdownToggles = document.querySelectorAll('.dropdown__toggle');

    console.log('Hamburger element:', hamburger);
    console.log('Nav list element:', navList);

    // Hamburger menu toggle
    if (hamburger) {
      hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        console.log('Hamburger clicked');
        hamburger.classList.toggle('active');
        navList.classList.toggle('active');
        hamburger.setAttribute('aria-expanded', navList.classList.contains('active'));
      });
    }

    // Dropdown toggles
    dropdownToggles.forEach(toggle => {
      toggle.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const dropdown = toggle.closest('.dropdown');
        const menu = dropdown.querySelector('.dropdown__menu');
        
        // Close other dropdowns
        dropdownToggles.forEach(otherToggle => {
          if (otherToggle !== toggle) {
            const otherDropdown = otherToggle.closest('.dropdown');
            const otherMenu = otherDropdown.querySelector('.dropdown__menu');
            otherMenu.classList.remove('active');
          }
        });

        menu.classList.toggle('active');
        toggle.setAttribute('aria-expanded', menu.classList.contains('active'));
      });
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.dropdown')) {
        document.querySelectorAll('.dropdown__menu').forEach(menu => {
          menu.classList.remove('active');
        });
        dropdownToggles.forEach(toggle => {
          toggle.setAttribute('aria-expanded', 'false');
        });
      }
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.nav') && navList.classList.contains('active')) {
        hamburger.classList.remove('active');
        navList.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });

  } catch (error) {
    console.error('Error loading partials:', error);
  }
});

