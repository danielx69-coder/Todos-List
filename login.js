const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const userError = document.getElementById("userError");
    const passError = document.getElementById("passError");
    const savedUser = JSON.parse(localStorage.getItem("user"));


    if (!savedUser) {
        alert("No user found! Please signup first.");
        window.location.href = "signup.html";
        return;
    }


    if (username === "") {
        userError.textContent = "Username is Empty";
        return;
    } else {
        userError.textContent = "";
    }

    if (password === "") {
        passError.textContent = "Password is Empty";
        return;
    } else {
        passError.textContent = "";
    }

    if (username === savedUser.email && password === savedUser.password) {
        localStorage.setItem("isLoggedIn", "true");
        window.location.href = "todos.html";
    } else {
        passError.textContent = "Invalid username or password!";
    }
});
