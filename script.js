// Wait until page loads
document.addEventListener("DOMContentLoaded", function () {

  /* =========================
     CAPTCHA SECTION (Login)
  ========================== */

  let correctAnswer = null;

  function generateCaptcha() {
    const captchaQuestion = document.getElementById("captchaQuestion");
    if (!captchaQuestion) return; // Not on login page

    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;

    const operators = ["+", "-", "*"];
    const operator = operators[Math.floor(Math.random() * operators.length)];

    captchaQuestion.innerText = `${num1} ${operator} ${num2}`;

    switch (operator) {
      case "+":
        correctAnswer = num1 + num2;
        break;
      case "-":
        correctAnswer = num1 - num2;
        break;
      case "*":
        correctAnswer = num1 * num2;
        break;
    }
  }

  const refreshBtn = document.getElementById("refreshCaptcha");
  if (refreshBtn) {
    refreshBtn.addEventListener("click", generateCaptcha);
    generateCaptcha(); // Generate when page loads
  }

  /* =========================
     LOGIN FORM
  ========================== */

  const loginForm = document.getElementById("loginForm");

  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const email = document.getElementById("loginEmail").value.trim();
      const password = document.getElementById("loginPassword").value;
      const captchaInput = document.getElementById("captchaInput").value.trim();

      if (!email || !password || !captchaInput) {
        alert("Please fill all fields");
        return;
      }

      if (parseInt(captchaInput) !== correctAnswer) {
        alert("Incorrect CAPTCHA. Try again!");
        generateCaptcha();
        return;
      }

      // ✅ Success Alert
      alert("Login Successful! Redirecting to Dashboard...");

      // ✅ Redirect after 1 second
      setTimeout(function () {
        window.location.href = "dashboard.html";
      }, 1000);
    });
  }

  /* =========================
     REGISTER FORM
  ========================== */

  const registerForm = document.getElementById("registerForm");

  if (registerForm) {
    registerForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("regName").value.trim();
      const email = document.getElementById("regEmail").value.trim();
      const password = document.getElementById("regPassword").value;
      const confirm = document.getElementById("regConfirmPassword").value;

      if (!name || !email || !password || !confirm) {
        alert("Please fill in all fields");
        return;
      }

      if (password.length < 6) {
        alert("Password must be at least 6 characters");
        return;
      }

      if (password !== confirm) {
        alert("Passwords do not match");
        return;
      }

      alert("Registration Successful! Redirecting to Login...");

      setTimeout(function () {
        window.location.href = "login.html";
      }, 1000);
    });
  }

});


/* =========================
   LOGOUT FUNCTION
========================= */

function logout() {
  alert("Logged out successfully!");
  setTimeout(function () {
    window.location.href = "login.html";
  }, 500);
}
