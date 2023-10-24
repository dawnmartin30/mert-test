function Login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const loginNotice = document.getElementById("loginNotice");

  const urlBase = 'http://67.205.172.88:5000';

  loginNotice.innerHTML = "";

  const doLogin = async () => {
    try {
      const response = await fetch(`${urlBase}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: username, password: password }),
      });

      if (response.ok) {
        const jsonObject = await response.json();
        const user = JSON.stringify(jsonObject);

        if (user === "{\"msg\":[]}") {
          loginNotice.innerHTML = "* User/Password combination incorrect";
        } else {
          // Update DateLastLoggedIn here
          updateLastLoggedIn(username);
          console.log(JSON.stringify(jsonObject));
          loginNotice.innerHTML = "Login Successful";
        }
      }
    } catch (err) {
      loginNotice.innerHTML = `* ${err.message}`;
    }
  };

  const updateLastLoggedIn = async (username) => {
    try {
      await fetch(`${urlBase}/api/updateLastLoggedIn`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: username }),
      });
    } catch (err) {
      console.error(`Failed to update LastLoggedIn: ${err}`);
    }
  };

  doLogin();
}

document.getElementById("loginButton").addEventListener("click", Login);
