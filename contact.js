(function () {
  emailjs.init("G_CCGhWSEbWVq2jDn");
})();

const form = document.getElementById("contact-form");

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const btn = form.querySelector("button");
    btn.disabled = true;
    btn.textContent = "Sending...";

    emailjs.sendForm("service_rya46o9", "template_bikwxu5", this)
      .then(() => {
        btn.textContent = "Inquiry Sent ✓";
        form.reset();
        setTimeout(() => {
          btn.textContent = "Send Inquiry";
          btn.disabled = false;
        }, 4000);
      }, (err) => {
        alert("Error sending message.");
        btn.disabled = false;
        btn.textContent = "Try Again";
      });
  });
}