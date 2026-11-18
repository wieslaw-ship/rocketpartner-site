import { TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from "../../../components/validators";
import {
  NotificationError,
  NotificationSuccess,
} from "../../../components/Notification";
import { UserContext } from "../../../context/UserContext";
import { resetPassword, signIn } from "../../../api/auth";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const handleForm = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      return NotificationError("Nie prawidłowy adres e-mail");
    }

    const response = await resetPassword({ email: email });
    if (response.isOk) {
      NotificationSuccess("Twoje nowe hasło zostało wysłane na email.");
      navigate("/zaloguj-sie");
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

          <div className="text-center py-2">
            <button className="mainButton px-5">Przypomnij hasło</button>
          </div>
          <div className="text-start py-2 w-100 d-flex flex-row flex-wrap align-items-center justify-content-between">
            <Link to="/zaloguj-sie">Zaloguj się</Link>
          </div>
        </form>
      </div>
    </div>
  );
};
export default ForgetPassword;
