import React, { useContext, useEffect, useState } from "react";
import Layout from "../../../components/Layout/Layout";
import { UserContext } from "../../../context/UserContext";
import PaginationOutLine from "../../../components/Pagination";
import { getMyIncome } from "../../../api/user";
import { NotificationError } from "../../../components/Notification";
import { DayMonthYearClassic } from "../../../components/Dates";
import { useTranslation } from "react-i18next";
const Index = () => {
  const [przychody, setPrzychody] = useState([]);
  const [counter, setCounter] = useState(0);
  const [page, setPage] = useState(0);
  const { token } = useContext(UserContext);

  const { t, i18n } = useTranslation();

  const fetchUsers = async () => {
    let result = await getMyIncome(token, page);
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

  return (
    <Layout active={3}>
      <h1>{t("Przychody")}</h1>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <td>{t("Data dodania")}</td>
              <td>{t("Przychód Netto")}</td>
              <td>{t("Przychód Brutto")}</td>
              <td>{t("Źródło")}</td>
              <td>{t("Data od")}</td>
              <td>{t("Data do")}</td>
            </tr>
          </thead>
          <tbody>
            {przychody.length > 0 &&
              przychody.map((p, index) => (
                <tr key={p.id}>
                  <td>{DayMonthYearClassic(p.date_created)}</td>
                  <td>{p.netto} zł</td>
                  <td>{p.brutto} zł</td>
                  <td>{p.provider} zł</td>
                  <td>{DayMonthYearClassic(p.date_from)} zł</td>
                  <td>{DayMonthYearClassic(p.date_to)} zł</td>
                </tr>
              ))}
          </tbody>
        </table>
        <PaginationOutLine
          counter={counter}
          handlePage={handlePage}
          page={page + 1}
        />
      </div>
    </Layout>
  );
};

export default Index;
