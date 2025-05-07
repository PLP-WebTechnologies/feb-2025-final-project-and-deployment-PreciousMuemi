document.addEventListener('DOMContentLoaded', () => {
    // Theme toggle functionality
    const themeToggle = document.getElementById('themeToggle');
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    themeToggle.textContent = savedTheme === 'dark' ? '☀️' : '🌙';

    // Theme toggle click handler
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        // Update theme
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Update toggle button icon
        themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
        
        // Add animation class
        document.body.classList.add('theme-transition');
        setTimeout(() => {
            document.body.classList.remove('theme-transition');
        }, 300);
    });

    // DOM elements
    const searchBtn = document.getElementById('searchBtn');
    const closeSearch = document.getElementById('closeSearch');
    const searchContainer = document.getElementById('searchContainer');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.querySelector('.nav-links');
    const backToTop = document.getElementById('backToTop');
    const contributeModal = document.getElementById('contributeModal');
    const closeModal = document.getElementById('closeModal');
    const contributeForm = document.getElementById('contributeForm');
    const toast = document.getElementById('toast');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    const tags = document.querySelectorAll('.tag');
    const newsletterForms = document.querySelectorAll('.newsletter-form');

    // Search functionality
    searchBtn.addEventListener('click', () => {
        searchContainer.style.display = 'flex';
        setTimeout(() => {
            searchContainer.querySelector('input').focus();
        }, 100);
    });

    closeSearch.addEventListener('click', () => {
        searchContainer.style.display = 'none';
    });

    // Mobile menu toggle
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuBtn.textContent = navLinks.classList.contains('active') ? '×' : '☰';
    });

    // Back to top button
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Modal functionality
    document.querySelectorAll('a[href="#contribute"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            contributeModal.classList.add('active');
        });
    });

    // For the contribute link in the navigation
    document.querySelector('a[href*="contribute"]').addEventListener('click', (e) => {
        e.preventDefault();
        contributeModal.classList.add('active');
    });

    closeModal?.addEventListener('click', () => {
        contributeModal.classList.remove('active');
    });

    // Close modal when clicking outside
    contributeModal?.addEventListener('click', (e) => {
        if (e.target === contributeModal) {
            contributeModal.classList.remove('active');
        }
    });

    // Form submission
    contributeForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        contributeModal.classList.remove('active');
        showToast('Thanks for your contribution! We\'ll review it soon.');
        contributeForm.reset();
    });

    // Newsletter subscription
    newsletterForms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            showToast('Subscription confirmed! Thank you for joining us.');
            form.reset();
        });
    });

    // Toast notification function
    function showToast(message) {
        toast.textContent = message;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    // Tag filtering
    tags.forEach(tag => {
        tag.addEventListener('click', () => {
            tags.forEach(t => t.classList.remove('active'));
            tag.classList.add('active');
            showToast(`Filtering by ${tag.textContent} category`);
            // Here you would typically filter the posts based on the selected tag
        });
    });

    // Load more functionality
    loadMoreBtn.addEventListener('click', () => {
        // Simulating loading more posts
        loadMoreBtn.textContent = 'Loading...';
        setTimeout(() => {
            const postsGrid = document.querySelector('.posts-grid');
            // Clone the first 3 posts
            const existingPosts = document.querySelectorAll('.post-card');
            const newPosts = [];
            
            for (let i = 0; i < 3; i++) {
                if (existingPosts[i]) {
                    const clone = existingPosts[i].cloneNode(true);
                    // Change some content to make it look different
                    const title = clone.querySelector('.post-title a');
                    title.textContent = 'New Post ' + (i + 1) + ': ' + title.textContent;
                    newPosts.push(clone);
                }
            }
            
            newPosts.forEach(post => {
                postsGrid.appendChild(post);
            });
            
            loadMoreBtn.textContent = 'Load More Posts';
            showToast('New posts loaded!');
        }, 1000);
    });
});
