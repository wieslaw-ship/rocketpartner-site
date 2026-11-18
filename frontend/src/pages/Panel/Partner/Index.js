import React, { useContext, useEffect, useState } from "react";
import Layout from "../../../components/Layout/Layout";
import QRCode from "react-qr-code";
import { Link } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { UserContext } from "../../../context/UserContext";
import { getMyData, getMyZaproszoneOsoby } from "../../../api/auth";
import copy from "copy-to-clipboard";
import {
  NotificationError,
  NotificationSuccess,
} from "../../../components/Notification";
import { DayMonthYearClassic } from "../../../components/Dates";
import { useTranslation } from "react-i18next";
const Index = () => {
  const [modalQr, setModalQr] = useState(false);
  const [loginUrl, setLoginUrl] = useState("");
  const [user, setUser] = useState({});
  const [users, setUsers] = useState([]);
  const { token } = useContext(UserContext);

  const fetchUser = async () => {
    let result = await getMyData(token);
    if (result.isOk) {
      setUser(result.data);
      setLoginUrl(
        window.location.origin +
          "/zarejestruj-sie?unique_code=" +
          result.data.unique_code
      );
    } else {
      NotificationError(result.message);
    }
  };

  const getUsersByCode = async () => {
    let result = await getMyZaproszoneOsoby(token);
    if (result.isOk) {
      setUsers(result.data);
    } else {
      NotificationError(result.message);
    }
  };

  useEffect(() => {
    fetchUser();
    getUsersByCode();
  }, []);

  const handleCopy = () => {
    copy(loginUrl);
    NotificationSuccess(t("Pomyślnie zapisano!"));
  };
  const { t, i18n } = useTranslation();
  return (
    <Layout active={8}>
      {modalQr && (
        <>
          <div className="backdrop" onClick={() => setModalQr(false)}></div>
          <div className="modalQR">
            <div className="close" onClick={() => setModalQr(false)}>
              <IoClose />
            </div>
            <QRCode value={loginUrl} />
          </div>
        </>
      )}
      <h1> {t("Program partnerski")}</h1>
      <h2 className="partner">
        {t("Zaproś kierowców i zyskaj dodatkowe korzyści")}
      </h2>
      <div className="code">
        <p>{t("Twój unikalny kod")}</p>
        <strong onClick={handleCopy}>{user.unique_code}</strong>
      </div>
      <div className="rowFlex">
        <div className="block">
          <p>{t("Twój unikalny link")}</p>
          <Link className="small" to={loginUrl}>
            {loginUrl}
          </Link>
          <small>{t("Wyślij ten link znajomym do rejestracji")}</small>
          <div className="copy" onClick={handleCopy}>
            {t("Kopiuj link")}
          </div>
        </div>
        <div className="block">
          <p>{t("Kod QR")}</p>
          <Link to="#" onClick={() => setModalQr(!modalQr)}>
            {t("Zobacz")}
          </Link>
          <small>{t("Pokaż swój kod QR znajomym")}</small>
          <div className="copy" onClick={handleCopy}>
            {t("Kopiuj link")}
          </div>
        </div>
      </div>
      <div className="addedPerson mt-5">
        <h2 className="partner">{t("Zaproszone przez Ciebie osoby:")}</h2>
        <div className="table-responsive">
          <div className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>{t("Imię")}</th>
                <th>{t("Nazwisko")}</th>
                <th>{t("Data rejestracji")}</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 &&
                users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.first_name}</td>
                    <td>{user.surname}</td>
                    <td>{DayMonthYearClassic(user.date_created)}</td>
                  </tr>
                ))}
            </tbody>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
