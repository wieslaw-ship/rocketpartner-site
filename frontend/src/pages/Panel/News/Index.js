import React, { useContext, useEffect, useState } from "react";
import Layout from "../../../components/Layout/Layout";
import { UserContext } from "../../../context/UserContext";
import PaginationOutLine from "../../../components/Pagination";
import {
  getMyIncome,
  getMyInvoices,
  getMyPaycheck,
  getallInformation,
} from "../../../api/user";
import { NotificationError } from "../../../components/Notification";
import { DayMonthYearClassic } from "../../../components/Dates";
import { useTranslation } from "react-i18next";
const Index = () => {
  const { t, i18n } = useTranslation();
  const [przychody, setPrzychody] = useState([]);
  const [counter, setCounter] = useState(0);
  const [page, setPage] = useState(0);
  const { token } = useContext(UserContext);

  const fetchUsers = async () => {
    let result = await getallInformation(token, page);
    if (result.isOk) {
      setPrzychody(result.data.items);
      setCounter(result.data.counter);
    } else {
      NotificationError(result.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page]);

  const handlePage = (val) => {
    setPage(val - 1);
  };

  let current_lang = i18n.language || window.localStorage.i18nextLng;

  useEffect(() => {
    fetchUsers();
  }, [i18n.language, window.localStorage.i18nextLng]);
  return (
    <Layout active={10}>
      <h1>{t("Informacje")}</h1>
      <div className="blocks col-lg-6">
        {przychody.length > 0 &&
          przychody.map((p, index) => (
            <div className="infoBlock" key={p.id}>
              {i18n.language === "pl" && (
                <>
                  <h2>{p.title}</h2>
                  <p className="date">{DayMonthYearClassic(p.date_created)}</p>
                  <div className="contentBlock">{p.content}</div>
                </>
              )}
              {i18n.language === "en" && (
                <>
                  <h2>{p.title_en}</h2>
                  <p className="date">{DayMonthYearClassic(p.date_created)}</p>
                  <div className="contentBlock">{p.content_en}</div>
                </>
              )}
              {i18n.language === "ru" && (
                <>
                  <h2>{p.title_ru}</h2>
                  <p className="date">{DayMonthYearClassic(p.date_created)}</p>
                  <div className="contentBlock">{p.content_ru}</div>
                </>
              )}
            </div>
          ))}

        <div className="mt-5">
          <PaginationOutLine
            handlePage={handlePage}
            page={page}
            counter={counter}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Index;
