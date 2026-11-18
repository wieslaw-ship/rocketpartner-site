import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../../../context/UserContext";
import { getUserCars } from "../../../api/admin";
import { NotificationError } from "../../Notification";
import { DayMonthYearClassic } from "../../Dates";

const UserPojazdy = () => {
  let { user_id } = useParams();
  const { token } = useContext(UserContext);
  const [items, setItems] = useState([]);

  const fetchUsers = async () => {
    let result = await getUserCars(token, user_id);
    if (result.isOk) {
      setItems(result.data);
    } else {
      NotificationError(result.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <div className="col-12">
      <div className="table-responsive mt-3">
        <h4>Pojazdy</h4>

        <table className="table">
          <thead>
            <tr>
              <td>Id</td>
              <td>Typ</td>
              <td>Rejestracja</td>
              <td>Status</td>
              <td>Data dodania</td>
              <td>Przejdź</td>
            </tr>
          </thead>
          <tbody>
            {items.length > 0 &&
              items.map((item, i) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.type}</td>

                  <td>{item.registration_number}</td>
                  <td>
                    {item.is_active ? (
                      <span className="green success">Aktywny</span>
                    ) : (
                      <span className="red error">Nie aktywny</span>
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
    </div>
  );
};

export default UserPojazdy;
