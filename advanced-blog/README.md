# Advanced Blog

## Project Overview

The Advanced Blog project is a feature-rich, responsive blogging platform designed to simulate the experience of modern blogging sites like Medium. This project focuses on creating an advanced frontend using HTML, CSS, and JavaScript, showcasing a stunning design and interactive features.

## Features

- **Multi-Page Structure**: Includes a homepage, individual blog post pages, author profile pages, and an about page.
- **Responsive Design**: Built with Flexbox and CSS Grid to ensure a seamless experience across devices.
- **Theme Toggle**: Users can switch between light and dark themes with smooth transitions.
- **Dynamic Content Loading**: Blog posts and author information are loaded from local JSON files, simulating data fetching from an API.
- **Interactive Elements**: Includes animations, smooth scrolling, and interactive components for a polished user experience.

## File Structure

```
advanced-blog
├── src
│   ├── assets
│   │   ├── fonts
│   │   └── icons
│   ├── css
│   │   ├── style.css
│   │   ├── themes.css
│   │   ├── components
│   │   │   ├── header.css
│   │   │   ├── footer.css
│   │   │   ├── cards.css
│   │   │   └── buttons.css
│   │   └── layouts
│   │       ├── grid.css
│   │       └── responsive.css
│   ├── js
│   │   ├── main.js
│   │   ├── themeToggle.js
│   │   ├── components
│   │   │   └── postCard.js
│   │   └── utils
│   │       └── animations.js
│   ├── data
│   │   ├── posts.json
│   │   └── authors.json
│   ├── pages
│   │   ├── about.html
│   │   ├── post.html
│   │   └── author.html
│   └── index.html
├── package.json
└── README.md
```

## Getting Started

1. **Clone the Repository**: 
   ```bash
   git clone <repository-url>
   cd advanced-blog
   ```

2. **Install Dependencies**: 
   ```bash
   npm install
   ```

3. **Run the Project**: 
   Open `index.html` in your browser to view the project.

## Future Enhancements

- Implement a backend for user authentication and content management.
- Add a commenting system for blog posts.
- Explore monetization options and traffic handling strategies.

## License

This project is licensed under the MIT License.