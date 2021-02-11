const signUpUser = (users, u) => {
  res = users.find((user) => user.username === u.username);
  console.log(res);
  if (!res) {
    axios
      .post("https://wiki-studioghibli-endpoint.herokuapp.com/users", u)

      .then((response) => {
        console.log(response.data);
        $("#navLogInBtn").text(`welcome ${u.username} (click to loggOut)`)
        $("#signUpModal").modal("hide");
        $("#unameInpReg").val("");
        $("#upassInpReg").val("");
        alert("se ha registrado correctamente");
      })

      .catch((err) => {
          alert("ha habido un error con el servidor")
        console.log(err);
      });
  } else alert("Ya existe un usuario con ese username prueba con otro");
};

const logInUser = (users, u) => {
  res = users.find((user) => user.username === u.username);
  console.log(res);
  if (!res) alert("parametros mal introducidos por favor intentelo de nuevo");
  else {
    if (res.pass === u.pass) {
        $("#navLogInBtn").text(`welcome ${u.username} (click to loggOut)`)
      //falta asignar un valor en la pantalla para que se vea que se ha iniciado sesion, pe sustituir el valor de logIn
      $("#logInModal").modal("hide");
      $("#unameInpSign").val("");
      $("#upassInpSign").val("");
      alert("se ha iniciado sesion correctamente");
    } else alert("la contrasenia es incorrecta");
  }
};

$(window).on("load", async () => {
  var user = {
    username: "",
    pass: "",
  };
  try {
    users = (
      await axios.get("https://wiki-studioghibli-endpoint.herokuapp.com/users")
    ).data;
    console.log(users);
  } catch (error) {
    console.log(error);
  }

  $("#navLogInBtn").on("click", async () => {
    var value = $("#navLogInBtn").text();
    console.log(value)
    if(value !== "LogIn") {
        alert("se ha cerrado sesion correctamente")
        $("#navLogInBtn").text("LogIn")
    }else{
        $("#logInModal").modal("toggle");
    }
  });

  $("#logInBtn").on("click", async () => {
    user.username = $("#unameInpSign").val();
    user.pass = $("#upassInpSign").val();
    console.log(user);

    if (!(user.username && user.pass)) alert("rellena los parametros");
    else {
      logInUser(users, user);
    }
  });

  $("#registerBtn").on("click", async () => {
    user.username = $("#unameInpReg").val();
    user.pass = $("#upassInpReg").val();
    if (!(user.username && user.pass)) alert("rellena los parametros");
    else {
      signUpUser(users, user);
    }
  });
});
