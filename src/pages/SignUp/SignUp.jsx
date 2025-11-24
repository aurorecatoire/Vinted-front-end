import "./SignUp.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const SignUp = ({ setUser }) => {
  const [username, SetUsername] = useState("");
  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");
  const [newsletter, SetNewsletter] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!username || !email || !password) {
      setErrorMessage("Merci de remplir tous les champs");

      return; // stoppe l'exécution si un champ est vide
    }

    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/signup",
        { email, username, password, newsletter }
      );
      if (response.data.token) {
        // S'il y a un token on le stocke dans les cookies
        setUser(response.data.token);
        // on redirige l'utilisateur vers la page home
        navigate("/");
        // reset le message d'erreur
        setErrorMessage("");
      } else {
        setErrorMessage("Un problème est survenu...");
      }

      navigate("/");
    } catch (error) {
      error.response
        ? setErrorMessage(error.response.data.message)
        : console.log(error);
    }
  };

  return (
    <main className="signUp">
      <h1 className="inscription">S'inscrire</h1>{" "}
      {/* FORMULAIRE D'INSCRIPTION */}
      <form  onSubmit={handleSubmit}>
        <div className="form_signUp" >
          <label htmlFor="username" />
          <input
            type="text"
            placeholder="Nom d'utilisateur"
            id="username"
            value={username}
            onChange={(event) => SetUsername(event.target.value)}
          />
        </div>
        <div className="form_signUp" >
          <label htmlFor="email" />
          <input
            type="text"
            placeholder="Email"
            id="email"
            value={email}
            onChange={(event) => SetEmail(event.target.value)}
          />
        </div>
        <div className="form_signUp" >
          <label htmlFor="password" />
          <input
            type="password"
            placeholder="Mot de passe"
            id="password"
            value={password}
            onChange={(event) => SetPassword(event.target.value)}
          />
        </div>
        <section className="checkbox">
        <div className="newsletter_checkbox">
          <input
            type="checkbox"
            onChange={(event) => SetNewsletter(event.target.checked)}
          />
          <span>S'inscrire à notre newsletter</span>
        </div>
        <p>
          En m'inscrivant je confirme avoir lu et accepté les Termes &
          Conditions et Politique de Confidentialité de Vinted. Je confirme
          avoir au moins 18 ans.
        </p>
        </section>

        <button type="submit">S'inscrire</button>
      </form>
      <Link to="/login">
        <p className="already_account">Tu as déjà un compte ? Connecte-toi !</p>
      </Link>
    </main>
  );
};

export default SignUp;
