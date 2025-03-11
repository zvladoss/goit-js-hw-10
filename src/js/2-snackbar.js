const STORAGE_KEY = 'feedback-form-state';
const refs = {
  formFeedback: document.querySelector('.feedback-form'),
  input: document.querySelector("input[name='email']"),
  textarea: document.querySelector("textarea[name='message']"),
};

let formData = {
  email: '',
  message: '',
};

const fillFormFields = () => {
  try {
    const formLsData = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!formLsData) {
      return;
    }
    formData = formLsData;
    Object.keys(formLsData).forEach(key => {
      if (refs.formFeedback.elements[key]) {
        refs.formFeedback.elements[key].value = formLsData[key];
      }
    });
  } catch (error) {
    console.error(error);
  }
};

fillFormFields();

const onFormFieldChange = ({ target }) => {
  formData[target.name] = target.value.trim();

  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
};

const onFeedbackFormSubmit = event => {
  event.preventDefault();
  const { email, message } = formData;
  if (!email || !message) {
    alert('Fill please all fields.');
    return;
  }
  console.log(formData);
  localStorage.removeItem(STORAGE_KEY);
  formData = { email: '', message: '' };
  event.currentTarget.reset();
};
refs.formFeedback.addEventListener('input', onFormFieldChange);
refs.formFeedback.addEventListener('submit', onFeedbackFormSubmit);
