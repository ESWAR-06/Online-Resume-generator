$(document).ready(function () {

  const API_URL = "http://127.0.0.1:5000";

  /* =========================
     CAPTCHA SECTION
  ========================== */

  let correctAnswer = null;

  function generateCaptcha() {
    const captchaQuestion = $("#captchaQuestion");
    if (!captchaQuestion.length) return;

    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;

    const operators = ["+", "-", "*"];
    const operator = operators[Math.floor(Math.random() * operators.length)];

    captchaQuestion.text(`${num1} ${operator} ${num2}`);

    switch (operator) {
      case "+": correctAnswer = num1 + num2; break;
      case "-": correctAnswer = num1 - num2; break;
      case "*": correctAnswer = num1 * num2; break;
    }
  }

  $("#refreshCaptcha").click(function () {
    generateCaptcha();
  });

  generateCaptcha();


  /* =========================
     REGISTER FORM
  ========================== */

  $("#registerForm").submit(function (e) {
    e.preventDefault();

    const name = $("#regName").val().trim();
    const email = $("#regEmail").val().trim();
    const password = $("#regPassword").val();
    const confirm = $("#regConfirmPassword").val();
    const message = $("#registerMessage");

    if (password !== confirm) {
      message.text("Passwords do not match");
      return;
    }

    $.ajax({
      url: `${API_URL}/register`,
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify({
        username: email,
        password: password
      }),

      success: function (result) {
        message.css("color", "green").text(result.message);

        setTimeout(() => {
          window.location.href = "login.html";
        }, 1000);
      },

      error: function (xhr) {
        const res = xhr.responseJSON;
        message.css("color", "red").text(res ? res.message : "Server error");
      }
    });
  });


  /* =========================
     LOGIN FORM
  ========================== */

  $("#loginForm").submit(function (e) {
    e.preventDefault();

    const email = $("#loginEmail").val().trim();
    const password = $("#loginPassword").val();
    const captchaInput = $("#captchaInput").val().trim();
    const message = $("#loginMessage");

    if (parseInt(captchaInput) !== correctAnswer) {
      message.text("Incorrect CAPTCHA!");
      generateCaptcha();
      return;
    }

    $.ajax({
      url: `${API_URL}/login`,
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify({
        username: email,
        password: password
      }),

      success: function (result) {
        localStorage.setItem("loggedInUser", email);
        window.location.href = "dashboard.html";
      },

      error: function (xhr) {
        const res = xhr.responseJSON;
        message.text(res ? res.message : "Login failed");
      }
    });
  });

});


/* =========================
   LOGOUT FUNCTION
========================= */

function logout() {
  localStorage.removeItem("loggedInUser");
  window.location.href = "login.html";
}