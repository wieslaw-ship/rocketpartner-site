import { useNavigate, useSearchParams } from "react-router-dom";
import Loader from "../../../components/Loader";

import React, { useEffect } from "react";
import { verificateUserEmail } from "../../../api/auth";
import {
  NotificationError,
  NotificationSuccess,
} from "../../../components/Notification";

const Verification = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const verificate = async () => {
    let email = searchParams.get("email");
    let result = await verificateUserEmail(email);
    if (result.isOk) {
      NotificationSuccess("Pomyślnie zweryfikowano adres e-mail");
    } else {
      NotificationError(result.message);
    }
    navigate("/moje-konto");
  };

  const navigate = useNavigate();

  useEffect(() => {
    verificate();
  }, []);
  return (
    <div>
      <Loader />
    </div>
  );
};

export default Verification;
