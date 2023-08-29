import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Login = ({ handleToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  return (
    <div className="signup">
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          try {
            const response = await axios.post(
              "https://lereacteur-vinted-api.herokuapp.com/user/login",
              {
                email,
                password,
              }
            );
            console.log(response.data);
            handleToken(response.data.token);
            navigate("/");
          } catch (error) {
            // console.log(error.message);
            console.log(error.response.data);
          }
        }}
      >
        <h1>Se connecter</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <input className="submit" type="submit" value="Se connecter" />
      </form>
      <Link to="/signup">
        <p> Pas encore de compte ? Inscris-toi !</p>
      </Link>
    </div>
  );
};

export default Login;
