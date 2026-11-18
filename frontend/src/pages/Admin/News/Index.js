import React, { useContext, useEffect, useState } from "react";
import Layout from "../../../components/AdminLayout/Layout";
import PaginationOutLine from "../../../components/Pagination";
import { UserContext } from "../../../context/UserContext";
import {
  NotificationError,
  NotificationSuccess,
} from "../../../components/Notification";
import { DayMonthYearClassic } from "../../../components/Dates";
import { getallInformation } from "../../../api/user";
import { Link } from "react-router-dom";
import { deleteInformation } from "../../../api/admin";

const Home = () => {
  const [counter, setCounter] = useState(0);
  const [page, setPage] = useState(0);
  const { token } = useContext(UserContext);
  const [items, setItems] = useState([]);

  const fetchUsers = async () => {
    let result = await getallInformation(token, page);
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

  const handleRemove = async (info_id) => {
    let result = await deleteInformation(token, info_id);
    if (result.isOk) {
      NotificationSuccess("Pomyślnie usunięto informacje");
      fetchUsers();
    } else {
      NotificationError(result.message);
    }
  };

  return (
    <Layout active={10}>
      <div className="topWithAdd">
        <h1>Informacje</h1>
        <Link to={"/admin/informacje/dodaj"}>
          <button className="mainButton">Dodaj</button>
        </Link>
      </div>
      <div className="blocks col-lg-12">
        {items.length > 0 &&
          items.map((p, index) => (
            <div className="infoBlock" key={p.id}>
              <h2>{p.title}</h2>
              <p className="date">{DayMonthYearClassic(p.date_created)}</p>
              <div className="contentBlock">{p.content}</div>
              <div className="buttonsInfo d-flex flex-wrap gap-3">
                <Link to={"/admin/informacje/" + p.id}>
                  <button className="mainButton">Edytuj</button>
                </Link>
                <button className="remove" onClick={() => handleRemove(p.id)}>
                  Usuń
                </button>
              </div>
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
export default Home;
