import React, { useContext, useEffect, useState } from "react";
import Layout from "../../../components/Layout/Layout";
import { Link } from "react-router-dom";
import { Checkbox, FormControlLabel } from "@mui/material";
import { uploadUserFile } from "../../../api/user";
import { UserContext } from "../../../context/UserContext";
import {
  NotificationError,
  NotificationSuccess,
} from "../../../components/Notification";
import { fetchMyDocuments, getMyData } from "../../../api/auth";
import { useTranslation } from "react-i18next";
const Index = () => {
  const { t, i18n } = useTranslation();
  const [isCompany, setIsCompany] = useState(false);
  const [user, setUser] = useState({});
  const { token } = useContext(UserContext);
  const [documents, setDocuments] = useState([]);

  const uploadFile = async (file, name) => {
    const formData = new FormData();
    formData.append("file", file, file.name);
    formData.append("name", name);
    let result = await uploadUserFile(token, formData);
    if (result.isOk) {
      NotificationSuccess(t("Pomyślnie przesłano plik"));
      fetchUser();
    } else {
      NotificationError(result.message);
    }
  };

  const fetchUser = async () => {
    let result = await getMyData(token);
    if (result.isOk) {
      setUser(result.data);
    } else {
      NotificationError(result.message);
    }
  };

  const getMyDocuments = async () => {
    let result = await fetchMyDocuments(token);
    if (result.isOk) {
      setDocuments(result.data);
    } else {
      NotificationError(result.message);
    }
  };

  useEffect(() => {
    fetchUser();
    getMyDocuments();
  }, []);

  useEffect(() => {
    if (user.company || user.company_file) {
      setIsCompany(true);
    }
  }, [user]);

  return (
    <Layout active={2}>
      <h1>{t("Załatw wszystkie formalności elektronicznie")}</h1>
      <div className="table-responsive mt-5">
        <table className="table">
          <thead>
            <tr>
              <td>{t("Nazwa")}</td>
              <td>{t("Dokument")}</td>
              <td>{t("Załącz")}</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{t("Zasady współpracy")}</td>
              <td className="downloadDoc">
                <Link
                  target="_blank"
                  download={true}
                  to="/regulamin usługi (zasady współpracy).docx"
                >
                  {t("Pobierz")}
                </Link>
              </td>
              <td>
                <input
                  type="file"
                  onChange={(e) =>
                    uploadFile(e.target.files[0], "Zasady współpracy")
                  }
                />
              </td>
              {/* <td>
                {user.coworking_document ? (
                  <>
                    {user.coworking_regulations ? (
                      <p className="success green">Zaakceptowano</p>
                    ) : (
                      <p className="yellow">Przesłano</p>
                    )}
                  </>
                ) : (
                  <p className="error">Nie przesłano</p>
                )}
              </td> */}
            </tr>

            <tr>
              <td colSpan={4}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={isCompany}
                      onChange={() => setIsCompany(!isCompany)}
                    />
                  }
                  label={t("Rozliczam się przez działalność gospodarczą")}
                />
              </td>
            </tr>
            {!isCompany && (
              <>
                <tr>
                  <td>{t("Oświadczenie ZUS")}</td>
                  <td className="downloadDoc">
                    <Link target="_blank" to="/oswiadczenie ZUS.docx">
                      {t("Pobierz")}
                    </Link>
                  </td>
                  <td>
                    <input
                      type="file"
                      onChange={(e) =>
                        uploadFile(e.target.files[0], "Oświadczenie ZUS")
                      }
                    />
                  </td>
                </tr>
                <tr>
                  <td>{t("Umowa serwisowa")}</td>
                  <td className="downloadDoc">
                    <Link
                      target="_blank"
                      to="/umowa serwisowa Rocket Partner.docx"
                    >
                      {t("Pobierz")}
                    </Link>
                  </td>
                  <td>
                    <input
                      type="file"
                      onChange={(e) =>
                        uploadFile(e.target.files[0], "Umowa serwisowa")
                      }
                    />
                  </td>
                </tr>
                <tr>
                  <td>{t("Umowa zlecenia")}</td>
                  <td className="downloadDoc">
                    <Link
                      target="_blank"
                      to="/umowa zlecenieRocketPartner.docx"
                    >
                      {t("Pobierz")}
                    </Link>
                  </td>
                  <td>
                    <input
                      type="file"
                      onChange={(e) =>
                        uploadFile(e.target.files[0], "Umowa zlecenia")
                      }
                    />
                  </td>
                </tr>
              </>
            )}

            {isCompany && (
              <tr>
                <td>{t("Działalność gospodarcza")}</td>
                <td className="downloadDoc">
                  <Link target="_blank" to={user.company_file}>
                    {t("Pobierz")}
                  </Link>
                </td>
                <td>
                  <input
                    type="file"
                    onChange={(e) =>
                      uploadFile(e.target.files[0], "Działalność gospodarcza")
                    }
                  />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {!isCompany && (
        <>
          <h1 className="mt-5">
            {t("Dokumenty dotyczące pojazdów ( opcjonalne )")}
          </h1>
          <div className="table-responsive mt-5">
            <table className="table">
              <thead>
                <tr>
                  <td>{t("Nazwa")}</td>
                  <td>{t("Dokument")}</td>
                  <td>{t("Załącz")}</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{t("Umowa dotycząca pojazdu")}</td>
                  <td className="downloadDoc">
                    <Link
                      target="_blank"
                      to="/umowa najmu pojazduRocketPartner.docx"
                    >
                      {t("Pobierz")}
                    </Link>
                  </td>
                  <td>
                    <input
                      type="file"
                      onChange={(e) =>
                        uploadFile(e.target.files[0], "Umowa dotycząca pojazdu")
                      }
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      )}
    </Layout>
  );
};

export default Index;
