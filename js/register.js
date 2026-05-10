// ── register.js ── Register page — form built via JavaScript DOM

function initRegisterPage() {
  const main = document.getElementById('main-content');
  const page = document.createElement('div');
  page.className = 'authPage';
  const card = document.createElement('div');
  card.className = 'authCard';

  const title = document.createElement('h1');
  title.className = 'authTitle';
  title.textContent = 'Create an Account';

  const subtitle = document.createElement('p');
  subtitle.className = 'authSubtitle';
  subtitle.textContent = 'Join Crave to get the best food delivered.';

  const form = document.createElement('form');

  function makeField(id, type, label, minLen) {
    const group = document.createElement('div');
    group.className = 'authFormGroup';
    const lbl = document.createElement('label');
    lbl.className = 'authLabel'; lbl.htmlFor = id; lbl.textContent = label;
    const input = document.createElement('input');
    input.className = 'authInput'; input.type = type; input.id = id; input.required = true;
    if (minLen) input.minLength = minLen;
    group.appendChild(lbl); group.appendChild(input);
    form.appendChild(group);
    return input;
  }

  const nameInput  = makeField('name', 'text', 'Full Name');
  const emailInput = makeField('email', 'email', 'Email Address');
  const passInput  = makeField('password', 'password', 'Password', 6);

  const errorEl = document.createElement('p');
  errorEl.className = 'authError';
  errorEl.style.display = 'none';
  form.appendChild(errorEl);

  const submitBtn = document.createElement('button');
  submitBtn.type = 'submit';
  submitBtn.className = 'btn-primary authSubmitBtn';
  submitBtn.textContent = 'Sign Up';
  form.appendChild(submitBtn);

  form.addEventListener('submit', e => {
    e.preventDefault();
    submitBtn.disabled = true; submitBtn.textContent = 'Creating account...';

    const users = loadFromStorage('crave-users', []);
    if (users.find(u => u.email === emailInput.value)) {
      errorEl.textContent = 'An account with this email already exists.';
      errorEl.style.display = 'block';
      submitBtn.disabled = false; submitBtn.textContent = 'Sign Up';
      return;
    }
    users.push({ name: nameInput.value, email: emailInput.value, password: passInput.value });
    saveToStorage('crave-users', users);
    saveToStorage('crave-user', { name: nameInput.value, email: emailInput.value });
    goTo('index.html');
  });

  const footer = document.createElement('p');
  footer.className = 'authFooterText';
  footer.textContent = 'Already have an account? ';
  const link = document.createElement('a');
  link.href = 'login.html'; link.className = 'authLink'; link.textContent = 'Sign In';
  footer.appendChild(link);

  card.appendChild(title); card.appendChild(subtitle); card.appendChild(form); card.appendChild(footer);
  page.appendChild(card);
  main.appendChild(page);
}

document.addEventListener('DOMContentLoaded', initRegisterPage);
