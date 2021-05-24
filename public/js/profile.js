const newFormHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#blog-title').value.trim();
    const description = document.querySelector('#blog-desc').value.trim();
    const date_created = document.querySelector('#blog-date_created').value.trim();
    const comment = document.querySelector('#blog-comment').value.trim();

    if (title && description && date_created && comment) {
        const response = await fetch(`/api/blogPost`, {
            method: 'POST',
            body: JSON.stringify({ title, description, date_created, comment }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            document.location.replace('/profile');
        } else {
            alert('Failed to create project');
        }
    }
};

const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');

        const response = await fetch(`/api/blogPost/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            document.location.replace('/profile');
        } else {
            alert('Failed to delete project');
        }
    }
};

document
    .querySelector('.new-blog-form')
    .addEventListener('submit', newFormHandler);

document
    .querySelector('.blog-list')
    .addEventListener('click', delButtonHandler);
