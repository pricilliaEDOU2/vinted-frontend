import logo from "../assets/logo.png";
const Header = () => {
  return (
    <header>
      <div className="container">
        <div className="elem-header">
          <div>
            <img src={logo} alt="Logo Vinted" />
          </div>
          <div className="search">
            <input type="text" placeholder="Recherche des articles" />
          </div>
          <nav>
            <button>S'inscrire</button>
            <button>Se connecter</button>
            <button className="sales">Vends tes articles</button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
