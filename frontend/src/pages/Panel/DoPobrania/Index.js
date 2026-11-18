import React, { useContext, useEffect, useState } from "react";
import Layout from "../../../components/Layout/Layout";
import { getMyCars } from "../../../api/user";
import { UserContext } from "../../../context/UserContext";
import { NotificationError } from "../../../components/Notification";
import { fetchMyDocuments, getMyData } from "../../../api/auth";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
const Index = () => {
  const [documents, setDocuments] = useState([]);
  const { token } = useContext(UserContext);

  const getMyDocuments = async () => {
    let result = await fetchMyDocuments(token);
    if (result.isOk) {
      setDocuments(result.data);
    } else {
      NotificationError(result.message);
    }
  };

  useEffect(() => {
    getMyDocuments();
  }, []);

  const { t, i18n } = useTranslation();

  return (
    <Layout active={9}>
      <h1>{t("Twoje dokumenty")}</h1>
      <div className="col-sm-12 col-md-12 col-lg-6">
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <td>{t("Nazwa dokumentu")}</td>
                <td>{t("Dokument")}</td>
                <td>{t("Status")}</td>
              </tr>
            </thead>
            <tbody>
              {documents.length > 0 &&
                documents.map((d) => (
                  <tr>
                    <td>{d.name}</td>
                    <td>
                      <Link to={d.file} target="_blank">
                        {t("Podgląd")}
                      </Link>
                    </td>
                    <td>
                      {d.accepted ? (
                        <p className="success green">{t("Zaakceptowano")}</p>
                      ) : (
                        <p className="success error">
                          {t("Nie zaakceptowano")}
                        </p>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
