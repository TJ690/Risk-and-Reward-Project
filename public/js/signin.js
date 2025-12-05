document.querySelector('form').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent form from reloading the page

    const email = document.getElementById('user-email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            alert('Login successful!');
            // Redirect to the homepage or dashboard
            window.location.href = '/home.html'; // Or wherever the user should be redirected after login
        } else {
            alert(`Login failed: ${data.error}`);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Something went wrong!');
    }
});
