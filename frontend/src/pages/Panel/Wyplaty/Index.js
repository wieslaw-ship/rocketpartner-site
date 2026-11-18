import React, { useContext, useEffect, useState } from "react";
import Layout from "../../../components/Layout/Layout";
import { UserContext } from "../../../context/UserContext";
import PaginationOutLine from "../../../components/Pagination";
import { getMyIncome, getMyPaycheck } from "../../../api/user";
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
    let result = await getMyPaycheck(token, page);
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
    <Layout active={4}>
      <h1>{t("Historia wypłat")}</h1>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <td>{t("Data dodania")}</td>
              <td>{t("Wypłata Netto")}</td>
              <td>{t("Wypłata Brutto")}</td>
              <td>{t("Źródło")}</td>
              <td>{t("Podatek od wynajmu")}</td>
              <td>{t("Prowizja")}</td>
              <td>{t("Miesięczna prowizja")}</td>
              <td>{t("Umowa zlecenie podatek")}</td>
              <td>{t("Koszty zatrudnienia")}</td>
              <td>{t("Ubezpieczenie społeczne")}</td>
              <td>{t("Ubezpieczenie zdrowotne")}</td>
              <td>{t("PIT")}</td>
              <td>{t("Wypłata")}</td>
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
                  <td>{p.rental_tax} zł</td>
                  <td>{p.comission} zł</td>
                  <td>{p.monthly_comission} zł</td>
                  <td>{p.umowa_tax} zł</td>
                  <td>{p.employment_costs} zł</td>
                  <td>{p.insurance_community} zł</td>
                  <td>{p.insurance_health} zł</td>
                  <td>{p.pit} zł</td>
                  <td>{p.withdraw} zł</td>
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
