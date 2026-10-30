// web/contact.js
(function () {
  "use strict";

  var TEXTS = {
    success: "Bedankt voor je bericht! We nemen snel contact met je op.",
    later: "Er ging iets mis. Probeer het later opnieuw.",
    generic: "Controleer je gegevens en probeer het opnieuw.",
    name: "Vul je naam in.",
    message: "Vul een bericht in.",
    sending: "Versturen..."
  };
  var FIELDS = ["name", "message"];
  var SUBMIT_LABEL = "Versturen";

  var form = document.getElementById("contact-form");
  var button = document.getElementById("submit-button");
  var status = document.getElementById("form-status");

  function showStatus(text, kind) {
    var box = document.createElement("div");
    box.className = "alert alert-" + kind + " mb-0";
    box.textContent = text;
    status.replaceChildren(box);
  }

  function clearErrors() {
    status.replaceChildren();
    FIELDS.forEach(function (field) {
      document.getElementById(field).classList.remove("is-invalid");
      document.getElementById(field + "-error").textContent = "";
    });
  }

  function showFieldError(field, text) {
    document.getElementById(field).classList.add("is-invalid");
    document.getElementById(field + "-error").textContent = text;
  }

  function setSending(sending) {
    button.disabled = sending;
    button.textContent = sending ? TEXTS.sending : SUBMIT_LABEL;
  }

  // Returns true when at least one known field error was shown.
  function showServerErrors(errors) {
    var shown = false;
    if (!errors || typeof errors !== "object") return false;
    FIELDS.forEach(function (field) {
      if (errors[field] !== undefined) {
        var text = typeof errors[field] === "string" && errors[field] ? errors[field] : TEXTS[field];
        showFieldError(field, text);
        shown = true;
      }
    });
    return shown;
  }

  function validateClient() {
    var ok = true;
    FIELDS.forEach(function (field) {
      if (!document.getElementById(field).value.trim()) {
        showFieldError(field, TEXTS[field]);
        ok = false;
      }
    });
    return ok;
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    if (button.disabled) return;
    clearErrors();
    if (!validateClient()) return;

    setSending(true);
    fetch(API_BASE_URL + "/api/contact/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.elements.name.value,
        message: form.elements.message.value
      })
    })
      .then(function (response) {
        if (response.status === 201) {
          form.reset();
          showStatus(TEXTS.success, "success");
          return;
        }
        if (response.status === 400) {
          return response.json().then(
            function (data) {
              if (!showServerErrors(data && data.errors)) showStatus(TEXTS.generic, "danger");
            },
            function () { showStatus(TEXTS.generic, "danger"); }
          );
        }
        showStatus(TEXTS.later, "danger");
      })
      .catch(function () {
        showStatus(TEXTS.later, "danger");
      })
      .then(function () {
        setSending(false);
      });
  });
})();
