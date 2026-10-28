const form = document.getElementById('signup');
const status = document.getElementById('status');

function show(message, kind) {
  status.textContent = message;
  status.className = 'status ' + kind;
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const email = form.email.value.trim();
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    show('Vpiši veljaven e-naslov.', 'err');
    form.email.focus();
    return;
  }

  const button = form.querySelector('button[type="submit"]');
  button.disabled = true;
  show('', '');

  try {
    const response = await fetch(form.action, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        role: form.role.value,
        website: form.website.value,
      }),
    });
    if (!response.ok) throw new Error(String(response.status));
    form.reset();
    show('Hvala, javimo se ob zagonu.', 'ok');
  } catch {
    show('Prijava ni uspela. Poskusi znova čez nekaj minut.', 'err');
  } finally {
    button.disabled = false;
  }
});
