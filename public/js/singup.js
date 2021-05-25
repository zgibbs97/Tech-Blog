async function signupFormHandler(event) {
    event.preventDefault();

    const user = document.querySelector('#user-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    if (user && email && password) {
        const response = await fetch('/api/users', {
            method: 'post',
            body: JSON.stringify({
                user,
                email,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        // check the response status
        if (response.ok) {
            console.log('success');
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
}

document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);