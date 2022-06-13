module.exports.signUpErrors = (err) => {
  let errors = {
    pseudo: "",
    email: "",
    password: "",
  };

  if (err.message.includes("pseudo")) {
    errors.pseudo = "Pseudo requis ou invalide";
  }
  if (err.message.includes("email")) {
    errors.email = "email invalide";
  }
  if (err.message.includes("password")) {
    errors.password = "Mot de passe incorrect (minimum 6 caractères)";
  }
  if (err.code === 11000) {
    Object.keys(err.keyValue).map((key) => {
      if (key.includes("pseudo")) {
        errors.pseudo = "Pseudo déjà utilisé";
      }
      if (key.includes("email")) {
        errors.email = "Email déjà utilisé";
      }
    });
  }

  return errors;
};

module.exports.signInErrors = (err) => {
  let errors = {
    email: "",
    password: "",
  };

  if (err.message.includes("email")) errors.email = "Email inconnu";
  if (err.message.includes("password")) errors.email = "Mot de passe incorrect";

  return errors;
};
