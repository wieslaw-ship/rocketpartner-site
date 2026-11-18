import React, { useContext, useEffect, useState } from "react";
import PaginationOutLine from "../../Pagination";
import { FaFile } from "react-icons/fa6";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../../../context/UserContext";
import { getUserInvoices } from "../../../api/admin";
import { DayMonthYearClassic } from "../../Dates";
import { NotificationError } from "../../Notification";

const UserFaktury = () => {
  let { user_id } = useParams();
  const [counter, setCounter] = useState(0);
  const [page, setPage] = useState(0);
  const { token } = useContext(UserContext);
  const [items, setItems] = useState([]);

  const fetchUsers = async () => {
    let result = await getUserInvoices(token, user_id, page);
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
    <>
      <div className="table-responsive mt-3">
        <table className="table">
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
              <th colspan="1" rowspan="1"></th>
            </tr>
            <tr>
              <td>Sprzedawca NIP</td>
              <td>Sprzedawca Nazwa</td>
              <td>Sprzedawca Adres</td>
              <td>Typ</td>
              <td>Data Faktury</td>
              <td>Data dodania</td>
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
              <td>Plik </td>
              <td>Przejdź</td>
            </tr>
          </thead>
          <tbody>
            {items.length > 0 &&
              items.map((item, i) => (
                <tr key={item.id}>
                  <td>{item.seller_nip}</td>
                  <td>{item.seller_name}</td>
                  <td>{item.seller_address}</td>
                  <td>
                    {item.type === "notForCar" ? <>Inne </> : <>Samochód </>}
                  </td>
                  <td>{DayMonthYearClassic(item.date)}</td>
                  <td>{DayMonthYearClassic(item.date_created)}</td>
                  <td>
                    {item.invoiceVAT
                      .filter((item) => item.vat_type === "23")
                      .reduce(
                        (accumulator, item) => accumulator + item.gross,
                        0
                      )}{" "}
                    zł
                  </td>
                  <td>
                    {item.invoiceVAT
                      .filter((item) => item.vat_type === "23")
                      .reduce(
                        (accumulator, item) => accumulator + item.vat + 0,
                        0
                      )}{" "}
                    zł
                  </td>
                  <td>
                    {item.invoiceVAT
                      .filter((item) => item.vat_type === "23")
                      .reduce(
                        (accumulator, item) => accumulator + item.netto + 0,
                        0
                      )}{" "}
                    zł
                  </td>
                  <td>
                    {item.invoiceVAT
                      .filter((item) => item.vat_type === "8")
                      .reduce(
                        (accumulator, item) => accumulator + item.gross + 0,
                        0
                      )}{" "}
                    zł
                  </td>
                  <td>
                    {item.invoiceVAT
                      .filter((item) => item.vat_type === "8")
                      .reduce(
                        (accumulator, item) => accumulator + item.vat + 0,
                        0
                      )}{" "}
                    zł
                  </td>
                  <td>
                    {item.invoiceVAT
                      .filter((item) => item.vat_type === "8")
                      .reduce(
                        (accumulator, item) => accumulator + item.netto + 0,
                        0
                      )}{" "}
                    zł
                  </td>
                  <td>
                    {item.invoiceVAT
                      .filter((item) => item.vat_type === "5")
                      .reduce(
                        (accumulator, item) => accumulator + item.gross + 0,
                        0
                      )}{" "}
                    zł
                  </td>
                  <td>
                    {item.invoiceVAT
                      .filter((item) => item.vat_type === "5")
                      .reduce(
                        (accumulator, item) => accumulator + item.vat + 0,
                        0
                      )}{" "}
                    zł
                  </td>
                  <td>
                    {item.invoiceVAT
                      .filter((item) => item.vat_type === "5")
                      .reduce(
                        (accumulator, item) => accumulator + item.netto + 0,
                        0
                      )}{" "}
                    zł
                  </td>
                  <td>
                    {item.invoiceVAT
                      .filter((item) => item.vat_type === "0")
                      .reduce(
                        (accumulator, item) => accumulator + item.gross + 0,
                        0
                      )}{" "}
                    zł
                  </td>
                  <td>
                    {item.invoiceVAT
                      .filter((item) => item.vat_type === "0")
                      .reduce(
                        (accumulator, item) => accumulator + item.netto + 0,
                        0
                      )}{" "}
                    zł
                  </td>
                  <td>
                    {item.invoiceVAT
                      .filter((item) => item.vat_type === "0")
                      .reduce(
                        (accumulator, item) => accumulator + item.vat + 0,
                        0
                      )}{" "}
                    zł
                  </td>
                  <td>
                    {item.invoiceVAT
                      .filter((item) => item.vat_type === "Zwolniony")
                      .reduce(
                        (accumulator, item) => accumulator + item.gross + 0,
                        0
                      )}{" "}
                    zł
                  </td>
                  <td>
                    {item.invoiceVAT
                      .filter((item) => item.vat_type === "Zwolniony")
                      .reduce(
                        (accumulator, item) => accumulator + item.vat + 0,
                        0
                      )}{" "}
                    zł
                  </td>
                  <td>
                    {item.invoiceVAT
                      .filter((item) => item.vat_type === "Zwolniony")
                      .reduce(
                        (accumulator, item) => accumulator + item.netto + 0,
                        0
                      )}{" "}
                    zł
                  </td>
                  <td>
                    <Link to={item.file} download target="_blank">
                      <FaFile />
                    </Link>
                  </td>
                  <td>
                    <Link to="/admin/faktury/1">
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
    </>
  );
};

export default UserFaktury;
