import "./Header.css";
import Logo from "../../img/Vinted_logo.png";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <div className="containerHeader">
        <Link to="/">
          <img alt="logo de Vinted" src={Logo} />
        </Link>
        <div className="searchContainer">
          <FaSearch className="searchIcon" />
          <input
            type="text"
            name="recherche"
            placeholder="Recherche des articles"
          />
        </div>

        <div className="buttonsOfHeader">
          <button>S'inscrire</button> <button>Se connecter</button>
        </div>
        <button className="sellyourobjects">Vends tes articles</button>
      </div>
    </header>
  );
};

export default Header;
