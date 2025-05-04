// --- Theme Toggle Logic ---
const themeToggleBtn = document.getElementById('theme-toggle');
const body = document.body;

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.classList.add(savedTheme);
    // Update button text based on saved theme
    themeToggleBtn.textContent = savedTheme === 'dark-theme' ? '☀️' : '🌙';
} else {
     // Default theme (light), set moon icon
     themeToggleBtn.textContent = '🌙';
}


themeToggleBtn.addEventListener('click', () => {
    body.classList.toggle('dark-theme');

    // Save the preference
    if (body.classList.contains('dark-theme')) {
        localStorage.setItem('theme', 'dark-theme');
        themeToggleBtn.textContent = '☀️'; // Sun icon for dark mode
    } else {
        localStorage.setItem('theme', 'light-theme'); // Or simply remove the key for default
        body.classList.remove('light-theme'); // Ensure only dark-theme class is toggled
        themeToggleBtn.textContent = '🌙'; // Moon icon for light mode
    }
});


// --- Basic Data Loading Structure (for index.html) ---
// This is a simplified example. In a real app, you'd fetch from an API.
// For this assignment, you can fetch from a local JSON file or use a JS array.

// Check if we are on the index page before trying to load posts
if (document.getElementById('posts-list')) {
    const postsListContainer = document.getElementById('posts-list');

    // Function to fetch posts (simulated)
    async function fetchPosts() {
        try {
            // Fetch from local JSON file
            const response = await fetch('data/posts.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const posts = await response.json();
            displayPosts(posts);
        } catch (error) {
            console.error("Could not fetch posts:", error);
            postsListContainer.innerHTML = "<p>Error loading posts.</p>";
        }
    }

    // Function to display posts
    function displayPosts(posts) {
        postsListContainer.innerHTML = ''; // Clear placeholder content
        posts.forEach(post => {
            const postElement = document.createElement('article');
            postElement.classList.add('post-preview');

            // Basic structure - build this out to match your HTML template
            postElement.innerHTML = `
                <figure>
                    <a href="post.html?id=${post.id}">
                        <img src="${post.image || 'https://via.placeholder.com/400x250?text=No+Image'}" alt="${post.title}">
                    </a>
                </figure>
                <div class="post-info">
                    <h3><a href="post.html?id=${post.id}">${post.title}</a></h3>
                    <p class="post-meta">By <a href="#">${post.author}</a> on <time datetime="${post.date}">${new Date(post.date).toDateString()}</time></p>
                    <p>${post.excerpt || post.content.substring(0, 150) + '...'}</p>
                </div>
            `;
            postsListContainer.appendChild(postElement);
        });
    }

    // Call fetchPosts when the page loads
    fetchPosts();
}


// --- Basic Post Loader Structure (for post.html) ---
// You would create a separate script file like `js/post-loader.js` for this
// and link it in `post.html` AFTER `script.js`.

/*
// In js/post-loader.js
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');

    if (!postId) {
        document.getElementById('post-headline').textContent = 'Post not found';
        document.getElementById('post-content').innerHTML = '<p>The requested post ID is missing.</p>';
        document.title = 'Post Not Found';
        return;
    }

    async function loadPost(id) {
         try {
            // Fetch from local JSON file (same source as index, or filter index data)
            const response = await fetch('data/posts.json');
             if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const posts = await response.json();
            const post = posts.find(p => p.id == id); // Use == for potential string/number match

            if (post) {
                document.title = post.title + ' - Your Advanced Blog';
                document.getElementById('post-title-tag').textContent = post.title + ' - Your Advanced Blog'; // Also update title tag
                document.getElementById('post-headline').textContent = post.title;
                document.getElementById('post-author').textContent = post.author;
                document.getElementById('post-date').setAttribute('datetime', post.date);
                document.getElementById('post-date').textContent = new Date(post.date).toDateString();
                 if (post.featureImage) {
                     document.getElementById('post-feature-image').src = post.featureImage;
                     document.getElementById('post-feature-image').alt = post.title; // Use title as alt text
                 } else {
                     // Hide or remove the feature image figure if no image
                     document.getElementById('post-feature-image').parentElement.style.display = 'none';
                 }


                // IMPORTANT: For rich content, you might need a simple markdown parser
                // or ensure your 'content' in JSON is already HTML or processed.
                // Simply inserting raw HTML from an untrusted source is a security risk,
                // but for a static assignment with local data, it's acceptable.
                document.getElementById('post-content').innerHTML = post.content;

            } else {
                document.getElementById('post-headline').textContent = 'Post not found';
                document.getElementById('post-content').innerHTML = '<p>The post with ID ' + id + ' was not found.</p>';
                 document.title = 'Post Not Found';
            }

        } catch (error) {
            console.error("Could not load post:", error);
             document.getElementById('post-headline').textContent = 'Error';
            document.getElementById('post-content').innerHTML = "<p>Could not load the post.</p>";
             document.title = 'Error Loading Post';
        }
    }

    loadPost(postId);
});
*/