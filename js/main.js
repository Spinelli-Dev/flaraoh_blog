/* Flaraoh — JS essencial: menu responsivo, ano do rodapé e validação do formulário. */
(function () {
  "use strict";

  /* ---------- Menu responsivo ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");

  if (toggle && nav) {
    var label = toggle.querySelector(".nav-toggle__label");
    var desktop = window.matchMedia("(min-width: 64em)");

    var setOpen = function (open) {
      toggle.setAttribute("aria-expanded", String(open));
      nav.classList.toggle("is-open", open);
      if (label) label.textContent = open ? "Fechar menu" : "Abrir menu";
    };

    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        setOpen(false);
        toggle.focus();
      }
    });

    document.addEventListener("click", function (e) {
      if (nav.classList.contains("is-open") && !nav.contains(e.target) && !toggle.contains(e.target)) {
        setOpen(false);
      }
    });

    desktop.addEventListener("change", function (e) {
      if (e.matches) setOpen(false);
    });
  }

  /* ---------- Ano atual no rodapé ---------- */
  var year = document.querySelector("[data-year]");
  if (year) year.textContent = String(new Date().getFullYear());

  /* ---------- Formulário de contato ---------- */
  var form = document.querySelector("[data-contact-form]");
  if (!form) return;

  form.setAttribute("novalidate", ""); // JS assume a validação; sem JS, vale a nativa do navegador

  // Links como contact.html?assunto=divulgacao já chegam com o assunto escolhido
  var topic = /[?&]assunto=([a-z]+)/.exec(window.location.search);
  var topicField = form.elements.assunto;
  if (topic && topicField && topicField.querySelector('option[value="' + topic[1] + '"]')) {
    topicField.value = topic[1];
  }
  var status = form.querySelector(".form__status");
  var submit = form.querySelector('[type="submit"]');
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  var rules = {
    nome: function (v) {
      if (!v) return "Informe seu nome.";
      if (v.length < 2) return "O nome precisa ter pelo menos 2 caracteres.";
      return "";
    },
    email: function (v) {
      if (!v) return "Informe seu e-mail.";
      if (!EMAIL_RE.test(v)) return "Digite um e-mail válido, como nome@exemplo.com.";
      return "";
    },
    mensagem: function (v) {
      if (!v) return "Escreva uma mensagem.";
      if (v.length < 10) return "Conte um pouco mais (mínimo de 10 caracteres).";
      return "";
    }
  };

  var validateField = function (field) {
    var rule = rules[field.name];
    if (!rule) return true;
    var message = rule(field.value.trim());
    var error = document.getElementById(field.name + "-error");
    field.setAttribute("aria-invalid", message ? "true" : "false");
    if (error) error.textContent = message;
    return !message;
  };

  var setStatus = function (type, text) {
    status.className = "form__status" + (type ? " form__status--" + type : "");
    status.textContent = text;
  };

  Object.keys(rules).forEach(function (name) {
    var field = form.elements[name];
    if (!field) return;
    // Revalida em tempo real apenas depois que o campo já mostrou um erro
    field.addEventListener("input", function () {
      if (field.getAttribute("aria-invalid") === "true") validateField(field);
    });
    field.addEventListener("blur", function () {
      if (field.value.trim()) validateField(field);
    });
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    setStatus("", "");

    var firstInvalid = null;
    Object.keys(rules).forEach(function (name) {
      var field = form.elements[name];
      if (field && !validateField(field) && !firstInvalid) firstInvalid = field;
    });

    if (firstInvalid) {
      firstInvalid.focus();
      return;
    }

    // Honeypot preenchido = provável bot: finge sucesso e descarta
    if (form.elements._gotcha && form.elements._gotcha.value) {
      form.reset();
      return;
    }

    var done = function () {
      form.reset();
      Object.keys(rules).forEach(function (n) { form.elements[n].removeAttribute("aria-invalid"); });
      setStatus("success", "Mensagem enviada! Obrigado pelo contato — respondo em até 2 dias úteis.");
    };

    // Modo demonstração enquanto o endpoint real não for configurado
    if (form.action.indexOf("SEU_ID") !== -1) {
      done();
      return;
    }

    submit.disabled = true;
    submit.textContent = "Enviando…";

    fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" }
    })
      .then(function (res) {
        if (!res.ok) throw new Error(res.status);
        done();
      })
      .catch(function () {
        setStatus("error", "Não foi possível enviar agora. Tente novamente ou escreva direto para o e-mail ao lado.");
      })
      .then(function () {
        submit.disabled = false;
        submit.textContent = "Enviar mensagem";
      });
  });
})();
