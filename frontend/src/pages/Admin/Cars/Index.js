import React, { useContext, useEffect, useState } from "react";
import Layout from "../../../components/AdminLayout/Layout";
import { TextField } from "@mui/material";
import PaginationOutLine from "../../../components/Pagination";
import { MdLink } from "react-icons/md";
import { Link } from "react-router-dom";
import { getAllCars } from "../../../api/admin";
import { UserContext } from "../../../context/UserContext";
import { NotificationError } from "../../../components/Notification";
import { DayMonthYearClassic } from "../../../components/Dates";

const Home = () => {
  const [counter, setCounter] = useState(0);
  const [page, setPage] = useState(0);
  const { token } = useContext(UserContext);
  const [items, setItems] = useState([]);
  const [email, setEmail] = useState("");
  const [registration_number, setregistration_number] = useState("");

  const fetchUsers = async () => {
    let result = await getAllCars(token, page, email, registration_number);
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
    <Layout active={3}>
      <h1>Pojazdy</h1>

      <div className="d-flex gap-2 mt-3">
        <TextField
          placeholder="Adres e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          placeholder="Rejestracja"
          value={registration_number}
          onChange={(e) => setregistration_number(e.target.value)}
        />
        <button className="mainButton" onClick={fetchUsers}>
          Szukaj
        </button>
      </div>
      <div className="table-responsive mt-3">
        <table className="table">
          <thead>
            <tr>
              <td>Id</td>
              <td>Typ</td>
              <td>Email</td>
              <td>Rejestracja</td>
              <td>Status</td>
              <td>Data dodania</td>
              <td>Przejdź</td>
            </tr>
          </thead>
          <tbody>
            {items.length > 0 &&
              items.map((item, i) => (
                <tr>
                  <td>{item.id}</td>
                  <td>{item.type}</td>
                  <td>{item.email}</td>

                  <td>{item.registration_number}</td>
                  <td>
                    {item.is_active ? (
                      <span className="green success">Zaakceptowany</span>
                    ) : (
                      <span className="red error">Nie zaakceptowany</span>
                    )}
                  </td>
                  <td>{DayMonthYearClassic(item.date_created)}</td>
                  <td>
                    <Link to={"/admin/pojazdy/" + item.id}>
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
