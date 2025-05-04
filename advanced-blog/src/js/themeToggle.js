// This file contains the logic for toggling between light and dark themes.

const themeToggleButton = document.getElementById('theme-toggle');
const body = document.body;

// Load the user's theme preference from localStorage
const currentTheme = localStorage.getItem('theme') || 'light';
body.classList.add(currentTheme);

// Update the button's appearance based on the current theme
updateButtonAppearance(currentTheme);

themeToggleButton.addEventListener('click', () => {
    // Toggle between light and dark themes
    const newTheme = body.classList.contains('light') ? 'dark' : 'light';
    body.classList.toggle('light', newTheme === 'light');
    body.classList.toggle('dark', newTheme === 'dark');

    // Save the user's theme preference to localStorage
    localStorage.setItem('theme', newTheme);

    // Update the button's appearance
    updateButtonAppearance(newTheme);
});

function updateButtonAppearance(theme) {
    if (theme === 'dark') {
        themeToggleButton.innerHTML = '🌙'; // Moon icon for dark mode
    } else {
        themeToggleButton.innerHTML = '☀️'; // Sun icon for light mode
    }
}