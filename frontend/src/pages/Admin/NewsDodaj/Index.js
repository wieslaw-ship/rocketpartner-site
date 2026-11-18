import React, { useContext, useEffect, useState } from "react";
import Layout from "../../../components/AdminLayout/Layout";
import PaginationOutLine from "../../../components/Pagination";
import { UserContext } from "../../../context/UserContext";
import {
  NotificationError,
  NotificationSuccess,
} from "../../../components/Notification";
import { DayMonthYearClassic } from "../../../components/Dates";
import { createInformation } from "../../../api/admin";
import { TextField } from "@mui/material";
import { Link } from "react-router-dom";

const Home = () => {
  const { token } = useContext(UserContext);
  let initialInformation = {
    title: "",
    content: "",
  };
  const [information, setInformation] = useState(initialInformation);

  const submitForm = async (e) => {
    e.preventDefault();
    if (!information.title) {
      NotificationError("Dodaj tytuł");
      return;
    }
    if (!information.content) {
      NotificationError("Dodaj treść");
      return;
    }
    let result = await createInformation(token, information);

    if (result.isOk) {
      NotificationSuccess("Pomyślnie dodano informację");
      setInformation(initialInformation);
    } else {
      NotificationError(result.message);
    }
  };

  return (
    <Layout active={10}>
      <div className="topWithAdd">
        <h1> Dodaj Informacje</h1>
        <Link to="/admin/informacje">
          <button className="mainButton">Lista</button>
        </Link>
      </div>
      <div className="col-sm-12 col-md-12 col-lg-8 col-xl-6">
        <form className="addInfoForm" onSubmit={submitForm}>
          <TextField
            fullWidth
            placeholder="Tytuł"
            value={information.title}
            onChange={(e) =>
              setInformation({ ...information, title: e.target.value })
            }
          />
          <TextField
            className="mt-3"
            fullWidth
            placeholder="Treść"
            value={information.content}
            rows={8}
            multiline
            onChange={(e) =>
              setInformation({ ...information, content: e.target.value })
            }
          />
          <button className="mt-4 mainButton">Dodaj</button>
        </form>
      </div>
    </Layout>
  );
};
export default Home;
