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
    errors.pseudo = "email invalide";
  }
  if (err.message.includes("password")) {
    errors.pseudo = "Mot de passe incorrect (minimum 6 caractères)";
  }
  if (err.code === 11000) {
    Object.keys(err.keyValue).map((key) => {
      if (key.includes("pseudo")) {
        errors.pseudo = "Pseudo déjà utilisé";
      }
      if (key.includes("email")) {
        errors.pseudo = "Email déjà utilisé";
      }
    });
  }

  return errors;
};
