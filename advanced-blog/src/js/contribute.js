// JavaScript for contribute.html - handle new blog post submissions

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contribute-form');
    const messageDiv = document.getElementById('form-message');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const title = form['post-title'].value.trim();
        const author = form['post-author'].value.trim();
        const image = form['post-image'].value.trim();
        const content = form['post-content'].value.trim();

        if (!title || !author || !content) {
            messageDiv.textContent = 'Please fill in all required fields.';
            messageDiv.style.color = 'red';
            return;
        }

        // Get existing posts from localStorage or empty array
        const existingPosts = JSON.parse(localStorage.getItem('userPosts')) || [];

        // Create new post object with unique id
        const newPost = {
            id: Date.now(),
            title,
            author,
            image: image || 'https://via.placeholder.com/400x250?text=Blog+Image',
            content,
            date: new Date().toISOString().split('T')[0]
        };

        // Add new post to array and save back to localStorage
        existingPosts.unshift(newPost);
        localStorage.setItem('userPosts', JSON.stringify(existingPosts));

        // Clear form and show success message
        form.reset();
        messageDiv.textContent = 'Thank you for your contribution! Your post has been added.';
        messageDiv.style.color = 'green';
    });
});
