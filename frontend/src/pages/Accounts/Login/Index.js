import { TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from "../../../components/validators";
import { NotificationError } from "../../../components/Notification";
import { UserContext } from "../../../context/UserContext";
import { signIn } from "../../../api/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const authCtx = useContext(UserContext);

  const navigate = useNavigate();

  const handleForm = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      return NotificationError("Nie prawidłowy adres e-mail");
    }
    if (!password) {
      return NotificationError("Brak hasła");
    }
    const response = await signIn(email, password);
    if (response.isOk) {
      const expirationTime = new Date(
        new Date().getTime() + 1000 * 60 * 60 * 24 * 1
      );
      authCtx.login(response.data.access_token, expirationTime);
      navigate("/moje-konto");
    } else {
      NotificationError(response.message);
    }
  };

  return (
    <div className="container-fluid" id="bgLogin">
      <div className="LoginForm">
        <form onSubmit={handleForm}>
          <div className="text-center">
            <img src="/logo.png" className="img-fluid logo" />
          </div>
          <TextField
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Adres e-mail"
            fullWidth
          />
          <TextField
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Hasło"
            fullWidth
          />
          <div className="text-center py-2">
            <button className="mainButton px-5">Zaloguj się</button>
          </div>
          <div className="text-start py-2 w-100 d-flex flex-row flex-wrap align-items-center justify-content-between">
            <Link to="/zarejestruj-sie">Nie masz konta? Zarejestruj się</Link>

            <Link to="/przypomnij-haslo">Zapomniałeś hasła?</Link>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Login;
