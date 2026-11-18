import React, { useContext, useEffect, useState } from "react";
import { FaFile } from "react-icons/fa6";
import { Link, useParams } from "react-router-dom";
import PaginationOutLine from "../../Pagination";
import { accpetDocument, getUserDocuments } from "../../../api/admin";
import { UserContext } from "../../../context/UserContext";
import { NotificationError, NotificationSuccess } from "../../Notification";
import { DayMonthYearClassic } from "../../Dates";

const UserDokumenty = () => {
  let { user_id } = useParams();
  const { token } = useContext(UserContext);
  const [items, setItems] = useState([]);

  const fetchUsers = async () => {
    let result = await getUserDocuments(token, user_id);
    if (result.isOk) {
      setItems(result.data);
    } else {
      NotificationError(result.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAccpetFile = async (document_id) => {
    let result = await accpetDocument(token, document_id);
    if (result.isOk) {
      NotificationSuccess("Pomyślnie zaakceptowano dokument");
      fetchUsers();
    } else {
      NotificationError(result.message);
    }
  };

  return (
    <>
      <div className="table-responsive mt-3">
        <h4>Dokumenty</h4>
        <table className="table">
          <thead>
            <tr>
              <td>Id</td>
              <td>Nazwa</td>
              <td>Status</td>
              <td>Data dodania</td>
              <td>Plik </td>
              <td>Przejdź</td>
            </tr>
          </thead>
          <tbody>
            {items.length > 0 &&
              items.map((doc, i) => (
                <tr key={doc.id}>
                  <td>{doc.id}</td>
                  <td>{doc.name}</td>
                  <td>
                    {doc.accepted ? (
                      <p className="success green">Zaakceptowano</p>
                    ) : (
                      <p className="success error"> Nie zaakceptowano</p>
                    )}
                  </td>
                  <td>{DayMonthYearClassic(doc.date_created)}</td>
                  <td>
                    <Link to={doc.file} download target="_blank">
                      <FaFile />
                    </Link>
                  </td>
                  <td>
                    <button
                      onClick={() => handleAccpetFile(doc.id)}
                      className="mainButton py-1"
                    >
                      {doc.accepted ? <>Akceptuj</> : <>Anuluj</>}
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4">
        <PaginationOutLine handlePage={() => {}} />
      </div>
    </>
  );
};

export default UserDokumenty;
