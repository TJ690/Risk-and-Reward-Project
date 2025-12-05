document.querySelector('form').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent form from refreshing the page

    const name = document.getElementById('user-name').value;
    const email = document.getElementById('user-email').value;
    const password = document.getElementById('password').value;
    const confirm = document.getElementById('confirmpassword').value;

    // Check if passwords match
    if (password !== confirm) {
        alert('Passwords do not match!');
        return; // Stop the form submission
    }

    try {
        const response = await fetch('/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            alert('Signup successful!');
            console.log('User ID:', data.userId);
            // Redirect to the homepage
            window.location.href = '/home.html';
        } else {
            alert(`Signup failed: ${data.error}`);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Something went wrong!');
    }
});
