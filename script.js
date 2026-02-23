document.addEventListener("DOMContentLoaded", function () {

  const API_URL = "http://127.0.0.1:5000";

  /* =========================
     CAPTCHA SECTION
  ========================== */

  let correctAnswer = null;

  function generateCaptcha() {
    const captchaQuestion = document.getElementById("captchaQuestion");
    if (!captchaQuestion) return;

    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;

    const operators = ["+", "-", "*"];
    const operator = operators[Math.floor(Math.random() * operators.length)];

    captchaQuestion.innerText = `${num1} ${operator} ${num2}`;

    switch (operator) {
      case "+": correctAnswer = num1 + num2; break;
      case "-": correctAnswer = num1 - num2; break;
      case "*": correctAnswer = num1 * num2; break;
    }
  }

  const refreshBtn = document.getElementById("refreshCaptcha");
  if (refreshBtn) {
    refreshBtn.addEventListener("click", generateCaptcha);
    generateCaptcha();
  }

  /* =========================
     REGISTER FORM
  ========================== */

  const registerForm = document.getElementById("registerForm");

  if (registerForm) {
    registerForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      const name = document.getElementById("regName").value.trim();
      const email = document.getElementById("regEmail").value.trim();
      const password = document.getElementById("regPassword").value;
      const confirm = document.getElementById("regConfirmPassword").value;
      const message = document.getElementById("registerMessage");

      if (password !== confirm) {
        message.innerText = "Passwords do not match";
        return;
      }

      try {
        const response = await fetch(`${API_URL}/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: email, password: password })
        });

        const result = await response.json();
        message.innerText = result.message;

        if (response.status === 200) {
          setTimeout(() => {
            window.location.href = "login.html";
          }, 1000);
        }

      } catch (error) {
        message.innerText = "Server error. Is Flask running?";
      }
    });
  }

  /* =========================
     LOGIN FORM
  ========================== */

  const loginForm = document.getElementById("loginForm");

  if (loginForm) {
    loginForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      const email = document.getElementById("loginEmail").value.trim();
      const password = document.getElementById("loginPassword").value;
      const captchaInput = document.getElementById("captchaInput").value.trim();
      const message = document.getElementById("loginMessage");

      if (parseInt(captchaInput) !== correctAnswer) {
        message.innerText = "Incorrect CAPTCHA!";
        generateCaptcha();
        return;
      }

      try {
        const response = await fetch(`${API_URL}/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: email, password: password })
        });

        const result = await response.json();

        if (response.status === 200) {
          localStorage.setItem("loggedInUser", email);
          window.location.href = "dashboard.html";
        } else {
          message.innerText = result.message;
        }

      } catch (error) {
        message.innerText = "Server error. Is Flask running?";
      }
    });
  }

});


/* =========================
   LOGOUT FUNCTION
========================= */

function logout() {
  localStorage.removeItem("loggedInUser");
  window.location.href = "login.html";
}