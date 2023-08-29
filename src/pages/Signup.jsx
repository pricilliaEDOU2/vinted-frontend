import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Signup = ({ handleToken }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsLetter, setNewsLetter] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  return (
    <div className="signup">
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          try {
            setErrorMessage("");

            const response = await axios.post(
              "https://lereacteur-vinted-api.herokuapp.com/user/signup",
              {
                email: email,
                username: username,
                password: password,
                newsletter: newsLetter,
              }
            );
            //console.log(response.data);

            handleToken(response.data.token);
            navigate("/");
          } catch (error) {
            console.log(error.response);
            if (
              error.response.data.message ===
              "This email already has an account"
            ) {
              setErrorMessage(
                "This email already exists, please enter an other mail)"
              );
            } else if (error.response.data.message === "Missing parameters") {
              setErrorMessage("Missing parameters");
            }
          }
        }}
      >
        <h1>S'inscrire</h1>
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          value={username}
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
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
        <div>
          <input
            type="checkbox"
            checked={newsLetter}
            onChange={() => {
              setNewsLetter(!newsLetter);
            }}
          />
          <span>S'inscrire à notre newsletter</span>
        </div>
        <input className="submit" type="submit" value="S'inscrire" />
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      </form>
      <Link to="/login">
        <p> Tu as déjà un compte ? Connectes-toi ! </p>
      </Link>
    </div>
  );
};

export default Signup;
