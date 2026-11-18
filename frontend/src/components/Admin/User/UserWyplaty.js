import React, { useContext, useEffect, useState } from "react";
import PaginationOutLine from "../../Pagination";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../../../context/UserContext";
import { getUserPaychecks } from "../../../api/admin";
import { DayMonthYearClassic } from "../../Dates";
import { NotificationError } from "../../Notification";

const UserWyplaty = () => {
  let { user_id } = useParams();
  const { token } = useContext(UserContext);
  const [items, setItems] = useState([]);
  const [counter, setCounter] = useState(0);
  const [page, setPage] = useState(0);

  const fetchUsers = async () => {
    let result = await getUserPaychecks(token, user_id, page);
    if (result.isOk) {
      setItems(result.data.items);
      setCounter(result.data.counter);
    } else {
      NotificationError(result.message);
    }
  };

  const handlePage = (val) => {
    setPage(val - 1);
  };

  useEffect(() => {
    fetchUsers();
  }, [page]);
  return (
    <>
      <div className="table-responsive mt-3">
        <table className="table">
          <thead>
            <tr>
              <td>Id</td>
              <td>Kwota Netto</td>
              <td>Kwota Brutto</td>
              <td>Wypłata</td>
              <td>Data wypłaty</td>
              <td>Przejdź</td>
            </tr>
          </thead>
          <tbody>
            {items.length > 0 &&
              items.map((item, i) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.netto} zł</td>
                  <td>{item.gross} zł</td>
                  <td>{item.withdraw} zł</td>
                  <td>{DayMonthYearClassic(item.date_created)}</td>
                  <td>
                    <Link to={"/admin/wyplaty/" + item.id}>
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

export default UserWyplaty;
