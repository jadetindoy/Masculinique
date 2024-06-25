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
    localStorage.setItem('userPassword', password); 
    window.location.href = './index.html'; 
}
// this is the are where the submit part send to 
    function validateForm() {
        const form = document.getElementById('bookForm');
        if (form.checkValidity()) {
            sendEmail();
        } else {
            form.classList.add('was-validated');
        }
    }

    function sendEmail() {
        const serviceID = 'service_ji5hkp9'; 
        const templateID = 'template_7qu68we'; 

        emailjs.sendForm(serviceID, templateID, '#bookForm')
            .then((response) => {
                console.log('SUCCESS!', response.status, response.text);
                alert('Your booking has been sent successfully!');
            }, (error) => {
                console.log('FAILED...', error);
                alert('Failed to send your booking. Please try again.');
            });
    }

    