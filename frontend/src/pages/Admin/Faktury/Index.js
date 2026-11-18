import React, { useContext, useEffect, useState } from "react";
import Layout from "../../../components/AdminLayout/Layout";
import { TextField } from "@mui/material";
import PaginationOutLine from "../../../components/Pagination";
import { Link } from "react-router-dom";
import { getAllInvoices } from "../../../api/admin";
import { UserContext } from "../../../context/UserContext";
import { NotificationError } from "../../../components/Notification";
import { DayMonthYearClassic } from "../../../components/Dates";
import { CiFileOn } from "react-icons/ci";

const Home = () => {
  const [counter, setCounter] = useState(0);
  const [page, setPage] = useState(0);
  const { token } = useContext(UserContext);
  const [items, setItems] = useState([]);
  const [email, setEmail] = useState("");
  const [seller_nip, setSellerNip] = useState("");

  const fetchUsers = async () => {
    let result = await getAllInvoices(token, page, email, seller_nip);
    if (result.isOk) {
      setItems(result.data.items);
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
    <Layout active={5}>
      <div className="topWithAdd">
        <h1>Faktury</h1>
      </div>
      <div className="d-flex gap-2 mt-3">
        <TextField
          placeholder="Adres e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          placeholder="Sprzedawca NIP"
          value={seller_nip}
          onChange={(e) => setSellerNip(e.target.value)}
        />
        <button className="mainButton" onClick={fetchUsers}>
          Szukaj
        </button>
      </div>
      <div className="table-responsive mt-3">
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
              <th colspan="1" rowspan="1"></th>
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
                Plik
              </th>
              <th
                class="sorting"
                tabindex="0"
                aria-controls="invoiceList"
                rowspan="1"
                colspan="1"
                style={{ width: "38px" }}
              >
                Data
              </th>
              <th
                class="sorting"
                tabindex="0"
                aria-controls="invoiceList"
                rowspan="1"
                colspan="1"
                style={{ width: "57px" }}
              >
                Numer faktury
              </th>
              <th
                class="sorting"
                tabindex="0"
                aria-controls="invoiceList"
                rowspan="1"
                colspan="1"
                style={{ width: "99px" }}
              >
                Sprzedawca NIP
              </th>
              <th
                class="sorting"
                tabindex="0"
                aria-controls="invoiceList"
                rowspan="1"
                colspan="1"
                style={{ width: "99px" }}
              >
                Sprzedawca Nazwa
              </th>
              <th
                class="sorting"
                tabindex="0"
                aria-controls="invoiceList"
                rowspan="1"
                colspan="1"
                style={{ width: "99px" }}
              >
                Sprzedawca Adres
              </th>
              <th
                class="sorting"
                tabindex="0"
                aria-controls="invoiceList"
                rowspan="1"
                colspan="1"
                style={{ width: "67px" }}
              >
                Wartość brutto
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
                Wartość VAT
              </th>
              <th
                class="sorting"
                tabindex="0"
                aria-controls="invoiceList"
                rowspan="1"
                colspan="1"
                style={{ width: "67px" }}
              >
                Wartość netto
              </th>
              <th
                class="sorting"
                tabindex="0"
                aria-controls="invoiceList"
                rowspan="1"
                colspan="1"
                style={{ width: "67px" }}
              >
                Wartość brutto
              </th>
              <th
                class="sorting"
                tabindex="0"
                aria-controls="invoiceList"
                rowspan="1"
                colspan="1"
                style={{ width: "67px" }}
              >
                Wartość VAT
              </th>
              <th
                class="sorting"
                tabindex="0"
                aria-controls="invoiceList"
                rowspan="1"
                colspan="1"
                style={{ width: "67px" }}
              >
                Wartość netto
              </th>
              <th
                class="sorting"
                tabindex="0"
                aria-controls="invoiceList"
                rowspan="1"
                colspan="1"
                style={{ width: "67px" }}
              >
                Wartość brutto
              </th>
              <th
                class="sorting"
                tabindex="0"
                aria-controls="invoiceList"
                rowspan="1"
                colspan="1"
                style={{ width: "67px" }}
              >
                Wartość VAT
              </th>
              <th
                class="sorting"
                tabindex="0"
                aria-controls="invoiceList"
                rowspan="1"
                colspan="1"
                style={{ width: "67px" }}
              >
                Wartość netto
              </th>
              <th
                class="sorting"
                tabindex="0"
                aria-controls="invoiceList"
                rowspan="1"
                colspan="1"
                style={{ width: "67px" }}
              >
                Wartość brutto
              </th>
              <th
                class="sorting"
                tabindex="0"
                aria-controls="invoiceList"
                rowspan="1"
                colspan="1"
                style={{ width: "67px" }}
              >
                Wartość VAT
              </th>
              <th
                class="sorting"
                tabindex="0"
                aria-controls="invoiceList"
                rowspan="1"
                colspan="1"
                style={{ width: "67px" }}
              >
                Wartość netto
              </th>
              <th
                class="sorting"
                tabindex="0"
                aria-controls="invoiceList"
                rowspan="1"
                colspan="1"
                style={{ width: "67px" }}
              >
                Wartość brutto
              </th>
              <th
                class="sorting"
                tabindex="0"
                aria-controls="invoiceList"
                rowspan="1"
                colspan="1"
                style={{ width: "67px" }}
              >
                Wartość VAT
              </th>
              <th
                class="sorting"
                tabindex="0"
                aria-controls="invoiceList"
                rowspan="1"
                colspan="1"
                style={{ width: "67px" }}
              >
                Wartość netto
              </th>
              <th
                class="sorting"
                tabindex="0"
                aria-controls="invoiceList"
                rowspan="1"
                colspan="1"
                style={{ width: "67px" }}
              >
                Podgląd
              </th>
            </tr>
          </thead>
          <tbody>
            {items.length > 0 &&
              items.map((p, index) => (
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
                  <td>
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
                  <td>
                    <Link to={"/admin/faktury/" + p.id}>
                      <button className="mainButton py-1">Szczegóły</button>
                    </Link>
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
export default Home;
