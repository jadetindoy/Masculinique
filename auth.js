function handleClientLoad() {
    gapi.load('client:auth2', initClient);
}

function initClient() {
    gapi.client.init({
        apiKey: 'YOUR_API_KEY',
        clientId: 'YOUR_CLIENT_ID',
        discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"],
        scope: 'email'
    }).then(function () {
        googleAuth = gapi.auth2.getAuthInstance();
        googleAuth.isSignedIn.listen(updateSigninStatus);
        updateSigninStatus(googleAuth.isSignedIn.get());
        document.getElementById('signInButton').onclick = handleSignIn;
        document.getElementById('signOutButton').onclick = handleSignOut;
    }, function(error) {
        console.error(JSON.stringify(error, null, 2));
    });
}

function updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
        document.getElementById('signInButton').style.display = 'none';
        document.getElementById('signOutButton').style.display = 'block';
    } else {
        document.getElementById('signInButton').style.display = 'block';
        document.getElementById('signOutButton').style.display = 'none';
    }
}

function handleSignIn() {
    googleAuth.signIn();
}

function handleSignOut() {
    googleAuth.signOut();
}
