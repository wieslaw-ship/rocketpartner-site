import React, { useContext, useEffect, useState } from "react";
import Layout from "../../../components/AdminLayout/Layout";
import { TextField } from "@mui/material";
import PaginationOutLine from "../../../components/Pagination";
import { MdLink } from "react-icons/md";
import { Link } from "react-router-dom";
import { getAllUsers } from "../../../api/admin";
import { UserContext } from "../../../context/UserContext";
import { NotificationError } from "../../../components/Notification";

const Home = () => {
  const [counter, setCounter] = useState(0);
  const [page, setPage] = useState(0);
  const { token } = useContext(UserContext);
  const [items, setItems] = useState([]);
  const [email, setEmail] = useState("");
  const [first_name, setFirstName] = useState("");
  const [surname, setSurname] = useState("");

  const fetchUsers = async () => {
    let result = await getAllUsers(token, page, email, first_name, surname);
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
    <Layout active={2}>
      <h1>Użytkownicy</h1>
      <div className="d-flex gap-2 mt-3">
        <TextField
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Adres e-mail"
        />
        <TextField
          value={first_name}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="Imię"
        />
        <TextField
          placeholder="Nazwisko"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
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
              <td>Imię</td>
              <td>Nazwisko</td>
              <td>Adres e-mail</td>
              <td>Status</td>
              <td>Saldo</td>
              <td>Przejdź</td>
            </tr>
          </thead>
          <tbody>
            {items.length > 0 &&
              items.map((item, i) => (
                <tr>
                  <td>{item.id}</td>
                  <td>{item.first_name}</td>
                  <td>{item.surname}</td>
                  <td>{item.email}</td>
                  <td>
                    {item.email_verified ? (
                      <p className="green mb-0">Zaakceptowany</p>
                    ) : (
                      <p className="red mb-0">Nie Zaakceptowany</p>
                    )}
                  </td>
                  <td>{item.balance ? item.balance : 0} zł</td>
                  <td>
                    <Link to={"/admin/uzytkownicy/" + item.id}>
                      <button className="mainButton py-1">Profil</button>
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
