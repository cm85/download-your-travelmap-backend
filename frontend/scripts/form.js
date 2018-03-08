module.exports = () => {
  const form = document.querySelector('form');
  const input = form.querySelector('#url');
  const apiEndpoint = form.getAttribute('action');
  const submit = (event, value) => {
    console.log(value);
    window.fetch(apiEndpoint);
  };

  form.noValidate = true;

  form.onsubmit = (event) => {
    event.preventDefault();
    if (!form.checkValidity()) {
      input.value = '';
      input.focus();
    }
    submit(event, input.value);
  };
  input.oninvalid = () => {
    input.classList.add('invalid');
    // sure?
    input.oninput = () => {
      input.oninput = null;
      input.checkValidity();
    };
  };
  input.addEventListener('paste', (event) => {
    window.setTimeout(() => {
      submit(event, input.value);
    }, 1);
  });
};

