const form = document.querySelector("#form");

// eventos
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const fields = [
    {
      id: "name",
      label: "Nome",
      validator: nameIsValid,
    },

    {
      id: "email",
      label: "Email",
      validator: emailIsValid,
    },
    {
      id: "subject",
      label: "Assunto",
      validator: subjectIsValid,
    },
    {
      id: "message",
      label: "Mensagem",
      validator: messageIsValid,
    },
  ];

  let formIsValid = true;

  // validando os valores de nome, email, assunto e mensagem de acordo com as funções "classe"IsValid

  fields.forEach(function (field) {
    const input = document.getElementById(field.id);
    const inputGroup = input.closest(".inputGroup");
    // const inputValue = input.value;
    const errorSpan = inputGroup.querySelector(".error");

    errorSpan.innerHTML = "";
    inputGroup.classList.remove("invalid");
    inputGroup.classList.add("valid");

    const fieldValidator = field.validator(input.value);

    if (!fieldValidator.isValid) {
      errorSpan.innerHTML = `${fieldValidator.errorMessage}`;
      inputGroup.classList.add("invalid");
      inputGroup.classList.remove("valid");
      formIsValid = false;
    } else {
      inputGroup.classList.add("valid");
      inputGroup.classList.remove("invalid");
    }
  });

  // se todos os campos do formulário estiverem preenchidos corretamente a mensagem é enviada ao meu email utilizando emailJS
  emailjs.init("GjHA3fPji6uL_LMca");
  const serviceID = "service_tr82g75";
  const templateID = "template_11qkgbv";
  const submitButton = document.getElementById("#button02");

  if (!formIsValid) return;

  const formData = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    subject: document.getElementById("subject").value,
    message: document.getElementById("message").value,
  };

  emailjs
    .send(serviceID, templateID, formData)
    .then(() => {
      Toastify({
        text: "Mensagem enviada com sucesso!",
        duration: 3000,
        style: {
          background: "#ac274f",
          color: "#dbdbdb",
        },
      }).showToast();

      document.getElementById("form").reset();
    })
    .catch((error) => {
      console.error("Erro ao enviar a mensagem:", error);
      Toastify({
        text: "Erro ao enviar mensagem!",
        duration: 3000,
        style: {
          background: "#ac274f",
          color: "#dbdbdb",
        },
      }).showToast();
      document.getElementById("form").reset();
    });
});

// FUNÇÕES

function isEmpty(value) {
  return value === "";
}

function nameIsValid(value) {
  const validator = {
    isValid: true,
    errorMessage: null,
  };

  if (isEmpty(value)) {
    validator.isValid = false;
    validator.errorMessage = "Este campo é obrigatório";
    return validator;
  }

  const min = 3;

  if (value.length < min) {
    validator.isValid = false;
    validator.errorMessage = `O campo deve ter no mínimo ${min} caracteres`;
    return validator;
  }

  const regex = /^[a-zA-Z\s]+$/;

  if (!regex.test(value)) {
    validator.isValid = false;
    validator.errorMessage = "O campo deve conter apenas letras";
  }

  return validator;
}

function emailIsValid(value) {
  const validator = {
    isValid: true,
    errorMessage: null,
  };

  if (isEmpty(value)) {
    validator.isValid = false;
    validator.errorMessage = "Este campo é obrigatório";
    return validator;
  }

  const regex = new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$");
  if (!regex.test(value)) {
    validator.isValid = false;
    validator.errorMessage = "O campo deve conter um email válido";
    return validator;
  }

  return validator;
}

function subjectIsValid(value) {
  const validator = {
    isValid: true,
    errorMessage: null,
  };

  if (isEmpty(value)) {
    validator.isValid = false;
    validator.errorMessage = "Este campo é obrigatório";
    return validator;
  }
  return validator;
}

function messageIsValid(value) {
  const validator = {
    isValid: true,
    errorMessage: null,
  };

  if (isEmpty(value)) {
    validator.isValid = false;
    validator.errorMessage = "Este campo é obrigatório";
    return validator;
  }
  return validator;
}
