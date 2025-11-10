document.addEventListener("DOMContentLoaded", () => {
  // تأكد إن كل العناصر موجودة
  const signupContainer = document.getElementById("signupContainer");
  const loginContainer = document.getElementById("loginContainer");
  const toggleForm = document.getElementById("toggleForm");
  const toggleFormLogin = document.getElementById("toggleFormLogin");
  const signupForm = document.getElementById("signupForm");
  const loginForm = document.getElementById("loginForm");
  const logoutBtn = document.getElementById("logoutBtn");
  const signupError = document.getElementById("signupError");
  const loginError = document.getElementById("loginError");

  function clearErrors() {
    if (loginError) loginError.style.display = "none";
    if (signupError) signupError.style.display = "none";
  }

  if (toggleForm) {
    toggleForm.addEventListener("click", function () {
      if (signupContainer) signupContainer.style.display = "none";
      if (loginContainer) loginContainer.style.display = "block";
      clearErrors();
    });
  }

  if (toggleFormLogin) {
    toggleFormLogin.addEventListener("click", function () {
      if (loginContainer) loginContainer.style.display = "none";
      if (signupContainer) signupContainer.style.display = "block";
      clearErrors();
    });
  }

  if (signupContainer) signupContainer.style.display = "block";
  if (loginContainer) loginContainer.style.display = "none";

  // Check if already logged in
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  if (isLoggedIn === "true") {
    document.body.classList.remove("signup");
    document.querySelector(".container").style.display = "none";
    if (logoutBtn) logoutBtn.style.display = "block";
    window.location = "index.html"
  }

  // Sign Up
  if (signupForm) {
    signupForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      clearErrors();

      const username = document.getElementById("username").value.trim();
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();
      const repassword = document.getElementById("repassword").value.trim();
      const phone = document.getElementById("phone").value.trim();

      if (password !== repassword) {
        signupError.innerText = "Passwords do not match.";
        signupError.style.display = "flex";
        return;
      }

      try {
        const response = await fetch("http://localhost:3000/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            email,
            password,
            repassword,
            phone,
          }),
        });

        const data = await response.json();

        if (response.ok && data.msg === "User created successfully") {
          localStorage.setItem("isLoggedIn", "false");
          window.location.href = "index.html"; // إعادة التوجيه لصفحة index.html
        } else {
          signupError.innerText = "You Have Already Signed Up.";
          signupError.style.display = "flex";
        }
      } catch (error) {
        signupError.innerText = "Something went wrong.";
        signupError.style.display = "flex";
      }
    });
  }

  // Log In
  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      clearErrors();

      const email = document.getElementById("loginEmail").value.trim();
      const password = document.getElementById("loginPassword").value.trim();

      try {
        const response = await fetch("http://localhost:3000/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        if (response.ok && data.msg === "Login successful") {
          localStorage.setItem("isLoggedIn", "false");
          window.location.href = "index.html"; // إعادة التوجيه لصفحة index.html
        } else {
          loginError.innerText = data.msg || "Login failed.";
          loginError.style.display = "flex";
        }
      } catch (error) {
        loginError.innerText = "Something went wrong.";
        loginError.style.display = "flex";
      }
    });
  }

  // Log Out
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("isLoggedIn");
      document.querySelector(".container").style.display = "flex";
      document.body.classList.add("signup");
      if (signupContainer) signupContainer.style.display = "block";
      if (loginContainer) loginContainer.style.display = "none";
      logoutBtn.style.display = "none";
    });
  }
});