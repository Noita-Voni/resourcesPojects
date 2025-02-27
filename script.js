document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('searchInput');
    const projectCards = document.querySelectorAll('.project-card');
    const categoryButtons = document.querySelectorAll('.category-btn');
    const projectGrid = document.getElementById('projects-grid');
    const submitForm = document.getElementById('submitProjectForm');

    // Load projects from localStorage
    function loadProjects() {
        const savedProjects = JSON.parse(localStorage.getItem('projects')) || [];
        savedProjects.forEach(project => addProjectToGrid(project));
    }

    // Save projects to localStorage
    function saveProject(project) {
        const savedProjects = JSON.parse(localStorage.getItem('projects')) || [];
        savedProjects.push(project);
        localStorage.setItem('projects', JSON.stringify(savedProjects));
    }

    // Function to create and append a project card
    function addProjectToGrid(project) {
        const newProject = document.createElement('div');
        newProject.classList.add('project-card');
        newProject.setAttribute('data-category', project.level);

        newProject.innerHTML = `
            <h3>${project.title}</h3>
            <p><strong>By:</strong> ${project.contributor}</p>
            <p>${project.description}</p>
            <a href="${project.githubLink}" target="_blank">GitHub Repo</a>
            <button class="like-btn">❤️ <span class="like-count">${project.likes || 0}</span></button>
        `;

        // Handle like button
        const likeButton = newProject.querySelector('.like-btn');
        likeButton.addEventListener('click', function () {
            project.likes = (project.likes || 0) + 1;
            likeButton.querySelector('.like-count').textContent = project.likes;
            updateLikesInStorage(project);
        });

        projectGrid.appendChild(newProject);
    }

    // Update likes in localStorage
    function updateLikesInStorage(updatedProject) {
        let savedProjects = JSON.parse(localStorage.getItem('projects')) || [];
        savedProjects = savedProjects.map(project =>
            project.title === updatedProject.title ? updatedProject : project
        );
        localStorage.setItem('projects', JSON.stringify(savedProjects));
    }

    // Handle form submission
    submitForm.addEventListener('submit', function (event) {
        event.preventDefault();

        // Get form values
        const title = document.getElementById('projectTitle').value;
        const level = document.getElementById('projectLevel').value;
        const githubLink = document.getElementById('projectLink').value;
        const contributor = document.getElementById('contributorName').value;
        const description = document.getElementById('projectDescription').value;

        // Validate form inputs
        if (!title || !level || !githubLink || !contributor || !description) {
            alert("Please fill out all fields before submitting.");
            return;
        }

        // Create project object
        const newProject = {
            title,
            level,
            githubLink,
            contributor,
            description,
            likes: 0
        };

        // Save to localStorage
        saveProject(newProject);

        // Add to UI
        addProjectToGrid(newProject);

        // Reset form
        submitForm.reset();
    });

    // Initial load
    loadProjects();
});