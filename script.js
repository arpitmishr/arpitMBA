// Mock user data and blog posts for demonstration
let userProfile = null;
const blogPosts = [];

// Function to handle the Google Sign-In response
function handleCredentialResponse(response) {
    const responsePayload = jwt_decode(response.credential);
    userProfile = {
        email: responsePayload.email,
        name: responsePayload.name,
        picture: responsePayload.picture
    };
    showDashboard();
    hideLoginButton();
}

// Decode the JWT token (you might need a library for this in a real application)
function jwt_decode(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

// Function to show the dashboard and hide the main content
function showDashboard() {
    document.getElementById('main-content').classList.add('hidden');
    document.getElementById('dashboard').classList.remove('hidden');
    document.getElementById('signout-button').classList.remove('hidden');
}

// Function to hide the login button and show user info
function hideLoginButton() {
    document.querySelector('.g_id_signin').classList.add('hidden');
}

// Function to handle sign out
document.getElementById('signout-button').addEventListener('click', () => {
    userProfile = null;
    document.getElementById('dashboard').classList.add('hidden');
    document.getElementById('main-content').classList.remove('hidden');
    document.querySelector('.g_id_signin').classList.remove('hidden');
    document.getElementById('signout-button').classList.add('hidden');
});

// Handle navigation clicks
document.querySelectorAll('.nav-menu a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        document.querySelectorAll('main section').forEach(section => {
            section.classList.add('hidden');
        });
        document.getElementById(targetId).classList.remove('hidden');
        document.getElementById('dashboard').classList.add('hidden');
        document.getElementById('main-content').classList.remove('hidden');
    });
});

// Handle the add post form submission
document.getElementById('add-post-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const postTitle = document.getElementById('post-title').value;
    const postContent = document.getElementById('post-content').value;
    const postDate = new Date();

    const newPost = {
        title: postTitle,
        content: postContent,
        author: userProfile.name,
        date: postDate.toISOString()
    };

    blogPosts.push(newPost);
    displayBlogPosts();
    this.reset();
    document.getElementById('blogs').classList.remove('hidden');
    document.getElementById('dashboard').classList.add('hidden');
    document.getElementById('main-content').classList.remove('hidden');
});

// Function to display blog posts
function displayBlogPosts() {
    const blogPostsContainer = document.getElementById('blog-posts');
    blogPostsContainer.innerHTML = '';
    const postsByYear = blogPosts.reduce((acc, post) => {
        const year = new Date(post.date).getFullYear();
        if (!acc[year]) {
            acc[year] = [];
        }
        acc[year].push(post);
        return acc;
    }, {});

    for (const year in postsByYear) {
        const yearContainer = document.createElement('div');
        yearContainer.innerHTML = `<h3>${year}</h3>`;
        postsByYear[year].forEach(post => {
            const postElement = document.createElement('div');
            postElement.innerHTML = `
                <h4>${post.title}</h4>
                <p>${post.content}</p>
                <small>By ${post.author} on ${new Date(post.date).toLocaleDateString()}</small>
            `;
            yearContainer.appendChild(postElement);
        });
        blogPostsContainer.appendChild(yearContainer);
    }
}
