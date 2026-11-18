import React, { useContext, useEffect, useState } from "react";
import Layout from "../../../components/AdminLayout/Layout";
import { TextField } from "@mui/material";
import PaginationOutLine from "../../../components/Pagination";
import { Link } from "react-router-dom";
import { getAllIncomes } from "../../../api/admin";
import { UserContext } from "../../../context/UserContext";
import { NotificationError } from "../../../components/Notification";
import { DayMonthYearClassic } from "../../../components/Dates";

const Home = () => {
  const [counter, setCounter] = useState(0);
  const [page, setPage] = useState(0);
  const { token } = useContext(UserContext);
  const [items, setItems] = useState([]);
  const [email, setEmail] = useState("");

  const fetchUsers = async () => {
    let result = await getAllIncomes(token, page, email);
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
    <Layout active={7}>
      <div className="topWithAdd">
        <h1>Przychody</h1>
      </div>
      <div className="d-flex gap-2 mt-3">
        <TextField
          placeholder="Adres e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={fetchUsers} className="mainButton">
          Szukaj
        </button>
      </div>
      <div className="table-responsive mt-3">
        <table className="table">
          <thead>
            <tr>
              <td>Id</td>
              <td>Email</td>
              <td>Kwota Netto</td>
              <td>Kwota Brutto</td>
              <td>Źródło</td>
              <td>Data wypłaty</td>
              <td>Przejdź</td>
            </tr>
          </thead>
          <tbody>
            {items.length > 0 &&
              items.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.email}</td>
                  <td>{item.netto} zł</td>
                  <td>{item.gross} zł</td>
                  <td>{item.provider}</td>
                  <td>{DayMonthYearClassic(item.date_created)}</td>
                  <td>
                    <Link to={"/admin/przychody/" + item.id}>
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
