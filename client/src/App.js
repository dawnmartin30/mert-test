import './styles.css';

function App() {
  return (
    <>
    <h1>LifeQuests</h1>
    <div class="container">
        <div class="content">
            <div class="form-title">Login</div>
            <form id="loginForm">
                <label class="h5" htmlFor="username">
                    Username: <input class="rounded-pill p-2 mb-4" id="username" type="text" placeholder="Username" required/>
                </label>
                <label class="h5" htmlFor="password">
                    Password: <input class="rounded-pill p-2 mb-4" id="password" type="password" placeholder="Password" required/>
                </label>
                <button type="button" onClick={Login} id="loginButton">Login</button>
                <a href="RegisterMERT.html" id="registerRedirectButton">Register</a>
            </form>
            <div id="loginNotice"></div>
        </div>
    </div>
    <div class="mountain left-mountain"></div>
    <div class="mountain right-mountain"></div>
    <div class="sun"></div>
    </>
  );
}

function Login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const urlBase = 'http://cop4331group2.com:5000'; // Replace with your API server URL

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
          console.log("User incorrcet");
        } else {
          console.log(JSON.stringify(jsonObject));
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  doLogin();
}

export default App;
