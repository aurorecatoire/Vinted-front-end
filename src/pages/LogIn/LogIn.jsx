import "./LogIn.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const LogIn = ({ setUser }) => {
  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!email || !password) {
      setErrorMessage("Merci de remplir tous les champs");

      return; // stoppe l'exécution si un champ est vide
    }

    try {
      console.log(email);
      console.log(password);
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/login",
        { email, password }
      );
      if (response.data.token) {
        setUser(response.data.token);
        setErrorMessage("");
        navigate("/");
      } else {
        setErrorMessage("Un problème est survenu");
      }
    } catch (error) {
      error.response
        ? setErrorMessage(error.response.data.message)
        : console.log(error);
    }
  };

  return (
    <main className="logIn">
      <h1 className="connexion">Se connecter</h1>
      <form onSubmit={handleSubmit}>
        <div className="form_logIn">
          <label htmlFor="email" />
          <input
            type="text"
            placeholder="Email"
            id="email"
            value={email}
            onChange={(event) => SetEmail(event.target.value)}
          />
        </div>
        <div className="form_logIn">
          <label htmlFor="password" />
          <input
            type="password"
            placeholder="Mot de passe"
            id="password"
            value={password}
            onChange={(event) => SetPassword(event.target.value)}
          />
        </div>

        <button type="submit">Se connecter</button>
      </form>
      <Link to="/signup">
        <p className="no_account">Pas encore de compte ? Inscris-toi !</p>
      </Link>
    </main>
  );
};

export default LogIn;
