// Main JavaScript for Bloggy Blog

// Load posts and authors data
async function fetchJSON(path) {
    const response = await fetch(path);
    if (!response.ok) {
        throw new Error(`Failed to load ${path}: ${response.statusText}`);
    }
    return await response.json();
}

// Render a single post card
function createPostCard(post) {
    const card = document.createElement('article');
    card.className = 'post-card';
    card.innerHTML = `
        <img src="${post.image}" alt="Image for ${post.title}" class="post-image" />
        <div class="post-content">
            <h3 class="post-title">${post.title}</h3>
            <p class="post-excerpt">${post.content}</p>
            <p class="post-meta">By <span class="post-author">${post.author}</span> on <time datetime="${post.date}">${new Date(post.date).toLocaleDateString()}</time></p>
            <a href="pages/post.html?id=${post.id}" class="read-more">read more →</a>
        </div>
    `;
    return card;
}

// Render posts list including user contributed posts
async function renderPosts() {
    try {
        const postsList = document.getElementById('posts-list');
        postsList.innerHTML = '';

        // Load user contributed posts from localStorage
        const userPosts = JSON.parse(localStorage.getItem('userPosts')) || [];

        // Load default posts from JSON
        const defaultPosts = await fetchJSON('data/posts.json');

        // Combine user posts and default posts, user posts first
        const allPosts = [...userPosts, ...defaultPosts];

        allPosts.forEach(post => {
            const postCard = createPostCard(post);
            postsList.appendChild(postCard);
        });
    } catch (error) {
        console.error(error);
    }
}

// Theme toggling logic
function applyTheme(theme) {
    document.body.classList.remove('light-mode', 'playful-mode');
    if (theme === 'light') {
        document.body.classList.add('light-mode');
    } else if (theme === 'playful') {
        document.body.classList.add('playful-mode');
    }
    localStorage.setItem('theme', theme);
}

function toggleTheme() {
    const currentTheme = localStorage.getItem('theme') || 'dark';
    if (currentTheme === 'dark') {
        applyTheme('light');
    } else {
        applyTheme('dark');
    }
}

function togglePlayful() {
    const currentTheme = localStorage.getItem('theme') || 'dark';
    if (currentTheme === 'playful') {
        applyTheme('dark');
    } else {
        applyTheme('playful');
    }
}

function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    applyTheme(savedTheme);

    const themeToggleBtn = document.getElementById('theme-toggle');
    const playfulToggleBtn = document.getElementById('playful-toggle');

    themeToggleBtn.addEventListener('click', () => {
        toggleTheme();
    });

    playfulToggleBtn.addEventListener('click', () => {
        togglePlayful();
    });
}

// Initialize everything on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    renderPosts();
    initTheme();

    // Welcome overlay enter button
    const welcomeOverlay = document.getElementById('welcomeOverlay');
    const enterBtn = welcomeOverlay.querySelector('.enter-btn');
    enterBtn.addEventListener('click', () => {
        welcomeOverlay.style.display = 'none';
    });
});
