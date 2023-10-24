function Register() {
  const firstname = document.getElementById("firstname").value;
  const lastname = document.getElementById("lastname").value;
  const email = document.getElementById("email").value;
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const registerNotice = document.getElementById("registerNotice");

  const urlBase = 'http://67.205.172.88:5000';

  registerNotice.innerHTML = "";

  //This doesn't work as it should but may be unnecessary, remove?
  const getCurrentDate = () => {
    const today = new Date();
    const day = today.getDate().toString().padStart(2, '0');
    const month = (today.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based
    const year = today.getFullYear().toString().slice(2); // Get the last 2 digits of the year
    return `${month}/${day}/${year}`;
  };

  const doRegister = async () => {
    try {
      const dateCreated = getCurrentDate();

      const response = await fetch(`${urlBase}/api/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstname: firstname,
          lastname: lastname,
          email: email,
          username: username,
          password: password,
          dateCreated: dateCreated,
        }),
      });
      
      registerNotice.innerHTML = ""; // Clear any previous messages
      //If any field is empty
      if (firstname === "" || lastname === "" || email === "" || username === "" || password === "") {
        // Check if any of the required fields are empty
        registerNotice.innerHTML = "Please fill in all required fields.";
        registerNotice.classList.remove("hidden"); // Show the error message

      } 
      //Proceed with registration check
      else {
        if (response.ok) {
          const jsonObject = await response.json();
  
          if (jsonObject.err) {
            registerNotice.innerHTML = jsonObject.err;
          } else {
            console.log(JSON.stringify(jsonObject));
            registerNotice.innerHTML = "Registration successful!";
          }
        } else {
          registerNotice.innerHTML = "Registration failed. Please try again.";
        }
      }
      
    } catch (err) {
      registerNotice.innerHTML = `* ${err.message}`;
    }
  };

  doRegister();
}

document.getElementById("registerButton").addEventListener("click", Register);
