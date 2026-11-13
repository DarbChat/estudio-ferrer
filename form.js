/* Mejora progresiva: muestra el invalid-message de cada campo en su región de mensaje.
   Sin scripting, la validación nativa del navegador sigue funcionando. */
(function () {
  var form = document.querySelector('form[data-enhance]');
  if (!form) return;
  var focused = false;
  function region(c) { return document.getElementById(c.id + '-error'); }
  form.addEventListener('invalid', function (e) {
    e.preventDefault();
    var c = e.target, r = region(c);
    c.setAttribute('aria-invalid', 'true');
    if (r) r.textContent = c.getAttribute('data-invalid-message') || '';
    if (!focused) { focused = true; c.focus(); }
  }, true);
  form.addEventListener('click', function (e) { if (e.target.type === 'submit') focused = false; });
  function clear(e) {
    var c = e.target, r = region(c);
    if (r && c.checkValidity()) { c.removeAttribute('aria-invalid'); r.textContent = ''; }
  }
  form.addEventListener('input', clear);
  form.addEventListener('change', clear);
})();
