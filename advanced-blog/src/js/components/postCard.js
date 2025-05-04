// Function to create a blog post card element
function createPostCard(post) {
    const card = document.createElement('article');
    card.classList.add('post-preview');

    const figure = document.createElement('figure');
    const img = document.createElement('img');
    img.src = post.imageUrl;
    img.alt = `Image for ${post.title}`;
    figure.appendChild(img);
    card.appendChild(figure);

    const postInfo = document.createElement('div');
    postInfo.classList.add('post-info');

    const title = document.createElement('h3');
    const titleLink = document.createElement('a');
    titleLink.href = `post.html?id=${post.id}`;
    titleLink.textContent = post.title;
    title.appendChild(titleLink);
    postInfo.appendChild(title);

    const meta = document.createElement('p');
    meta.classList.add('post-meta');
    meta.innerHTML = `By <a href="#">${post.author}</a> on <time datetime="${post.date}">${new Date(post.date).toLocaleDateString()}</time>`;
    postInfo.appendChild(meta);

    const excerpt = document.createElement('p');
    excerpt.textContent = post.excerpt;
    postInfo.appendChild(excerpt);

    card.appendChild(postInfo);
    return card;
}

// Function to render all post cards on the homepage
function renderPostCards(posts) {
    const postsList = document.getElementById('posts-list');
    posts.forEach(post => {
        const postCard = createPostCard(post);
        postsList.appendChild(postCard);
    });
}

// Example usage: Fetch posts from JSON and render them
fetch('../data/posts.json')
    .then(response => response.json())
    .then(data => renderPostCards(data))
    .catch(error => console.error('Error loading posts:', error));