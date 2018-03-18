const map = require('./map');

module.exports = () => {
  const formWrapper = document.querySelector('.form');

  const form = formWrapper.querySelector('form');
  const expander = formWrapper.querySelector('.expander');

  expander.addEventListener('click', () => {
    formWrapper.classList.remove('success');
  });

  const input = form.querySelector('#url');
  const apiEndpoint = form.getAttribute('action');
  // const apiEndpoint = 'https://15qdjxcjh3.execute-api.us-east-1.amazonaws.com/test?url=http%3A%2F%2Fwww.tripadvisor.com%2Fmembers%2Fchristianhaller?url=http%3A%2F%2Fwww.tripadvisor.com%2Fmembers%2Fchristianhaller'
  const submit = async () => {
    console.log('submit');
    try {
      const result = await window.fetch(apiEndpoint);
      map((await result.json()).places);
      formWrapper.classList.add('success');
    } catch (err) {
      console.log(err);
    }
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

