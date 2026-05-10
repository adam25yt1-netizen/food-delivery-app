// ── login.js ── Login page — form built via JavaScript DOM

function initLoginPage() {
  const main = document.getElementById('main-content');

  const page = document.createElement('div');
  page.className = 'authPage';

  const card = document.createElement('div');
  card.className = 'authCard';

  // All text set via JavaScript
  const title = document.createElement('h1');
  title.className = 'authTitle';
  title.textContent = 'Welcome Back';

  const subtitle = document.createElement('p');
  subtitle.className = 'authSubtitle';
  subtitle.textContent = 'Sign in to your Crave account.';

  const form = document.createElement('form');

  function makeField(id, type, label) {
    const group = document.createElement('div');
    group.className = 'authFormGroup';
    const lbl = document.createElement('label');
    lbl.className = 'authLabel';
    lbl.htmlFor = id;
    lbl.textContent = label;
    const input = document.createElement('input');
    input.className = 'authInput';
    input.type = type; input.id = id; input.required = true;
    group.appendChild(lbl); group.appendChild(input);
    form.appendChild(group);
    return input;
  }

  const emailInput = makeField('email', 'email', 'Email Address');
  const passInput  = makeField('password', 'password', 'Password');

  const errorEl = document.createElement('p');
  errorEl.className = 'authError';
  errorEl.style.display = 'none';
  form.appendChild(errorEl);

  const submitBtn = document.createElement('button');
  submitBtn.type = 'submit';
  submitBtn.className = 'btn-primary authSubmitBtn';
  submitBtn.textContent = 'Sign In';
  form.appendChild(submitBtn);

  form.addEventListener('submit', e => {
    e.preventDefault();
    submitBtn.textContent = 'Signing in...';
    submitBtn.disabled = true;

    const users = loadFromStorage('crave-users', []);
    const user  = users.find(u => u.email === emailInput.value && u.password === passInput.value);

    if (user) {
      saveToStorage('crave-user', { name: user.name, email: user.email });
      goTo('index.html');
    } else {
      errorEl.textContent = 'Invalid email or password.';
      errorEl.style.display = 'block';
      submitBtn.textContent = 'Sign In';
      submitBtn.disabled = false;
    }
  });

  const footer = document.createElement('p');
  footer.className = 'authFooterText';
  footer.textContent = "Don't have an account? ";
  const link = document.createElement('a');
  link.href = 'register.html'; link.className = 'authLink'; link.textContent = 'Sign Up';
  footer.appendChild(link);

  card.appendChild(title); card.appendChild(subtitle); card.appendChild(form); card.appendChild(footer);
  page.appendChild(card);
  main.appendChild(page);
}

document.addEventListener('DOMContentLoaded', initLoginPage);
