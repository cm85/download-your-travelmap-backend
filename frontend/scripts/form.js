const map = require('./map');

module.exports = () => {
  const form = document.querySelector('form');
  const input = form.querySelector('#url');
  // const apiEndpoint = form.getAttribute('action');
  const submit = async (event, value) => {
    console.log('submit');
    try {
      const result = await window.fetch(' https://15qdjxcjh3.execute-api.us-east-1.amazonaws.com/test?url=http%3A%2F%2Fwww.tripadvisor.com%2Fmembers%2Fchristianhaller?url=http%3A%2F%2Fwww.tripadvisor.com%2Fmembers%2Fchristianhaller');
      console.log((await result.json()).places);
    } catch (err) {
      console.log(err);
    }


    // map();
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

