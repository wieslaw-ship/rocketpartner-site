import React, { useContext, useEffect, useState } from "react";
import Layout from "../../../components/AdminLayout/Layout";
import { TextField } from "@mui/material";
import PaginationOutLine from "../../../components/Pagination";
import { Link } from "react-router-dom";
import { FaFile } from "react-icons/fa6";
import { UserContext } from "../../../context/UserContext";
import {
  NotificationError,
  NotificationSuccess,
} from "../../../components/Notification";
import { accpetDocument, adminDocuments } from "../../../api/admin";
import { DayMonthYearClassic } from "../../../components/Dates";

const Home = () => {
  const { token } = useContext(UserContext);
  const [counter, setCounter] = useState(0);
  const [page, setPage] = useState(0);
  const [documents, setDocuments] = useState([]);
  const [email, setEmail] = useState("");

  const getUsersDocuments = async () => {
    let result = await adminDocuments(token, page, email);
    if (result.isOk) {
      setDocuments(result.data.items);
    } else {
      NotificationError(result.message);
    }
  };

  const handlePage = (val) => {
    setPage(val - 1);
  };

  useEffect(() => {
    getUsersDocuments();
  }, [page]);

  const handleAccpetFile = async (document_id) => {
    let result = await accpetDocument(token, document_id);
    if (result.isOk) {
      NotificationSuccess("Pomyślnie zaakceptowano dokument");
      getUsersDocuments();
    } else {
      NotificationError(result.message);
    }
  };

  return (
    <Layout active={6}>
      <div className="topWithAdd">
        <h1>Dokumenty</h1>
      </div>
      <div className="d-flex gap-2 mt-3">
        <TextField
          placeholder="Adres e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className="mainButton" onClick={getUsersDocuments}>
          Szukaj
        </button>
      </div>
      <div className="table-responsive mt-3">
        <table className="table">
          <thead>
            <tr>
              <td>Id</td>
              <td>Nazwa</td>
              <td>Status</td>
              <td>Adres e-mail</td>
              <td>Imię</td>
              <td>Nazwisko</td>
              <td>Data dodania</td>
              <td>Plik </td>
              <td>Przejdź</td>
            </tr>
          </thead>
          <tbody>
            {documents.length > 0 &&
              documents.map((doc, i) => (
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
                  <td>{doc.email}</td>
                  <td>{doc.first_name}</td>
                  <td>{doc.surname}</td>
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
