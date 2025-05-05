// JavaScript for post.html page - dynamic post content, comments, and sharing

async function fetchJSON(path) {
    const response = await fetch(path);
    if (!response.ok) {
        throw new Error(`Failed to load ${path}: ${response.statusText}`);
    }
    return await response.json();
}

function getPostIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

function renderPost(post) {
    const postContent = document.getElementById('post-content');
    postContent.innerHTML = `
        <h1>${post.title}</h1>
        <p class="post-meta">By ${post.author} on <time datetime="${post.date}">${new Date(post.date).toLocaleDateString()}</time></p>
        <img src="${post.image}" alt="Image for ${post.title}" class="post-image" />
        <div class="post-body">
            <p>${post.content}</p>
        </div>
    `;
}

function renderComments(comments) {
    const commentsList = document.getElementById('comments-list');
    commentsList.innerHTML = '';
    if (comments.length === 0) {
        commentsList.innerHTML = '<p>No comments yet. Be the first to comment!</p>';
        return;
    }
    comments.forEach(comment => {
        const commentDiv = document.createElement('div');
        commentDiv.className = 'comment';
        commentDiv.innerHTML = `
            <p><strong>${comment.author}</strong> says:</p>
            <p>${comment.text}</p>
        `;
        commentsList.appendChild(commentDiv);
    });
}

function loadComments(postId) {
    const comments = JSON.parse(localStorage.getItem(`comments_post_${postId}`)) || [];
    renderComments(comments);
}

function saveComment(postId, comment) {
    const comments = JSON.parse(localStorage.getItem(`comments_post_${postId}`)) || [];
    comments.push(comment);
    localStorage.setItem(`comments_post_${postId}`, JSON.stringify(comments));
}

function setupCommentForm(postId) {
    const form = document.getElementById('comment-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const author = form['comment-author'].value.trim();
        const text = form['comment-text'].value.trim();
        if (author && text) {
            saveComment(postId, { author, text });
            loadComments(postId);
            form.reset();
        }
    });
}

function setupShareButtons(postId) {
    const url = window.location.href;
    document.getElementById('share-twitter').addEventListener('click', () => {
        const shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`;
        window.open(shareUrl, '_blank');
    });
    document.getElementById('share-facebook').addEventListener('click', () => {
        const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        window.open(shareUrl, '_blank');
    });
    document.getElementById('share-linkedin').addEventListener('click', () => {
        const shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}`;
        window.open(shareUrl, '_blank');
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    const postId = getPostIdFromURL();
    if (!postId) {
        document.getElementById('post-content').innerHTML = '<p>Post not found.</p>';
        return;
    }
    try {
        const posts = await fetchJSON('../data/posts.json');
        const post = posts.find(p => p.id.toString() === postId);
        if (!post) {
            document.getElementById('post-content').innerHTML = '<p>Post not found.</p>';
            return;
        }
        renderPost(post);
        loadComments(postId);
        setupCommentForm(postId);
        setupShareButtons(postId);
    } catch (error) {
        console.error(error);
        document.getElementById('post-content').innerHTML = '<p>Error loading post.</p>';
    }
});
