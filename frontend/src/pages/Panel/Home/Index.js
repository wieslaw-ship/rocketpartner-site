import React, { useContext, useEffect, useState } from "react";
import Layout from "../../../components/Layout/Layout";
import Loader from "../../../components/Loader";
import { UserContext } from "../../../context/UserContext";
import {
  fetchMyDocuments,
  getMyData,
  resendUserVerificationEmail,
} from "../../../api/auth";
import {
  NotificationError,
  NotificationSuccess,
} from "../../../components/Notification";
import { DayMonthYearClassic } from "../../../components/Dates";
import { Link } from "react-router-dom";
import { TextField } from "@mui/material";
import { changeUserPassword } from "../../../api/user";
import { t } from "i18next";
import { useTranslation } from "react-i18next";
const Home = () => {
  const [user, setUser] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [modalPassword, setModalPassword] = useState(false);
  const { token } = useContext(UserContext);
  const [userDocuments, setUserDocuments] = useState([]);
  const [hasZus, setHasZus] = useState(false);
  const [hasZlecenie, setHasZlecenie] = useState(false);
  const { t, i18n } = useTranslation();
  const [passwordForm, setPasswordForm] = useState({
    password: "",
    new_password: "",
    re_new_password: "",
  });

  const fetchUser = async () => {
    let result = await getMyData(token);
    if (result.isOk) {
      setUser(result.data);
      setLoaded(true);
    } else {
      NotificationError(result.message);
      setLoaded(true);
    }
  };

  useEffect(() => {
    userDocuments.forEach((doc) => {
      if (doc.name === "Umowa zlecenia") {
        setHasZlecenie(true);
      } else if (doc.name === "Oświadczenie ZUS") {
        setHasZus(true);
      }
    });
  }, [userDocuments]);

  const getUserDocuments = async () => {
    let result = await fetchMyDocuments(token);
    if (result.isOk) {
      setUserDocuments(result.data);
    } else {
      NotificationError(result.message);
    }
  };

  useEffect(() => {
    fetchUser();
    getUserDocuments();
  }, []);

  const handleResendEmail = async () => {
    let result = await resendUserVerificationEmail(token);
    if (result.isOk) {
      return NotificationSuccess(t("Wysłano wiadomość z linkiem aktywacyjnym"));
    } else {
      return NotificationError(result.message);
    }
  };

  const changePassword = async (e) => {
    e.preventDefault();
    if (!passwordForm.password) {
      return NotificationError(t("Podaj aktualne hasło."));
    }
    if (!passwordForm.new_password) {
      return NotificationError(t("Podaj nowe hasło"));
    }
    if (!passwordForm.re_new_password) {
      return NotificationError(t("Potwórz nowe hasło"));
    }
    if (passwordForm.re_new_password !== passwordForm.new_password) {
      return NotificationError(t("Podane hasła się różnią"));
    }
    let result = await changeUserPassword(token, passwordForm);
    if (result.isOk) {
      NotificationSuccess(t("Pomyślnie zmieniono hasło"));
      setModalPassword(false);
      setPasswordForm({
        password: "",
        new_password: "",
        re_new_password: "",
      });
    } else {
      NotificationError(result.message);
    }
  };

  return (
    <Layout active={1}>
      {!loaded ? (
        <Loader />
      ) : (
        <>
          {modalPassword && (
            <div className="modalOverlay">
              <div className="modalInner password">
                <div
                  className="closeForm"
                  onClick={() => setModalPassword(!modalPassword)}
                >
                  ×
                </div>
                <form onSubmit={changePassword}>
                  <TextField
                    placeholder={t("Aktualne hasło")}
                    type="password"
                    value={passwordForm.password}
                    onChange={(e) =>
                      setPasswordForm({
                        ...passwordForm,
                        password: e.target.value,
                      })
                    }
                  />
                  <TextField
                    placeholder={t("Nowe hasło")}
                    type="password"
                    value={passwordForm.new_password}
                    onChange={(e) =>
                      setPasswordForm({
                        ...passwordForm,
                        new_password: e.target.value,
                      })
                    }
                  />
                  <TextField
                    placeholder={t("Potwórz nowe hasło")}
                    type="password"
                    value={passwordForm.re_new_password}
                    onChange={(e) =>
                      setPasswordForm({
                        ...passwordForm,
                        re_new_password: e.target.value,
                      })
                    }
                  />

                  <button className="mainButton">{t("Zmień")}</button>
                </form>
              </div>
            </div>
          )}
          <div className="row">
            <div className="col-sm-12 col-md-12 col-lg-6">
              <h1>
                {user.first_name} {user.surname}
              </h1>
              {!user.email_verified && (
                <div className="todo red">
                  {t(
                    "Zatwierdź swój adres e-mail, aby kontyunuować i rozpocząć prace."
                  )}
                  <button className="mt-4" onClick={handleResendEmail}>
                    {t("Wyślij ponownie email")}
                  </button>
                </div>
              )}

              {(!hasZus || !hasZlecenie) && (
                <div className="todo yello ">
                  {t(
                    "Rozliczenia będą możliwe po wypełnieniu oraz podpisaniu Twoich dokumentów."
                  )}

                  <ul>
                    {!hasZus && (
                      <li>{t("Wypełnij i podpisz Oświadczenie ZUS")}</li>
                    )}
                    {!hasZlecenie && (
                      <li>{t("Wypełnij i podpisz Umowę zlecenie")}</li>
                    )}
                  </ul>
                </div>
              )}
              <div className="table-responsive">
                <table className="table">
                  <tbody>
                    <tr>
                      <td>{t("Status email:")}</td>
                      {user.email_verified ? (
                        <td class="text-green">
                          <span className="green text-green">
                            {t("Zatwierdzony")}
                          </span>
                        </td>
                      ) : (
                        <td class="text-red red error">
                          <span className="error">{t("Nie zatwierdzony")}</span>
                        </td>
                      )}
                    </tr>
                    <tr>
                      <td>{t("Data rejestracji:")}</td>
                      <td>{DayMonthYearClassic(user.date_created)}</td>
                    </tr>
                    <tr>
                      <td>{t("Przychód netto:")}</td>
                      <td>{user.income_netto ? user.income_netto : 0} zł</td>
                    </tr>
                    <tr>
                      <td>{t("Przychód brutto:")}</td>
                      <td>{user.income_gross ? user.income_gross : 0} zł</td>
                    </tr>
                    <tr>
                      <td>{t("Suma VAT:")}</td>
                      <td>{user.income_gross - user.income_netto} zł</td>
                    </tr>
                    <tr>
                      <td>{t("Suma prowizji Rocket Partner:")}</td>
                      <td>
                        {user.sum_commission ? user.sum_commission : 0} zł
                      </td>
                    </tr>

                    <tr>
                      <td>{t("Ogólne wypłaty:")}</td>
                      <td>{user.sum_paycheck ? user.sum_paycheck : 0} zł</td>
                    </tr>
                    <tr>
                      <td>{t("Wybrana gotówka:")}</td>
                      <td>0&nbsp;zł</td>
                    </tr>
                    <tr>
                      <td>{t("Aktualny stan konta:")}</td>
                      <td>{user.balance ? user.balance : 0} zł </td>
                    </tr>

                    <tr>
                      <td>{t("Zmień hasło")}</td>
                      <td>
                        <button
                          className="main"
                          onClick={() => setModalPassword(!modalPassword)}
                        >
                          {t("Zmień hasło")}
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-lg-6"></div>
          </div>
        </>
      )}
    </Layout>
  );
};
export default Home;
