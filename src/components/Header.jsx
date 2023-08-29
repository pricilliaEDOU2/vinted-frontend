import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
const Header = ({ token, handleToken }) => {
  return (
    <header>
      <div className="container">
        <div className="elem-header">
          <div>
            <Link to={`/`}>
              <img src={logo} alt="Logo Vinted" />
            </Link>
          </div>
          <div className="search">
            <input type="text" placeholder="Recherche des articles" />
          </div>
          <nav>
            {token ? (
              <button
                onClick={() => {
                  handleToken();
                }}
              >
                Deconnexion
              </button>
            ) : (
              <>
                <Link to="signup">
                  <button>S'inscrire</button>
                </Link>
                <Link to="login">
                  <button>Se connecter</button>
                </Link>
              </>
            )}

            <Link to="login">
              <button className="sales">Vends tes articles</button>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
