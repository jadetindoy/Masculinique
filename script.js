document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    handleLogin();
});

document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault();
    handleSignUp();
});

function handleLogin() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const storedEmail = localStorage.getItem('userEmail');
    const storedPassword = localStorage.getItem('userPassword');
    if(email === storedEmail && password === storedPassword) {
        localStorage.setItem('isLoggedIn', 'true');
        window.location.href = './index.html'; // Redirect to the home page after login
    } else {
        alert('Incorrect credentials');
    }
}

function handleSignUp() {
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userPassword', password); // Note: Do not store passwords like this in production.
    window.location.href = './index.html'; // Redirect to the home page after sign up
}
