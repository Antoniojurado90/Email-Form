document.addEventListener("DOMContentLoaded", function () {
  const email = {
    email: "",
    asunto: "",
    mensaje: "",
  };
  //Seleccionando los elementos de la interfaz HTML
  const inputEmail = document.querySelector("#email");
  const inputAsunto = document.querySelector("#asunto");
  const inputMensaje = document.querySelector("#mensaje");
  const formulario = document.querySelector("#formulario");
  const btnSubmit = document.querySelector('#formulario button[type="submit"]');
  const btnReset = document.querySelector('#formulario button[type="reset"]');
  const spinner = document.querySelector("#spinner");

  //Asignando Eventos
  inputEmail.addEventListener("input", validar);
  inputAsunto.addEventListener("input", validar);
  inputMensaje.addEventListener("input", validar);
  formulario.addEventListener("submit", enviarEmail);

  //Preguntar antes de resetear por seguridad
  btnReset.addEventListener("click", function (e) {
    e.preventDefault();
    //Reiniciar el formulario(objeto)
    resetFormulario();
  });

  //Configuracion Spinner
  function enviarEmail(e) {
    e.preventDefault();
    spinner.classList.add("flex");
    spinner.classList.remove("hidden");

    //Configuracion tiempos Spinner
    setTimeout(() => {
      spinner.classList.remove("flex");
      spinner.classList.add("hidden");
      resetFormulario();

      //Crear una alerta
      const alertaExito = document.createElement("P");
      alertaExito.classList.add(
        "bg-green-500",
        "text-white",
        "p-2",
        "text-center",
        "rounded-lg",
        "mt-10",
        "font-bold",
        "text-sm",
        "uppercase"
      );
      alertaExito.textContent = "Mensaje enviado correctamente";

      formulario.appendChild(alertaExito);

      setTimeout(() => {
        alertaExito.remove();
      }, 3000);
    }, 3000);
  }

  //Validacion de campos
  function validar(e) {
    if (e.target.value.trim() === "") {
      mostrarAlerta(
        `El campo ${e.target.id} es obligatorio`,
        e.target.parentElement
      );
      email[e.target.name] = "";
      comprobarEmail();
      return;
    }
    if (e.target.id === "email" && !validarEmail(e.target.value)) {
      mostrarAlerta("El email no es valido", e.target.parentElement);
      email[e.target.name] = "";
      comprobarEmail();
      return;
    }
    limpiarAlerta(e.target.parentElement);

    //Asignar valores a cada Campo en el objeto
    email[e.target.name] = e.target.value.trim().toLowerCase();
    comprobarEmail();
  }
  //Generar alerta en HTML
  function mostrarAlerta(mensaje, referencia) {
    limpiarAlerta(referencia);
    const error = document.createElement("P");
    error.textContent = mensaje;
    error.classList.add("bg-red-600", "text-white", "p-2", "text-center");
    //Inyectar el error al formulario, cada error en su <div>.
    referencia.appendChild(error);
  }

  function limpiarAlerta(referencia) {
    //Comprobar si ya existe una alerta (para no repetir)
    const alerta = referencia.querySelector(".bg-red-600");
    if (alerta) {
      alerta.remove();
    }
  }

  //Validacion de formulario
  function validarEmail(email) {
    const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    const resultado = regex.test(email);
    return resultado;
  }

  function comprobarEmail() {
    if (Object.values(email).includes("")) {
      btnSubmit.classList.add("opacity-50");
      btnSubmit.disabled = true;
      return;
    }
    btnSubmit.classList.remove("opacity-50");
    btnSubmit.disabled = false;
  }

  //Funcion para resetear formulario
  function resetFormulario() {
    //Reiniciar el formulario(objeto)
    email.email = "";
    email.asunto = "";
    email.mensaje = "";

    formulario.reset();
    comprobarEmail();
  }
});
