        const signupForm = document.getElementById("signupForm");

signupForm.addEventListener("submit", (e) => {
e.preventDefault();

const emailpn = document.getElementById('userid').value.trim();
const password = document.getElementById("pass1").value.trim();
const confPassword = document.getElementById("pass2").value.trim();
const passError = document.getElementById("passError");
const emailError = document.getElementById("emailError");
const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/i;
 if (!gmailRegex.test(emailpn)) {
  emailError.textContent = "Please use @gmail.com";
  return;
} else {
  emailError.textContent = "";
 }

if (password !== confPassword) {
  passError.textContent = "Passwords do not match!";
 return;
 } else {
    passError.textContent = "";
 }

  const userData = {
     email: emailpn,
     password: password
  };

 localStorage.setItem('user', JSON.stringify(userData));
            
 window.location.href = "login.html";
 });