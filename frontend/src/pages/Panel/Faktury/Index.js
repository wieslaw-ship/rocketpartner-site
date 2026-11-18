import React, { useContext, useEffect, useState } from "react";
import Layout from "../../../components/Layout/Layout";
import { UserContext } from "../../../context/UserContext";
import PaginationOutLine from "../../../components/Pagination";
import { CiFileOn } from "react-icons/ci";
import { getMyInvoices } from "../../../api/user";
import { NotificationError } from "../../../components/Notification";
import { DayMonthYearClassic } from "../../../components/Dates";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
const Index = () => {
  const [przychody, setPrzychody] = useState([]);
  const [counter, setCounter] = useState(0);
  const [page, setPage] = useState(0);
  const { token } = useContext(UserContext);
  const { t, i18n } = useTranslation();

  const fetchUsers = async () => {
    let result = await getMyInvoices(token, page);
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
    <Layout active={6}>
      <h1>{t("Lista faktur")}</h1>
      <div className="table-responsive">
        <table className="table faktury">
          <thead>
            <tr role="row">
              <th colspan="6" rowspan="1"></th>
              <th colspan="3" rowspan="1">
                VAT 23%
              </th>
              <th colspan="3" rowspan="1">
                VAT 8%
              </th>
              <th colspan="3" rowspan="1">
                VAT 5%
              </th>
              <th colspan="3" rowspan="1">
                VAT 0%
              </th>
              <th colspan="3" rowspan="1">
                VAT zw
              </th>
            </tr>
            <tr role="row">
              <th
                class="sorting"
                tabindex="0"
                aria-controls="invoiceList"
                rowspan="1"
                colspan="1"
                style={{ width: "38px" }}
              >
                {t("Plik")}
              </th>
              <th
                class="sorting"
                tabindex="0"
                aria-controls="invoiceList"
                rowspan="1"
                colspan="1"
                style={{ width: "38px" }}
              >
                {t("Data")}
              </th>
              <th
                class="sorting"
                tabindex="0"
                aria-controls="invoiceList"
                rowspan="1"
                colspan="1"
                style={{ width: "57px" }}
              >
                {t("Numer faktury")}
              </th>
              <th
                class="sorting"
                tabindex="0"
                aria-controls="invoiceList"
                rowspan="1"
                colspan="1"
                style={{ width: "99px" }}
              >
                {t("Sprzedawca NIP")}
              </th>
              <th
                class="sorting"
                tabindex="0"
                aria-controls="invoiceList"
                rowspan="1"
                colspan="1"
                style={{ width: "99px" }}
              >
                {t("Sprzedawca Nazwa")}
              </th>
              <th
                class="sorting"
                tabindex="0"
                aria-controls="invoiceList"
                rowspan="1"
                colspan="1"
                style={{ width: "99px" }}
              >
                {t("Sprzedawca Adres")}
              </th>
              <th
                class="sorting"
                tabindex="0"
                aria-controls="invoiceList"
                rowspan="1"
                colspan="1"
                style={{ width: "67px" }}
              >
                {t("Wartość brutto")}
              </th>
              <th
                class="sorting_asc"
                tabindex="0"
                aria-controls="invoiceList"
                rowspan="1"
                colspan="1"
                style={{ width: "67px" }}
                aria-sort="ascending"
              >
                {t("Wartość VAT")}
              </th>
              <th
                class="sorting"
                tabindex="0"
                aria-controls="invoiceList"
                rowspan="1"
                colspan="1"
                style={{ width: "67px" }}
              >
                {t("Wartość netto")}
              </th>
              <th
                class="sorting"
                tabindex="0"
                aria-controls="invoiceList"
                rowspan="1"
                colspan="1"
                style={{ width: "67px" }}
              >
                {t("Wartość brutto")}
              </th>
              <th
                class="sorting"
                tabindex="0"
                aria-controls="invoiceList"
                rowspan="1"
                colspan="1"
                style={{ width: "67px" }}
              >
                {t("Wartość VAT")}
              </th>
              <th
                class="sorting"
                tabindex="0"
                aria-controls="invoiceList"
                rowspan="1"
                colspan="1"
                style={{ width: "67px" }}
              >
                {t("Wartość netto")}
              </th>
              <th
                class="sorting"
                tabindex="0"
                aria-controls="invoiceList"
                rowspan="1"
                colspan="1"
                style={{ width: "67px" }}
              >
                {t("Wartość brutto")}
              </th>
              <th
                class="sorting"
                tabindex="0"
                aria-controls="invoiceList"
                rowspan="1"
                colspan="1"
                style={{ width: "67px" }}
              >
                {t("Wartość VAT")}
              </th>
              <th
                class="sorting"
                tabindex="0"
                aria-controls="invoiceList"
                rowspan="1"
                colspan="1"
                style={{ width: "67px" }}
              >
                {t("Wartość netto")}
              </th>
              <th
                class="sorting"
                tabindex="0"
                aria-controls="invoiceList"
                rowspan="1"
                colspan="1"
                style={{ width: "67px" }}
              >
                {t("Wartość brutto")}
              </th>
              <th
                class="sorting"
                tabindex="0"
                aria-controls="invoiceList"
                rowspan="1"
                colspan="1"
                style={{ width: "67px" }}
              >
                {t("Wartość VAT")}
              </th>
              <th
                class="sorting"
                tabindex="0"
                aria-controls="invoiceList"
                rowspan="1"
                colspan="1"
                style={{ width: "67px" }}
              >
                {t("Wartość netto")}
              </th>
              <th
                class="sorting"
                tabindex="0"
                aria-controls="invoiceList"
                rowspan="1"
                colspan="1"
                style={{ width: "67px" }}
              >
                {t("Wartość brutto")}
              </th>
              <th
                class="sorting"
                tabindex="0"
                aria-controls="invoiceList"
                rowspan="1"
                colspan="1"
                style={{ width: "67px" }}
              >
                {t("Wartość VAT")}
              </th>
              <th
                class="sorting"
                tabindex="0"
                aria-controls="invoiceList"
                rowspan="1"
                colspan="1"
                style={{ width: "67px" }}
              >
                {t("Wartość netto")}
              </th>
            </tr>
          </thead>
          <tbody>
            {przychody.length > 0 &&
              przychody.map((p, index) => (
                <tr key={p.id}>
                  <td>
                    <Link to={p.file} target="_blank">
                      <CiFileOn />
                    </Link>
                  </td>
                  <td>{DayMonthYearClassic(p.date)}</td>
                  <td>{p.number}</td>
                  <td>{p.seller_nip}</td>
                  <td>{p.seller_name}</td>
                  <td>{p.seller_address}</td>
                  <td onClick={() => console.log(p.invoiceVAT)}>
                    {p.invoiceVAT
                      .filter((item) => item.vat_type === "23")
                      .reduce(
                        (accumulator, item) => accumulator + item.gross,
                        0
                      )}{" "}
                    zł
                  </td>
                  <td>
                    {p.invoiceVAT
                      .filter((item) => item.vat_type === "23")
                      .reduce(
                        (accumulator, item) => accumulator + item.vat + 0,
                        0
                      )}{" "}
                    zł
                  </td>
                  <td>
                    {p.invoiceVAT
                      .filter((item) => item.vat_type === "23")
                      .reduce(
                        (accumulator, item) => accumulator + item.netto + 0,
                        0
                      )}{" "}
                    zł
                  </td>
                  <td>
                    {p.invoiceVAT
                      .filter((item) => item.vat_type === "8")
                      .reduce(
                        (accumulator, item) => accumulator + item.gross + 0,
                        0
                      )}{" "}
                    zł
                  </td>
                  <td>
                    {p.invoiceVAT
                      .filter((item) => item.vat_type === "8")
                      .reduce(
                        (accumulator, item) => accumulator + item.vat + 0,
                        0
                      )}{" "}
                    zł
                  </td>
                  <td>
                    {p.invoiceVAT
                      .filter((item) => item.vat_type === "8")
                      .reduce(
                        (accumulator, item) => accumulator + item.netto + 0,
                        0
                      )}{" "}
                    zł
                  </td>
                  <td>
                    {p.invoiceVAT
                      .filter((item) => item.vat_type === "5")
                      .reduce(
                        (accumulator, item) => accumulator + item.gross + 0,
                        0
                      )}{" "}
                    zł
                  </td>
                  <td>
                    {p.invoiceVAT
                      .filter((item) => item.vat_type === "5")
                      .reduce(
                        (accumulator, item) => accumulator + item.vat + 0,
                        0
                      )}{" "}
                    zł
                  </td>
                  <td>
                    {p.invoiceVAT
                      .filter((item) => item.vat_type === "5")
                      .reduce(
                        (accumulator, item) => accumulator + item.netto + 0,
                        0
                      )}{" "}
                    zł
                  </td>
                  <td>
                    {p.invoiceVAT
                      .filter((item) => item.vat_type === "0")
                      .reduce(
                        (accumulator, item) => accumulator + item.gross + 0,
                        0
                      )}{" "}
                    zł
                  </td>
                  <td>
                    {p.invoiceVAT
                      .filter((item) => item.vat_type === "0")
                      .reduce(
                        (accumulator, item) => accumulator + item.netto + 0,
                        0
                      )}{" "}
                    zł
                  </td>
                  <td>
                    {p.invoiceVAT
                      .filter((item) => item.vat_type === "0")
                      .reduce(
                        (accumulator, item) => accumulator + item.vat + 0,
                        0
                      )}{" "}
                    zł
                  </td>
                  <td>
                    {p.invoiceVAT
                      .filter((item) => item.vat_type === "Zwolniony")
                      .reduce(
                        (accumulator, item) => accumulator + item.gross + 0,
                        0
                      )}{" "}
                    zł
                  </td>
                  <td>
                    {p.invoiceVAT
                      .filter((item) => item.vat_type === "Zwolniony")
                      .reduce(
                        (accumulator, item) => accumulator + item.vat + 0,
                        0
                      )}{" "}
                    zł
                  </td>
                  <td>
                    {p.invoiceVAT
                      .filter((item) => item.vat_type === "Zwolniony")
                      .reduce(
                        (accumulator, item) => accumulator + item.netto + 0,
                        0
                      )}{" "}
                    zł
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4">
        <PaginationOutLine
          handlePage={handlePage}
          page={page + 1}
          counter={counter}
        />
      </div>
    </Layout>
  );
};

export default Index;
